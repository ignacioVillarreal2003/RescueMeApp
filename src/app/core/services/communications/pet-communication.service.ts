import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '../../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetCommunicationService {
  private getPetsSubject: BehaviorSubject<Pet[] | null> = new BehaviorSubject<Pet[] | null>(null);
  getPets$: Observable<Pet[] | null> = this.getPetsSubject.asObservable();

  setPets(pets: Pet[]): void {
    this.getPetsSubject.next(pets);
  }

  private addPetSubject: BehaviorSubject<Pet | null> = new BehaviorSubject<Pet | null>(null);
  addPet$: Observable<Pet | null> = this.addPetSubject.asObservable();

  addPet(pet: Pet): void {
    this.addPetSubject.next(pet);
  }

  private deletePetSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  deletePet$: Observable<number | null> = this.deletePetSubject.asObservable();

  deletePet(petId: number): void {
    this.deletePetSubject.next(petId);
  }
}
