import { Hono } from "hono";
import type { Context, Next } from "hono";
import { cache } from "@server/lib/cache";
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

export const opsRoutes = new Hono();

/** App config — fetched by frontend before mount */
opsRoutes.get("/ops/config", (c) => {
  const res: AppConfig = {
    debugMode: config.frontend.debugMode,
    maintenanceMode: config.frontend.maintenanceMode,
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
