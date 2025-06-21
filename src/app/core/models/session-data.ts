import {User} from './user';

export interface SessionData {
  token: string,
  refreshToken: string,
  user: User
}
