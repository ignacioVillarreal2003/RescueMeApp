import { Component } from '@angular/core';
import {Carousel} from "../../../shared/components/carousel/carousel";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {Pet, Sex, Size, State} from '../../../core/models/pet';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {Photo} from '../../../core/models/photo';
import {PetOverview} from '../pet-overview/pet-overview';
import {OwnerOverview} from '../owner-overview/owner-overview';
import {AdoptionRequestModal} from '../adoption-request-modal/adoption-request-modal';
import {finalize, Subject, takeUntil} from 'rxjs';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-pet-details-page',
  imports: [
    Carousel,
    SectionGlass,
    PetOverview,
    OwnerOverview
  ],
  templateUrl: './pet-details-page.html',
  styleUrl: './pet-details-page.css'
})
export class PetDetailsPage {
  pet: Pet | undefined = undefined;
  images: string[] = [];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private petHttpService: PetHttpService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private overlay: Overlay,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getPet();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPet():void {
    this.route.paramMap.subscribe((params: any): void => {
      this.loaderService.show();

      const id: number = params.get('id');
      this.petHttpService.getPet(id)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: Pet): void => {
            this.pet = result;
            this.images = this.pet.petPhotos.map((photo: Photo): string => {
              return photo.url;
            });
          }
        });
    });
  }

  openModal(): void {
    if (this.pet != undefined) {
      this.dialog.open(AdoptionRequestModal, {
        data: { petId: this.pet.id },
        scrollStrategy: this.overlay.scrollStrategies.noop()
      });
    }
  }
}

