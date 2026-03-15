import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { notionRoutes } from "@server/routes/notion";
import { imageProxyRoutes } from "@server/routes/image-proxy";
import { geoRoutes } from "@server/routes/geo";
import { photographRoutes } from "@server/routes/photographs";
import { opsRoutes } from "@server/routes/ops";

if (!process.env.N_TOK) {
  throw new Error("N_TOK environment variable is required");
}

const app = new Hono();

// API routes
app.route("/api", notionRoutes);
app.route("/api", imageProxyRoutes);
app.route("/api", geoRoutes);
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
app.get("*", serveStatic({
  path: "./dist/index.html",
  onFound: (_path, c) => {
    c.header("Cache-Control", "no-cache");
  },
}));

export default {
  port: 3000,
  fetch: app.fetch,
};
