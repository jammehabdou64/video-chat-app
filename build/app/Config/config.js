"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    auth: {
        default: "passport",
        strategies: {
            local: {
                fields: {
                    usernameField: "address",
                    passwordField: "password",
                },
            },
        },
        providers: {
            users: {
                driver: "jcc-eloquent",
                model: "User",
            },
        },
    },
};
