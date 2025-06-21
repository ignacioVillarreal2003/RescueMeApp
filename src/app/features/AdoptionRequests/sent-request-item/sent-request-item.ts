import {Component, Input} from '@angular/core';
import {IconBtn} from "../../../shared/components/buttons/icon-btn/icon-btn";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {Petition, Status, UpdatePetitionDetails} from '../../../core/models/petition';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {TextareaForm} from '../../../shared/components/inputs/textarea-form/textarea-form';
import {debounceTime, distinctUntilChanged, map, Subject, takeUntil} from 'rxjs';
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastService} from '../../../core/services/components/toast-service';

@Component({
  selector: 'app-sent-request-item',
  imports: [
    IconBtn,
    SectionGlass,
    NgClass,
    TextareaForm,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sent-request-item.html',
  styleUrl: './sent-request-item.css'
})
export class SentRequestItem {
  @Input() petition: Petition | undefined;
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(255), Validators.required]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    message: {
      required: 'The message is required.',
      maxlength: 'The message must be less than 255 characters.'
    }
  };

  constructor(private router: Router,
              private toastService: ToastService,
              private petitionHttpService: PetitionHttpService) {
  }

  ngOnInit(): void {
    if (this.petition) {
      this.form.patchValue({ message: this.petition.message });
    }

    this.form.valueChanges
      .pipe(
        debounceTime(2000),
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

  goToPete(): void {
    if (this.petition != undefined) {
      this.router.navigate([`/main/pet-details/${this.petition.requestedPet.id}`]);
    }
  }

  statusClass(status: number): string {
    return Status[status];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.petition != undefined) {
      if (this.petition.status != Status.PENDING) {
        this.toastService.show("Cannot update this petition.", "error");
        this.form.patchValue({ message: this.petition.message });
      }
      else {
        const body: UpdatePetitionDetails = {
          message: this.form.value.message
        }

        this.petitionHttpService.updateDetails(this.petition.id, body)
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      }
    }
  }
}
