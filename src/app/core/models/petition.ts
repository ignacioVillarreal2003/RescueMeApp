import {Pet} from './pet';
import {User} from './user';

export interface Petition {
  id: number,
  status: Status,
  message: string,
  createdAt: string,
  updatedAt: string,
  requestingUser: User,
  requestedPet: Pet
}

export interface AddPetition {
  petId: number,
  message: string
}

export interface UpdatePetitionDetails {
  message: string
}

export interface UpdatePetitionStatus {
  status: Status
}

export enum Status {
  PENDING, APPROVED, DECLINED
}

export const StatusValues: string[] = ['PENDING', 'APPROVED', 'DECLINED'];
