import { Routes } from '@angular/router';
import {ChatPage} from './features/Chat/chat-page/chat-page';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/Auth/authentication-routing/authentication-routing-module').then(m => m.AuthenticationRoutingModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./features/Main/main-routing/main-routing-module').then(m => m.MainRoutingModule),
  },
  {
    path: 'chat/:id',
    component: ChatPage
  }
];
