import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Petition} from '../../../core/models/petition';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {AddMessage, Message} from '../../../core/models/message';

@Component({
  selector: 'app-message-input',
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './message-input.html',
  styleUrl: './message-input.css'
})
export class MessageInput {
  @Input() petition: Petition | undefined = undefined;
  @Input() me: number | undefined = undefined;

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
    if (this.petition != undefined) {
      const body: AddMessage = {
        content: this.sendMessageForm.value.content,
        relatedPetitionId: this.petition.id,
        toUserId: this.me == this.petition.requestingUser.id ? this.petition.requestedPet.ownerUser.id : this.petition.requestingUser.id,
      }
      this.messageHttpService.add(body).subscribe({
        next: (result: Message): void => {},
        error: (error: Error): void => {
          /*
                    this.alertService.showError('Error adding messages. Please try again later.');
          */
        }
      });
    }
  }

}

