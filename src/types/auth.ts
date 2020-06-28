import { Request } from 'express';

/* -------------------------------------------------------------------------- */

export interface TokenPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends Request {
  decodeData?: TokenPayload;
}
