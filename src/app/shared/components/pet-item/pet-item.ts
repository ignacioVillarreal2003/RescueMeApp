import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Pet} from '../../../core/models/pet';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-pet-item',
    imports: [
        MatIcon,
        NgOptimizedImage
    ],
  templateUrl: './pet-item.html',
  styleUrl: './pet-item.css'
})
export class PetItem {
  @Input() pet: Pet | undefined;
  @Input() path: string | undefined;

  constructor(private router: Router) {
  }

  open(): void {
    if (this.pet) {
      this.router.navigate([`${this.path}${this.pet.id}`]);
    }
  }
}
