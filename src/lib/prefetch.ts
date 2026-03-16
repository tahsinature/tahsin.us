/**
 * App-level prefetch configuration.
 *
 * Each URL listed here is fetched once on app mount.
 * Page URLs (markdown responses) go through the page store.
 * Other URLs are cached locally.
 *
 * To add a new prefetch, just add a URL to the list below.
 */
import { usePageStore } from "@/stores/usePageStore";

const prefetchUrls: string[] = [
  "/api/trips",
  "/api/photos?favonly=true",
  "/api/pages/travel",
];

const cache = new Map<string, { data: unknown; promise: Promise<unknown> }>();

/** Run all prefetches. Safe to call multiple times — each URL only fetches once. */
export function runPrefetches() {
  for (const url of prefetchUrls) {
    if (cache.has(url)) continue;

    // Page URLs go through the page store (deduplication + shared cache)
    if (url.startsWith("/api/pages/") || url.startsWith("/api/cms/")) {
      usePageStore.getState().prefetch(url);
      continue;
    }

    const promise = fetch(url)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        cache.set(url, { data, promise });
        return data;
      })
      .catch((err) => {
        cache.delete(url);
        throw err;
      });

    cache.set(url, { data: undefined, promise });
  }
}

/** Await the prefetch promise for a given URL. */
export async function awaitPrefetch<T = unknown>(url: string): Promise<T | undefined> {
  const entry = cache.get(url);
  if (!entry) return undefined;
  return (await entry.promise) as T;
}
