import express from 'express';
import 'module-alias/register';
import * as userRepository from '@repository/user.repository';

import V1Router from "./router/v1/v1.router";

// create express app
const app = express();

app.use("/v1", V1Router);

app.listen(3000, () => {
    console.log("Listening...");
});