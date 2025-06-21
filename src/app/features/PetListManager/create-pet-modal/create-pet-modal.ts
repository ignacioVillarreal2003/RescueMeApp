import {Component} from '@angular/core';
import {Pet} from '../../../core/models/pet';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Modal} from '../../../shared/components/modal/modal';
import {TextareaForm} from '../../../shared/components/inputs/textarea-form/textarea-form';
import {InputForm} from '../../../shared/components/inputs/input-form/input-form';
import {SelectForm} from '../../../shared/components/inputs/select-form/select-form';
import {InputFilesForm} from '../../../shared/components/inputs/input-files-form/input-files-form';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {MatDialogRef} from '@angular/material/dialog';
import {SexValues, SizeValues, SpeciesValues} from '../../../core/constants/pet-filter.constants';
import {finalize, Subject, takeUntil} from 'rxjs';
import {LoaderService} from '../../../core/services/components/loader-service';
import {CommunicationService} from '../../../core/services/communication-service';

@Component({
  selector: 'app-create-pet-modal',
  imports: [
    ReactiveFormsModule,
    Modal,
    TextareaForm,
    InputForm,
    SelectForm,
    InputFilesForm,
    TextBtn
  ],
  templateUrl: './create-pet-modal.html',
  styleUrl: './create-pet-modal.css'
})
export class CreatePetModal {
  sexValues: string[] = [...SexValues];
  speciesValues: string[] = [...SpeciesValues];
  sizeValues: string[] = [...SizeValues];
  private destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(64)]
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)]
    }),
    species: new FormControl<string>(this.speciesValues[0], {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)]
    }),
    age: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(30)]
    }),
    size: new FormControl<string>(this.sizeValues[0], {
      nonNullable: true,
      validators: [Validators.required]
    }),
    sex: new FormControl<string>(this.sexValues[0], {
      nonNullable: true,
      validators: [Validators.required]
    }),
    files: new FormControl<Object>([null])
  });

  errorMessages: Record<string, Record<string, string>> = {
    name: {
      required: 'Name is required.',
      maxlength: 'The name must be less than 64 characters.'
    },
    description: {
      required: 'Description is required.',
      maxlength: 'The description must be less than 64 characters.'
    },
    age: {
      required: 'Age is required.',
      min: 'The age must be more than 0.',
      max: 'The age must be less than 30.'
    }
  };

  constructor(private petHttpService: PetHttpService,
              private communicationService: CommunicationService,
              protected loaderService: LoaderService,
              private dialogRef: MatDialogRef<CreatePetModal>) {
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

  onFilesSelected(files: FileList): void {
    if (files && files.length > 0) {
      this.form.patchValue({ files: files });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loaderService.show()

    const formData = new FormData();
    const files: FileList = this.form.value.files;
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('sex', this.form.value.sex);
    formData.append('species', this.form.value.species);
    formData.append('age', this.form.value.age);
    formData.append('size', this.form.value.size);

    this.petHttpService.add(formData)
      .pipe(finalize((): void => {
        this.loaderService.hide();
        this.close();
      }))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: Pet): void => {
          this.communicationService.addPet(result);
        }
      })
  }

  close(): void {
    this.dialogRef.close();
  }
}
