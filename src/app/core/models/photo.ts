import {Pet} from './pet';

export interface Photo {
  id: number,
  url: string,
  createdAt: string,
  updatedAt: string,
  associatedPet?: Pet
}

export interface AddPhoto {
  files: File[],
  petId: number
}
