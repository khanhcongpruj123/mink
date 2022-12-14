import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "@models/error.model";
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

export const CannotUpdateAvartar = new MinkError(
  StatusCodes.INTERNAL_SERVER_ERROR,
  "CAN_NOT_UPDATE_AVATAR",
  "Can not update avatar"
);

export const AvatarSizeIsTooLarge = new MinkError(
  StatusCodes.BAD_REQUEST,
  "AVARTAR_SIZE_IS_TOO_LARGE",
  "Avatar size is too large"
);

export const BookThumbnailIsTooLarge = new MinkError(
  StatusCodes.BAD_REQUEST,
  "BOOK_THUMBNAIL_IS_TO_LARGE",
  "Book thumbnail is too large"
);

export const CannotUploadThumbnail = new MinkError(
  StatusCodes.INTERNAL_SERVER_ERROR,
  "CAN_NOT_UPLOAD_THUMBNAIL",
  "Can not upload thumbnail"
);

export const BookThumbnailIsEmpty = new MinkError(
  StatusCodes.BAD_REQUEST,
  "BOOK_THUMBNAIL_IS_EMPTY",
  "Book thumbnail is empty"
);

export const BookIsExisted = new MinkError(
  StatusCodes.BAD_GATEWAY,
  "BOOK_IS_EXISTED",
  "Book is existed"
);

export const BookNotFound = new MinkError(
  StatusCodes.NOT_FOUND,
  "BOOK_NOT_FOUND",
  "Book not found"
);

export const BadRequest = (message: string): MinkError => {
  return new MinkError(StatusCodes.BAD_REQUEST, "BAD_REQUEST", message);
};
