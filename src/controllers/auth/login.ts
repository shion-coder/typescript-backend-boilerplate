import { Request, Response } from 'express';

import { User } from 'src/model';

import { asyncHandler } from 'src/middlewares';
import { validateLogin } from 'src/validation';
import { LoginData } from 'src/types';

/* -------------------------------------------------------------------------- */

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    /**
     * Validate input
     */

    const { email = '', password = '' }: LoginData = req.body;
    const { errors, isValid } = await validateLogin({ email, password });

    if (!isValid) {
      return res.json({ errors });
    }

    /**
     * Get user & return token
     */

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: `No user found for email ${email}` });
    }

    return res.json({ token: user.getToken() });
  },
);
