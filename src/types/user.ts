import { Document } from 'mongoose';

/* -------------------------------------------------------------------------- */

interface IUserSchema {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}

export interface IUser extends IUserSchema, Document {
  fullName?: string;
  comparePassword: (password: string) => Promise<boolean>;
  getToken: () => string;
}
