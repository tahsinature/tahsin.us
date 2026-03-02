import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { trips } from "@/data/trips";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import PhotoImage from "@/components/PhotoImage";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import { useImageExif } from "@/hooks/useImageExif";
import { FadeIn, BlurFadeIn, motion } from "@/components/MotionWrapper";
import { AnimatePresence } from "motion/react";

export default function TripGalleryPage() {
  const { slug } = useParams<{ slug: string }>();
  const trip = trips.find((t) => t.slug === slug);
  useDocumentTitle(trip?.country);

  const [searchParams, setSearchParams] = useSearchParams();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(() => {
    const p = searchParams.get("photo");
    return p !== null ? parseInt(p, 10) : null;
  });

  if (!trip) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Trip not found</h1>
        <p className="text-muted-foreground mb-6">This travel folder doesn't exist yet.</p>
        <Link to="/photography" className="text-primary hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Photography
        </Link>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setSearchParams({ photo: String(index) }, { replace: true });
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    setSearchParams({}, { replace: true });
  };

  const goNext = () => {
    if (lightboxIndex !== null) {
      const next = (lightboxIndex + 1) % trip.photos.length;
      setLightboxIndex(next);
      setSearchParams({ photo: String(next) }, { replace: true });
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      const prev = (lightboxIndex - 1 + trip.photos.length) % trip.photos.length;
      setLightboxIndex(prev);
      setSearchParams({ photo: String(prev) }, { replace: true });
    }
  };

  // Handle keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Back link */}
      <FadeIn>
        <Link to="/photography" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 text-sm mb-8">
          <ArrowLeft size={14} />
          Back to Photography
        </Link>
      </FadeIn>

      {/* Trip Header */}
      <header className="mb-10">
        <BlurFadeIn>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-warm" />
            <h1 className="text-3xl font-bold text-foreground">{trip.country}</h1>
          </div>
        </BlurFadeIn>
        <BlurFadeIn delay={0.1}>
          <p className="text-muted-foreground text-lg mb-2">{trip.description}</p>
        </BlurFadeIn>
        <BlurFadeIn delay={0.15}>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Calendar size={14} />
            {trip.date}
            <span className="mx-2 text-border">·</span>
            {trip.photoCount} photos
          </div>
        </BlurFadeIn>
        <FadeIn delay={0.2}>
          <hr className="border-border mt-6" />
        </FadeIn>
      </header>

      {/* Photo Grid — Masonry-like with CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {trip.photos.map((photo, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            onClick={() => openLightbox(index)}
            className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 group cursor-pointer block"
          >
            <div className="relative overflow-hidden">
              <PhotoImage src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" aspectHint="4/3" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-sm font-medium drop-shadow-lg mb-1">{photo.alt}</span>
                <ExifMetaDisplay meta={photo.meta ?? null} compact />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && <TripLightbox trip={trip} index={lightboxIndex} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} onKeyDown={handleKeyDown} />}
      </AnimatePresence>
    </main>
  );
}

/* Lightbox sub-component — uses useImageExif for runtime EXIF reading */
function TripLightbox({
  trip,
  index,
  onClose,
  onNext,
  onPrev,
  onKeyDown,
}: {
  trip: (typeof trips)[number];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const photo = trip.photos[index];
  const { meta } = useImageExif(photo.src, photo.meta);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Photo lightbox"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10">
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 text-muted-foreground hover:text-foreground transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-primary/40"
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <PhotoImage src={photo.src} alt={photo.alt} className="max-w-[90vw] max-h-[85vh] object-contain rounded" aspectHint="3/2" />
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 text-muted-foreground hover:text-foreground transition-colors z-10 bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-primary/40"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center max-w-lg w-full px-4">
        <p className="text-foreground text-sm font-medium mb-1">{photo.alt}</p>
        {meta && (
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded px-4 py-3 mt-2">
            <ExifMetaDisplay meta={meta} />
          </div>
        )}
        <p className="text-muted-foreground text-xs mt-2">
          {index + 1} / {trip.photos.length}
        </p>
      </div>
    </motion.div>
  );
}
