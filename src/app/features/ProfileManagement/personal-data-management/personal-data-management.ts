import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputForm} from "../../../shared/components/inputs/input-form/input-form";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {UpdateUser, User} from '../../../core/models/user';
import {SessionService} from '../../../core/services/session/session.service';
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {debounceTime, distinctUntilChanged, map, Subject, takeUntil} from 'rxjs';
import {SessionData} from '../../../core/models/session-data';

@Component({
  selector: 'app-personal-data-management',
    imports: [
        FormsModule,
        InputForm,
        ReactiveFormsModule,
        SectionGlass
    ],
  templateUrl: './personal-data-management.html',
  styleUrl: './personal-data-management.css'
})
export class PersonalDataManagement {
  @Input() user: User | undefined;
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(64)]
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(64)]
    }),
    phone: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.minLength(9), Validators.maxLength(9)]
    }),
    address: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(128)]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    firstName: {
      maxlength: 'The first name must be less than 64 characters.'
    },
    lastName: {
      maxlength: 'The first name must be less than 64 characters.'
    },
    phone: {
      minlength: 'The phone must be 9 characters.',
      maxlength: 'The phone must be 9 characters.'
    },
    address: {
      maxlength: 'The address must be less than 64 characters.'
    }
  };

  constructor(private sessionService: SessionService,
              private userHttpService: UserHttpService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({ firstName: this.user.firstName });
      this.form.patchValue({ lastName: this.user.lastName });
      this.form.patchValue({ phone: this.user.phone });
      this.form.patchValue({ address: this.user.address });
    }

    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        map(value => JSON.stringify(value)),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.onSubmit();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getErrorMessage(controlName: string): string {
    const control: any = this.form.get(controlName);
    if (control?.errors) {
      for (const error in control.errors) {
        if (this.errorMessages[controlName][error]) {
          return this.errorMessages[controlName][error];
        }
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const body: UpdateUser = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      phone: this.form.value.phone,
      address: this.form.value.address
    }

    this.userHttpService.update(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: User): void => {
          const data: SessionData | undefined = this.sessionService.session();
          if (data != undefined) {
            data.user = result;
            this.sessionService.setData(data);
          }
        }
      })
  }
}

