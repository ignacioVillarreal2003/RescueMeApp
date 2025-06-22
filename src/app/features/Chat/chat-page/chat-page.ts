import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../core/services/session/session.service';
import {ChatsSidebar} from '../chats-sidebar/chats-sidebar';
import {ChatWindow} from '../chat-window/chat-window';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-chat-page',
  imports: [
    ChatsSidebar,
    ChatWindow
  ],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.css'
})
export class ChatPage {
  chatId: number | undefined;
  user: User | undefined;

  constructor(private route: ActivatedRoute,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.user = this.sessionService.session()?.user;
    this.route.paramMap.subscribe((params: any): void => {
      this.chatId = Number(params.get('id'));
    });
  }
}
