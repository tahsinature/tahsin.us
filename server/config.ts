import zod from "zod";

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
  FRONTEND_DEBUG_MODE: zod
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
  MAINTENANCE_MODE: zod
    .string()
    .transform((val) => val === "true")
    .optional()
    .default(false),
  OPS_SECRET: zod.string(),
});

const env = processEnvSchema.parse(process.env);

const config = {
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
  frontend: {
    debugMode: env.FRONTEND_DEBUG_MODE,
    maintenanceMode: env.MAINTENANCE_MODE,
  },
};

export default config;
