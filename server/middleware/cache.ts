import type { MiddlewareHandler } from "hono";
import type { StorageValue } from "unstorage";
import { cache } from "@server/lib/cache";

interface CacheMiddlewareOptions {
  /** TTL in seconds */
  ttl: number;
  /** Custom key builder (sync or async). Defaults to `method:path` */
  key?: (c: Parameters<MiddlewareHandler>[0]) => string | Promise<string>;
}

/**
 * Caching middleware for Hono.
 * Caches JSON responses by method + path (or custom key).
 * Only caches successful (2xx) responses.
 */
const CACHE_ENABLED = process.env.CACHE_ENABLED !== "false";

export function cached(opts: CacheMiddlewareOptions): MiddlewareHandler {
  return async (c, next) => {
    if (!CACHE_ENABLED) return await next();

    const cacheKey = opts.key ? await opts.key(c) : `${c.req.method}:${c.req.path}`;

    const hit = await cache.get(cacheKey);
    if (hit) {
      return c.json(hit);
    }

    await next();

    if (c.res.status >= 200 && c.res.status < 300) {
      const body = (await c.res.clone().json()) as StorageValue;
      await cache.set(cacheKey, body, opts.ttl);
    }
  };
}
