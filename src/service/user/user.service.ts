import CreateUserCommand from "./createuser.command";
import bcrypt from 'bcrypt';
import * as userRepository from '@repository/user.repository';
import { PasswordIsNotValid, UserAlreadyExists, UsernameIsNotValid } from "../../error";

const USERNAME_REGEX = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/g;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;

/**
 * create user from username and password
 */
export const createUser = async (command: CreateUserCommand) => {
    // check exist user
    const existUser = await userRepository.findByUsername(command.username);
    if (existUser) {
        throw UserAlreadyExists;
    }
    // check valid username
    if (!USERNAME_REGEX.test(command.username)) {
        throw UsernameIsNotValid;
    }

    // check vaid password
    if (!PASSWORD_REGEX.test(command.password)) {
        throw PasswordIsNotValid;
    }

    // hash password
    const encodePassword = bcrypt.hashSync(command.password, 12);
    return await userRepository.save({
        username: command.username,
        password: encodePassword
    });
};