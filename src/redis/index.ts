import { createClient } from '@redis/client';
import Logger from '../lib/logger';

const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "mink123";

const client = createClient({
    url: "redis://localhost:6379",
    password: REDIS_PASSWORD
});

client.on("error", (err) => {
    Logger.error(err);
});

export default client;