"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kernel = void 0;
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const jcc_express_mvc_1 = require("jcc-express-mvc");
const Inertia_1 = require("jcc-express-mvc/Core/Inertia");
class Kernel {
    constructor() {
        //
        this.middlewares = [
            (0, morgan_1.default)("dev"),
            (0, cookie_parser_1.default)(),
            (0, express_session_1.default)({
                secret: "ggggggg",
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 60000 },
            }),
            (0, connect_flash_1.default)(),
            (0, express_fileupload_1.default)(),
            (0, Inertia_1.inertia)({ rootView: "index", ssr: true }),
        ];
        this.middlewareAliases = {
            auth: jcc_express_mvc_1.auth,
            guest: jcc_express_mvc_1.guest,
        };
    }
}
exports.Kernel = Kernel;
