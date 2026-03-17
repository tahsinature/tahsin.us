import zod from "zod";
import { DEFAULT_ACTIVE_TABS } from "@shared/config";
import type { NavTab } from "@shared/constants";

const processEnvSchema = zod.object({
  N_TOK: zod.string(),
  TRAVEL_PID: zod.string(),
  PHOTOS_DS_ID: zod.string(),
  TRIPS_DS_ID: zod.string(),
  CACHE_ENABLED: zod
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
  TRIP_PUBLISHED_ONLY: zod
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(true),
  MAINTENANCE_MODE: zod
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
  OPS_SECRET: zod.string(),
  PAM_URL: zod.string(),
});

const env = processEnvSchema.parse(process.env);

const config = {
  app: {
    isDev: process.env.NODE_ENV !== "production",
  },
  cms: {
    token: env.N_TOK,
    travelPID: env.TRAVEL_PID,
    photosDSId: env.PHOTOS_DS_ID,
    tripsDSId: env.TRIPS_DS_ID,
    tripPublishedOnly: env.TRIP_PUBLISHED_ONLY,
  },
  cache: {
    enabled: env.CACHE_ENABLED,
  },
  ops: {
    secret: env.OPS_SECRET,
  },
  pam: {
    url: env.PAM_URL,
  },
  frontend: {
    maintenanceMode: env.MAINTENANCE_MODE,
    activeTabs: [...DEFAULT_ACTIVE_TABS] as NavTab[],
  },
};

export default config;
