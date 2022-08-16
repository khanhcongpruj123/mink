import "module-alias/register";

import express from "express";
import V1Router from "@routes/v1";
import loggerMiddleware from "@middlewares/logger.middleware";
import errorMiddleware from "@middlewares/error.middleware";
import redisClient from "@cache/redis";
import Logger from "@libs/logger";
import { PrismaClient } from "@prisma/client";
import compression from "compression";
import helmet from "helmet";
import multer from "multer";

// connect to redis
redisClient.connect().then(() => {
  Logger.info("Redis connected!");
});

// connect to database
new PrismaClient().$connect().then(() => {
  Logger.info("Database connected!");
});

// TODO validate enviroment variable

// create express app
const app = express();

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(helmet());
app.use(multer().any());

// setup logger middleware
app.use(loggerMiddleware);

// setup router
app.use("/v1", V1Router);

// setup error handler
app.use(errorMiddleware);

// start server
export default app;
