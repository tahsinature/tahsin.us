import { Hono } from "hono";
import { cache } from "@server/lib/cache";

export const opsRoutes = new Hono();

/** Health check */
opsRoutes.get("/ops/health", (c) => {
  return c.json({ status: "ok", uptime: process.uptime() });
});

/** Bust all cached entries */
opsRoutes.post("/ops/cache/bust", async (c) => {
  await cache.clear();
  return c.json({ cleared: true });
});
