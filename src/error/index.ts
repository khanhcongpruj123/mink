/**
 * Error model for project
 */
export class MinkError extends Error {

    public status: number;
    public code: string;

    public constructor(status: number, code: string, message: string) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

interface ErrorResponse {
    code: string;
    message: string;
}

export const ErrorResponse = (code: string, message: string) : ErrorResponse => {
    return {
        code: code,
        message: message
    };
};

export const UserAlreadyExists = new MinkError(400, "USER_ALREADY_EXISTS", "User already exists");
export const UsernameIsNotValid = new MinkError(400, "USERNAME_NOT_VALID", "Username is not valid");
export const PasswordIsNotValid = new MinkError(400, "PASSWORD_NOT_VALID", "Password is not valid");