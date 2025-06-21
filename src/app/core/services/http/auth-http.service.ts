import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {LoginUser, RegisterUser, UpdateUser, User} from '../../models/user';
import {SessionData} from '../../models/session-data';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends BaseHttpService {

  url = `${this.baseUrl}/auth`;

  constructor(http: HttpClient) {
    super(http);
  }

  register(body: RegisterUser): Observable<any> {
    return this.http.post<SessionData>(`${this.url}/register`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  login(body: LoginUser): Observable<any> {
    return this.http.post<SessionData>(`${this.url}/login`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  refresh(): Observable<any> {
    return this.http.post<SessionData>(`${this.url}/refresh`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  logout(): Observable<any> {
    return this.http.delete<void>(`${this.url}/logout`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
