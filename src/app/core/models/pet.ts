import {User} from './user';
import {Photo} from './photo';
import {Petition} from './petition';

export interface Pet {
  id: number,
  name: string,
  description: string,
  sex: Sex,
  species: string,
  age: number,
  size: Size,
  state: State,
  breed: string,
  color: string,
  vaccinated: boolean,
  castrated: boolean,
  dewormed: boolean,
  medicalNotes: string,
  createdAt: string,
  updatedAt: string,
  ownerUser: User,
  petPhotos: Photo[],
  receivedPetitions: Petition[]
}

export interface AddPet {
  name: string,
  description: string,
  sex: Sex,
  species: Species,
  age: number,
  size: Size,
  files: File[]
}

export interface UpdatePet {
  name?: string,
  description?: string,
  sex?: Sex,
  species?: Species,
  age?: number,
  size?: Size,
  breed?: string,
  color?: string,
  vaccinated?: boolean,
  castrated?: boolean,
  dewormed?: boolean,
  medicalNotes?: string
}

export interface UpdatePetState {
  state: State
}

export enum Sex {
  MALE,
  FEMALE,
  UNKNOWN
}

export enum State {
  AVAILABLE,
  ADOPTED,
  IN_TREATMENT,
  LOST
}

export enum Species {
  DOG,
  CAT,
  RABBIT,
  BIRD,
  HAMSTER,
  TURTLE,
  FISH,
  LIZARD,
  HORSE,
  PIG,
  GOAT,
  CHICKEN,
  DUCK,
  FROG,
  OTHER
}

export enum Size {
  TOY,
  SMALL,
  MEDIUM,
  LARGE,
  GIANT,
  UNKNOWN
}
