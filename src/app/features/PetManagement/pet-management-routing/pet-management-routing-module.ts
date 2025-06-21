import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pet-management-page/pet-management-page').then(m => m.PetManagementPage),
    children: [
      { path: '', redirectTo: 'pet-profile-manager', pathMatch: 'full' },
      {
        path: 'pet-profile-manager',
        loadComponent: () => import('../pet-profile-manager/pet-profile-manager').then(m => m.PetProfileManager),
      },
      {
        path: 'pet-images-manager',
        loadComponent: () => import('../pet-images-manager/pet-images-manager').then(m => m.PetImagesManager),
      },
      {
        path: 'adoption-request-manager',
        loadComponent: () => import('../adoption-request-manager/adoption-request-manager').then(m => m.AdoptionRequestManager),
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
export class PetManagementRoutingModule { }
