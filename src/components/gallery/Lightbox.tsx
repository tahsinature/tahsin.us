import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X, MapPin, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@/data/photography";
import { useImageExif } from "@/hooks/useImageExif";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (index: number) => void;
}

function LightboxImage({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false);
  const { meta } = useImageExif(photo.src, photo.meta);

  useEffect(() => {
    setLoaded(false);
  }, [photo.src]);

  useEffect(() => {
    const img = new Image();
    img.src = photo.src;
    if (img.complete) {
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
    }
    return () => {
      img.onload = null;
    };
  }, [photo.src]);

  return (
    <div className="relative flex flex-col items-center justify-center max-h-full max-w-full">
      {/* Spinner / skeleton shown while loading */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-2 border-white/10 flex items-center justify-center">
                <ImageIcon className="h-7 w-7 text-white/30" />
              </div>
              <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-transparent border-t-white/40 animate-spin" />
            </div>
            <span className="text-xs text-white/40 tracking-wide">Loading</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual image */}
      <motion.img
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{
          opacity: loaded ? 1 : 0,
          scale: loaded ? 1 : 0.97,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        src={photo.src}
        alt={photo.alt}
        className="max-h-full max-w-full object-contain rounded-lg select-none"
      />

      {/* EXIF metadata below image */}
      {loaded && meta && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mt-3"
        >
          <ExifMetaDisplay meta={meta} compact />
        </motion.div>
      )}
    </div>
  );
}

export function Lightbox({
  photos,
  currentIndex,
  open,
  onOpenChange,
  onNavigate,
}: LightboxProps) {
  const photo = photos[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Preload adjacent images
  useEffect(() => {
    if (!open) return;
    const toPreload: string[] = [];
    if (currentIndex > 0) {
      toPreload.push(photos[currentIndex - 1]!.src);
    }
    if (currentIndex < photos.length - 1) {
      toPreload.push(photos[currentIndex + 1]!.src);
    }
    const images = toPreload.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [open, currentIndex, photos]);

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, goNext, goPrev, close]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-md"
          onClick={close}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <span className="text-sm text-white/60">
              {currentIndex + 1} / {photos.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Image area */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 sm:px-16 min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 cursor-pointer"
                onClick={goPrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Image with loading state */}
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center max-h-full max-w-full"
              >
                <LightboxImage photo={photo} />
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            {currentIndex < photos.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 cursor-pointer"
                onClick={goNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </div>

          {/* Caption bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={photo.src}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-4 sm:px-6 sm:py-5"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white font-medium text-center text-sm sm:text-base">
                {photo.alt}
              </p>
              {photo.meta?.location && (
                <div className="mt-2 flex items-center justify-center gap-5 text-xs sm:text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {photo.meta.location}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
