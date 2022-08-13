import { ACCESS_TOKEN_SECRET } from "../lib/jwt.utils";
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import * as userService from '../service/user.service';
import * as loginSessionService from '../service/loginsession.service';
import { UserIsLoggout } from "../error";


// setup jwt strategy
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_TOKEN_SECRET,
    algorithms: ["HS256"]
};
passport.use("jwt", new JwtStrategy(jwtOptions, async (payload: any, done: (error: any, user?: any, info?: any) => void) => {
    try {
        const loginSession = await loginSessionService.getById(payload.loginSessionId);
        if (!loginSession) {
            throw UserIsLoggout;
        }
        const user = await userService.getUserByLoginSessionId(loginSession.id);
        done(null, {
            ...user,
            loginSessionId: loginSession.id
        });
    } catch (error) {
        done(error, null);
    }
}));

export default passport;