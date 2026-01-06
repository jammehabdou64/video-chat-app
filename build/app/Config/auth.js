"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
exports.auth = {
    default: "passport",
    strategies: {
        local: {
            fields: {
                usernameField: "email",
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
};
