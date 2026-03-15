import type { PhotoMeta } from "@/data/photography";

/**
 * Returns the manually-provided photo metadata.
 * EXIF parsing was removed since Notion strips EXIF data on upload.
 */
export const useImageExif = (_src: string, manualMeta?: PhotoMeta): { meta: PhotoMeta | null; loading: boolean } => {
  return { meta: manualMeta ?? null, loading: false };
};
