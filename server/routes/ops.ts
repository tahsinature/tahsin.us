import { Hono } from "hono";
import type { Context, Next } from "hono";
import { cache } from "@server/lib/cache";
import { lookupGeo } from "@server/lib/geo";
import config from "@server/config";
import { validateRequest } from "@server/lib/validation";
import { updateAppConfigRequest } from "@shared/api";
import type { HealthResponse, CacheBustResponse, AppConfig, ApiError } from "@shared/api";

/** Reject requests missing a valid OPS_SECRET bearer token */
const requireOpsSecret = async (c: Context, next: Next) => {
  const auth = c.req.header("Authorization");
  if (auth !== `Bearer ${config.ops.secret}`) {
    return c.json<ApiError>({ error: "Unauthorized" }, 401);
  }
  return next();
};

/** Extract client IP from request headers */
const getClientIp = (c: Context): string =>
  c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
  c.req.header("x-real-ip") ||
  "unknown";

/** Fire-and-forget visit notification via PAM */
const notifyVisit = (ip: string, city: string | null, country: string | null) => {
  const location = [city, country].filter(Boolean).join(", ") || "Unknown location";
  fetch(`${config.pam.url}/temp/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      through: "telegram",
      content: `🌐 New visit from ${location} (${ip})`,
    }),
  }).catch(() => {});
};

const VISIT_TTL = 1800; // 30 minutes

export const opsRoutes = new Hono();

/** App config + geo — fetched by frontend before mount */
opsRoutes.get("/ops/config", async (c) => {
  const ip = getClientIp(c);
  const geo = await lookupGeo(ip);

  // Visit notification (deduplicated by IP, 30 min window)
  const visitKey = `visit:${ip}`;
  if (!(await cache.has(visitKey))) {
    await cache.set(visitKey, true, VISIT_TTL);
    notifyVisit(ip, geo.city, geo.country);
  }

  const res: AppConfig = {
    debugMode: config.frontend.debugMode,
    maintenanceMode: config.frontend.maintenanceMode,
    geo,
  };
  return c.json(res);
});

/** Update app config at runtime */
opsRoutes.put("/ops/config", requireOpsSecret, async (c) => {
  const { body } = await validateRequest(c, updateAppConfigRequest);
  if (body.debugMode !== undefined) config.frontend.debugMode = body.debugMode;
  if (body.maintenanceMode !== undefined) config.frontend.maintenanceMode = body.maintenanceMode;
  const res: AppConfig = {
    debugMode: config.frontend.debugMode,
    maintenanceMode: config.frontend.maintenanceMode,
    geo: null,
  };
  return c.json(res);
});

/** Health check */
opsRoutes.get("/ops/health", (c) => {
  const res: HealthResponse = {
    status: "ok",
    uptime: process.uptime(),
  };
  return c.json(res);
});

/** Bust all cached entries */
opsRoutes.post("/ops/cache/bust", requireOpsSecret, async (c) => {
  await cache.clear();
  return c.json<CacheBustResponse>({ cleared: true });
});
