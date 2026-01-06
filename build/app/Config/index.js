"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const auth_1 = require("./auth");
const cors_1 = require("./cors");
const engine_1 = require("./engine");
exports.config = {
    auth: auth_1.auth,
    engine: engine_1.engine,
    cors: cors_1.cors,
};
