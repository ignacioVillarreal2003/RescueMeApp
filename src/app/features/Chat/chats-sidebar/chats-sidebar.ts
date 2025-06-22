import {Component, Input} from '@angular/core';
import {Chat} from '../../../core/models/chaat';
import {MessageHttpService} from '../../../core/services/http/message-http.service';
import {ChatPreview} from '../chat-preview/chat-preview';
import {User} from '../../../core/models/user';
import {IconBtn} from '../../../shared/components/buttons/icon-btn/icon-btn';

@Component({
  selector: 'app-chats-sidebar',
  imports: [
    ChatPreview,
    IconBtn
  ],
  templateUrl: './chats-sidebar.html',
  styleUrl: './chats-sidebar.css'
})
export class ChatsSidebar {
  chats: Chat[] = [];
  @Input() user: User | undefined;
  @Input() chatId: number | undefined;

  constructor(private messageHttpService: MessageHttpService) {
  }

  ngOnInit(): void {
    this.getChats();
  }

  getChats(): void {
    this.messageHttpService.getChats().subscribe({
      next: (result: Chat[]): void => {
        this.chats = result;
      },
      error: (err: Error): void => {
        this.chats = [
          {
            id: 1,
            referenceId: 'abc123',
            userId1: 101,
            userId2: 102,
            username1: 'ignacio_villarreal',
            username2: 'maria_gomez'
          },
          {
            id: 2,
            referenceId: 'def456',
            userId1: 103,
            userId2: 104,
            username1: 'lucas_mendez',
            username2: 'sofia_rodriguez'
          },
          {
            id: 3,
            referenceId: 'ghi789',
            userId1: 105,
            userId2: 106,
            username1: 'camila_perez',
            username2: 'martin_fernandez'
          },
          {
            id: 4,
            referenceId: 'jkl012',
            userId1: 107,
            userId2: 108,
            username1: 'valentina_diaz',
            username2: 'franco_silva'
          },
          {
            id: 5,
            referenceId: 'mno345',
            userId1: 109,
            userId2: 110,
            username1: 'julieta_ramos',
            username2: 'santiago_rios'
          }
        ];
      }
    })
  }
}
