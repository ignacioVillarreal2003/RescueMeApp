import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {UpdateUser, User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends BaseHttpService {

  url = `${this.baseUrl}/users`;

  constructor(http: HttpClient) {
    super(http);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<User>(`${this.url}/${id}/public`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(body: UpdateUser): Observable<any> {
    return this.http.put<User>(`${this.url}/me`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(): Observable<any> {
    return this.http.delete<void>(`${this.url}/me`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
