import { Client } from "@notionhq/client";

const TRIPS_DS_ID = process.env.PHOTOS_DS_ID ?? "";
const PHOTOS_DS_ID = "323960ad-d9d3-80af-8586-000b87acbf60";

export interface PhotoData {
  src: string;
  name: string;
  caption: string;
  isFav: boolean;
  mediaType: "image" | "video" | "gif";
}

export interface TripData {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  description: string;
  date: string;
  dateRaw: string;
  photoCount: number;
  favCount: number;
  photos: PhotoData[];
}

export interface PhotographsResponse {
  trips: TripData[];
  fetchedAt: number;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getMediaType(filename: string): "image" | "video" | "gif" {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "gif") return "gif";
  if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext)) return "video";
  return "image";
}

function formatDate(date: { start: string; end: string | null } | null): { display: string; raw: string } {
  if (!date?.start) return { display: "", raw: "" };

  const start = new Date(date.start + "T00:00:00");
  const startMonth = start.toLocaleString("en-US", { month: "short" });
  const startDay = start.getDate();
  const startYear = start.getFullYear();

  if (!date.end) {
    return {
      display: `${startMonth} ${startDay}, ${startYear}`,
      raw: date.start,
    };
  }

  const end = new Date(date.end + "T00:00:00");
  const endMonth = end.toLocaleString("en-US", { month: "short" });
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return {
      display: `${startMonth} ${startDay}–${endDay}, ${startYear}`,
      raw: date.start,
    };
  }

  if (startYear === endYear) {
    return {
      display: `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`,
      raw: date.start,
    };
  }

  return {
    display: `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`,
    raw: date.start,
  };
}

// ── Fetch photos for a specific trip ──

async function fetchPhotosForTrip(
  notion: Client,
  tripId: string,
): Promise<PhotoData[]> {
  const photos: PhotoData[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: PHOTOS_DS_ID,
      filter_properties: ["Name", "Files", "Caption", "Fav"],
      filter: {
        and: [
          { property: "Trips", relation: { contains: tripId.replace(/-/g, "") } },
          { property: "Files", files: { is_not_empty: true } },
        ],
      },
      ...(cursor ? { start_cursor: cursor } : {}),
    } as Parameters<typeof notion.dataSources.query>[0]);

    for (const page of res.results) {
      const props = (page as Record<string, unknown>).properties as Record<string, unknown>;

      const name = (props.Name as { title: Array<{ plain_text: string }> })?.title?.[0]?.plain_text ?? "";
      const caption = (props.Caption as { rich_text: Array<{ plain_text: string }> })?.rich_text?.[0]?.plain_text ?? "";
      const isFav = (props.Fav as { checkbox: boolean })?.checkbox ?? false;
      const files = (props.Files as { files: Array<{ name: string; file?: { url: string }; external?: { url: string } }> })?.files ?? [];
      const firstFile = files[0];
      if (!firstFile) continue;

      const src = firstFile.file?.url ?? firstFile.external?.url ?? "";
      if (!src) continue;

      photos.push({
        src,
        name: name || firstFile.name,
        caption,
        isFav,
        mediaType: getMediaType(firstFile.name),
      });
    }

    cursor = res.has_more ? (res as { next_cursor?: string }).next_cursor : undefined;
  } while (cursor);

  return photos;
}

// ── Main fetch ──

export async function fetchPhotographs(token: string): Promise<PhotographsResponse> {
  const notion = new Client({ auth: token });

  // Step 1: Fetch all trips
  const response = await notion.dataSources.query({
    data_source_id: TRIPS_DS_ID,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const slugCounts = new Map<string, number>();

  // Step 2: Build trip metadata and collect photo relation IDs
  const tripMetas: Array<{
    id: string;
    name: string;
    description: string;
    dateDisplay: string;
    dateRaw: string;
    photoRelationIds: string[];
  }> = [];

  for (const page of response.results) {
    const props = (page as Record<string, unknown>).properties as Record<string, unknown>;

    const nameField = props.Name as { title: Array<{ plain_text: string }> };
    const name = nameField?.title?.[0]?.plain_text ?? "";
    if (!name) continue;

    const descField = props.Description as { rich_text: Array<{ plain_text: string }> };
    const description = descField?.rich_text?.map((t) => t.plain_text).join("") ?? "";

    const dateField = props.Date as { date: { start: string; end: string | null } | null };
    const { display: dateDisplay, raw: dateRaw } = formatDate(dateField?.date ?? null);

    const photosRelation = (props.Photos as { relation: Array<{ id: string }> })?.relation ?? [];

    tripMetas.push({
      id: (page as { id: string }).id,
      name,
      description,
      dateDisplay,
      dateRaw,
      photoRelationIds: photosRelation.map((r) => r.id),
    });
  }

  // Step 3: Fetch photos for all trips in parallel
  const tripPhotos = await Promise.all(
    tripMetas.map((trip) => fetchPhotosForTrip(notion, trip.id)),
  );

  // Step 4: Assemble trips
  const trips: TripData[] = [];
  for (let i = 0; i < tripMetas.length; i++) {
    const meta = tripMetas[i];
    const photos = tripPhotos[i];
    if (photos.length === 0) continue;

    let slug = slugify(meta.name);
    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) {
      slug = `${slug}-${meta.id.slice(0, 8)}`;
    }

    // Sort: favs first
    photos.sort((a, b) => (a.isFav === b.isFav ? 0 : a.isFav ? -1 : 1));

    const favCount = photos.filter((p) => p.isFav).length;

    trips.push({
      id: meta.id,
      slug,
      name: meta.name,
      coverImage: photos[0].src,
      description: meta.description,
      date: meta.dateDisplay,
      dateRaw: meta.dateRaw,
      photoCount: photos.length,
      favCount,
      photos,
    });
  }

  return { trips, fetchedAt: Date.now() };
}
