import zod from "zod";

const processEnvSchema = zod.object({
  N_TOK: zod.string(),
  TRAVEL_PID: zod.string(),
  PHOTOS_DS_ID: zod.string(),
  TRIPS_DS_ID: zod.string(),
  CACHE_ENABLED: zod.string().transform((val) => val === "true"),
  TRIP_PUBLISHED_ONLY: zod
    .string()
    .transform((val) => val === "true")
    .default(true),
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
};

export default config;
