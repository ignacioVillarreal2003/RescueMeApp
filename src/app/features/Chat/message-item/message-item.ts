import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {Message} from '../../../core/models/message';

@Component({
  selector: 'app-message-item',
    imports: [
        NgIf
    ],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})
export class MessageItem {
  @Input() message: Message | undefined = undefined;
  @Input() me: number | undefined = undefined;

  getDirection(): 'from-me' | 'to-me' {
    if (this.message != undefined && this.me != undefined) {
      if (this.me == this.message.fromUser.id) {
        return 'from-me';
      } else if (this.me == this.message.toUser.id) {
        return 'to-me';
      }
    }
    return 'from-me';
  }
}
