import {Component, Input} from '@angular/core';
import {Message} from '../../../core/models/message';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {MessageCommunicationService} from '../../../core/services/communications/message-communication.service';
import {ActivatedRoute} from '@angular/router';
import {MessageItem} from '../message-item/message-item';
import {User} from '../../../core/models/user';
import {Chat} from '../../../core/models/chaat';

@Component({
  selector: 'app-message-list',
  imports: [
    MessageItem
  ],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css'
})
export class MessageList {
  messages: Message[] = [];
  @Input() chat: Chat | undefined;
  @Input() user: User | undefined;

  constructor(private messageHttpService: MessageHttpService,
              private messageCommunicationService: MessageCommunicationService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.chat)
    this.getMessages(this.chat?.id);
    this.messageCommunicationService.addMessage$.subscribe((message: Message | null): void => {
      if (message != null) {
        this.messages.push(message);
      }
    })
  }

  getMessages(chatId: number): void {
    this.messageHttpService.getMessages(chatId).subscribe({
      next: (result: Message[]): void => {
        this.messages = result;
      },
      error: (error: Error): void => {
        this.messages = [
          {
            id: 1,
            content: 'Hola, ¿cómo estás?',
            createdAt: '2025-06-20T10:00:00Z',
            updatedAt: '2025-06-20T10:00:00Z',
            fromUser: {
              id: 1,
              email: 'ignacio@example.com',
              password: '',
              firstName: 'Ignacio',
              lastName: 'Villarreal',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            },
            toUser: {
              id: 2,
              email: 'sofia@example.com',
              password: '',
              firstName: 'Sofía',
              lastName: 'Gómez',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            }
          },
          {
            id: 2,
            content: 'Todo bien, ¿y vos?',
            createdAt: '2025-06-20T10:01:30Z',
            updatedAt: '2025-06-20T10:01:30Z',
            fromUser: {
              id: 2,
              email: 'sofia@example.com',
              password: '',
              firstName: 'Sofía',
              lastName: 'Gómez',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            },
            toUser: {
              id: 1,
              email: 'ignacio@example.com',
              password: '',
              firstName: 'Ignacio',
              lastName: 'Villarreal',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            }
          },
          {
            id: 3,
            content: '¿Seguís interesado en adoptar al perrito?',
            createdAt: '2025-06-20T10:05:00Z',
            updatedAt: '2025-06-20T10:05:00Z',
            fromUser: {
              id: 2,
              email: 'sofia@example.com',
              password: '',
              firstName: 'Sofía',
              lastName: 'Gómez',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            },
            toUser: {
              id: 1,
              email: 'ignacio@example.com',
              password: '',
              firstName: 'Ignacio',
              lastName: 'Villarreal',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            }
          },
          {
            id: 4,
            content: 'Sí, ¡me encantaría conocerlo!',
            createdAt: '2025-06-20T10:06:15Z',
            updatedAt: '2025-06-20T10:06:15Z',
            fromUser: {
              id: 1,
              email: 'ignacio@example.com',
              password: '',
              firstName: 'Ignacio',
              lastName: 'Villarreal',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            },
            toUser: {
              id: 2,
              email: 'sofia@example.com',
              password: '',
              firstName: 'Sofía',
              lastName: 'Gómez',
              phone: '',
              address: '',
              createdAt: '',
              updatedAt: '',
              sentMessages: [],
              receivedMessages: [],
              ownedPets: [],
              sentPetitions: []
            }
          }
        ];
      }
    });
  }
}
