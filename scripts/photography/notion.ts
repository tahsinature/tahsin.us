/**
 * Shared Notion helpers for photography scripts.
 */
import { Client } from "@notionhq/client";
import { readFileSync } from "fs";
import { basename, extname } from "path";

// ── IDs ──

export const PHOTOS_DS_ID = "323960ad-d9d3-80af-8586-000b87acbf60";
export const PHOTOS_DB_ID = "323960ad-d9d3-808b-8662-e89aa488db65";
export const TRIPS_DS_ID = "322960ad-d9d3-8024-9334-000b1088e996";

// ── Client ──

const N_TOK = process.env.N_TOK;
if (!N_TOK) { console.error("N_TOK not set"); process.exit(1); }
export const notion = new Client({ auth: N_TOK });

// ── Types ──

export interface Photo {
  id: string;
  name: string;
  caption: string;
  isFav: boolean;
  tripIds: string[];
  fileUrl: string;
}

export interface Trip {
  id: string;
  name: string;
  date: string;
  photoCount: number;
}

export interface FetchPhotosOptions {
  force?: boolean;
  tripId?: string;
  favOnly?: boolean;
  nameFilter?: string;
}

// ── Queries ──

/** Fetch all trips from the Trips DB. */
export async function fetchTrips(): Promise<Trip[]> {
  const rows: Trip[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: TRIPS_DS_ID,
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    for (const page of res.results) {
      const p = page as Record<string, unknown>;
      const props = p.properties as Record<string, unknown>;
      const dateField = (props.Date as { date: { start: string; end: string | null } | null })?.date;
      const photosRelation = (props.Photos as { relation: Array<{ id: string }> })?.relation ?? [];
      rows.push({
        id: (p as { id: string }).id,
        name: (props.Name as { title: Array<{ plain_text: string }> })?.title?.[0]?.plain_text ?? "",
        date: dateField?.start ?? "",
        photoCount: photosRelation.length,
      });
    }
    cursor = res.has_more ? (res as { next_cursor?: string }).next_cursor : undefined;
  } while (cursor);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

/** Fetch photos from the Photos DB. By default only returns rows with a file and no caption. */
export async function fetchPhotos(opts: FetchPhotosOptions = {}): Promise<Photo[]> {
  const { force, tripId, favOnly, nameFilter } = opts;

  const filter: Record<string, unknown> = force
    ? { property: "Files", files: { is_not_empty: true } }
    : { and: [
        { property: "Files", files: { is_not_empty: true } },
        { property: "Caption", rich_text: { is_empty: true } },
      ] };

  const rows: Photo[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.dataSources.query({
      data_source_id: PHOTOS_DS_ID,
      filter,
      ...(cursor ? { start_cursor: cursor } : {}),
    } as Parameters<typeof notion.dataSources.query>[0]);

    for (const page of res.results) {
      const p = page as Record<string, unknown>;
      const props = p.properties as Record<string, unknown>;
      const files = (props.Files as { files: Array<{ file?: { url: string }; external?: { url: string } }> })?.files ?? [];
      const firstFile = files[0];
      rows.push({
        id: (p as { id: string }).id,
        name: (props.Name as { title: Array<{ plain_text: string }> })?.title?.[0]?.plain_text ?? "",
        caption: (props.Caption as { rich_text: Array<{ plain_text: string }> })?.rich_text?.[0]?.plain_text ?? "",
        isFav: (props.Fav as { checkbox: boolean })?.checkbox ?? false,
        tripIds: ((props.Trips as { relation: Array<{ id: string }> })?.relation ?? []).map((r) => r.id),
        fileUrl: firstFile?.file?.url ?? firstFile?.external?.url ?? "",
      });
    }
    cursor = res.has_more ? (res as { next_cursor?: string }).next_cursor : undefined;
  } while (cursor);

  // Client-side filters (not supported by Notion query API)
  let filtered = rows;
  if (tripId) filtered = filtered.filter((p) => p.tripIds.includes(tripId));
  if (favOnly) filtered = filtered.filter((p) => p.isFav);
  if (nameFilter) { const q = nameFilter.toLowerCase(); filtered = filtered.filter((p) => p.name.toLowerCase().includes(q)); }

  return filtered;
}

// ── Mutations ──

/** Update a photo's caption in Notion. */
export async function updateCaption(pageId: string, caption: string) {
  await notion.pages.update({
    page_id: pageId,
    properties: { Caption: { rich_text: [{ text: { content: caption } }] } },
  });
}

/** Upload a local file to Notion and return the file upload ID. */
export async function uploadFile(filePath: string): Promise<string> {
  const name = basename(filePath);
  const ext = extname(filePath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : ext === ".gif" ? "image/gif" : ext === ".webp" ? "image/webp" : "image/jpeg";

  const upload = await notion.fileUploads.create({
    mode: "single_part",
    filename: name,
    content_type: contentType,
  });

  const fileData = readFileSync(filePath);
  await notion.fileUploads.send({
    file_upload_id: upload.id,
    file: { filename: name, data: new Blob([fileData], { type: contentType }) },
  });

  return upload.id;
}

/** Create a new row in the Photos DB with a file attached. */
export async function createPhotoPage(name: string, fileUploadId: string, tripId?: string) {
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: name } }] },
    Files: { files: [{ type: "file_upload", file_upload: { id: fileUploadId } }] },
  };
  if (tripId) properties.Trips = { relation: [{ id: tripId }] };

  await notion.pages.create({
    parent: { database_id: PHOTOS_DB_ID },
    properties,
  } as Parameters<typeof notion.pages.create>[0]);
}
