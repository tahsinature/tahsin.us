import { Hono } from "hono";
import { cached } from "@server/middleware/cache";
import { getPage, getNamedPage, resolveFiles } from "@server/controllers/cms";

export const cmsRoutes = new Hono();

cmsRoutes.get("/pages/:name", cached({ ttl: 300 }), getNamedPage);
cmsRoutes.get("/cms/:pageId", cached({ ttl: 300 }), getPage);
cmsRoutes.post(
  "/cms/resolve-files",
  cached({
    ttl: 300,
    key: async (c) => {
      const { blockIds } = await c.req.json<{ blockIds: string[] }>();
      return `resolve-files:${[...blockIds].sort().join(",")}`;
    },
  }),
  resolveFiles,
);
