"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./bootstrap/app");
const jcc_express_mvc_1 = require("jcc-express-mvc");
console.log({ config: jcc_express_mvc_1.config.get("APP_ENV") });
app_1.app.run();
