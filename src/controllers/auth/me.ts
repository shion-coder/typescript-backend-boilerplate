import { Response } from 'express';

import { User } from 'src/model';

import { AuthRequest } from 'src/types';

/* -------------------------------------------------------------------------- */

export const me = async (req: AuthRequest, res: Response): Promise<Response> => {
  if (!req.decodeData) {
    return res.status(401).json({ error: 'Something went wrong with token' });
  }

  try {
    const user = await User.findById(req.decodeData.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: `No user found for ID ${req.decodeData.id}` });
    }

    return res.json({ user });
  } catch {
    return res.status(500).json({ error: 'Error finding user' });
  }
};
