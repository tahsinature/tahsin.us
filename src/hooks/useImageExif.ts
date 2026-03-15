import type { PhotoMeta } from "@/data/photography";

/**
 * Returns EXIF metadata for a photo.
 * Data is now served from the Notion database — no client-side parsing needed.
 */
export const useImageExif = (_src: string, manualMeta?: PhotoMeta): { meta: PhotoMeta | null; loading: boolean } => ({
  meta: manualMeta ?? null,
  loading: false,
});
