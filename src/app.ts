import "module-alias/register";

import express from "express";
import V1Router from "@router/v1";
import loggerMiddleware from "@middleware/logger.middleware";
import errorMiddleware from "@middleware/error.middleware";
import redisClient from "@redis";
import Logger from "@lib/logger";
import { PrismaClient } from "@prisma/client";

// connect to redis
redisClient.connect().then(() => {
  Logger.info("Redis connected!");
});

// connect to database
new PrismaClient().$connect().then(() => {
  Logger.info("Database connected!");
});

// create express app
const app = express();

// setup body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup logger middleware
app.use(loggerMiddleware);

// setup router
app.use("/v1", V1Router);

// setup error handler
app.use(errorMiddleware);

// start server
export default app;
