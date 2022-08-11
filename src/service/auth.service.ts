import * as userService from './user.service';
import * as userProfileService from "./userprofile.service";

export const signUp = async (username?: string, password?: string) => {
    // create user
    const user = await userService.createUser(username, password);
    // create user profile
    const userProfile = await userProfileService.createDefaultUserProfile(user.id);
};
