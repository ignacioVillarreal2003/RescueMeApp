import {Component} from '@angular/core';
import {CheckboxForm} from '../../../shared/components/inputs/checkbox-form/checkbox-form';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputForm} from '../../../shared/components/inputs/input-form/input-form';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {SelectForm} from '../../../shared/components/inputs/select-form/select-form';
import {TextareaForm} from '../../../shared/components/inputs/textarea-form/textarea-form';
import {Pet, UpdatePet} from '../../../core/models/pet';
import {SexValues, SizeValues, SpeciesValues, StateValues} from '../../../core/constants/pet-filter.constants';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {debounceTime, distinctUntilChanged, finalize, map, Subject, takeUntil} from 'rxjs';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {Router} from '@angular/router';
import {PetContextService} from '../../../core/services/context/pet-context-service';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-pet-profile-manager',
  imports: [
    CheckboxForm,
    FormsModule,
    InputForm,
    ReactiveFormsModule,
    SectionGlass,
    SelectForm,
    TextareaForm,
    TextBtn
  ],
  templateUrl: './pet-profile-manager.html',
  styleUrl: './pet-profile-manager.css'
})
export class PetProfileManager {
  pet: Pet | undefined;
  sexValues: string[] = [...SexValues];
  speciesValues: string[] = [...SpeciesValues];
  sizeValues: string[] = [...SizeValues];
  stateValues: string[] = [...StateValues];
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.maxLength(64)]
    }),
    description: new FormControl<string>('', {
      validators: [Validators.maxLength(255)]
    }),
    species: new FormControl<string>(''),
    age: new FormControl<number>(0, {
      validators: [Validators.min(0), Validators.max(30)]
    }),
    size: new FormControl<string>(''),
    sex: new FormControl<string>(''),
    state: new FormControl<string>(''),
    medicalNotes: new FormControl<string>('', {
      validators: [Validators.maxLength(255)]
    }),
    dewormed: new FormControl<boolean>(false),
    castrated: new FormControl<boolean>(false),
    vaccinated: new FormControl<boolean>(false),
    color: new FormControl<string>(''),
    breed: new FormControl<string>('', {
      validators: [Validators.maxLength(64)]
    })
  });

  errorMessages: Record<string, Record<string, string>> = {
    name: {
      maxlength: 'The name must be less than 64 characters.'
    },
    description: {
      maxlength: 'The description must be less than 255 characters.'
    },
    age: {
      min: 'The age must be more than 0.',
      max: 'The age must be less than 30.'
    },
    breed: {
      maxlength: 'The breed must be less than 64 characters.'
    },
    color: {
      maxlength: 'The color must be less than 64 characters.'
    },
    medicalNotes: {
      maxlength: 'The medical notes must be less than 255 characters.'
    },
  };

  constructor(private petHttpService: PetHttpService,
              private petContextService: PetContextService,
              private loaderService: LoaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.petContextService.pet$.subscribe((pet: Pet | null): void => {
      if (pet != null) {
        this.pet = pet;
        this.form.patchValue({
          name: pet.name,
          description: pet.description,
          species: pet.species,
          size: pet.size,
          sex: pet.sex,
          age: pet.age,
          state: pet.state,
          breed: pet.breed,
          color: pet.color,
          vaccinated: pet.vaccinated,
          dewormed: pet.dewormed,
          castrated: pet.castrated,
          medicalNotes: pet.medicalNotes
        });
      }
    })

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

    const body: UpdatePet = {
      name: this.form.value.name,
      description: this.form.value.description,
      species: this.form.value.species,
      age: this.form.value.age,
      sex: this.form.value.sex,
      size: this.form.value.size,
      breed: this.form.value.breed,
      color: this.form.value.color,
      vaccinated: this.form.value.vaccinated,
      castrated: this.form.value.castrated,
      medicalNotes: this.form.value.medicalNotes,
      dewormed: this.form.value.dewormed
    }

    if (this.pet != undefined) {
      this.petHttpService.update(this.pet.id, body)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    }
  }

  delete(): void {
    if (this.pet != undefined) {
      this.loaderService.show();

      this.petHttpService.delete(this.pet.id)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (): void => {
            this.router.navigate(['/main/dashboard']);
          }
        })
    }
  }
}
