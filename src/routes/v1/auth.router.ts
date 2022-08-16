import * as authService from "@services/auth.service";
import { NextFunction, Request, Response, Router } from "express";
import { createAccessToken, createRefreshToken } from "@libs/jwt";
import { AuthRouter, BasicRouter } from "@core/router";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "@interfaces/auth.interface";
import validatorMiddleware from "@/middlewares/validator.middleware";
import { RegisterRequest } from "@/dtos/request/register.request";

const router = Router();

router.post(
  "/auth/register",
  validatorMiddleware(RegisterRequest),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await authService.register(request.body.username, request.body.password);
      response.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/auth/login",
  BasicRouter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (request: Request, response: Response, next: NextFunction) => {
      const loginSession = await authService.login(
        request.body.username,
        request.body.password
      );
      const accessToken = createAccessToken(loginSession.id);
      const refreshToken = createRefreshToken(loginSession.id);
      response.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  )
);

router.post(
  "/auth/logout",
  AuthRouter(
    async (
      request: RequestWithUser,
      response: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => {
      await authService.loggout(request.user.loginSessionId);
      response.sendStatus(StatusCodes.NO_CONTENT);
    }
  )
);

export default router;
