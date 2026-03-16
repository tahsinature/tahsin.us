/**
 * Standalone CMS fetch playground.
 * Calls the exact same fetchPageMarkdown() used by the app.
 *
 * Usage:
 *   bun playground/index.ts <page-id>
 */
import { fetchPageMarkdown } from "@server/lib/cms";

async function main() {
  const pageId = process.argv[2];

  console.log(`Fetching page ${pageId}…\n`);
  const result = await fetchPageMarkdown(pageId);

  console.log(result.markdown);

  if (result.truncated) {
    console.log(`\n⚠ Page was truncated. Unknown block IDs: ${result.unknown_block_ids.join(", ")}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
