"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const UserMiddleware = (req, res, next) => {
    console.log("first");
    next();
};
exports.UserMiddleware = UserMiddleware;
