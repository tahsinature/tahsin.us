/** Shared API response types — used by both client and server. */

// ── /api/ops/health ──

export interface HealthResponse {
  status: "ok";
  uptime: number;
}

// ── /api/ops/config ──

export interface AppConfig {
  debugMode: boolean;
  maintenanceMode: boolean;
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

export interface PhotoExif {
  camera?: string | null;
  lens?: string | null;
  focalLength?: string | null;
  aperture?: string | null;
  shutterSpeed?: string | null;
  iso?: string | null;
}

export interface PhotoData {
  src: string;
  name: string;
  caption: string;
  isFav: boolean;
  mediaType: MediaType;
  exif: PhotoExif | null;
  tripIds: string[];
  width: number | null;
  height: number | null;
}

export interface PhotosResponse {
  photos: PhotoData[];
}

// ── /api/pages/:name, /api/cms/:pageId ──

export interface PageResponse {
  markdown: string;
  truncated: boolean;
  unknown_block_ids: string[];
}

// ── /api/cms/resolve-files ──

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
