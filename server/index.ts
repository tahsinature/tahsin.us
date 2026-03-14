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

// Static files & SPA fallback
app.use("/*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
