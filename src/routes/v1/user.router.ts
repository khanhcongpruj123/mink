import * as userProfileService from "@services/userprofile.service";
import * as userService from "@services/user.service";
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
      const user = await userService.getUserById(request.user.id);
      response.json({
        id: request.user?.id,
        userProfile: {
          id: user.userProfile.id,
          firstName: user.userProfile.firstName,
          lastName: user.userProfile.lastName,
        },
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
