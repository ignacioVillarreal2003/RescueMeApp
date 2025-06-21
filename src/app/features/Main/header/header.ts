import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    SectionGlass,
    MatIcon
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
