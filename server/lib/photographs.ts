import { Client } from "@notionhq/client";

const DATA_SOURCE_ID = process.env.PHOTOS_DS_ID ?? "";

export interface PhotoData {
  src: string;
  name: string;
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

export async function fetchPhotographs(token: string): Promise<PhotographsResponse> {
  const notion = new Client({ auth: token });

  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    sorts: [{ property: "Date", direction: "descending" }],
  });

  const trips: TripData[] = [];
  const slugCounts = new Map<string, number>();

  for (const page of response.results) {
    const props = (page as Record<string, unknown>).properties as Record<string, unknown>;

    // Extract name
    const nameField = props.Name as { title: Array<{ plain_text: string }> };
    const name = nameField?.title?.[0]?.plain_text ?? "";
    if (!name) continue;

    // Extract files
    const filesField = props.Files as {
      files: Array<{ name: string; type: string; file?: { url: string }; external?: { url: string } }>;
    };
    const files = filesField?.files ?? [];
    if (files.length === 0) continue;

    // Extract description
    const descField = props.Description as { rich_text: Array<{ plain_text: string }> };
    const description = descField?.rich_text?.map((t) => t.plain_text).join("") ?? "";

    // Extract date
    const dateField = props.Date as { date: { start: string; end: string | null } | null };
    const { display: dateDisplay, raw: dateRaw } = formatDate(dateField?.date ?? null);

    // Extract favCount
    const favField = props.FavFirst as { number: number | null };
    const favCount = favField?.number ?? 0;

    // Generate slug with collision handling
    let slug = slugify(name);
    const count = slugCounts.get(slug) ?? 0;
    slugCounts.set(slug, count + 1);
    if (count > 0) {
      slug = `${slug}-${(page as { id: string }).id.slice(0, 8)}`;
    }

    // Build photos
    const photos: PhotoData[] = files.map((file, index) => ({
      src: file.type === "file" ? file.file!.url : file.external!.url,
      name: file.name,
      isFav: index < favCount,
      mediaType: getMediaType(file.name),
    }));

    trips.push({
      id: (page as { id: string }).id,
      slug,
      name,
      coverImage: photos[0].src,
      description,
      date: dateDisplay,
      dateRaw,
      photoCount: photos.length,
      favCount,
      photos,
    });
  }

  return { trips, fetchedAt: Date.now() };
}
