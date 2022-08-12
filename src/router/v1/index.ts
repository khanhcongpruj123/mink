/**
 * This is example for v1 router 
 */
import { Router } from 'express';
import AuthRouter from "./auth/auth.router";
import UserRouter from './user/user.router';

const router = Router();

router.use(AuthRouter);
router.use(UserRouter);

export default router;