import { useEffect, useState } from "react";
import exifr from "exifr";
import type { PhotoMeta } from "@/data/photography";

/**
 * Reads EXIF metadata from an image URL and merges it with any manually-provided meta.
 * Manual values take precedence — EXIF is used to fill in blanks.
 * Returns `null` while loading, or the merged PhotoMeta.
 */
export const useImageExif = (src: string, manualMeta?: PhotoMeta): { meta: PhotoMeta | null; loading: boolean } => {
  const [meta, setMeta] = useState<PhotoMeta | null>(manualMeta ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const readExif = async () => {
      try {
        const exif = await exifr.parse(src, {
          pick: ["Make", "Model", "LensModel", "LensMake", "FocalLength", "FNumber", "ExposureTime", "ISO", "ISOSpeedRatings"],
        });

        if (cancelled || !exif) {
          // No EXIF found — just use manual meta
          if (!cancelled) {
            setMeta(manualMeta ?? null);
            setLoading(false);
          }
          return;
        }

        const exifMeta: PhotoMeta = {};

        // Camera: combine Make + Model
        if (exif.Make || exif.Model) {
          const make = (exif.Make || "").trim();
          const model = (exif.Model || "").trim();
          // Avoid duplicating make if it's already in the model string
          exifMeta.camera = model.toLowerCase().startsWith(make.toLowerCase()) ? model : `${make} ${model}`.trim();
        }

        // Lens
        if (exif.LensModel) {
          exifMeta.lens = exif.LensModel;
        }

        // Focal length
        if (exif.FocalLength) {
          exifMeta.focalLength = `${Math.round(exif.FocalLength)}mm`;
        }

        // Aperture
        if (exif.FNumber) {
          exifMeta.aperture = `f/${exif.FNumber}`;
        }

        // Shutter speed
        if (exif.ExposureTime) {
          const t = exif.ExposureTime;
          exifMeta.shutterSpeed = t >= 1 ? `${t}s` : `1/${Math.round(1 / t)}s`;
        }

        // ISO
        const iso = exif.ISO ?? exif.ISOSpeedRatings;
        if (iso) {
          exifMeta.iso = String(iso);
        }

        if (!cancelled) {
          // Merge: manual values win, EXIF fills gaps
          setMeta({
            ...exifMeta,
            ...Object.fromEntries(Object.entries(manualMeta ?? {}).filter(([, v]) => v !== undefined && v !== "")),
          } as PhotoMeta);
          setLoading(false);
        }
      } catch {
        // EXIF read failed (CORS, no EXIF, etc.) — silently fall back to manual meta
        if (!cancelled) {
          setMeta(manualMeta ?? null);
          setLoading(false);
        }
      }
    };

    readExif();

    return () => {
      cancelled = true;
    };
  }, [src, manualMeta]);

  return { meta, loading };
};
