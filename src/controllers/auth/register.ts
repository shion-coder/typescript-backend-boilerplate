import { Request, Response } from 'express';

import { User } from 'src/model';

import { asyncHandler } from 'src/middlewares';
import { validateRegister } from 'src/validation';
import { RegisterData } from 'src/types';

/* -------------------------------------------------------------------------- */

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
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

    const { errors, isValid } = await validateRegister({ firstName, username, email, password, confirmPassword });

    if (!isValid) {
      return res.json({ errors });
    }

    /**
     * Create new user & return token
     */

    const user = await User.create({ firstName, lastName, username, email, password });

    return res.json({ token: user.getToken() });
  },
);
