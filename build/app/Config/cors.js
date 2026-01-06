"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
exports.cors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
