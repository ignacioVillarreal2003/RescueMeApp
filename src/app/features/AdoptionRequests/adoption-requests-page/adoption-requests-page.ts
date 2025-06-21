import { Component } from '@angular/core';
import {AdoptionRequestItem} from "../../PetManagement/adoption-request-item/adoption-request-item";
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {Petition, Status} from '../../../core/models/petition';
import {finalize, Subject, takeUntil} from 'rxjs';
import {PetitionHttpService} from '../../../core/services/http/petition-http.service';
import {LoaderService} from '../../../core/services/components/loader-service';
import {Sex, Size, State} from '../../../core/models/pet';
import {SentRequestItem} from '../sent-request-item/sent-request-item';

@Component({
  selector: 'app-adoption-requests-page',
  imports: [
    AdoptionRequestItem,
    SectionGlass,
    SentRequestItem
  ],
  templateUrl: './adoption-requests-page.html',
  styleUrl: './adoption-requests-page.css'
})
export class AdoptionRequestsPage {
  petitions: Petition[] = [];
  destroy$: Subject<void> = new Subject<void>();

  constructor(private petitionHttpService: PetitionHttpService,
              private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.getPetition();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPetition(): void {
    this.loaderService.show();

    this.petitionHttpService.getMyPetitions()
      .pipe(finalize((): void => this.loaderService.hide()))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: Petition[]): void => {
          this.petitions = result;
        }
      })
  }
}
