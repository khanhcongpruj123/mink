import * as userProfileService from "@service/userprofile.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@/interface/auth.interface";

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
