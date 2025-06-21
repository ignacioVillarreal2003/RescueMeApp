import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Photo} from '../../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoHttpService extends BaseHttpService{

  url = `${this.baseUrl}/photos`;

  constructor(http: HttpClient) {
    super(http)
  }

  add(body: FormData): Observable<any> {
    return this.http.post<Photo[]>(`${this.url}`, body).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
