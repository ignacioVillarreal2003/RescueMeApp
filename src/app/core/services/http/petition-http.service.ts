import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AddPetition, Petition, UpdatePetitionDetails, UpdatePetitionStatus} from '../../models/petition';

@Injectable({
  providedIn: 'root'
})
export class PetitionHttpService extends BaseHttpService {

  url = `${this.baseUrl}/petitions`;

  constructor(http: HttpClient) {
    super(http)
  }

  getMyPetitions(): Observable<any> {
    return this.http.get<Petition[]>(`${this.url}/mine`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getPetitionsByPet(petId: number): Observable<any> {
    return this.http.get<Petition[]>(`${this.url}/pet/${petId}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  add(body: AddPetition): Observable<any> {
    return this.http.post(`${this.url}`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateStatus(id: number, body: UpdatePetitionStatus): Observable<any> {
    return this.http.put(`${this.url}/${id}/status`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateDetails(id: number, body: UpdatePetitionDetails): Observable<any> {
    return this.http.put(`${this.url}/${id}/details`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
