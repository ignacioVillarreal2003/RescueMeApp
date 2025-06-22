import {Component, Input} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Message} from '../../../core/models/message';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-message-item',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './message-item.html',
  styleUrl: './message-item.css'
})
export class MessageItem {
  @Input() message: Message | undefined = undefined;
  @Input() user: User | undefined;

  getDirection(): 'from-me' | 'to-me' {
    if (this.message != undefined && this.user != undefined) {
      if (this.user.id == this.message.fromUser.id) {
        return 'from-me';
      } else if (this.user.id == this.message.toUser.id) {
        return 'to-me';
      }
    }
    return 'from-me';
  }
}
