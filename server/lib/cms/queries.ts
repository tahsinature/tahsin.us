import client from "./client";
import config from "@server/config";

// ── Raw Notion property extractors ──

const text = (prop: unknown): string => ((prop as { rich_text: Array<{ plain_text: string }> })?.rich_text ?? []).map((t) => t.plain_text).join("");

const title = (prop: unknown): string => ((prop as { title: Array<{ plain_text: string }> })?.title ?? []).map((t) => t.plain_text).join("");

const checkbox = (prop: unknown): boolean => (prop as { checkbox: boolean })?.checkbox ?? false;

const relation = (prop: unknown): string[] => ((prop as { relation: Array<{ id: string }> })?.relation ?? []).map((r) => r.id);

const fileUrl = (prop: unknown): string => {
  const files = (prop as { files: Array<{ file?: { url: string }; external?: { url: string }; name: string }> })?.files ?? [];
  const f = files[0];
  return f?.file?.url ?? f?.external?.url ?? "";
};

const fileName = (prop: unknown): string => {
  const files = (prop as { files: Array<{ name: string }> })?.files ?? [];
  return files[0]?.name ?? "";
};

const date = (prop: unknown): { start: string; end: string | null } | null => (prop as { date: { start: string; end: string | null } | null })?.date ?? null;

// const number = (prop: unknown): number | null => (prop as { number: number | null })?.number ?? null;

// ── Types ──

export interface TripRecord {
  id: string;
  name: string;
  description: string;
  date: { start: string; end: string | null } | null;
  photoIds: string[];
}

export interface PhotoRecord {
  id: string;
  name: string;
  src: string;
  fileName: string;
  caption: string;
  isFav: boolean;
  exifRaw: string;
  tripIds: string[];
  dimensions: string;
}

// ── Shared query runner ──

interface QueryOptions<TFields extends string> {
  filter?: Record<string, unknown>;
  fields?: TFields[];
  limit?: number;
}

type NotionFilter = Record<string, unknown>;

const queryAll = async (
  dataSourceId: string,
  opts: {
    filterProperties?: string[];
    filter?: NotionFilter;
    sorts?: Array<{ property: string; direction: "ascending" | "descending" }>;
    limit?: number;
  },
) => {
  const results: Array<Record<string, unknown>> = [];
  let cursor: string | undefined;
  const pageSize = opts.limit ? Math.min(opts.limit, 100) : 100;

  do {
    const res = await client.dataSources.query({
      data_source_id: dataSourceId,
      ...(opts.filterProperties ? { filter_properties: opts.filterProperties } : {}),
      ...(opts.filter ? { filter: opts.filter } : {}),
      ...(opts.sorts ? { sorts: opts.sorts } : {}),
      page_size: pageSize,
      ...(cursor ? { start_cursor: cursor } : {}),
    } as Parameters<typeof client.dataSources.query>[0]);

    results.push(...(res.results as Array<Record<string, unknown>>));

    if (opts.limit && results.length >= opts.limit) {
      return results.slice(0, opts.limit);
    }

    cursor = res.has_more ? (res as { next_cursor?: string }).next_cursor : undefined;
  } while (cursor);

  return results;
};

// ── Trips ──

type TripField = keyof TripRecord;

const TRIP_PROPERTY_MAP: Record<TripField, string> = {
  id: "",
  name: "Name",
  description: "Description",
  date: "Date",
  photoIds: "Photos",
};

const tripNotionProps = (fields?: TripField[]): string[] | undefined => {
  if (!fields) return undefined;
  return fields
    .filter((f) => f !== "id")
    .map((f) => TRIP_PROPERTY_MAP[f])
    .filter(Boolean);
};

const mapTrip = (page: Record<string, unknown>, fields?: TripField[]): TripRecord => {
  const props = page.properties as Record<string, unknown>;
  const all = !fields;
  return {
    id: (page as { id: string }).id,
    name: all || fields!.includes("name") ? title(props.Name) : "",
    description: all || fields!.includes("description") ? text(props.Description) : "",
    date: all || fields!.includes("date") ? date(props.Date) : null,
    photoIds: all || fields!.includes("photoIds") ? relation(props.Photos) : [],
  };
};

export const fetchTrips = async (opts: QueryOptions<TripField> = {}): Promise<TripRecord[]> => {
  const conditions: NotionFilter[] = [];
  if (opts.filter) conditions.push(opts.filter);

  const results = await queryAll(config.cms.tripsDSId, {
    filterProperties: tripNotionProps(opts.fields),
    filter: conditions.length === 1 ? conditions[0] : conditions.length > 1 ? { and: conditions } : undefined,
    sorts: [{ property: "Date", direction: "descending" }],
    limit: opts.limit,
  });

  return results.map((page) => mapTrip(page, opts.fields));
};

// ── Photos ──

type PhotoField = keyof PhotoRecord;

const PHOTO_PROPERTY_MAP: Record<PhotoField, string> = {
  id: "",
  name: "Name",
  src: "Files",
  fileName: "Files",
  caption: "Caption",
  isFav: "Fav",
  exifRaw: "EXIF",
  tripIds: "Trips",
  dimensions: "Dimensions",
};

const photoNotionProps = (fields?: PhotoField[]): string[] | undefined => {
  if (!fields) return undefined;
  const props = new Set(
    fields
      .filter((f) => f !== "id")
      .map((f) => PHOTO_PROPERTY_MAP[f])
      .filter(Boolean),
  );
  // Always need Files to validate photo exists
  props.add("Files");
  return [...props];
};

const mapPhoto = (page: Record<string, unknown>, fields?: PhotoField[]): PhotoRecord | null => {
  const props = page.properties as Record<string, unknown>;
  const src = fileUrl(props.Files);
  if (!src) return null;

  const all = !fields;
  return {
    id: (page as { id: string }).id,
    name: all || fields!.includes("name") ? title(props.Name) || fileName(props.Files) : "",
    src,
    fileName: all || fields!.includes("fileName") ? fileName(props.Files) : "",
    caption: all || fields!.includes("caption") ? text(props.Caption) : "",
    isFav: all || fields!.includes("isFav") ? checkbox(props.Fav) : false,
    exifRaw: all || fields!.includes("exifRaw") ? text(props.EXIF) : "",
    tripIds: all || fields!.includes("tripIds") ? relation(props.Trips) : [],
    dimensions: all || fields!.includes("dimensions") ? text(props.Dimensions) : "",
  };
};

interface PhotoQueryOptions extends QueryOptions<PhotoField> {
  tripId?: string;
  favOnly?: boolean;
}

export const fetchPhotos = async (opts: PhotoQueryOptions = {}): Promise<PhotoRecord[]> => {
  const conditions: NotionFilter[] = [{ property: "Files", files: { is_not_empty: true } }];
  if (opts.tripId) conditions.push({ property: "Trips", relation: { contains: opts.tripId.replace(/-/g, "") } });
  if (opts.favOnly) conditions.push({ property: "Fav", checkbox: { equals: true } });
  if (opts.filter) conditions.push(opts.filter);

  const results = await queryAll(config.cms.photosDSId, {
    filterProperties: photoNotionProps(opts.fields),
    filter: conditions.length === 1 ? conditions[0] : { and: conditions },
    sorts: [{ property: "Fav", direction: "descending" }],
    limit: opts.limit,
  });

  return results.map((page) => mapPhoto(page, opts.fields)).filter((p): p is PhotoRecord => p !== null);
};
