import {Pet} from './pet';
import {Petition} from './petition';
import {Message} from './message';

export interface User {
  id: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  createdAt: string,
  updatedAt: string,
  background?: string,
  theme?: string,
  sentMessages: Message[],
  receivedMessages: Message[],
  ownedPets: Pet[],
  sentPetitions: Petition[]
}

export interface RegisterUser {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string,
  address: string
}

export interface LoginUser {
  email: string,
  password: string
}

export interface UpdateUser {
  email?: string,
  lastPassword?: string,
  newPassword?: string,
  firstName?: string,
  lastName?: string,
  phone?: string,
  address?: string,
  background?: string,
  theme?: string,
}
