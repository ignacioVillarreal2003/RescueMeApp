import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-text-btn',
  imports: [
    NgClass
  ],
  templateUrl: './text-btn.html',
  styleUrl: './text-btn.css'
})
export class TextBtn {
  @Input() text: string = 'Button';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
}
