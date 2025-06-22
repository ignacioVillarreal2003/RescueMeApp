import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Chat} from '../../../core/models/chaat';
import {User} from '../../../core/models/user';

@Component({
  selector: 'app-chat-preview',
  imports: [],
  templateUrl: './chat-preview.html',
  styleUrl: './chat-preview.css'
})
export class ChatPreview {
  @Input() chat: Chat | undefined;
  @Input() chatId: number | undefined;
  @Input() user: User | undefined;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    if (this.chatId && this.chat) {
      setTimeout(() => {
        const selectedButton: HTMLElement | null = document.querySelector(`#chat-preview-${this.chat?.id}`);
        if (selectedButton) {
          if (this.chat?.id == this.chatId) {
            selectedButton.classList.add('active');
          } else {
            selectedButton.classList.remove('active');
          }
        }
      });
    }
  }

  openChat(): void {
    if (this.chat != undefined) {
      const selectedButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`.chat-preview`) as NodeListOf<HTMLElement>;
      selectedButtons.forEach((button: HTMLElement) => {
        button.classList.remove('active');
      });
      const selectedButton: HTMLElement = document.querySelector(`#chat-preview-${this.chat.id}`) as HTMLElement;
      selectedButton.classList.add('active');
      this.router.navigate([`/chat/${this.chat.id}`]);
    }
  }
}
