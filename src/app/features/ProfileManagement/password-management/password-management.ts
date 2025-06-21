import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputForm} from "../../../shared/components/inputs/input-form/input-form";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {TextBtn} from "../../../shared/components/buttons/text-btn/text-btn";
import {UserHttpService} from '../../../core/services/http/user-http.service';
import {ToastService} from '../../../core/services/components/toast-service';
import {UpdateUser} from '../../../core/models/user';
import {SessionData} from '../../../core/models/session-data';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-password-management',
    imports: [
        FormsModule,
        InputForm,
        ReactiveFormsModule,
        SectionGlass,
        TextBtn
    ],
  templateUrl: './password-management.html',
  styleUrl: './password-management.css'
})
export class PasswordManagement {
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    lastPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
    }),
    newPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(64)]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    lastPassword: {
      required: 'Last password is required.',
      minlength: 'The last password must be at least 8 characters long.',
      maxlength: 'The last password must be less than 64 characters.'
    },
    newPassword: {
      required: 'New password is required.',
      minlength: 'The new password must be at least 8 characters long.',
      maxlength: 'The new password must be less than 64 characters.'
    }
  };

  constructor(private userHttpService: UserHttpService,
              private toastService: ToastService) {
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
      lastPassword: this.form.value.lastPassword,
      newPassword: this.form.value.newPassword
    }

    this.form.reset();

    this.userHttpService.update(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: SessionData): void => {
          this.toastService.show("Password updated successfully.");
        }
      })
  }
}


