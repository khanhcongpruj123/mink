"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_router_1 = __importDefault(require("./router/v1/v1.router"));
// create express app
const app = (0, express_1.default)();
app.use("/v1", v1_router_1.default);
app.listen(3000, () => {
});
