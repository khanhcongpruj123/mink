import { NextFunction, Request, RequestHandler, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { BadRequest } from "@core/error";

const validatorMiddleware = (type: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(type, req.body);
    validate(body).then((errors) => {
      if (errors.length > 0) {
        next(BadRequest(errors.map(getAllNestedErrors).join(", ")));
      } else {
        next();
      }
    });
  };
};

const getAllNestedErrors = (error: ValidationError) => {
  if (error.constraints) {
    return Object.values(error.constraints);
  }
  return error.children.map(getAllNestedErrors).join(", ");
};

export default validatorMiddleware;
