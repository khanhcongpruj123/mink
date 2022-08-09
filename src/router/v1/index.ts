/**
 * This is example for v1 router 
 */
import { Router } from 'express';
import AuthRouter from "@router/v1/auth/auth.router";
import bodyParser from "body-parser";

const router = Router();

router.use(bodyParser.json());
router.use(AuthRouter);

export default router;