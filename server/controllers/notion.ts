import type { Context } from "hono";
import { fetchNotionPageMarkdown, resolveFileBlocks } from "@server/lib/notion";


function getToken() {
  const token = process.env.N_TOK;
  if (!token || token === "your_notion_token_here") {
    return null;
  }
  return token;
}

export async function getPage(c: Context) {
  const token = getToken();
  if (!token) return c.json({ error: "N_TOK not configured" }, 500);

  const { pageId } = c.req.param();

  try {
    const result = await fetchNotionPageMarkdown(pageId, token);
    return c.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
}

export async function resolveFiles(c: Context) {
  const token = getToken();
  if (!token) return c.json({ error: "N_TOK not configured" }, 500);

  try {
    const { blockIds } = await c.req.json<{ blockIds: string[] }>();
    if (!Array.isArray(blockIds) || blockIds.length === 0) {
      return c.json({ error: "blockIds array required" }, 400);
    }

    const resolved = await resolveFileBlocks(blockIds, token);
    return c.json(resolved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
}
