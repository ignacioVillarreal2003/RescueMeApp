import {Component, Input} from '@angular/core';
import {Petition} from '../../../core/models/petition';
import {MessageList} from '../message-list/message-list';
import {SendMessageForm} from '../send-message-form/send-message-form';
import {ChatOptions} from '../chat-options/chat-options';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-window',
  imports: [
    MessageList,
    SendMessageForm,
    ChatOptions,
    NgIf
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css'
})
export class ChatWindow {
  @Input() petition: Petition | undefined = undefined;
  @Input() me: number | undefined = undefined;
  isChatOptionsOpen = false;

  toggleChatOptions(): void {
    this.isChatOptionsOpen = !this.isChatOptionsOpen;
  };
}
