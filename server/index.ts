import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { cmsRoutes } from "@server/routes/cms";
import { imageProxyRoutes } from "@server/routes/image-proxy";
import { photographRoutes } from "@server/routes/photographs";
import { opsRoutes } from "@server/routes/ops";
import { registerErrorHandler } from "@server/lib/validation";
import config from "@server/config";

const app = new Hono();
registerErrorHandler(app);

if (config.app.isDev) app.use(logger());

// API routes
app.route("/api", cmsRoutes);
app.route("/api", imageProxyRoutes);
app.route("/api", photographRoutes);
app.route("/api", opsRoutes);

// Static assets with long-term caching (hashed filenames)
app.use(
  "/assets/*",
  serveStatic({
    root: "./dist",
    onFound: (_path, c) => {
      c.header("Cache-Control", "public, max-age=31536000, immutable");
    },
  }),
);
// 404 for missing assets — don't fall through to SPA fallback
app.all("/assets/*", (c) => c.text("Not found", 404));

// Other static files (favicon, etc.)
app.use("/*", serveStatic({ root: "./dist" }));

// SPA fallback — only for non-asset routes, never cached
app.get(
  "*",
  serveStatic({
    path: "./dist/index.html",
    onFound: (_path, c) => {
      c.header("Cache-Control", "no-cache");
    },
  }),
);

export default {
  port: 3000,
  idleTimeout: 30,
  fetch: app.fetch,
};
