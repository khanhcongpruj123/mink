import * as userProfileService from '@service/userprofile.service';
import { NextFunction, Request, Response, Router } from 'express';
import { BasicRouter } from '@core/router';

const router = Router();

router.get("/user/profile", BasicRouter( async (request: Request, response: Response, next: NextFunction) => {
    const userProfile = await userProfileService.getByUserId(request.user!!.id);
    response.json({
        id: request.user?.id,
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName
    });
}));

export default router;