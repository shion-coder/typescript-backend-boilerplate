import { Request, Response } from 'express';

import { User } from 'src/model';

import { validateLogin } from 'src/validation';
import { LoginData } from 'src/types';

/* -------------------------------------------------------------------------- */

export const login = async (req: Request, res: Response): Promise<Response> => {
  /**
   * Validate input
   */

  const { email = '', password = '' }: LoginData = req.body;

  try {
    const { errors, isValid } = await validateLogin({ email, password });

    if (!isValid) {
      return res.json({ errors });
    }
  } catch {
    return res.status(500).json({ error: 'Error validating login' });
  }

  /**
   * Get user & return token
   */

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: `No user found for email ${email}` });
    }

    return res.json({ token: user.getToken() });
  } catch {
    return res.status(500).json({ error: 'Error finding user' });
  }
};
