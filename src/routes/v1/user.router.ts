import * as userProfileService from "@services/userprofile.service";
import * as userService from "@services/user.service";
import { NextFunction, Response, Router } from "express";
import { BasicRouter } from "@core/router";
import { RequestWithUser } from "@interfaces/auth.interface";
import express from "express";
import _ from "lodash";
import { getImageURL, uploadImage } from "@services/image.service";
import multer from "multer";
import { AvatarSizeIsTooLarge, CannotUpdateAvartar } from "@core/error";

const AVATAR_FIELD_NAME = "avatar";
const AVATAR_LIMIT_SIZE = 100 * 1000; // bytes

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
          avatar: getImageURL(user.userProfile.avatar),
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
      // find avatar file
      const avatar = _.find(
        request.files,
        (f: Express.Multer.File) => f.fieldname === AVATAR_FIELD_NAME
      ) as Express.Multer.File;

      if (avatar) {
        if (!checkAvatarSize(avatar)) {
          throw AvatarSizeIsTooLarge;
        }
        // upload to resource server
        const uploadRes = await uploadImage(avatar.buffer, avatar.originalname);
        if (uploadRes.data.fileName) {
          userProfile.avatar = uploadRes.data.fileName;
        } else {
          throw CannotUpdateAvartar;
        }
      }
      // up-to-date user profile
      await userProfileService.update(userProfile);
      response.json({
        id: request.user?.id,
        userProfile: {
          id: userProfile.id,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName,
          avatar: getImageURL(userProfile.avatar),
        },
      });
    }
  )
);

/**
 * Anti large image
 * @param avatar : user avatar
 */
const checkAvatarSize = (avatar: Express.Multer.File) => {
  return avatar.size <= AVATAR_LIMIT_SIZE;
};

export default router;
