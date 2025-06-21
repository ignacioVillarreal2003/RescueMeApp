import {Component, Input} from '@angular/core';
import {MessageList} from "../../asdasd/message-list/message-list";
import {NgIf} from "@angular/common";
import {SendMessageForm} from "../../asdasd/send-message-form/send-message-form";
import {Petition} from '../../../core/models/petition';

@Component({
  selector: 'app-chat-window',
    imports: [
        MessageList,
        NgIf,
        SendMessageForm
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
