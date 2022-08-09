/**
 * This is example for v1 router 
 */
import { Request, Response, Router } from 'express';
import HomeRouter from "./home/home.router";

const router = Router();

router.use(HomeRouter);

export default router;