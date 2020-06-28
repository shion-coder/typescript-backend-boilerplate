import { Router } from 'express';

import { verifyToken } from 'src/middlewares/auth';
import { register, login, me } from 'src/controllers/auth';

/* -------------------------------------------------------------------------- */

export const authRouter = Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Register user & Return JWT Token
 * @access  Public
 */
authRouter.post('/register', register);

/**
 * @route   POST /api/v1/users/login
 * @desc    Login & Return JWT Token
 * @access  Public
 */
authRouter.post('/login', login);

/**
 * @route   Get /api/v1/users/me
 * @desc    Verify token & return user data
 * @access  Private
 */
authRouter.get('/me', verifyToken, me);
