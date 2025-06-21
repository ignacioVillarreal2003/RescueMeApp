import {Component, Input} from '@angular/core';
import {Pet} from '../../../core/models/pet';

@Component({
  selector: 'app-pet-overview',
  imports: [],
  templateUrl: './pet-overview.html',
  styleUrl: './pet-overview.css'
})
export class PetOverview {
  @Input() pet: Pet | undefined;
}
