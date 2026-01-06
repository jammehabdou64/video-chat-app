"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeder = void 0;
const UserSeeder_1 = require("./UserSeeder");
class DatabaseSeeder {
    async run() {
        //
        return [UserSeeder_1.UserSeeder];
    }
}
exports.DatabaseSeeder = DatabaseSeeder;
