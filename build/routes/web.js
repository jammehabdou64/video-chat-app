"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = require("jcc-express-mvc/Core");
Core_1.Route.get("/", (req, res) => {
    return res.inertia("Index");
});
Core_1.Route.get("/room/{id}", (req, res) => {
    // return 1;
    return res.inertia("RoomId", { roomId: req.params.id });
});
// Route.middleware("guest").get("/login", (req, res) =>
//   res.inertia("Auth/Login"),
// );
// Route.middleware("guest").get("/register", (req, res) =>
//   res.inertia("Auth/Register"),
// );
// Route.middleware(["auth"]).get("/home", (req, res, next) => {
//   return res.inertia("Home");
// });
// Route.prefix("/auth").group((Route) => {
//   Route.post("/login", Auth.attempt);
//   Route.post("/register", [AuthController, "register"]);
// });
// Route.get("/logout", Auth.logout);
