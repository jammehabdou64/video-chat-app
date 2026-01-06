"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Eloquent_1 = require("jcc-express-mvc/Eloquent");
class User extends Eloquent_1.Model {
    constructor() {
        super(...arguments);
        this.hidden = ["password"];
    }
}
exports.User = User;
