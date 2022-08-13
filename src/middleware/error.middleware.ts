import { MinkError, ErrorResponse } from "@error";
import { Request, Response, NextFunction } from "express";
import Logger from "@lib/logger";
import { StatusCodes } from "http-status-codes";
 
// eslint-disable-next-line max-params
const errorMiddleware = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error) {
        Logger.error(error.stack);
        if (error instanceof MinkError) {
            response.status(error.statusCode);
            response.json(ErrorResponse(error.code, error.message));
        } else {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR);
            response.json(ErrorResponse("INTERNAL_SERVER_ERROR", error.message));
        }
    }
};

export default errorMiddleware;