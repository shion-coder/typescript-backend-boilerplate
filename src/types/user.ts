import { Document } from 'mongoose';

/* -------------------------------------------------------------------------- */

interface IUserSchema {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUserSchema, Document {
  comparePassword: (password: string) => Promise<boolean>;
  getToken: () => string;
  fullName?: string;
}
