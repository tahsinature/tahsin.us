import type { Context } from "hono";
import { fetchPageMarkdown, resolveFileBlocks } from "@server/lib/cms";
import type { PageResponse, ResolveFilesRequest, ResolvedFile, ApiError } from "@shared/api";
import config from "@server/config";

/** Map of friendly page names → config keys holding page IDs */
const PAGE_MAP: Record<string, string> = {
  travel: config.cms.travelPID,
};

export async function getNamedPage(c: Context) {
  const { name } = c.req.param();
  const pageId = PAGE_MAP[name];
  if (!pageId) return c.json<ApiError>({ error: "Unknown page" }, 404);

  try {
    const result = await fetchPageMarkdown(pageId);
    return c.json<PageResponse>(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}

export async function getPage(c: Context) {
  const { pageId } = c.req.param();

  try {
    const result = await fetchPageMarkdown(pageId);
    return c.json<PageResponse>(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}

export async function resolveFiles(c: Context) {
  try {
    const { blockIds } = await c.req.json<ResolveFilesRequest>();
    if (!Array.isArray(blockIds) || blockIds.length === 0) {
      return c.json<ApiError>({ error: "blockIds array required" }, 400);
    }

    const resolved = await resolveFileBlocks(blockIds);
    return c.json<ResolvedFile[]>(resolved);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}
