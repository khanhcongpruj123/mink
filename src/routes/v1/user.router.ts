import * as userProfileService from "@services/userprofile.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@interfaces/auth.interface";
import HttpStatusCode from "http-status-codes";

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

router.patch(
  "/user/profile",
  BasicRouter(
    async (
      request: RequestWithUser,
      response: Response,
      next: NextFunction
    ) => {
      const userProfile = await userProfileService.getByUserId(request.user.id);
      if (request.body.firstName) {
        userProfile.firstName = request.body.firstName;
      }
      if (request.body.lastName) {
        userProfile.lastName = request.body.lastName;
      }
      await userProfileService.update(userProfile);
      response.json({
        id: request.user?.id,
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
      });
    }
  )
);

export default router;
