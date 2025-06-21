import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private addPetSubject: BehaviorSubject<Pet | null> = new BehaviorSubject<Pet | null>(null);
  addPet$: Observable<Pet | null> = this.addPetSubject.asObservable();

  addPet(pet: Pet): void {
    this.addPetSubject.next(pet);
  }
}
