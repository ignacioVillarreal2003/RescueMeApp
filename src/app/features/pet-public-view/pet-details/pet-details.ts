import {Component, Input} from '@angular/core';
import {Pet} from '../../../core/models/pet';

@Component({
  selector: 'app-pet-details',
  imports: [],
  templateUrl: './pet-details.html',
  styleUrl: './pet-details.css'
})
export class PetDetails {
  @Input() pet: Pet | undefined;
}

