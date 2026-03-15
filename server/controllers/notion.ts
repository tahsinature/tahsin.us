import type { Context } from "hono";
import { fetchNotionPageMarkdown, resolveFileBlocks } from "@server/lib/notion";
import type { NotionPageResponse, ResolveFilesRequest, ResolvedFile, ApiError } from "@shared/api";


/** Map of friendly page names → env var names holding Notion page IDs */
const PAGE_ENV_MAP: Record<string, string> = {
  travel: "TRAVEL_PID",
};

function getToken() {
  const token = process.env.N_TOK;
  if (!token || token === "your_notion_token_here") {
    return null;
  }
  return token;
}

export async function getNamedPage(c: Context) {
  const token = getToken();
  if (!token) return c.json<ApiError>({ error: "N_TOK not configured" }, 500);

  const { name } = c.req.param();
  const envKey = PAGE_ENV_MAP[name];
  if (!envKey) return c.json<ApiError>({ error: "Unknown page" }, 404);

  const pageId = process.env[envKey];
  if (!pageId) return c.json<ApiError>({ error: `${envKey} not configured` }, 500);

  try {
    const result = await fetchNotionPageMarkdown(pageId, token);
    return c.json<NotionPageResponse>(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}

export async function getPage(c: Context) {
  const token = getToken();
  if (!token) return c.json<ApiError>({ error: "N_TOK not configured" }, 500);

  const { pageId } = c.req.param();

  try {
    const result = await fetchNotionPageMarkdown(pageId, token);
    return c.json<NotionPageResponse>(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}

export async function resolveFiles(c: Context) {
  const token = getToken();
  if (!token) return c.json<ApiError>({ error: "N_TOK not configured" }, 500);

  try {
    const { blockIds } = await c.req.json<ResolveFilesRequest>();
    if (!Array.isArray(blockIds) || blockIds.length === 0) {
      return c.json<ApiError>({ error: "blockIds array required" }, 400);
    }

    const resolved = await resolveFileBlocks(blockIds, token);
    return c.json<ResolvedFile[]>(resolved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}
