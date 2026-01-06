"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = void 0;
const SocketIOServiceProvider_1 = require("../app/Providers/SocketIOServiceProvider");
const AppServiceProvider_1 = require("../app/Providers/AppServiceProvider");
exports.providers = [
    AppServiceProvider_1.AppServiceProvider,
    SocketIOServiceProvider_1.SocketIOServiceProvider,
    //
];
