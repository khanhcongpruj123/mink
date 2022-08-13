/**
 * This is example for v1 router 
 */
import { Router } from 'express';
import authMiddleware from '../../middleware/auth.middleware';
import AuthRouter from "./auth/auth.router";
import UserRouter from './user/user.router';

const router = Router();

router.use(AuthRouter);
router.use(authMiddleware.authenticate('jwt', { session: false }), UserRouter);

export default router;