"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const Core_1 = require("jcc-express-mvc/Core");
const providers_1 = require("./providers");
const kernel_1 = require("../app/Http/kernel");
const index_1 = require("../app/Config/index");
const app = Core_1.Application.configuration()
    .withRouting([
    {
        name: "routes/api",
        prefix: "/api",
    },
    {
        name: "routes/web",
        prefix: "",
    },
])
    .withProviders(providers_1.providers)
    .withConfig(index_1.config)
    .withKernel(kernel_1.Kernel)
    .withMiddleware()
    .create();
exports.app = app;
