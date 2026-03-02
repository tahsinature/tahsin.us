import { useCallback, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "@/components/MotionWrapper";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import { useImageExif } from "@/hooks/useImageExif";
import type { Photo } from "@/data/trips";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoLightbox({ photos, index, onClose, onNext, onPrev }: PhotoLightboxProps) {
  return (
    <AnimatePresence>
      {index !== null && (
        <LightboxOverlay
          photos={photos}
          index={index}
          onClose={onClose}
          onNext={onNext}
          onPrev={onPrev}
        />
      )}
    </AnimatePresence>
  );
}

function LightboxOverlay({ photos, index, onClose, onNext, onPrev }: { photos: Photo[]; index: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const photo = photos[index];
  const { meta } = useImageExif(photo.src, photo.meta);

  // Stable refs for callbacks
  const onCloseRef = useRef(onClose);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);
  onCloseRef.current = onClose;
  onNextRef.current = onNext;
  onPrevRef.current = onPrev;

  // Track whether close was triggered by browser back button
  const closedByBackRef = useRef(false);

  // Close handler: if NOT triggered by back button, clean up history entry first
  const handleClose = useCallback(() => {
    if (!closedByBackRef.current && window.history.state?.lightbox) {
      // Remove our history entry before closing
      closedByBackRef.current = true;
      window.history.back();
    }
    onCloseRef.current();
  }, []);

  // Keyboard + scroll lock + back button — mount only
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") onNextRef.current();
      if (e.key === "ArrowLeft") onPrevRef.current();
    };

    const handlePopState = () => {
      closedByBackRef.current = true;
      onCloseRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.history.pushState({ lightbox: true }, "");
    window.addEventListener("popstate", handlePopState);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col touch-pan-y"
      onClick={handleClose}
      role="dialog"
      aria-label="Photo lightbox"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_e, info) => {
        if (info.offset.x < -80 && index < photos.length - 1) onNext();
        else if (info.offset.x > 80 && index > 0) onPrev();
      }}
    >
      {/* Close button */}
      <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 cursor-pointer">
        <X size={24} />
      </button>

      {/* Nav arrows */}
      <button
        disabled={index === 0}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className={`hidden md:block absolute left-4 md:left-8 top-1/2 -translate-y-1/2 transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border ${
          index === 0 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer"
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        disabled={index === photos.length - 1}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className={`hidden md:block absolute right-4 md:right-8 top-1/2 -translate-y-1/2 transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border ${
          index === photos.length - 1 ? "opacity-30 cursor-not-allowed" : "text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer"
        }`}
      >
        <ChevronRight size={24} />
      </button>

      {/* Image — sits above caption, centered */}
      <div className="flex-1 min-h-0 flex items-center justify-center pt-12 md:pt-10">
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={photo.src}
          alt={photo.alt}
          className="w-[92vw] md:w-[calc(100vw-120px)] h-full object-contain rounded"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Caption — fixed zone at bottom, never overlapped */}
      <div className="shrink-0 py-3 px-4 text-center z-10" onClick={(e) => e.stopPropagation()}>
        <p className="text-foreground text-sm font-medium mb-1">{photo.alt}</p>
        {meta && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded px-4 py-3 mt-2 max-w-lg mx-auto">
            <ExifMetaDisplay meta={meta} />
          </div>
        )}
        <p className="text-muted-foreground text-xs mt-2">
          {index + 1} / {photos.length}
        </p>
      </div>
    </motion.div>
  );
}
