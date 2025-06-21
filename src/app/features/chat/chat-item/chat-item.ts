import {Component, Input} from '@angular/core';
import {Petition} from '../../../core/models/petition';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-chat-item',
  imports: [
    NgIf
  ],
  templateUrl: './chat-item.html',
  styleUrl: './chat-item.css'
})
export class ChatItem {
  @Input() petition: Petition | undefined = undefined;
  @Input() activeChatId: number | undefined = undefined;
  @Input() me: number | undefined = undefined;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    if (this.activeChatId != undefined && this.petition != undefined) {
      setTimeout(() => {
        const selectedButton: HTMLElement | null = document.querySelector(`#chat-item-${this.petition!.id}`);
        if (selectedButton) {
          if (this.petition!.id == this.activeChatId) {
            selectedButton.classList.add('active');
          } else {
            selectedButton.classList.remove('active');
          }
        }
      });
    }
  }

  getInitials(): string {
    let first = '';
    let last = '';
    if (this.me && this.petition && this.me == this.petition.requestingUser.id) {
      first = this.petition.requestedPet.ownerUser.firstName?.charAt(0) || '';
      last = this.petition.requestedPet.ownerUser.lastName?.charAt(0) || '';
    } else if (this.me && this.petition && this.me == this.petition.requestedPet.ownerUser.id) {
      first = this.petition.requestingUser.firstName?.charAt(0) || '';
      last = this.petition.requestingUser.lastName?.charAt(0) || '';
    }
    return `${first}${last}`.toUpperCase();
  }

  openChat(): void {
    if (this.petition != undefined) {
      const selectedButtons: NodeListOf<HTMLElement> = document.querySelectorAll(`.chat-item`) as NodeListOf<HTMLElement>;
      selectedButtons.forEach((button: HTMLElement) => {
        button.classList.remove('active');
      });
      const selectedButton: HTMLElement = document.querySelector(`#chat-item-${this.petition.id}`) as HTMLElement;
      selectedButton.classList.add('active');
      this.router.navigate([`/chat/${this.petition.id}`]);
    }
  }
}
