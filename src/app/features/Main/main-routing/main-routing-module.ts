import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PetListManagerPage} from '../../PetListManager/pet-list-manager-page/pet-list-manager-page';
import {ProfileManagementPage} from '../../ProfileManagement/profile-management-page/profile-management-page';
import {PetsDashboardPage} from '../../PetsDashboard/pets-dashboard-page/pets-dashboard-page';
import {PetDetailsPage} from '../../PetDetails/pet-details-page/pet-details-page';
import {AdoptionRequestsPage} from '../../AdoptionRequests/adoption-requests-page/adoption-requests-page';
import {UserPublicProfilePage} from '../../UserPublicProfile/user-public-profile-page/user-public-profile-page';
import {ChatPage} from '../../Chat/chat-page/chat-page';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../main-page/main-page').then(m => m.MainPage),
    children: [
      { path: '', redirectTo: 'pets-dashboard', pathMatch: 'full' },
      {
        path: 'chat/:id',
        component: ChatPage
      },
      {
        path: 'user-public-profile/:id',
        component: UserPublicProfilePage
      },
      {
        path: 'pets-dashboard',
        component: PetsDashboardPage
      },
      {
        path: 'pet-details/:id',
        component: PetDetailsPage
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
      },
      {
        path: 'adoption-requests',
        component: AdoptionRequestsPage
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
