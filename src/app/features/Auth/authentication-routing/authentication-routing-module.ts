import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../authentication-page/authentication-page').then(m => m.AuthenticationPage),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('../login-form/login-form').then(m => m.LoginForm),
      },
      {
        path: 'register',
        loadComponent: () => import('../register-form/register-form').then(m => m.RegisterForm),
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
