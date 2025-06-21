import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  protected http: HttpClient;
  protected baseUrl: string = 'http://localhost:8080/api/v1';
  protected httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  }

  constructor(http: HttpClient) {
    this.http = http;
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
