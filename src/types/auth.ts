import { Request } from 'express';

import { IUserModel } from 'src/types';

/* -------------------------------------------------------------------------- */

export interface TokenPayload {
  id: IUserModel['id'];
  email: IUserModel['email'];
}

export interface AuthRequest extends Request {
  decodeData?: TokenPayload;
}
