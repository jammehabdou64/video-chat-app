"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration = void 0;
const Eloquent_1 = require("jcc-express-mvc/Eloquent");
class Migration {
    up() {
        return Eloquent_1.Schema.create("users", (table) => {
            table.id();
            table.string("name");
            table.string("email").unique();
            table.string("password");
            table.timestamps();
            table.softDeletes();
        });
    }
}
exports.Migration = Migration;
