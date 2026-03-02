import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, MapPin, Calendar, Image, Sparkles, Globe } from "lucide-react";
import { trips } from "@/data/trips";
import { featuredPhotos } from "@/data/featured-photos";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import PhotoImage from "@/components/PhotoImage";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/MotionWrapper";
import { AnimatePresence } from "motion/react";

type ViewMode = "destinations" | "featured";

export default function PhotographyPage() {
  useDocumentTitle("Photography");
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<ViewMode>(() => {
    const v = searchParams.get("view");
    return v === "featured" ? "featured" : "destinations";
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(() => {
    const p = searchParams.get("photo");
    return p !== null ? parseInt(p, 10) : null;
  });

  // Sync lightbox state to URL so the link is shareable
  const openFeaturedLightbox = (index: number) => {
    setLightboxIndex(index);
    setSearchParams({ view: "featured", photo: String(index) }, { replace: true });
  };

  const closeFeaturedLightbox = () => {
    setLightboxIndex(null);
    setSearchParams({}, { replace: true });
  };

  const goNextFeatured = () => {
    if (lightboxIndex !== null) {
      const next = (lightboxIndex + 1) % featuredPhotos.length;
      setLightboxIndex(next);
      setSearchParams({ view: "featured", photo: String(next) }, { replace: true });
    }
  };

  const goPrevFeatured = () => {
    if (lightboxIndex !== null) {
      const prev = (lightboxIndex - 1 + featuredPhotos.length) % featuredPhotos.length;
      setLightboxIndex(prev);
      setSearchParams({ view: "featured", photo: String(prev) }, { replace: true });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <FadeIn>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="text-primary" size={24} />
            <h1 className="text-3xl font-bold text-foreground">Photography</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">A collection of moments from my travels around the world. Browse by destination or check out some of my favourite shots.</p>
        </div>
      </FadeIn>

      {/* View Toggle */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 mb-10">
          <motion.button
            onClick={() => setView("destinations")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border transition-all ${
              view === "destinations"
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Globe size={15} />
            By Destination
          </motion.button>
          <motion.button
            onClick={() => setView("featured")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border transition-all ${
              view === "featured"
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles size={15} />
            Best Shots
          </motion.button>
        </div>
      </FadeIn>

      {/* Destinations View */}
      <AnimatePresence mode="wait">
        {view === "destinations" && (
          <motion.div
            key="destinations"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {trips.map((trip) => (
                <StaggerItem key={trip.slug} variant="scale">
                  <Link
                    to={`/photography/${trip.slug}`}
                    className="group relative block bg-card border border-border rounded-md overflow-hidden hover:border-primary/40 transition-all duration-300 h-full"
                  >
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                      {/* Cover Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <PhotoImage src={trip.coverImage} alt={trip.country} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" aspectHint="4/3" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-muted-foreground text-xs px-2.5 py-1 rounded flex items-center gap-1.5 border border-border/50">
                          <Image size={12} />
                          {trip.photoCount}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={14} className="text-warm flex-shrink-0" />
                          <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{trip.country}</h2>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{trip.description}</p>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Calendar size={12} />
                          {trip.date}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        )}

        {/* Featured / Best Shots View */}
        {view === "featured" && (
          <motion.div
            key="featured"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {featuredPhotos.map((photo, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => openFeaturedLightbox(index)}
                  className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 group cursor-pointer block"
                >
                  <div className="relative overflow-hidden">
                    <PhotoImage src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" aspectHint="4/3" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-white text-sm font-medium drop-shadow-lg mb-1">{photo.alt}</span>
                      <ExifMetaDisplay meta={photo.meta ?? null} compact />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightboxIndex !== null && <FeaturedLightbox photos={featuredPhotos} index={lightboxIndex} onClose={closeFeaturedLightbox} onNext={goNextFeatured} onPrev={goPrevFeatured} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* Lightbox sub-component for featured photos */
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/data/trips";
import { useImageExif } from "@/hooks/useImageExif";

function FeaturedLightbox({ photos, index, onClose, onNext, onPrev }: { photos: Photo[]; index: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const photo = photos[index];
  const { meta } = useImageExif(photo.src, photo.meta);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
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

      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={photo.src}
        alt={photo.alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded"
        onClick={(e) => e.stopPropagation()}
      />

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
          {index + 1} / {photos.length}
        </p>
      </div>
    </motion.div>
  );
}
