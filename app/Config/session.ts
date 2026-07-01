import path from "path";
import appRootPath from "app-root-path";
import { config } from "jcc-express-mvc";
import type { SessionConfig } from "jcc-express-mvc/lib/Interface";

/**
 * Laravel-style session config. Env: SESSION_DRIVER, SESSION_LIFETIME (minutes),
 * SESSION_COOKIE, SESSION_TABLE, REDIS_*, etc.
 */
const lifetimeMinutes = Number(config.get("SESSION_LIFETIME", "120"));
const lifetimeMs = lifetimeMinutes * 60 * 1000;

const sameSite = config.get(
  "SESSION_SAME_SITE",
  "lax",
) as SessionConfig["cookie"]["sameSite"];

export const session: SessionConfig = {
  driver: config.get("SESSION_DRIVER", "file") as SessionConfig["driver"],
  lifetime: lifetimeMs,
  cookie: {
    name: config.get("SESSION_COOKIE", "connect.sid"),
    httpOnly: config.get("SESSION_HTTP_ONLY", "true") === "true",
    secure: config.get("SESSION_SECURE_COOKIE", "false") === "true",
    sameSite,
    maxAge: lifetimeMs,
    path: config.get("SESSION_PATH", "/") || "/",
    domain: config.get("SESSION_DOMAIN", "") || undefined,
  },
  files: {
    path: path.join(
      appRootPath.path,
      config.get("SESSION_FILES_PATH", "storage/framework/sessions"),
    ),
  },
  database: {
    connection: config.get("SESSION_CONNECTION", "mysql"),
    table: config.get("SESSION_TABLE", "sessions"),
  },
  redis: {
    host: config.get("REDIS_HOST", "127.0.0.1"),
    port: Number(config.get("REDIS_PORT", "6379")),
    password: config.get("REDIS_PASSWORD", "") || undefined,
    database: Number(config.get("REDIS_SESSION_DB", "0")),
    prefix: config.get("SESSION_REDIS_PREFIX", "session:"),
  },
};
