"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jcc_express_mvc_1 = require("jcc-express-mvc");
const jcc_express_mvc_2 = require("jcc-express-mvc");
const Dependency_1 = require("jcc-express-mvc/Core/Dependency");
const AuthRequest_1 = require("@/Request/AuthRequest");
let AuthController = class AuthController {
    //
    //
    async register({ req, res, next } = jcc_express_mvc_2.httpContext, authRequest) {
        const save = await authRequest.save();
        return save
            ? jcc_express_mvc_1.Auth.attempt(req, res, next)
            : res.json({ message: "Invalid credentials" });
    }
    //
    async login({ req, res, next } = jcc_express_mvc_2.httpContext) {
        return jcc_express_mvc_1.Auth.attempt(req, res, next);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, Dependency_1.Method)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AuthRequest_1.AuthRequest]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, Dependency_1.Inject)()
], AuthController);
