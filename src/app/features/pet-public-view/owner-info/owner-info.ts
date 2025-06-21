import {Component, Input} from '@angular/core';
import {User} from '../../../core/models/user';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-owner-info',
  imports: [
    SectionGlass,
    MatIcon
  ],
  templateUrl: './owner-info.html',
  styleUrl: './owner-info.css'
})
export class OwnerInfo {
  @Input() ownerUser: User | undefined;
}
