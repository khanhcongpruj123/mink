import * as userService from './user.service';

export const signUp = async (username?: string, password?: string) => {
    const user = await userService.createUser(username, password);
};
