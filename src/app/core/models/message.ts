import {User} from './user';

export interface Message {
  id: number,
  content: string,
  createdAt: string,
  updatedAt: string,
  fromUser: User,
  toUser: User,
}

export interface AddMessage {
  content: string,
  toUserId: number,
  relatedPetitionId: number
}

export interface UpdateMessage {
  content: string
}

