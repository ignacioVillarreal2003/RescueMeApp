import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pet} from '../../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetContextService {
  private petSubject: BehaviorSubject<Pet | null> = new BehaviorSubject<Pet | null>(null);

  get pet$(): Observable<Pet | null> {
    return this.petSubject.asObservable();
  }

  setPet(pet: Pet): void {
    this.petSubject.next(pet);
  }

  clearPet(): void {
    this.petSubject.next(null);
  }
}
