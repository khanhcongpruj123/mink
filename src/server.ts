import http from "http";
import Logger from "./lib/logger";
import app from './app';

// create server
const server = http.createServer(app);
// start server
server.listen(3000, () => {
    Logger.info("Server is running on port 3000!");
});

