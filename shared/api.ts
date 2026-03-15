/** Shared API response types — used by both client and server. */

// ── /api/ops/health ──

export interface HealthResponse {
  status: "ok";
  uptime: number;
}

// ── /api/ops/cache/bust ──

export interface CacheBustResponse {
  cleared: true;
}

// ── /api/trips ──

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

export interface TripsResponse {
  trips: TripData[];
}

// ── /api/photos ──

export type MediaType = "image" | "video" | "gif";

export interface PhotoData {
  src: string;
  name: string;
  caption: string;
  isFav: boolean;
  mediaType: MediaType;
}

export interface PhotosResponse {
  photos: PhotoData[];
}

// ── /api/pages/:name, /api/notion/:pageId ──

export interface NotionPageResponse {
  markdown: string;
  truncated: boolean;
  unknown_block_ids: string[];
}

// ── /api/notion/resolve-files ──

export interface ResolveFilesRequest {
  blockIds: string[];
}

export interface ResolvedFile {
  blockId: string;
  url: string | null;
  name?: string;
}

// ── /api/geo ──

export interface GeoResponse {
  ip: string;
  city: string;
  region: string;
  country: string;
  [key: string]: unknown;
}

// ── Common error shape ──

export interface ApiError {
  error: string;
}
