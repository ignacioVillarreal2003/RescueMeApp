import { Component } from '@angular/core';
import {Pet, Sex, Size, State} from '../../../core/models/pet';
import {Photo} from '../../../core/models/photo';
import {PetHttpService} from '../../../core/services/http/pet-http.service';
import {ActivatedRoute} from '@angular/router';
import {PetDetails} from '../pet-details/pet-details';
import {Carousel} from '../../../shared/components/carousel/carousel';
import {OwnerInfo} from '../owner-info/owner-info';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {MatDialog} from '@angular/material/dialog';
import {SendPetitionModal} from '../send-petition-modal/send-petition-modal';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-pet-public-view-page',
  imports: [
    PetDetails,
    Carousel,
    OwnerInfo,
    SectionGlass
  ],
  templateUrl: './pet-public-view-page.html',
  styleUrl: './pet-public-view-page.css'
})
export class PetPublicViewPage {
  pet: Pet | undefined = undefined;
  images: string[] = [];

  constructor(private petHttpService: PetHttpService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private overlay: Overlay) {
  }

  ngOnInit(): void {
    /*this.getPet();*/
    this.pet = {
      id: 1,
      name: "Luna",
      description: "Muy cariñosa y juguetona. Ideal para familias.",
      sex: Sex.FEMALE,
      species: "Perro",
      age: 2,
      size: Size.LARGE,
      state: State.ADOPTED,
      breed: "Labrador",
      color: "Negro",
      vaccinated: true,
      castrated: true,
      dewormed: true,
      medicalNotes: "Sin antecedentes médicos",
      createdAt: "2025-06-01T10:30:00Z",
      updatedAt: "2025-06-10T15:00:00Z",
      ownerUser: {
        id: 1,
        email: "ignacio@example.com",
        password: '',
        firstName: 'Pablo',
        lastName: 'Chacon',
        phone: '098765432',
        address: 'Paso de mi Casa',
        createdAt: '',
        updatedAt: '',
        sentMessages: [],
        receivedMessages: [],
        ownedPets: [],
        sentPetitions: []
      },
      petPhotos: [
        {
          id: 1,
          url: "./images/auth-1.png",
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 2,
          url: "./images/auth-2.jpg",
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 3,
          url: "./images/auth-1.png",
          createdAt: '',
          updatedAt: '',
        }
      ],
      receivedPetitions: []
    }
    this.images = this.pet.petPhotos.map((photo: Photo): string => {
      return photo.url;
    });
  }

  getPet():void {
    this.route.paramMap.subscribe((params: any): void => {
      const id: number = params.get('id');
      this.petHttpService.getPet(id).subscribe({
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
    this.dialog.open(SendPetitionModal, {
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }
}

