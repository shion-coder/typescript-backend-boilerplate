export interface Validator<T> {
  errors: T;
  isValid: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginError {
  email?: string;
  password?: string;
}

export interface RegisterData {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterError {
  firstName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
