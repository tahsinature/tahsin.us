/**
 * Generate and apply captions for uncaptioned photos in the Photos DB.
 * Run from Claude CLI — the agent views images and generates captions.
 *
 * Usage:
 *   bun scripts/photography/update-captions.ts fetch    — download photos & scaffold captions.json
 *   bun scripts/photography/update-captions.ts apply    — push captions from captions.json to Notion
 *
 * Flow:
 *   1. Agent runs with `fetch` → downloads uncaptioned photos, scaffolds captions.json
 *   2. Agent views each image, writes captions to captions.json
 *   3. Agent prints the captions.json path and STOPS — does NOT run apply yet
 *   4. Agent tells the user to review the captions.json file (user opens it, reviews
 *      each photo + caption, edits if needed)
 *   5. User confirms they're happy → agent runs with `apply` → captions pushed to Notion
 *
 * IMPORTANT for AI agent:
 *   - After writing captions.json, DO NOT run `apply` automatically.
 *   - Instead, tell the user: "Captions are ready for review at <path to captions.json>.
 *     Open the file, review each caption (photos are at the file paths listed), and
 *     let me know when you're ready to apply."
 *   - Only run `apply` after the user explicitly approves.
 *
 * Caption tone: editorial travel magazine. One sentence, ~10-20 words.
 * Describe the scene/mood/moment. Use specific place names. Never "A photo of".
 */
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "fs";
import { fetchPhotos, updateCaption } from "./notion";

// ── Config ──

const dryRun: boolean = false;
const force: boolean = false;
const tripId: string = "";
const favOnly: boolean = false;
const nameFilter: string = "";

// ── Constants ──

const DIR = "/tmp/photos-preview";
const CAPTIONS = `${DIR}/captions.json`;

// ── Commands ──

async function cmdFetch() {
  const photos = await fetchPhotos({ force, tripId, favOnly, nameFilter });
  if (!photos.length) { console.log("No photos to caption."); return; }

  console.log(`\nFound ${photos.length} photo(s) without captions. Downloading...\n`);

  rmSync(DIR, { recursive: true, force: true });
  mkdirSync(DIR, { recursive: true });

  await Promise.all(photos.map(async (photo) => {
    if (!photo.fileUrl) return;
    const res = await fetch(photo.fileUrl);
    writeFileSync(`${DIR}/${photo.name}.jpg`, Buffer.from(await res.arrayBuffer()));
  }));

  const scaffold: Record<string, { file: string; caption: string }> = {};
  for (const p of photos) scaffold[p.name] = { file: `${DIR}/${p.name}.jpg`, caption: "" };
  writeFileSync(CAPTIONS, JSON.stringify(scaffold, null, 2));

  console.table(photos.map((p) => ({ photo: `${DIR}/${p.name}.jpg`, caption: "(empty)" })));
  console.log(`\nCaptions file: ${CAPTIONS}`);
}

async function cmdApply() {
  if (!existsSync(CAPTIONS)) { console.error("No captions.json found. Run `fetch` first."); process.exit(1); }

  const map: Record<string, { file: string; caption: string }> = JSON.parse(readFileSync(CAPTIONS, "utf-8"));
  const photos = await fetchPhotos({ force, tripId, favOnly, nameFilter });

  console.table(photos.map((p) => ({
    photo: map[p.name]?.file ?? p.name,
    caption: map[p.name]?.caption || "(empty)",
  })));

  const toUpdate = photos.filter((p) => map[p.name]?.caption);
  await Promise.all(toUpdate.map(async (p) => {
    const c = map[p.name].caption;
    if (!dryRun) await updateCaption(p.id, c);
    console.log(`  ${dryRun ? "would update" : "done"}: ${p.name} → "${c}"`);
  }));
  console.log(`\n${dryRun ? "Would update" : "Updated"}: ${toUpdate.length}`);
}

// ── Entry ──

const cmd = process.argv[2];
if (cmd === "apply") cmdApply().catch(console.error);
else if (cmd === "fetch" || !cmd) cmdFetch().catch(console.error);
else { console.error(`Unknown command: ${cmd}. Use "fetch" or "apply".`); process.exit(1); }
