import { Schema, Model, HookNextFunction, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { IUser, TokenPayload } from 'src/types';
import { JWT_SECRET, JWT_EXPIRE } from 'src/config';

/* -------------------------------------------------------------------------- */

/**
 * User schema
 */

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be atleast minimum of 6 characters'],
    maxlength: [12, 'Password should be maximum of 12 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Hass pasword before save user
 */

userSchema.pre<IUser>('save', async function (next: HookNextFunction): Promise<void> {
  if (this.password && this.isModified('password')) {
    try {
      const salt = await genSalt(10);

      this.password = await hash(this.password, salt);
    } catch {
      throw new Error('Error hashing user password');
    }
  }

  next();
});

/**
 * Compare passsword
 */

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    const isMatch: boolean = await compare(password, this.password);

    return isMatch;
  } catch {
    throw new Error('Error comparing password');
  }
};

/**
 * Get token
 */

userSchema.methods.getToken = function (): string {
  const payload: TokenPayload = {
    id: this.id,
    email: this.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

/**
 * Get fullname
 */

userSchema.virtual('fullName').get(function (this: IUser): string {
  if (!this.lastName) {
    return this.firstName;
  }

  return `${this.firstName} ${this.lastName}`;
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
