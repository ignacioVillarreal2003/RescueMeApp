import { Injectable } from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {HttpClient} from '@angular/common/http';
import {AddMessage, Message, UpdateMessage} from '../../models/message';
import {catchError, Observable} from 'rxjs';
import {Petition} from '../../models/petition';

@Injectable({
  providedIn: 'root'
})
export class MessageHttpService extends BaseHttpService {

  url = `${this.baseUrl}/messages`;

  constructor(http: HttpClient) {
    super(http)
  }

  getMessages(petitionId: number): Observable<any> {
    return this.http.get<Message[]>(`${this.url}/chat/${petitionId}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  getChats(): Observable<any> {
    return this.http.get<Petition[]>(`${this.url}/chats`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  add(body: AddMessage): Observable<any> {
    return this.http.post<Message>(`${this.url}`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  update(id: number, body: UpdateMessage): Observable<any> {
    return this.http.put<Message>(`${this.url}/${id}`, body, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  deleteChat(petitionId: number): Observable<any> {
    return this.http.delete<void>(`${this.url}/chat/${petitionId}`, this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }
}
