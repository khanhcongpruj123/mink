import * as userProfileService from "@services/userprofile.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@interfaces/auth.interface";

const router = Router();

router.get(
  "/user/profile",
  BasicRouter(
    async (
      request: RequestWithUser,
      response: Response,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next: NextFunction
    ) => {
      const userProfile = await userProfileService.getByUserId(request.user.id);
      response.json({
        id: request.user?.id,
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
      });
    }
  )
);

export default router;
