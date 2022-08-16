import * as userProfileService from "@services/userprofile.service";
import * as userService from "@services/user.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@interfaces/auth.interface";
import { Express } from "express";
import _ from "lodash";
// import * as uploadcareService from "@services/uploadcare.service";
import { v4 } from "uuid";

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

      // update avatar
      const avatar = _.find(
        request.files,
        (f: Express.Multer.File) => f.fieldname === "avatar"
      ) as Express.Multer.File;
      if (avatar) {
        // await uploadcareService.upload(
        //   avatar.buffer,
        //   `/userprofile/${v4()}.jpg`
        // );
      }
      await userProfileService.update(userProfile);
      response.json({
        id: request.user?.id,
        userProfile: {
          id: userProfile.id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
        },
      });
    }
  )
);

export default router;
