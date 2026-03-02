import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, MapPin, Calendar, Image, Sparkles, Globe } from "lucide-react";
import { trips, favPhotos } from "@/data/photography";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import PhotoImage from "@/components/PhotoImage";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import PhotoLightbox from "@/components/PhotoLightbox";
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
      const next = (lightboxIndex + 1) % favPhotos.length;
      setLightboxIndex(next);
      setSearchParams({ view: "featured", photo: String(next) }, { replace: true });
    }
  };

  const goPrevFeatured = () => {
    if (lightboxIndex !== null) {
      const prev = (lightboxIndex - 1 + favPhotos.length) % favPhotos.length;
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
                  <motion.div
                    whileHover="hover"
                    className="h-full"
                  >
                  <Link
                    to={`/photography/${trip.slug}`}
                    className="group relative block bg-card border border-border rounded-md overflow-hidden hover:border-primary/40 transition-colors duration-300 h-full"
                  >
                    <div>
                      {/* Cover Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <motion.div
                          className="w-full h-full"
                          variants={{ hover: { scale: 1.03 } }}
                          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <PhotoImage src={trip.coverImage} alt={trip.country} className="w-full h-full object-cover" loading="lazy" aspectHint="4/3" />
                        </motion.div>
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
                    </div>
                  </Link>
                  </motion.div>
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
              {favPhotos.map((photo, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => openFeaturedLightbox(index)}
                  className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300 group cursor-pointer block"
                >
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="w-full h-auto"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <PhotoImage src={photo.src} alt={photo.alt} className="w-full h-auto object-cover" loading="lazy" aspectHint="4/3" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span className="text-white text-sm font-medium drop-shadow-lg mb-1">{photo.alt}</span>
                      <ExifMetaDisplay meta={photo.meta ?? null} compact />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Lightbox */}
            <PhotoLightbox photos={favPhotos} index={lightboxIndex} onClose={closeFeaturedLightbox} onNext={goNextFeatured} onPrev={goPrevFeatured} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
