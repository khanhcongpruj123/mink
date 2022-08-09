import CreateUserCommand from '@service/user/createuser.command';
import * as userService from '@service/user/user.service';
import { Request, Response, Router } from 'express';

const router = Router();

router.post("/auth/sign-up", async (request: Request, response: Response) => {
    const createUserCommand : CreateUserCommand = {
        username: request.body.username,
        password: request.body.password
    };
    const user = await userService.createUser(createUserCommand);
});

export default router;
