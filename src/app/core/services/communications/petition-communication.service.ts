import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '../../models/pet';
import {Petition} from '../../models/petition';

@Injectable({
  providedIn: 'root'
})
export class PetitionCommunicationService {
  private updatePetitionSubject: BehaviorSubject<Petition | null> = new BehaviorSubject<Petition | null>(null);
  updatePetition$: Observable<Petition | null> = this.updatePetitionSubject.asObservable();

  updatePetition(petition: Petition): void {
    this.updatePetitionSubject.next(petition);
  }

  private deletePetitionSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  deletePetition$: Observable<number | null> = this.deletePetitionSubject.asObservable();

  deletePetition(petitionId: number): void {
    this.deletePetitionSubject.next(petitionId);
  }
}
