import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-main-sidebar',
  imports: [
    RouterLink,
    MatIcon,
    RouterLinkActive,
  ],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css'
})
export class MainSidebar {
  expanded: boolean = false;
}
