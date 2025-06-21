import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Photo} from '../../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoCommunicationService {
  private addPhotosSubject: BehaviorSubject<Photo[] | null> = new BehaviorSubject<Photo[] | null>(null);
  addPhotos$: Observable<Photo[] | null> = this.addPhotosSubject.asObservable();

  addPhotos(photos: Photo[]): void {
    this.addPhotosSubject.next(photos);
  }
}
