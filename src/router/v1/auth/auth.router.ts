import * as authService from '../../../service/auth.service';
import { NextFunction, Request, Response, Router } from 'express';
import { createAccessToken, createRefreshToken } from '../../../lib/jwt.utils';

const router = Router();

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        await authService.register(request.body.username, request.body.password);
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const loginSession = await authService.login(request.body.username, request.body.password);
        const accessToken = createAccessToken(loginSession.id);
        const refreshToken = createRefreshToken(loginSession.id);
        response.json({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        next(error);
    }
});

router.post("/auth/loggout", (request: Request, response: Response, next: NextFunction) => {
    authService.loggout(request.user!!.id)
});

export default router;
