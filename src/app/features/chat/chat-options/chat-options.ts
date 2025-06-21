import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Petition} from '../../../core/models/petition';
import {Router} from '@angular/router';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {MessageCommunicationService} from '../../../core/services/communications/message-communication.service';

@Component({
  selector: 'app-chat-options',
  imports: [],
  templateUrl: './chat-options.html',
  styleUrl: './chat-options.css'
})
export class ChatOptions {
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Input() petition: Petition | undefined = undefined;
  @Input() me: number | undefined = undefined;

  constructor(private router: Router,
              private messageHttpService: MessageHttpService,
              private messageCommunicationService: MessageCommunicationService) {
  }

  close(): void {
    this.onClose.emit();
  }

  openPetView() {
    if (this.petition != undefined) {
      this.router.navigate([`/pet-view/${this.petition.requestedPet.id}`]);
    }
  }

  openPublicProfile() {
    if (this.petition != undefined && this.me != undefined) {
      if (this.me == this.petition.requestedPet.ownerUser.id) {
        this.router.navigate([`/public-profile/${this.petition.requestingUser.id}`]);
      } else if (this.me == this.petition.requestingUser.id) {
        this.router.navigate([`/public-profile/${this.petition.requestedPet.ownerUser.id}`]);
      }
    }
  }

  deleteChat(): void {
    if (this.petition != undefined) {
      this.messageHttpService.deleteChat(this.petition.id).subscribe({
        next: (): void => {
        }
      })
    }
  }
}
