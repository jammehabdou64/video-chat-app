"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.engine = void 0;
const Templating_engine_1 = require("jcc-express-mvc/lib/Templating-engine");
exports.engine = {
    templateEngine: "jcc-blade",
    engine: null,
    view: "resources/views",
    viewEngine: Templating_engine_1.jsBladeEngine.render.bind(Templating_engine_1.jsBladeEngine),
    viewEngineExtension: "blade.html",
};
