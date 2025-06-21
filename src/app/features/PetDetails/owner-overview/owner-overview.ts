import {Component, Input} from '@angular/core';
import {SectionGlass} from "../../../shared/components/section-glass/section-glass";
import {User} from '../../../core/models/user';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-owner-overview',
    imports: [
        MatIcon,
        SectionGlass
    ],
  templateUrl: './owner-overview.html',
  styleUrl: './owner-overview.css'
})
export class OwnerOverview {
  @Input() ownerUser: User | undefined;
}
