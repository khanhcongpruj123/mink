/**
 * This is example for v1 router
 */
import { Router } from "express";
import authMiddleware from "@middlewares/auth.middleware";
import AuthRouter from "@routes/v1/auth.router";
import UserRouter from "@routes/v1/user.router";

const router = Router();

router.use(AuthRouter);
router.use(authMiddleware.authenticate("jwt", { session: false }), UserRouter);

export default router;
