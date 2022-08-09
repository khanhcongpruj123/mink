import "module-alias/register";

import express from "express";
import V1Router from "./router/v1";
import bodyParser from "body-parser";
import morgan, { StreamOptions } from "morgan";
import Logger from "./logger";

// create express app
const app = express();

// setup router
app.use("/v1", V1Router);

// setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup logger
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

app.use(morganMiddleware);

// start server
app.listen(3000, () => {
    Logger.info("Server is listening on port 3000!");
});
