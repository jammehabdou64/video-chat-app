"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRequest = void 0;
const FormRequest_1 = require("jcc-express-mvc/Core/FormRequest");
const jcc_express_mvc_1 = require("jcc-express-mvc");
const User_1 = require("@/Model/User");
class AuthRequest extends FormRequest_1.FormRequest {
    constructor(req) {
        super(req);
    }
    async rules() {
        await this.validate({
            //
            name: ["required"],
            email: ["required", "unique:users"],
            password: ["required", "min:6", "same:confirmPassword"],
            confirmPassword: ["same:password"],
        });
    }
    async save() {
        await this.rules();
        return User_1.User.create({
            name: this.input("name"),
            email: this.input("email"),
            password: await (0, jcc_express_mvc_1.bcrypt)(this.input("password")),
        });
    }
}
exports.AuthRequest = AuthRequest;
