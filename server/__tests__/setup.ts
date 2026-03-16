// Set env vars before any module imports (config.ts parses at import time)
process.env.N_TOK = "test-token";
process.env.TRAVEL_PID = "test-travel-pid";
process.env.PHOTOS_DS_ID = "test-photos-ds-id";
process.env.TRIPS_DS_ID = "test-trips-ds-id";
process.env.CACHE_ENABLED = "true";
