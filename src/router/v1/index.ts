/**
 * This is example for v1 router 
 */
import { Router } from 'express';
import AuthRouter from "@router/v1/auth/auth.router";

const router = Router();

router.use(AuthRouter);

export default router;