import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageCommunicationService {

  private addMessageSubject: BehaviorSubject<Message | null> = new BehaviorSubject<Message | null>(null);
  addMessage$: Observable<Message | null> = this.addMessageSubject.asObservable();

  addMessage(message: Message): void {
    this.addMessageSubject.next(message);
  }

  private updateMessageSubject: BehaviorSubject<Message | null> = new BehaviorSubject<Message | null>(null);
  updateMessage$: Observable<Message | null> = this.updateMessageSubject.asObservable();

  updateMessage(message: Message): void {
    this.updateMessageSubject.next(message);
  }

  private deleteMessageSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  deleteMessage$: Observable<number | null> = this.deleteMessageSubject.asObservable();

  deleteMessage(messageId: number): void {
    this.deleteMessageSubject.next(messageId);
  }

  private deleteChatSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  deleteChat$: Observable<number | null> = this.deleteChatSubject.asObservable();

  deleteChat(id: number): void {
    this.deleteChatSubject.next(id);
  }
}
