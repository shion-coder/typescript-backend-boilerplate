import validator from 'validator';
import isEmpty from 'is-empty';

import { User } from 'src/model';

import { Validator, RegisterData, RegisterError, IUserModel } from 'src/types';

/* -------------------------------------------------------------------------- */

export const validateRegister = async ({
  firstName,
  username,
  email,
  password,
  confirmPassword,
}: RegisterData): Promise<Validator<RegisterError>> => {
  const errors = {} as RegisterError;

  let existingUsername: IUserModel | null = null;
  let existingEmail: IUserModel | null = null;

  /**
   * Find existing username & email
   */

  if (!validator.isEmpty(username)) {
    try {
      existingUsername = await User.findOne({ username });
    } catch {
      throw new Error('Error finding username');
    }
  }

  if (!validator.isEmpty(email) && validator.isEmail(email)) {
    try {
      existingEmail = await User.findOne({ email });
    } catch {
      throw new Error('Error finding user email');
    }
  }

  /**
   * First name validation
   */

  validator.isEmpty(firstName) ? (errors.firstName = 'First name is required') : null;

  /**
   * Username validation
   */

  validator.isEmpty(username)
    ? (errors.username = 'Username is required')
    : existingUsername
    ? (errors.username = 'This username is already taken')
    : null;

  /**
   * Email validation
   */

  validator.isEmpty(email)
    ? (errors.email = 'Email is required')
    : !validator.isEmail(email)
    ? (errors.email = 'Invalid email format')
    : existingEmail
    ? (errors.email = 'This email is already taken')
    : null;

  /**
   * Password validation
   */

  validator.isEmpty(password)
    ? (errors.password = 'Password is required')
    : !validator.isLength(password, { min: 6, max: 12 })
    ? (errors.password = 'Password must be between 6 and 12 characters')
    : null;

  /**
   * Confirm password validation
   */

  validator.isEmpty(confirmPassword)
    ? (errors.confirmPassword = 'Confirm password is required')
    : !validator.equals(password, confirmPassword)
    ? (errors.confirmPassword = 'Password and confirm password do not match')
    : null;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
