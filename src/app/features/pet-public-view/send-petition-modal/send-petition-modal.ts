import {Component} from '@angular/core';
import {AddPetition, Petition} from '../../../core/models/petition';
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextareaForm} from '../../../shared/components/inputs/textarea-form/textarea-form';
import { MatDialogRef } from '@angular/material/dialog';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {Modal} from '../../../shared/components/modal/modal';
import {ActivatedRoute} from '@angular/router';
import {finalize} from 'rxjs';
import {ToastService} from '../../../core/services/components/toast-service';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-send-petition-modal',
  imports: [
    ReactiveFormsModule,
    TextareaForm,
    TextBtn,
    Modal,
  ],
  templateUrl: './send-petition-modal.html',
  styleUrl: './send-petition-modal.css'
})
export class SendPetitionModal {
  petId: number | undefined;

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

  constructor(private petitionHttpService: PetitionHttpService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              protected loaderService: LoaderService,
              private dialogRef: MatDialogRef<SendPetitionModal>) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any): void => {
      this.petId = params.get('id');
    });
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

    this.loaderService.show();

    if (this.petId != undefined) {
      const body: AddPetition = {
        petId: this.petId,
        message: this.form.value.message
      }

      this.petitionHttpService.add(body)
        .pipe(finalize((): void => {
          this.loaderService.hide();
          this.close();
        }))
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
