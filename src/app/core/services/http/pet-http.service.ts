import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {Pet, UpdatePet, UpdatePetState} from '../../models/pet';
import {catchError, Observable} from 'rxjs';
import {Page} from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class PetHttpService extends BaseHttpService{

  url = `${this.baseUrl}/pets`;

  constructor(http: HttpClient) {
    super(http)
  }

  getPets(params?: { [key: string]: any }): Observable<any> {
    return this.http.get<Page<Pet>>(`${this.url}/public`, { params: params, ...this.httpOptions }).pipe(
      catchError(this.handleError)
    );
  }

  getMyPets(): Observable<any> {
    return this.http.get<Pet[]>(`${this.url}/mine`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPet(id: number): Observable<any> {
    return this.http.get<Pet>(`${this.url}/${id}/public`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  add(body: FormData): Observable<any> {
    return this.http.post(`${this.url}`, body).pipe(
      catchError(this.handleError)
    )
  }

  update(id: number, body: UpdatePet): Observable<any> {
    return this.http.put(`${this.url}/${id}`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  updateState(id: number, body: UpdatePetState): Observable<any> {
    return this.http.put(`${this.url}/${id}/state`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
