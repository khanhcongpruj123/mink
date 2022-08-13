import { Request } from "express";
import jwt from "jsonwebtoken";

export const ACCESS_TOKEN_SECRET =
  String(process.env.ACCESS_TOKEN_SECRET) || "minkaccess";
export const ACCESS_TOKEN_EXPIRY =
  Number(process.env.ACCESS_TOKEN_EXPIRY) || 100000;
export const REFRESH_TOKEN_SECRET =
  String(process.env.REFRESH_TOKEN_SECRET) || "minkrefresh";

/**
 *
 * @param loginSessionId : login session id
 * @returns access token
 */
export const createAccessToken = (loginSessionId: string) => {
  return jwt.sign(
    {
      loginSessionId: loginSessionId,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
      algorithm: "HS256",
    }
  );
};

/**
 *
 * @param loginSessionId : login session id
 * @returns: refresh token
 */
export const createRefreshToken = (loginSessionId: string) => {
  return jwt.sign(
    {
      loginSessionId: loginSessionId,
    },
    REFRESH_TOKEN_SECRET
  );
};

export const getAccessToken = (req: Request) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query?.token) {
    return req.query.token;
  }
  return null;
};
