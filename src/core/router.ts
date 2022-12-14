import { AuthenticationError } from "@core/error";
import { NextFunction, Request, Response, Router } from "express";
import authMiddleware from "@middlewares/auth.middleware";

export type RouterHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const AuthRouter = (handler: RouterHandler) => {
  const router = Router({ mergeParams: true });
  router.use(
    authMiddleware.authenticate("jwt", { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        next(AuthenticationError);
      } else {
        handler(req, res, next).catch((err) => next(err));
      }
    }
  );
  return router;
};

export const BasicRouter = (handler: RouterHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch((err) => next(err));
  };
};
