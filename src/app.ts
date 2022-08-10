import "module-alias/register";

import express, { NextFunction, Request, Response } from "express";
import V1Router from "./router/v1";
import Logger from "./logger";
import { MinkError, ErrorResponse } from "./error";
import morganMiddleware from "./middleware/logger.middleware";

// create express app
const app = express();

// setup router
app.use("/v1", V1Router);

// setup body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(morganMiddleware);

// setup error handler
// eslint-disable-next-line max-params
app.use((error: MinkError, request: Request, response: Response, next: NextFunction) => {
    if (error) {
       Logger.error(error.stack);
       response.status(error.status);
       response.json(ErrorResponse(error.code, error.message));
    }
});

// start server
export default app;
