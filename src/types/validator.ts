import { IUser } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface Validator<T> {
  errors: T;
  isValid: boolean;
}

export interface LoginData {
  email: IUser['email'];
  password: IUser['password'];
}

export interface LoginError {
  email?: IUser['email'];
  password?: IUser['password'];
}

export interface RegisterData {
  firstName: IUser['firstName'];
  lastName?: IUser['lastName'];
  username: IUser['username'];
  email: IUser['email'];
  password: IUser['password'];
  confirmPassword: IUser['password'];
}

export interface RegisterError {
  firstName?: IUser['firstName'];
  username?: IUser['username'];
  email?: IUser['email'];
  password?: IUser['password'];
  confirmPassword?: IUser['password'];
}
