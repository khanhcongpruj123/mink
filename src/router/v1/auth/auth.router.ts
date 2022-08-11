import * as authService from '../../../service/auth.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.post("/auth/sign-up", async (request: Request, response: Response, next: NextFunction) => {
    try {
        await authService.signUp(request.body.username, request.body.password);
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

export default router;
