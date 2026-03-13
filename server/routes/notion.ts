import { Hono } from "hono";
import { cached } from "@server/middleware/cache";
import { getPage, resolveFiles } from "@server/controllers/notion";

export const notionRoutes = new Hono();

notionRoutes.get("/notion/:pageId", cached({ ttl: 300 }), getPage);
notionRoutes.post(
  "/notion/resolve-files",
  cached({
    ttl: 300,
    key: async (c) => {
      const { blockIds } = await c.req.json<{ blockIds: string[] }>();
      return `resolve-files:${[...blockIds].sort().join(",")}`;
    },
  }),
  resolveFiles,
);
