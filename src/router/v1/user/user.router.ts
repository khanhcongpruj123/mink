import * as userProfileService from '../../../service/userprofile.service';
import { NextFunction, Request, Response, Router } from 'express';
import authMiddleware from '../../../middleware/auth.middleware';

const router = Router();

router.get("/user/profile", authMiddleware.authenticate('jwt', { session: false }), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userProfile = await userProfileService.getByUserId(request.user!!.id);
        response.json({
            id: request.user?.id,
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName
        });
    } catch (error) {
        next(error);
    }
});

export default router;