import morgan, { StreamOptions } from "morgan";
import Logger from "@libs/logger";

// setup logger
const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const morganMiddleware = morgan("dev", { stream });

export default morganMiddleware;
