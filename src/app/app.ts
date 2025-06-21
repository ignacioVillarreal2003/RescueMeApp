import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'RescueMeApp';
}
