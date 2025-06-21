import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PetPublicViewPage} from '../../pet-public-view/pet-public-view-page/pet-public-view-page';
import {ChatPage} from '../../chat/chat-page/chat-page';
import {ProfilePublicPage} from '../../profile-public/profile-public-page/profile-public-page';
import {PetitionsPage} from '../../petitions/petitions-page/petitions-page';
import {PetListManagerPage} from '../../PetListManager/pet-list-manager-page/pet-list-manager-page';
import {ProfileManagementPage} from '../../ProfileManagement/profile-management-page/profile-management-page';
import {PetsDashboardPage} from '../../PetsDashboard/pets-dashboard-page/pets-dashboard-page';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../main-page/main-page').then(m => m.MainPage),
    children: [
      { path: '', redirectTo: 'pets-dashboard', pathMatch: 'full' },
      {
        path: 'pet-public-view/:id',
        component: PetPublicViewPage
      },
      {
        path: 'chat/:id',
        component: ChatPage
      },
      {
        path: 'profile-public',
        component: ProfilePublicPage
      },
      {
        path: 'petitions',
        component: PetitionsPage
      },
      {
        path: 'pets-dashboard',
        component: PetsDashboardPage
      },
      {
        path: 'profile-management',
        component: ProfileManagementPage
      },
      {
        path: 'pet-list-manager',
        component: PetListManagerPage
      },
      {
        path: 'pet-management/:id',
        loadChildren: () => import('../../PetManagement/pet-management-routing/pet-management-routing-module').then(m => m.PetManagementRoutingModule),
      }
    ]
  }
]

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
export class MainRoutingModule { }
