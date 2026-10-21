import { Hono } from "hono";
import { injectShortLinkMetadata } from "@shared/short-link-metadata";

export function createShortLinkRoutes(readHtml: () => Promise<string>) {
  const routes = new Hono();
  const handle = async (c: import("hono").Context) => {
    const url = new URL(c.req.url);
    c.header("Cache-Control", "no-cache");
    c.header("X-Robots-Tag", "noindex, nofollow");
    return c.html(injectShortLinkMetadata(await readHtml(), url.pathname, url.search));
  };
  routes.get("/short", handle);
  routes.get("/short/*", handle);
  return routes;
}
