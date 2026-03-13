import { useState, useCallback, useMemo, useContext } from "react";
import PhotoLightbox from "@/components/PhotoLightbox";
import type { DirectiveProps } from "../types";
import { ImageViewerContext } from "../contexts";

export default function ImageGridDirective({ props }: { props: DirectiveProps }) {
  const { photos: globalPhotos, open: globalOpen } = useContext(ImageViewerContext);
  const { title, columns: colsProp, images, isolated: isolatedProp } = props;
  const maxShow = parseInt((props["max-show"] as string) ?? "0", 10);
  const cols = parseInt((colsProp as string) ?? "3", 10);
  const srcs = useMemo(() => (images as string[]) ?? [], [images]);
  const isIsolated = isolatedProp !== undefined;

  const [isolatedIndex, setIsolatedIndex] = useState<number | null>(null);
  const isolatedPhotos = useMemo(() => srcs.map((src) => ({ src, alt: "" })), [srcs]);

  const visibleCount = maxShow > 0 ? Math.min(maxShow, srcs.length) : srcs.length;
  const remaining = srcs.length - visibleCount;
  const visible = srcs.slice(0, visibleCount);

  const handleClick = useCallback((srcIndex: number) => {
    if (isIsolated) {
      setIsolatedIndex(srcIndex);
    } else {
      const globalIndex = globalPhotos.findIndex((p) => p.src === srcs[srcIndex]);
      if (globalIndex !== -1) globalOpen(globalIndex);
    }
  }, [isIsolated, globalPhotos, globalOpen, srcs]);

  return (
    <div className="my-4">
      {title && <h3 className="text-sm font-semibold text-foreground mb-3">{title as string}</h3>}
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {visible.map((src, i) => {
          const isLast = i === visibleCount - 1 && remaining > 0;
          return (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted/20 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleClick(i)}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">+{remaining}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isIsolated && (
        <PhotoLightbox
          photos={isolatedPhotos}
          index={isolatedIndex}
          onClose={() => setIsolatedIndex(null)}
          onNext={() => setIsolatedIndex((i) => (i !== null && i < srcs.length - 1 ? i + 1 : i))}
          onPrev={() => setIsolatedIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
        />
      )}
    </div>
  );
}
