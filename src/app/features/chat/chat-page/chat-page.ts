import { Component } from '@angular/core';
import {ChatWindow} from '../chat-window/chat-window';
import {ChatList} from '../chat-list/chat-list';
import {Petition} from '../../../core/models/petition';
import {ActivatedRoute} from '@angular/router';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {SessionService} from '../../../core/services/session/session.service';

@Component({
  selector: 'app-chat-page',
  imports: [
    ChatWindow,
    ChatList
  ],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css'
})
export class ChatPage {
  activeChatId: number | undefined = undefined;
  petitions: Petition[] = [];
  me: number | undefined = undefined;

  constructor(private route: ActivatedRoute,
              private messageHttpService: MessageHttpService,
              private sessionService: SessionService,
/*
              private chatService: ChatService,
*/
              ) {
  }

  ngOnInit(): void {
    /*this.me = this.sessionService.getData()?.user.id;
    this.route.paramMap.subscribe((params: any): void => {
      const id: number = params.get('id');
      this.activeChatId = id;
      this.chatService.connect(id);
    });
    this.getChats();*/
  }

  getChats(): void {
    this.messageHttpService.getChats().subscribe({
      next: (result: Petition[]): void => {
        this.petitions = result;
      },
      error: (error: Error): void => {
/*
        this.alertService.showError('Error getting messages. Please try again later.');
*/
      }
    })
  }

  getActiveChat(): Petition | undefined {
    return this.petitions.find((petition: Petition) => petition.id == this.activeChatId);
  }
}
