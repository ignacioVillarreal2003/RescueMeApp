import {Component, Input} from '@angular/core';
import {Chat} from '../../../core/models/chaat';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {ChatPreview} from '../chat-preview/chat-preview';

@Component({
  selector: 'app-chats-sidebar',
  imports: [
    ChatPreview
  ],
  templateUrl: './chats-sidebar.html',
  styleUrl: './chats-sidebar.css'
})
export class ChatsSidebar {
  chats: Chat[] = [];
  @Input() userId: number | undefined;
  @Input() chatId: number | undefined;

  constructor(private messageHttpService: MessageHttpService) {
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats(): void {
    this.messageHttpService.getChats().subscribe({
      next: (result: Chat[]): void => {
        this.chats = result;
      }
    })
  }
}
