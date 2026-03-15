import { Camera, Focus, Aperture, Gauge, MapPin, SunDim, Crosshair } from "lucide-react";
import type { PhotoMeta } from "@/data/photography";
import MarqueeText from "@/components/MarqueeText";

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
    const settings = [meta.focalLength, meta.aperture, meta.shutterSpeed, meta.iso ? `ISO ${meta.iso}` : undefined].filter(Boolean);
    return (
      <div className="space-y-1 text-white/70 text-[11px]">
        {(meta.camera || meta.lens) && (
          <div className="flex items-center gap-2">
            {meta.camera && (
              <span className="flex items-center gap-1">
                <Camera size={10} className="text-white/50" />
                {meta.camera}
              </span>
            )}
            {meta.lens && (
              <span className="flex items-center gap-1">
                <Focus size={10} className="text-white/50" />
                {meta.lens}
              </span>
            )}
          </div>
        )}
        {settings.length > 0 && (
          <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
            {settings.map((s, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/25">·</span>}
                {s}
              </span>
            ))}
          </div>
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
        <div className="group">
          <MarqueeText autoScroll delay={2} className="flex items-center justify-center gap-x-4 text-muted-foreground text-[11px]">
            {meta.camera && (
              <span className="flex items-center gap-1 shrink-0">
                <Camera size={11} className="text-accent" />
                {meta.camera}
              </span>
            )}
            {meta.lens && (
              <span className="flex items-center gap-1 shrink-0">
                <Focus size={11} className="text-primary" />
                {meta.lens}
              </span>
            )}
            {meta.focalLength && (
              <span className="flex items-center gap-1 shrink-0">
                <Crosshair size={11} className="text-accent" />
                {meta.focalLength}
              </span>
            )}
            {meta.aperture && (
              <span className="flex items-center gap-1 shrink-0">
                <Aperture size={11} className="text-accent" />
                {meta.aperture}
              </span>
            )}
            {meta.shutterSpeed && (
              <span className="flex items-center gap-1 shrink-0">
                <Gauge size={11} className="text-primary" />
                {meta.shutterSpeed}
              </span>
            )}
            {meta.iso && (
              <span className="flex items-center gap-1 shrink-0">
                <SunDim size={11} className="text-primary" />
                ISO {meta.iso}
              </span>
            )}
          </MarqueeText>
        </div>
      )}
    </>
  );
}
