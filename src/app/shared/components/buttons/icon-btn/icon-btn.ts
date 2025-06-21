import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-icon-btn',
  imports: [
    NgClass,
    NgStyle,
    MatIcon
  ],
  templateUrl: './icon-btn.html',
  styleUrl: './icon-btn.css'
})
export class IconBtn {
  @Input() background: 'transparent' | 'red' = 'transparent';
  @Input() rounded: '--radius-sm' | '--radius-md' | '--radius-circle' = '--radius-sm';
  @Input() icon: string = 'home';
}
