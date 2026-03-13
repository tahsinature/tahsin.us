/**
 * Notion fetching logic.
 * Uses the markdown endpoint for single-call page retrieval.
 */
import { Client } from "@notionhq/client";

export interface NotionPageMarkdown {
  markdown: string;
  truncated: boolean;
  unknown_block_ids: string[];
}

export async function fetchNotionPageMarkdown(pageId: string, token: string): Promise<NotionPageMarkdown> {
  const notion = new Client({ auth: token });
  const res = await notion.pages.retrieveMarkdown({ page_id: pageId });
  return {
    markdown: res.markdown,
    truncated: res.truncated,
    unknown_block_ids: res.unknown_block_ids,
  };
}

export interface ResolvedFile {
  blockId: string;
  url: string | null;
  name?: string;
}

/**
 * Resolve block IDs to actual file URLs via the block API.
 * Used to resolve file:// URIs from the markdown endpoint.
 */
export async function resolveFileBlocks(blockIds: string[], token: string): Promise<ResolvedFile[]> {
  const notion = new Client({ auth: token });
  const results = await Promise.all(
    blockIds.map(async (blockId) => {
      try {
        const block = (await notion.blocks.retrieve({ block_id: blockId })) as Record<string, unknown>;
        const type = block.type as string;
        const data = block[type] as { type?: string; file?: { url: string }; external?: { url: string }; name?: string } | undefined;
        const url = data?.type === "file" ? data.file?.url : data?.external?.url;
        return { blockId, url: url ?? null, name: data?.name };
      } catch {
        return { blockId, url: null };
      }
    }),
  );
  return results;
}
