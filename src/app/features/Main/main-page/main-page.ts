import { Component } from '@angular/core';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';
import {MainSidebar} from '../main-sidebar/main-sidebar';

@Component({
  selector: 'app-Main-page',
  imports: [
    Header,
    RouterOutlet,
    MainSidebar
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {

}
