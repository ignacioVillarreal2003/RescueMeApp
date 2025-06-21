import {Component, Inject} from '@angular/core';
import {Modal} from "../../../shared/components/modal/modal";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextBtn} from "../../../shared/components/buttons/text-btn/text-btn";
import {TextareaForm} from "../../../shared/components/inputs/textarea-form/textarea-form";
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {ToastService} from '../../../core/services/components/toast-service';
import {LoaderService} from '../../../core/services/components/loader-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddPetition, Petition} from '../../../core/models/petition';
import {finalize, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-adoption-request-modal',
    imports: [
        Modal,
        ReactiveFormsModule,
        TextBtn,
        TextareaForm
    ],
  templateUrl: './adoption-request-modal.html',
  styleUrl: './adoption-request-modal.css'
})
export class AdoptionRequestModal {
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    message: {
      required: 'Message is required.',
      maxlength: 'The message must be less than 255 characters.'
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { petId: number },
              private petitionHttpService: PetitionHttpService,
              private toastService: ToastService,
              protected loaderService: LoaderService,
              private dialogRef: MatDialogRef<AdoptionRequestModal>) {
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

    if (this.data.petId != undefined) {
      this.loaderService.show();

      const body: AddPetition = {
        petId: this.data.petId,
        message: this.form.value.message
      }

      this.petitionHttpService.add(body)
        .pipe(finalize((): void => {
          this.loaderService.hide();
          this.close();
        }))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: Petition): void => {
            this.toastService.show("Petition sent successfully.")
          }
        })
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
