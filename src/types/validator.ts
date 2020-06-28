import { IUserModel } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface Validator<T> {
  errors: T;
  isValid: boolean;
}

export interface LoginData {
  email: IUserModel['email'];
  password: IUserModel['password'];
}

export interface LoginError {
  email?: IUserModel['email'];
  password?: IUserModel['password'];
}

export interface RegisterData {
  firstName: IUserModel['firstName'];
  lastName?: IUserModel['lastName'];
  username: IUserModel['username'];
  email: IUserModel['email'];
  password: IUserModel['password'];
  confirmPassword: IUserModel['password'];
}

export interface RegisterError {
  firstName?: IUserModel['firstName'];
  username?: IUserModel['username'];
  email?: IUserModel['email'];
  password?: IUserModel['password'];
  confirmPassword?: IUserModel['password'];
}
