import { Component } from '@angular/core';
import {Petition} from '../../../core/models/petition';
import {ActivatedRoute} from '@angular/router';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {SessionService} from '../../../core/services/session/session.service';
import {ChatsSidebar} from '../chats-sidebar/chats-sidebar';
import {ChatWindow} from '../chat-window/chat-window';

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
  userId: number | undefined;

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
    });*/
  }

}
