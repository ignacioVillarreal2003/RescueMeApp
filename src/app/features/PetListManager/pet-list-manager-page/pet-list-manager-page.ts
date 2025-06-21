import { Component } from '@angular/core';
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {TextBtn} from "../../../shared/components/buttons/text-btn/text-btn";
import {MatDialog} from '@angular/material/dialog';
import {Overlay} from '@angular/cdk/overlay';
import {CreatePetModal} from '../create-pet-modal/create-pet-modal';
import {Pet} from '../../../core/models/pet';
import {finalize, Subject, takeUntil} from 'rxjs';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {LoaderService} from '../../../core/services/components/loader-service';
import {PetCommunicationService} from '../../../core/services/communications/pet-communication.service';
import {PetList} from '../../../shared/components/pet-list/pet-list';

@Component({
  selector: 'app-pet-list-manager-page',
  imports: [
    SectionGlass,
    TextBtn,
    PetList
  ],
  templateUrl: './pet-list-manager-page.html',
  styleUrl: './pet-list-manager-page.css'
})
export class PetListManagerPage {
  pets: Pet[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog,
              private overlay: Overlay,
              private petHttpService: PetHttpService,
              private loaderService: LoaderService,
              private petCommunicationService: PetCommunicationService) {
  }

  ngOnInit(): void {
    this.getPets();
    this.petCommunicationService.addPet$
      .pipe(takeUntil(this.destroy$))
      .subscribe((pet: Pet | null): void => {
        if (pet != null) {
          this.pets.push(pet);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPets(): void {
    this.loaderService.show();

    this.petHttpService.getMyPets()
      .pipe(finalize((): void => this.loaderService.hide()))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: Pet[]): void => {
          this.pets = result;
        }
      })
  }

  openModal(): void {
    this.dialog.open(CreatePetModal, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }
}

