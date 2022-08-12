import { NextFunction, Request, Response } from "express";
import { ACCESS_TOKEN_SECRET, getAccessToken } from "../lib/jwt.utils";
import { Strategy as UsernameAndPasswordStrategy, IVerifyOptions } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import * as userService from '../service/user.service';
import * as loginSessionService from '../service/loginsession.service';
import { UserIsLoggout } from "../error";

// setup username and password strategy
// passport.use(new UsernameAndPasswordStrategy(async (username: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
//     try {
//         const user = userService.getUserByUsernameAndPassword(username, password);
//         if (!user) {
//             done(null, user);
//         }
//     } catch (error) {
//         done(error, null);
//     }
// }));

// setup jwt strategy
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"]
};
passport.use("jwt", new JwtStrategy(jwtOptions, async (payload: any, done: (error: any, user?: any, info?: any) => void) => {
    const loginSession = await loginSessionService.getById(payload.loginSessionId);
        .then(loginSession => {
            if (!loginSession) {
                throw UserIsLoggout;
            }
            return userService.getUserByLoginSessionId(loginSession.id);
        })
        .then(user => {
            done(null, {
                ...user,
                loginSessionId: 
            });
        })
        .catch((err) => {
            done(err, null);
        });
}));

export default passport;