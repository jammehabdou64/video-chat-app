"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = require("jcc-express-mvc/Core");
Core_1.Route.get("/", async function (req, res) {
    return res.json({ msg: [] });
});
