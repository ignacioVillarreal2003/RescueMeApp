import {Component, Input} from '@angular/core';
import {MessageItem} from "../../asdasd/message-item/message-item";
import {NgForOf} from "@angular/common";
import {Message} from '../../../core/models/message';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {MessageCommunicationService} from '../../../core/services/communications/message-communication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-message-list',
    imports: [
        MessageItem,
        NgForOf
    ],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages: Message[] = [];
  @Input() me: number | undefined = undefined;

  constructor(private messageHttpService: MessageHttpService,
              private messageCommunicationService: MessageCommunicationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any): void => {
      const petitionId = params.get('id');
      this.getMessages(petitionId);
    });
    this.messageCommunicationService.addMessage$.subscribe((message: Message | null): void => {
      if (message != null) {
        this.messages.push(message);
      }
    })
  }

  getMessages(petitionId: number): void {
    this.messageHttpService.getMessages(petitionId).subscribe({
      next: (result: Message[]): void => {
        this.messages = result;
      },
      error: (error: Error): void => {
        /*
                this.alertService.showError('Error getting messages. Please try again later.');
        */
      }
    });
  }
}
