import {Component} from '@angular/core';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {Petition, Status} from '../../../core/models/petition';
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {Pet} from '../../../core/models/pet';
import {AdoptionRequestItem} from '../adoption-request-item/adoption-request-item';
import {PetContextService} from '../../../core/services/context/pet-context-service';
import {finalize, Subject, takeUntil} from 'rxjs';
import {LoaderService} from '../../../core/services/components/loader-service';

@Component({
  selector: 'app-adoption-request-manager',
  imports: [
    SectionGlass,
    AdoptionRequestItem
  ],
  templateUrl: './adoption-request-manager.html',
  styleUrl: './adoption-request-manager.css'
})
export class AdoptionRequestManager {
  pet: Pet | undefined;
  petitions: Petition[] = [];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private petitionHttpService: PetitionHttpService,
              private petContextService: PetContextService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.petContextService.pet$.subscribe((pet: Pet | null): void => {
      if (pet != null) {
        this.pet = pet;
        this.getPetition();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPetition(): void {
    if (this.pet != undefined) {
      this.loaderService.show();

      this.petitionHttpService.getPetitionsByPet(this.pet.id)
        .pipe(finalize((): void => this.loaderService.hide()))
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (result: Petition[]): void => {
            this.petitions = result;
          }
        })
    }
  }
}
