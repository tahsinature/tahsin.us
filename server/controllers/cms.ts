import type { Context } from "hono";
import { fetchPageMarkdown, resolveFileBlocks } from "@server/lib/cms";
import { validateRequest } from "@server/lib/validation";
import { resolveFilesRequest } from "@shared/api";
import type { PageResponse, ResolvedFile, ApiError } from "@shared/api";
import config from "@server/config";

/** Map of friendly page names → config keys holding page IDs */
const PAGE_MAP: Record<string, string> = {
  travel: config.cms.travelPID,
};

export async function getNamedPage(c: Context) {
  const { name } = c.req.param();
  const pageId = PAGE_MAP[name];
  if (!pageId) return c.json<ApiError>({ error: "Unknown page" }, 404);

  const result = await fetchPageMarkdown(pageId);
  return c.json<PageResponse>(result);
}

export async function getPage(c: Context) {
  const { pageId } = c.req.param();
  const result = await fetchPageMarkdown(pageId);
  return c.json<PageResponse>(result);
}

export async function resolveFiles(c: Context) {
  const { body } = await validateRequest(c, resolveFilesRequest);
  const resolved = await resolveFileBlocks(body.blockIds);
  return c.json<ResolvedFile[]>(resolved);
}
