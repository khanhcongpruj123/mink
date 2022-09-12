/**
 * This is example for v1 router
 */
import { Router } from "express";
import AuthRouter from "@routes/v1/auth.router";
import UserRouter from "@routes/v1/user.router";
import BookRouter from "@routes/v1/book.router";

const router = Router();

router.use(AuthRouter);
router.use("/users", UserRouter);
router.use("/books", BookRouter);

export default router;
