import { Client } from "@notionhq/client";

const TRIPS_DS_ID = process.env.PHOTOS_DS_ID ?? "";
const PHOTOS_DS_ID = "323960ad-d9d3-80af-8586-000b87acbf60";

// ── Types ──

export interface TripData {
  id: string;
  slug: string;
  name: string;
  coverImage: string;
  description: string;
  date: string;
  dateRaw: string;
  photoCount: number;
}

export interface PhotoData {
  src: string;
  name: string;
  caption: string;
  isFav: boolean;
  mediaType: "image" | "video" | "gif";
}

// ── Helpers ──

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

// ── Fetch cover image for a trip ──

async function fetchCoverImage(notion: Client, tripId: string): Promise<string> {
  const res = await notion.dataSources.query({
    data_source_id: PHOTOS_DS_ID,
    filter_properties: ["Files", "Fav"],
    filter: {
      and: [
        { property: "Trips", relation: { contains: tripId.replace(/-/g, "") } },
        { property: "Files", files: { is_not_empty: true } },
      ],
    },
    sorts: [{ property: "Fav", direction: "descending" }],
    page_size: 1,
  } as Parameters<typeof notion.dataSources.query>[0]);

  const page = res.results[0];
  if (!page) return "";
  const props = (page as Record<string, unknown>).properties as Record<string, unknown>;
  const files = (props.Files as { files: Array<{ file?: { url: string }; external?: { url: string } }> })?.files ?? [];
  const firstFile = files[0];
  return firstFile?.file?.url ?? firstFile?.external?.url ?? "";
}

// ── Fetch trips ──

export async function fetchTrips(token: string): Promise<TripData[]> {
  const notion = new Client({ auth: token });

  const response = await notion.dataSources.query({
    data_source_id: TRIPS_DS_ID,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const slugCounts = new Map<string, number>();

  interface TripMeta {
    id: string;
    slug: string;
    name: string;
    description: string;
    dateDisplay: string;
    dateRaw: string;
    photoCount: number;
  }

  const metas: TripMeta[] = [];

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

    let slug = slugify(name);
    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${(page as { id: string }).id.slice(0, 8)}`;

    metas.push({
      id: (page as { id: string }).id,
      slug,
      name,
      description,
      dateDisplay,
      dateRaw,
      photoCount: photosRelation.length,
    });
  }

  // Fetch cover images in parallel
  const covers = await Promise.all(
    metas.map((m) => (m.photoCount > 0 ? fetchCoverImage(notion, m.id) : Promise.resolve(""))),
  );

  return metas.map((m, i) => ({
    id: m.id,
    slug: m.slug,
    name: m.name,
    coverImage: covers[i],
    description: m.description,
    date: m.dateDisplay,
    dateRaw: m.dateRaw,
    photoCount: m.photoCount,
  }));
}

// ── Fetch photos ──

export async function fetchPhotos(token: string, tripId?: string, favOnly?: boolean): Promise<PhotoData[]> {
  const notion = new Client({ auth: token });

  const conditions: Record<string, unknown>[] = [
    { property: "Files", files: { is_not_empty: true } },
  ];
  if (tripId) conditions.push({ property: "Trips", relation: { contains: tripId.replace(/-/g, "") } });
  if (favOnly) conditions.push({ property: "Fav", checkbox: { equals: true } });

  const filter: Record<string, unknown> = conditions.length === 1 ? conditions[0] : { and: conditions };

  const photos: PhotoData[] = [];
  let cursor: string | undefined;

  do {
    const res = await notion.dataSources.query({
      data_source_id: PHOTOS_DS_ID,
      filter_properties: ["Name", "Files", "Caption", "Fav"],
      filter,
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

  // Sort: favs first
  photos.sort((a, b) => (a.isFav === b.isFav ? 0 : a.isFav ? -1 : 1));

  return photos;
}
