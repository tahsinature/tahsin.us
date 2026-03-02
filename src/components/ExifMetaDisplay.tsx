import { Camera, Focus, Aperture, Gauge, MapPin } from "lucide-react";
import type { PhotoMeta } from "@/data/photography";

interface ExifMetaDisplayProps {
  meta: PhotoMeta | null;
  /** Compact mode for hover overlays (fewer items, smaller text) */
  compact?: boolean;
}

/**
 * Renders available EXIF / photo metadata.
 * Gracefully handles missing fields — only shows what exists.
 */
export default function ExifMetaDisplay({ meta, compact = false }: ExifMetaDisplayProps) {
  if (!meta) return null;

  const hasAnyTechnical = meta.camera || meta.lens || meta.aperture || meta.shutterSpeed || meta.iso || meta.focalLength;

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70 text-[11px]">
        {meta.location && (
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {meta.location}
          </span>
        )}
        {meta.camera && (
          <span className="flex items-center gap-1">
            <Camera size={10} />
            {meta.camera}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      {meta.location && (
        <p className="text-muted-foreground text-xs mb-2 flex items-center justify-center gap-1.5">
          <MapPin size={12} className="text-warm" />
          {meta.location}
        </p>
      )}
      {hasAnyTechnical && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-muted-foreground text-[11px]">
          {meta.camera && (
            <span className="flex items-center gap-1">
              <Camera size={11} className="text-accent" />
              {meta.camera}
            </span>
          )}
          {meta.lens && (
            <span className="flex items-center gap-1">
              <Focus size={11} className="text-primary" />
              {meta.lens}
            </span>
          )}
          {meta.aperture && (
            <span className="flex items-center gap-1">
              <Aperture size={11} className="text-accent" />
              {meta.aperture}
            </span>
          )}
          {meta.shutterSpeed && (
            <span className="flex items-center gap-1">
              <Gauge size={11} className="text-primary" />
              {meta.shutterSpeed}
            </span>
          )}
          {meta.iso && <span>ISO {meta.iso}</span>}
          {meta.focalLength && <span>{meta.focalLength}</span>}
        </div>
      )}
    </>
  );
}
