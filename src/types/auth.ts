import { Request } from 'express';

import { IUser } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface TokenPayload {
  id: IUser['id'];
  email: IUser['email'];
}

export interface AuthRequest extends Request {
  decodeData?: TokenPayload;
}
