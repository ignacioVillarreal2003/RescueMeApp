import {Component, Input} from '@angular/core';
import {Chat} from '../../../core/models/chaat';
import {IconBtn} from '../../../shared/components/buttons/icon-btn/icon-btn';
import {MessageList} from '../message-list/message-list';
import {MessageInput} from '../message-input/message-input';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-chat-window',
  imports: [
    IconBtn,
    MessageList,
    MessageInput
  ],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css'
})
export class ChatWindow {
  chat: Chat | undefined;
  @Input() user: User | undefined;

  ngOnInit() {
    this.chat = {
      id: 1,
      referenceId: 'abc123',
      userId1: 101,
      userId2: 102,
      username1: 'ignacio_villarreal',
      username2: 'maria_gomez'
    }
    this.user = {
      id: 1,
      email: 'ignacio@example.com',
      password: 'hashed_password_123', // Idealmente hash
      firstName: 'Ignacio',
      lastName: 'Villarreal',
      phone: '+59891234567',
      address: 'Av. Italia 1234, Montevideo, Uruguay',
      createdAt: '2025-06-01T10:00:00Z',
      updatedAt: '2025-06-20T15:30:00Z',
      background: 'https://example.com/background.jpg',
      theme: 'dark',
      sentMessages: [],
      receivedMessages: [],
      ownedPets: [],
      sentPetitions: []
    };
  }
}
