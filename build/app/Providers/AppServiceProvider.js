"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppServiceProvider = void 0;
const Provider_1 = require("jcc-express-mvc/Core/Provider");
class AppServiceProvider extends Provider_1.ServiceProvider {
    constructor(app) {
        super(app);
    }
    register() { }
    boot() { }
}
exports.AppServiceProvider = AppServiceProvider;
