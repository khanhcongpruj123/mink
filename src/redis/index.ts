import { createClient } from "@redis/client";
import Logger from "@lib/logger";

const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "mink123";
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || "6379";

const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  password: REDIS_PASSWORD,
});

client.on("error", (err) => {
  Logger.error(err);
});

export default client;
