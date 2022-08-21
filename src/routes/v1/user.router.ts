import * as userProfileService from "@services/userprofile.service";
import * as userService from "@services/user.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@interfaces/auth.interface";
import { Express } from "express";
import _ from "lodash";
import { v4 } from "uuid";
import { uploadImage } from "@/services/image.service";

const IMAGE_SERVER_HOST = process.env.IMAGE_SERVER_HOST || "localhost";
const IMAGE_SERVER_PORT = process.env.IMAGE_SERVER_PORT || 8080;

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
          avatar: `http://${IMAGE_SERVER_HOST}:${IMAGE_SERVER_PORT}/${user.userProfile.avatar}`,
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
        // TODO upload avatar save save url
        const uploadRes = await uploadImage(avatar.buffer, avatar.originalname);
        userProfile.avatar = uploadRes.data.fileName;
      }
      await userProfileService.update(userProfile);
      response.json({
        id: request.user?.id,
        userProfile: {
          id: userProfile.id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          avatar: `http://${IMAGE_SERVER_HOST}:${IMAGE_SERVER_PORT}/${userProfile.avatar}`,
        },
      });
    }
  )
);

export default router;
