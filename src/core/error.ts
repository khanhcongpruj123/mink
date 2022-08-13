import { StatusCodes } from "http-status-codes";
/**
 * Error model for project
 */
export class MinkError extends Error {
  public statusCode: StatusCodes;
  public code: string;

  public constructor(status: number, code: string, message: string) {
    super(message);
    this.statusCode = status;
    this.code = code;
  }
}

interface ErrorResponse {
  code: string;
  message: string;
}

export function ErrorResponse(code: string, message: string): ErrorResponse {
  return {
    code: code,
    message: message,
  };
}

export const UserAlreadyExists = new MinkError(
  StatusCodes.BAD_REQUEST,
  "USER_ALREADY_EXISTS",
  "User already exists"
);
export const UsernameIsNotValid = new MinkError(
  StatusCodes.BAD_REQUEST,
  "USERNAME_NOT_VALID",
  "Username is not valid"
);
export const PasswordIsNotValid = new MinkError(
  StatusCodes.BAD_REQUEST,
  "PASSWORD_NOT_VALID",
  "Password is not valid"
);
export const UserNotFound = new MinkError(
  StatusCodes.BAD_REQUEST,
  "USER_NOT_FOUND",
  "User not found"
);
export const PasswordIsWrong = new MinkError(
  StatusCodes.BAD_REQUEST,
  "PASSWORD_IS_WRONG",
  "Password is wrong"
);
export const UserIsLoggout = new MinkError(
  StatusCodes.BAD_REQUEST,
  "USER_IS_LOGGOUT",
  "User is loggout"
);
export const AuthenticationError = new MinkError(
  StatusCodes.UNAUTHORIZED,
  "UNAUTHORIZED",
  "You must be auth"
);
