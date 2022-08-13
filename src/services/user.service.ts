import bcrypt from "bcrypt";
import {
  PasswordIsNotValid,
  PasswordIsWrong,
  UserAlreadyExists,
  UsernameIsNotValid,
  UserNotFound,
} from "@core/error";
import { PrismaClient } from "@prisma/client";

const USERNAME_REGEX =
  /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;

const prisma = new PrismaClient();

/**
 * create user from username and password
 */
export const createUser = async (username?: string, password?: string) => {
  // check valid username
  if (!username || !USERNAME_REGEX.test(username)) {
    throw UsernameIsNotValid;
  }

  // check vaid password
  if (!password || !PASSWORD_REGEX.test(password)) {
    throw PasswordIsNotValid;
  }

  // check exist user
  const existUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (existUser) {
    throw UserAlreadyExists;
  }

  // hash password
  const encodePassword = bcrypt.hashSync(password, 12);
  return await prisma.user.create({
    data: {
      username: username,
      password: encodePassword,
    },
  });
};

/**
 * Check valid user by username and password
 *
 * @param username : username
 * @param password : password
 * @returns user
 */
export const getUserByUsernameAndPassword = async (
  username?: string,
  password?: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw UserNotFound;
  }

  if (password && bcrypt.compareSync(password, user.password)) {
    return user;
  } else {
    throw PasswordIsWrong;
  }
};

export const getUserById = (userId: number) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getUserByLoginSessionId = (loginSessionId: string) => {
  return prisma.loginSession
    .findUnique({
      where: {
        id: loginSessionId,
      },
    })
    .user();
};
