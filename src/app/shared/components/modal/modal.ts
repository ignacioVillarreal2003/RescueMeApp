import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconBtn} from '../buttons/icon-btn/icon-btn';

@Component({
  selector: 'app-modal',
  imports: [
    IconBtn
  ],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() title: string = 'Title';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }
}
