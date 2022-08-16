import { NextFunction, Request, RequestHandler, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { BadRequest } from "@core/error";

const validatorMiddleware = (type: any): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(type, req.body);
    validate(body).then((errors) => {
      if (errors.length > 0) {
        next(BadRequest(errors[0].constraints.toString()));
      } else {
        next();
      }
    });
  };
};

export default validatorMiddleware;
