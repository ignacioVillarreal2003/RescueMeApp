/*
import { Injectable } from '@angular/core';
import {SessionService} from '../services/session/session.service';
import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import {Message} from '../models/message';
import {MessageCommunicationService} from '../communications/message-communication.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private sessionService: SessionService,
              private messageCommunicationService: MessageCommunicationService) {
  }

  connect(chatId: number): void {
    const token: string | undefined = this.sessionService.getData()?.token;
    if (token != undefined) {
      const websocket = new SockJs('https://rescuemebackend-hbfthrdweybadzfb.brazilsouth-01.azurewebsites.net/websocket');
      const socketClient = Stomp.over(websocket);
      socketClient.connect({
        'Authorization': 'Bearer ' + token
      }, () => {
        console.log('Connected to the server');
        socketClient.subscribe('/chat/' + chatId, (notification: any) => {
          const body: any = JSON.parse(notification.body);
          const status: string = body.status;
          const message: Message = body.message;
          switch (status) {
            case 'ADDED':
              this.messageCommunicationService.addMessage(message);
              break;
            case 'UPDATED':
              this.messageCommunicationService.updateMessage(message);
              break;
            case 'DELETED':
              this.messageCommunicationService.deleteMessage(message.id);
              break;
          }
        });
      });
    }
  }
}
*/
