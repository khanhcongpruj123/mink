import * as userService from "./user.service";
import * as userProfileService from "./userprofile.service";
import * as loginSessionService from "./loginsession.service";
import redisClient from "@cache/redis";
import { PrismaClient } from "@prisma/client";
import { UserIsLoggout } from "@core/error";
import { LoginSessionInfo } from "models/auth.model";

const prisma = new PrismaClient();

export const register = async (username?: string, password?: string) => {
  // create user
  const user = await userService.createUser(username, password);
  // create user profile
  await userProfileService.createDefaultUserProfile(user.id);
};

export const login = (username?: string, password?: string) => {
  return userService
    .getUserByUsernameAndPassword(username, password)
    .then((user) => {
      return loginSessionService.create(user);
    });
};

export const loggout = async (loginSessionId: string) => {
  await redisClient.del(`LOGIN_SESSION:${loginSessionId}`);
  await loginSessionService.deleteById(loginSessionId);
};

export const getLoginSessionInfoById = async (loginSessionId: string) => {
  const loginSessionInfoJson = await redisClient.get(
    `LOGIN_SESSION:${loginSessionId}`
  );
  if (loginSessionInfoJson) {
    return JSON.parse(loginSessionInfoJson) as LoginSessionInfo;
  } else {
    const loginSession = await prisma.loginSession.findUnique({
      where: {
        id: loginSessionId,
      },
    });
    const user = await prisma.loginSession
      .findUnique({
        where: {
          id: loginSessionId,
        },
      })
      .user();
    if (!loginSession) {
      throw UserIsLoggout;
    }
    if (!user) {
      throw UserIsLoggout;
    }
    const loginSessionInfo: LoginSessionInfo = {
      id: user.id,
      loginSessionId: loginSession.id,
      username: user?.username,
    };
    saveLoginSessionInfo(loginSessionInfo);
    return loginSessionInfo;
  }
};

export const saveLoginSessionInfo = (currentUser: LoginSessionInfo) => {
  return redisClient.set(
    `LOGIN_SESSION:${currentUser.loginSessionId}`,
    JSON.stringify(currentUser)
  );
};
