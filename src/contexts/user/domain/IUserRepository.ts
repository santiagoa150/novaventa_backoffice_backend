import { Email } from './Email';
import { User } from './User';

export interface IUserRepository {
  searchByEmail (email: Email): Promise<User>;
}