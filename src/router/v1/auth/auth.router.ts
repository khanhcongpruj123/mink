import * as authService from '@service/auth.service';
import { NextFunction, Request, Response, Router } from 'express';
import { createAccessToken, createRefreshToken } from '@lib/jwt';
import { AuthRouter, BasicRouter } from '@core/router';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        await authService.register(request.body.username, request.body.password);
        response.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
        next(error);
    }
});

router.post("/auth/login", BasicRouter( async (request: Request, response: Response, next: NextFunction) => {
    const loginSession = await authService.login(request.body.username, request.body.password);
    const accessToken = createAccessToken(loginSession.id);
    const refreshToken = createRefreshToken(loginSession.id);
    response.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}));

router.post("/auth/logout", AuthRouter( async (request: Request, response: Response, next: NextFunction) => {
    await authService.loggout(request.user!!.loginSessionId);
    response.sendStatus(StatusCodes.NO_CONTENT);
}));

export default router;
