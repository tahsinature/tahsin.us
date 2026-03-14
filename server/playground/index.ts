/**
 * Standalone Notion fetch playground.
 * Calls the exact same fetchNotionPageMarkdown() used by the app.
 *
 * Usage:
 *   bun playground/index.ts <page-id>
 */
import { fetchNotionPageMarkdown } from "@server/lib/notion";
import { config } from "dotenv";

config();

async function main() {
  const pageId = process.argv[2];
  if (!pageId) {
    console.error("Usage: bun playground/index.ts <page-id>");
    process.exit(1);
  }

  const token = process.env.N_TOK;
  if (!token || token === "your_notion_token_here") {
    console.error("N_TOK not configured in .env");
    process.exit(1);
  }

  console.log(`Fetching page ${pageId}…\n`);
  const result = await fetchNotionPageMarkdown(pageId, token);

  console.log(result.markdown);

  if (result.truncated) {
    console.log(`\n⚠ Page was truncated. Unknown block IDs: ${result.unknown_block_ids.join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
