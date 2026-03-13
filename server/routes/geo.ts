import { Hono } from "hono";
import { cached } from "@server/middleware/cache";
import { getGeo } from "@server/controllers/geo";

export const geoRoutes = new Hono();

geoRoutes.get(
  "/geo",
  cached({
    ttl: 3600,
    key: (c) => `geo:${c.req.header("x-forwarded-for")?.split(",")[0]?.trim() || c.req.header("x-real-ip") || "unknown"}`,
  }),
  getGeo,
);
