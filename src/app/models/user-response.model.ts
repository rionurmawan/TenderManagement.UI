import { User } from './user.model';

export interface UserResponse {
  isAuthSuccessful: boolean,
  userDTO: User
}
