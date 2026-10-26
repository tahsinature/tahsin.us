import { Hono } from "hono";
import { isShortLinkPath } from "@shared/short-links";
import { findShortLinkDestination } from "@server/lib/short-link-destination";
import type { ShortLinkFetch } from "@server/lib/short-link-destination";

export function createShortLinkResolutionRoutes(fetchLink?: ShortLinkFetch) {
  const routes = new Hono();
  routes.get("/short-links/resolve", async (c) => {
    c.header("Cache-Control", "no-store");
    const pathname = c.req.query("path") ?? "";
    const search = c.req.query("search") ?? "";
    if (!isShortLinkPath(pathname) || pathname.length > 2048 || search.length > 4096) {
      return c.json({ error: "A valid /short/ or /s/ path is required" }, 400);
    }
    const result = await findShortLinkDestination(pathname, search, fetchLink, c.req.header("user-agent"));
    return c.json(result);
  });
  return routes;
}
