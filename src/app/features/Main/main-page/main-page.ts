import { Component } from '@angular/core';
import {Header} from '../header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-Main-page',
  imports: [
    Header,
    RouterOutlet
  ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css'
})
export class MainPage {

}
