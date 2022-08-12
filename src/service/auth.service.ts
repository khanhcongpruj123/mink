import * as userService from './user.service';
import * as userProfileService from "./userprofile.service";
import * as loginSessionService from './loginsession.service';

export const register = async (username?: string, password?: string) => {
    // create user
    const user = await userService.createUser(username, password);
    // create user profile
    const userProfile = await userProfileService.createDefaultUserProfile(user.id);
};

export const login = (username?: string, password?: string) => {
    return userService.getUserByUsernameAndPassword(username, password)
        .then(user => {
            return loginSessionService.create(user);
        });
};

export const loggout = (loginSessionId: string) => {
    return loginSessionService.deleteById(loginSessionId);
};
