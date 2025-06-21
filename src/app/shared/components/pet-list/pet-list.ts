import {Component, Input} from '@angular/core';
import {Pet} from '../../../core/models/pet';
import {PetItem} from '../pet-item/pet-item';

@Component({
  selector: 'app-pet-list',
  imports: [
    PetItem
  ],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css'
})
export class PetList {
  @Input() pets: Pet[] = [];
  @Input() path: string | undefined;
}
