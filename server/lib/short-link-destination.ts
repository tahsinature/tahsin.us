import { getShortLinkRetryUrl, isShortLinkPath, shortLinkConfig } from "@shared/short-links";
import type { ShortLinkResolution } from "@shared/short-link-resolution";

export type ShortLinkFetch = (url: string, init: RequestInit) => Promise<Response>;

export async function findShortLinkDestination(
  pathname: string,
  search: string,
  fetchLink: ShortLinkFetch = fetch,
  userAgent?: string,
): Promise<ShortLinkResolution> {
  const shortUrl = getShortLinkRetryUrl(pathname, search);
  if (!shortUrl) return { status: "unavailable", destination: null };

  const shortOrigin = new URL(shortLinkConfig.shortOrigin).origin;
  const siteOrigin = new URL(shortLinkConfig.origin).origin;
  const visited = new Set<string>();
  const signal = AbortSignal.timeout(4000);
  let current = shortUrl;

  try {
    // Only request Short.io, never the meeting itself. Stop at the first external destination.
    for (let hop = 0; hop < 5; hop++) {
      if (visited.has(current)) break;
      visited.add(current);
      const response = await fetchLink(current, {
        method: "HEAD", redirect: "manual", signal,
        headers: userAgent ? { "User-Agent": userAgent } : undefined,
      });
      const location = response.headers.get("location");
      if (response.status === 404 || response.status === 410) break;
      // Password-protected / cloaked links can serve a page rather than a redirect.
      if (response.ok) return { status: "available", destination: current };
      if (response.status < 300 || response.status >= 400 || !location) {
        return { status: "error", destination: null };
      }

      const destination = new URL(location, current);
      if (!["https:", "http:"].includes(destination.protocol) || destination.username || destination.password) break;
      if (destination.origin === siteOrigin && isShortLinkPath(destination.pathname)) break;
      if (destination.origin !== shortOrigin) return { status: "available", destination: destination.href };
      current = destination.href;
    }
    return { status: "unavailable", destination: null };
  } catch {
    return { status: "error", destination: null };
  }
}
