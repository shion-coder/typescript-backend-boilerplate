import { Request, Response } from 'express';

import { User } from 'src/model';

import { validateRegister } from 'src/validation';
import { RegisterData } from 'src/types';

/* -------------------------------------------------------------------------- */

export const register = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input
   */

  const {
    firstName = '',
    lastName = '',
    username = '',
    email = '',
    password = '',
    confirmPassword = '',
  }: RegisterData = req.body;

  try {
    const { errors, isValid } = await validateRegister({ firstName, username, email, password, confirmPassword });

    if (!isValid) {
      return res.json({ errors });
    }
  } catch {
    return res.status(500).json({ error: 'Error validating register' });
  }

  /**
   * Create new user & return token
   */

  try {
    const user = await User.create({ firstName, lastName, username, email, password });

    return res.json({ token: user.getToken() });
  } catch {
    return res.status(500).json({ error: 'Error creating new user' });
  }
};
