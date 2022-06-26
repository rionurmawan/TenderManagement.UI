import { User } from './user.model';

export interface Tender {
  id: string,
  name: string,
  referenceNumber: string,
  releaseDate: string,
  closingDate: string,
  description: string,
  userId: string,
  user: User
}
