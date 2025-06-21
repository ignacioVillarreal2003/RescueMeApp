import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-section-glass',
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './section-glass.html',
  styleUrl: './section-glass.css'
})
export class SectionGlass {
  @Input() type: 'type-1' | 'type-2' | 'type-3' = 'type-1';
  @Input() rounded: '--radius-sm' | '--radius-md' | '--radius-lg' | '--radius-xl' | '--radius-circle' | '--radius-pill'  = '--radius-xl';
  @Input() padding: '--padding-xs' | '--padding-sm' | '--padding-md' | '--padding-lg' | '--padding-xl' = '--padding-lg';
}
