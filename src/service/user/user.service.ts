import CreateUserCommand from "./createuser.command";
import bcrypt from 'bcrypt';
import * as userRepository from '@repository/user.repository.ts';

const createUser = async (command: CreateUserCommand) => {
    const encodePassword = await bcrypt.genSalt(12);
};