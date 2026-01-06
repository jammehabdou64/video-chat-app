"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const jcc_express_mvc_1 = require("jcc-express-mvc");
const User_1 = require("../../app/Models/User");
class UserSeeder {
    //
    async run() {
        const users = [
            {
                name: "Administrator",
                email: "admin@example.com",
                password: await (0, jcc_express_mvc_1.bcrypt)("password"),
                address: "Busumbala",
            },
            {
                name: "User",
                email: "user@example.com",
                password: await (0, jcc_express_mvc_1.bcrypt)("password"),
                address: "Busumbala",
            },
        ];
        await User_1.User.create(users);
    }
}
exports.UserSeeder = UserSeeder;
