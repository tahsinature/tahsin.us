import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { notionRoutes } from "@server/routes/notion";
import { imageProxyRoutes } from "@server/routes/image-proxy";
import { geoRoutes } from "@server/routes/geo";

const app = new Hono();

// API routes
app.route("/api", notionRoutes);
app.route("/api", imageProxyRoutes);
app.route("/api", geoRoutes);

// Static files & SPA fallback
app.use("/*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
