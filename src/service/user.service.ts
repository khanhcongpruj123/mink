import bcrypt from 'bcrypt';
import { PasswordIsNotValid, UserAlreadyExists, UsernameIsNotValid } from "../error";
import { PrismaClient } from '@prisma/client';

const USERNAME_REGEX = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
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
            username: username
        }
    });
    if (existUser) {
        throw UserAlreadyExists;
    }


    // hash password
    const encodePassword = bcrypt.hashSync(password, 12);
    return await prisma.user.create({
        data: {
            username: username,
            password: encodePassword
        }
    });
};