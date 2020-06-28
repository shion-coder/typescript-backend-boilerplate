import { Document } from 'mongoose';

/* -------------------------------------------------------------------------- */

interface IUser {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getToken: () => string;
}
