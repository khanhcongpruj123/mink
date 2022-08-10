import "module-alias/register";

import express, { NextFunction, Request, Response } from "express";
import V1Router from "./router/v1";
import morgan, { StreamOptions } from "morgan";
import Logger from "./logger";
import { MinkError, ErrorResponse } from "./error";

// create express app
const app = express();

// setup router
app.use("/v1", V1Router);

// setup body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// setup logger
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

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
