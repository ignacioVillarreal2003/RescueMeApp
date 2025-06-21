import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SectionGlass} from '../../../shared/components/section-glass/section-glass';

@Component({
  selector: 'app-authentication-page',
  imports: [
    RouterOutlet,
    SectionGlass
  ],
  templateUrl: './authentication-page.html',
  styleUrl: './authentication-page.css'
})
export class AuthenticationPage {

}
