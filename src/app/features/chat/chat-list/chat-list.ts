import {Component, Input} from '@angular/core';
import {Petition} from '../../../core/models/petition';
import {ChatItem} from '../chat-item/chat-item';

@Component({
  selector: 'app-chat-list',
  imports: [
    ChatItem
  ],
  templateUrl: './chat-list.html',
  styleUrl: './chat-list.css'
})
export class ChatList {
  @Input() activeChatId: number | undefined = undefined;
  @Input() petitions: Petition[] = [];
  @Input() me: number | undefined = undefined;
}

