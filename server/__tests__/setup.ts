// Ensure cache is enabled for unit tests (cache-middleware tests depend on it).
// .env.test (or .env.example in CI) may have CACHE_ENABLED=false.
process.env.CACHE_ENABLED = "true";
