import { ACCESS_TOKEN_SECRET } from "@lib/jwt";
import {
  Strategy as JwtStrategy,
  StrategyOptions,
  ExtractJwt,
} from "passport-jwt";
import passport from "passport";
import * as authService from "@service/auth.service";

// setup jwt strategy
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
  algorithms: ["HS256"],
};
passport.use(
  "jwt",
  new JwtStrategy(
    jwtOptions,
    async (
      payload: any,
      done: (error: any, user?: any, info?: any) => void
    ) => {
      try {
        const loginSessionInfo = await authService.getLoginSessionInfoById(
          payload.loginSessionId
        );
        done(null, loginSessionInfo);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
