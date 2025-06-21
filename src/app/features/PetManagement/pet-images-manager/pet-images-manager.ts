import {Component, ViewChild} from '@angular/core';
import {Carousel} from '../../../shared/components/carousel/carousel';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IconBtn} from '../../../shared/components/buttons/icon-btn/icon-btn';
import {InputFilesForm} from '../../../shared/components/inputs/input-files-form/input-files-form';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {TextBtn} from '../../../shared/components/buttons/text-btn/text-btn';
import {Photo} from '../../../core/models/photo';
import {PhotoHttpService} from '../../../core/services/http/photo-http.service';
import {Pet} from '../../../core/models/pet';
import {PetContextService} from '../../../core/services/context/pet-context-service';
import {finalize, Subject, takeUntil} from 'rxjs';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-pet-images-manager',
  imports: [
    Carousel,
    FormsModule,
    IconBtn,
    InputFilesForm,
    SectionGlass,
    TextBtn,
    ReactiveFormsModule
  ],
  templateUrl: './pet-images-manager.html',
  styleUrl: './pet-images-manager.css'
})
export class PetImagesManager {
  @ViewChild('carousel') carousel!: Carousel;
  pet: Pet | undefined;
  images: string[] = [];
  destroy$: Subject<void> = new Subject<void>();

  form: FormGroup = new FormGroup({
    files: new FormControl(null, {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });

  constructor(private photoHttpService: PhotoHttpService,
              private loaderService: LoaderService,
              private petContextService: PetContextService) {
  }

  ngOnInit(): void {
    this.petContextService.pet$.subscribe((pet: Pet | null): void => {
      if (pet != null) {
        this.pet = pet;
        this.images = this.pet.petPhotos.map((photo: Photo): string => {
          return photo.url;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

    if (this.pet) {
      this.loaderService.show();

      const formData = new FormData();
      const files: FileList = this.form.value.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
      formData.append('petId', this.pet.id.toString());

      this.photoHttpService.add(formData)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: Photo[]): void => {
            if (this.pet) {
              this.pet.petPhotos.push(...result);
              this.images = this.pet.petPhotos.map((photo: Photo): string => {
                return photo.url;
              });
            }
          }
        })
    }
  }

  delete(): void {
    if (this.pet && this.pet.petPhotos && this.pet.petPhotos.length > 0) {
      this.loaderService.show();

      const id: number = this.pet.petPhotos[this.carousel.getCurrentIndex()].id;
      this.photoHttpService.delete(id)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (): void => {
            if (this.pet && this.pet.petPhotos && this.pet.petPhotos.length > 0) {
              this.pet.petPhotos = this.pet.petPhotos.filter(photo => photo.id != id);
              this.images = this.pet.petPhotos.map((photo: Photo): string => {
                return photo.url;
              });
            }
          }
        })
    }
  }
}

