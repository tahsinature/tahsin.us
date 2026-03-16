import { useRef, useState, useEffect, useCallback } from "react";
import { Camera, Focus, Aperture, Gauge, SunDim, Crosshair } from "lucide-react";
import type { PhotoMeta } from "@/data/photography";

interface ExifMetaDisplayProps {
  meta: PhotoMeta | null;
  /** Compact mode for hover overlays (fewer items, smaller text) */
  compact?: boolean;
}

const EXIF_ITEMS: { key: keyof PhotoMeta; icon: typeof Camera; color: string; prefix?: string }[] = [
  { key: "camera", icon: Camera, color: "text-accent" },
  { key: "lens", icon: Focus, color: "text-primary" },
  { key: "focalLength", icon: Crosshair, color: "text-accent" },
  { key: "aperture", icon: Aperture, color: "text-accent" },
  { key: "shutterSpeed", icon: Gauge, color: "text-primary" },
  { key: "iso", icon: SunDim, color: "text-primary", prefix: "ISO " },
];

/**
 * Renders available EXIF / photo metadata.
 * Non-compact: horizontal focus-ring dial with drag-to-scroll.
 * Compact: minimal inline display for hover overlays.
 */
export default function ExifMetaDisplay({ meta, compact = false }: ExifMetaDisplayProps) {
  if (compact) {
    if (!meta) return null;
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
                {i > 0 && <span className="text-white/25">&middot;</span>}
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  const hasAnyTechnical = meta && (meta.camera || meta.lens || meta.aperture || meta.shutterSpeed || meta.iso || meta.focalLength);

  if (!hasAnyTechnical) {
    return (
      <p className="text-muted-foreground/40 text-[11px] italic flex items-center gap-1.5">
        <Camera size={11} />
        No camera data available
      </p>
    );
  }

  return <FocusRingDial meta={meta} />;
}

/** Horizontal drag-scrollable focus-ring dial for EXIF metadata */
function FocusRingDial({ meta }: { meta: PhotoMeta }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const present = EXIF_ITEMS.filter((item) => meta[item.key]);

  const checkOverflow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkOverflow();
    el.addEventListener("scroll", checkOverflow, { passive: true });
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", checkOverflow);
      ro.disconnect();
    };
  }, [checkOverflow]);

  // Drag-to-scroll handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    el.scrollLeft = scrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    el.style.cursor = "";
  }, []);

  // Build mask for fade edges
  const maskImage = canScrollLeft && canScrollRight
    ? "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)"
    : canScrollLeft
      ? "linear-gradient(to right, transparent, black 24px)"
      : canScrollRight
        ? "linear-gradient(to right, black calc(100% - 24px), transparent)"
        : undefined;

  return (
    <div
      className="relative select-none"
      style={{
        /* Knurling texture — fine vertical lines on top/bottom */
        borderTop: "1.5px solid transparent",
        borderBottom: "1.5px solid transparent",
        borderImage: "repeating-linear-gradient(to right, var(--color-border) 0px, var(--color-border) 1px, transparent 1px, transparent 3px) 1",
      }}
    >
      <div
        ref={scrollRef}
        className="flex items-center gap-0 overflow-x-auto cursor-grab touch-pan-x"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitMaskImage: maskImage,
          maskImage,
          scrollSnapType: "x mandatory",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {present.map((item, i) => {
          const Icon = item.icon;
          const value = meta[item.key];
          return (
            <div key={item.key} className="flex items-center shrink-0" style={{ scrollSnapAlign: "start" }}>
              {/* Tick separator */}
              {i > 0 && (
                <div className="flex flex-col items-center mx-2.5 gap-[1px]">
                  <div className="w-px h-1.5 bg-border/60" />
                  <div className="w-px h-1 bg-border/30" />
                </div>
              )}
              {/* Item */}
              <span className="flex items-center gap-1.5 py-1.5 whitespace-nowrap text-muted-foreground text-[11px]">
                <Icon size={11} className={item.color} />
                <span>{item.prefix ?? ""}{value}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
