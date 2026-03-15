import { Hono } from "hono";
import { cache } from "@server/lib/cache";
import type { HealthResponse, CacheBustResponse } from "@shared/api";

export const opsRoutes = new Hono();

/** Health check */
opsRoutes.get("/ops/health", (c) => {
  const res: HealthResponse = {
    status: "ok",
    uptime: process.uptime(),
  };
  return c.json(res);
});

/** Bust all cached entries */
opsRoutes.post("/ops/cache/bust", async (c) => {
  await cache.clear();
  return c.json<CacheBustResponse>({ cleared: true });
});
