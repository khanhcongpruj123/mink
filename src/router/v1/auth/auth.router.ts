import CreateUserCommand from '@service/user/createuser.command';
import * as userService from '@service/user/user.service';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.post("/auth/sign-up", async (request: Request, response: Response, next: NextFunction) => {
    const createUserCommand : CreateUserCommand = {
        username: request.body.username,
        password: request.body.password
    };
    try {
        const user = await userService.createUser(createUserCommand);
    } catch (error) {
        next(error);
    }
    response.status(204);
});

export default router;
