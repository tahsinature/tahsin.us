/**
 * Upload photos from a directory to the Photos DB (Files column).
 * Each file becomes a new row: Name = filename (without extension), Files = uploaded file.
 *
 * Usage:
 *   bun scripts/photography/upload-photos.ts [directory] [--trip <trip-page-id>] [--dry-run]
 *
 * If directory or trip is omitted, you'll be prompted interactively.
 */
import { readdirSync } from "fs";
import { basename, extname, join, resolve } from "path";
import prompts from "prompts";
import { uploadFile, createPhotoPage, fetchTrips } from "./notion";

// ── Constants ──

const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

// ── Args ──

const args = process.argv.slice(2);
const rawDir = args.find((a) => !a.startsWith("--"));
const dryRun = args.includes("--dry-run");
const tripIdx = args.indexOf("--trip");
const argTripId = tripIdx !== -1 ? args[tripIdx + 1] : undefined;

const resolvePath = (p: string) => resolve(p.replace(/^['"]|['"]$/g, ""));

// ── Interactive prompts ──

async function askDir(): Promise<string> {
  const { dir } = await prompts({
    type: "text",
    name: "dir",
    message: "Photo directory",
  });
  if (!dir) process.exit(0);
  return resolvePath(dir);
}

interface SelectedTrip { id: string; name: string; photoCount: number }

let tripsCache: { id: string; name: string }[] | null = null;

async function getTrips() {
  if (!tripsCache) {
    console.log("  fetching trips...");
    tripsCache = await fetchTrips();
  }
  return tripsCache;
}

async function askTrip(): Promise<SelectedTrip | undefined> {
  const trips = await getTrips();

  const { tripId } = await prompts({
    type: "autocomplete",
    name: "tripId",
    message: "Link to trip (type to search, enter to skip)",
    choices: [
      { title: "(none)", value: "" },
      ...trips.map((t) => ({
        title: `${t.name}${t.date ? ` — ${t.date}` : ""} (${t.photoCount} photos)`,
        value: t.id,
      })),
    ],
    suggest: (input: string, choices: { title: string; value: string }[]) => {
      const q = input.toLowerCase();
      return Promise.resolve(choices.filter((c) => c.title.toLowerCase().includes(q)));
    },
  });

  if (tripId === undefined) process.exit(0);
  if (!tripId) return undefined;
  const trip = trips.find((t) => t.id === tripId)!;
  return { id: trip.id, name: trip.name, photoCount: trip.photoCount };
}

async function resolveTripFromArg(id: string): Promise<SelectedTrip> {
  const trips = await getTrips();
  const trip = trips.find((t) => t.id === id);
  return { id, name: trip?.name ?? id, photoCount: trip?.photoCount ?? 0 };
}

// ── Main ──

async function main() {
  const dir = (rawDir ? resolvePath(rawDir) : await askDir()).trim();

  const files = readdirSync(dir)
    .filter((f) => SUPPORTED_EXTS.has(extname(f).toLowerCase()))
    .sort();

  if (!files.length) {
    console.log("No supported image files found.");
    return;
  }

  const trip = argTripId ? await resolveTripFromArg(argTripId) : await askTrip();

  // Confirmation summary
  console.log(`\n── Upload Summary ──`);
  console.log(`  Directory:  ${dir}`);
  console.log(`  Photos:     ${files.length} new file(s)`);
  if (trip) {
    console.log(`  Trip:       ${trip.name}`);
    console.log(`  Existing:   ${trip.photoCount} photo(s)`);
    console.log(`  After:      ${trip.photoCount + files.length} photo(s)`);
  } else {
    console.log(`  Trip:       (none)`);
  }
  console.log();
  console.table(files.map((f) => ({ file: f, name: basename(f, extname(f)) })));

  if (dryRun) {
    console.log("\n--dry-run: no changes made.");
    return;
  }

  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Proceed with upload?",
    initial: true,
  });
  if (!confirm) { console.log("Aborted."); return; }

  await Promise.all(
    files.map(async (file) => {
      const filePath = join(dir, file);
      const name = basename(file, extname(file));
      const fileUploadId = await uploadFile(filePath);
      await createPhotoPage(name, fileUploadId, trip?.id);
      console.log(`  done: ${name}`);
    }),
  );

  console.log(`\nUploaded: ${files.length}`);
}

main().catch(console.error);
