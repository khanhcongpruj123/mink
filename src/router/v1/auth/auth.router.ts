import * as userService from '../../../service/user.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.post("/auth/sign-up", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(request.body.username, request.body.password);
    } catch (error) {
        next(error);
    }
    response.status(204);
});

export default router;
