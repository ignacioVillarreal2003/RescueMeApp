import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Petition} from '../../../core/models/petition';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {AddMessage, Message} from '../../../core/models/message';
import {Chat} from '../../../core/models/chaat';
import {User} from '../../../core/models/user';
import {IconBtn} from '../../../shared/components/buttons/icon-btn/icon-btn';

@Component({
  selector: 'app-message-input',
  imports: [
    ReactiveFormsModule,
    IconBtn
  ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css'
})
export class MessageInput {
  @Input() user: User | undefined;
  @Input() chat: Chat | undefined;

  sendMessageForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(255)])
  });

  constructor(private messageHttpService: MessageHttpService) {
  }

  onSubmit(): void {
    if (this.sendMessageForm.invalid) {
      this.sendMessageForm.markAllAsTouched();
      return;
    }
    if (this.chat != undefined) {
      const body: AddMessage = {
        content: this.sendMessageForm.value.content,
        relatedPetitionId: this.chat.id,
        toUserId: this.user?.id == this.chat.userId1 ? this.chat.userId1 : this.chat.userId2,
      }
      this.messageHttpService.add(body).subscribe({
        next: (result: Message): void => {}
      });
    }
  }

}

