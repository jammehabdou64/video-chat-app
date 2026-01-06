import { app } from "./bootstrap/app";
import { config } from "jcc-express-mvc";

console.log({ config: config.get("APP_ENV") });

app.run();
