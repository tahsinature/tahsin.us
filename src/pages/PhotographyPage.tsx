import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, MapPin, Calendar, Image, Sparkles, Globe, RefreshCw, Plane, LayoutGrid, List } from "lucide-react";
import MarqueeText from "@/components/MarqueeText";
import { usePhotographyStore } from "@/stores/usePhotographyStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import PhotoImage from "@/components/PhotoImage";
import PhotoGrid from "@/components/PhotoGrid";
import PhotoLightbox from "@/components/PhotoLightbox";
import { FadeIn, StaggerContainer, StaggerItem, motion } from "@/components/MotionWrapper";
import { PAGE_PADDING } from "@/config/layout";
import { AnimatePresence } from "motion/react";

type ViewMode = "destinations" | "featured";

/* ── Skeleton Loaders ── */

function DestinationsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-card border border-border rounded-md overflow-hidden animate-pulse">
          <div className="aspect-[16/9] bg-muted/30" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-1/2 bg-muted/30 rounded" />
            <div className="h-3 w-3/4 bg-muted/20 rounded" />
            <div className="h-3 w-1/4 bg-muted/20 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  const aspects = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[1/1]", "aspect-[3/2]", "aspect-[2/3]", "aspect-[4/5]"];
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={`break-inside-avoid ${aspects[i % aspects.length]} bg-muted/30 rounded animate-pulse`} />
      ))}
    </div>
  );
}

/* ── Main Page ── */

export default function PhotographyPage() {
  useDocumentTitle("Photography");
  const [searchParams, setSearchParams] = useSearchParams();
  const { trips, tripsStatus: status, tripsError: error, fetchTrips, fetchPhotos } = usePhotographyStore();
  const [favPhotos, setFavPhotos] = useState<import("@/data/photography").Photo[]>([]);

  const [view, setView] = useState<ViewMode>(() => {
    const v = searchParams.get("view");
    return v === "featured" ? "featured" : "destinations";
  });
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(() => {
    const p = searchParams.get("photo");
    return p !== null ? parseInt(p, 10) : null;
  });

  // Fetch fav photos when viewing featured tab
  useEffect(() => {
    if (view !== "featured" || status !== "success") return;
    fetchPhotos(undefined, { favOnly: true }).then(setFavPhotos);
  }, [view, status, fetchPhotos]);

  // Staleness refresh
  useEffect(() => {
    const interval = setInterval(() => {
      const { tripsFetchedAt } = usePhotographyStore.getState();
      if (tripsFetchedAt && Date.now() - tripsFetchedAt > 25 * 60 * 1000) {
        usePhotographyStore.getState().fetchTrips();
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Lightbox controls for featured view
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

  const isLoading = status === "idle" || status === "loading";
  const sortedTrips = [...trips].sort((a, b) => (a.photoCount === 0 ? 1 : 0) - (b.photoCount === 0 ? 1 : 0));

  return (
    <main className={`max-w-7xl mx-auto ${PAGE_PADDING}`}>
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
        <div className="flex items-center gap-2 mb-10">
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

          {view === "destinations" && (
            <div className="ml-auto flex items-center border border-border rounded overflow-hidden">
              <button
                onClick={() => setLayout("grid")}
                className={`p-1.5 transition-colors ${layout === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setLayout("list")}
                className={`p-1.5 transition-colors ${layout === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List size={14} />
              </button>
            </div>
          )}
        </div>
      </FadeIn>

      {/* Error State */}
      {status === "error" && (
        <FadeIn>
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Failed to load photographs: {error}</p>
            <button
              onClick={() => fetchTrips()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border border-border bg-card text-foreground hover:border-primary/40 transition-colors cursor-pointer"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        </FadeIn>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "destinations" && (
          <motion.div
            key="destinations"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <DestinationsSkeleton />
            ) : status === "success" && trips.length === 0 ? (
              <p className="text-muted-foreground text-center py-16">No destinations yet.</p>
            ) : layout === "grid" ? (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
                  {sortedTrips.map((trip) => (
                    <StaggerItem key={trip.slug} variant="scale">
                      <motion.div whileHover="hover" className="h-full">
                        {trip.photoCount > 0 ? (
                          <Link
                            to={`/photography/${trip.slug}`}
                            className="group relative flex flex-col bg-card border border-border rounded-md overflow-hidden hover:border-primary/40 transition-colors duration-300 h-full"
                          >
                            <div className="flex flex-col h-full">
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <motion.div
                                  className="w-full h-full"
                                  variants={{ hover: { scale: 1.03 } }}
                                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                  <PhotoImage src={trip.coverImage} alt={trip.country} className="w-full h-full object-cover" loading="lazy" aspectHint="16/9" />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                                <div className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm text-muted-foreground text-xs px-2.5 py-1 rounded flex items-center gap-1.5 border border-border/50">
                                  <Image size={12} />
                                  {trip.photoCount}
                                </div>
                              </div>
                              <div className="p-4 flex flex-col gap-1.5">
                                <div className="flex items-center gap-2 min-w-0">
                                  <MapPin size={14} className="text-warm flex-shrink-0" />
                                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">{trip.country}</h2>
                                  {trip.description && (
                                    <>
                                      <span className="text-muted-foreground/30">|</span>
                                      <MarqueeText text={trip.description} className="text-muted-foreground text-sm" />
                                    </>
                                  )}
                                </div>
                                {trip.date && (
                                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                                    <Calendar size={12} />
                                    {trip.date}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ) : (() => {
                          const isUpcoming = trip.dateRaw && new Date(trip.dateRaw + "T00:00:00") > new Date();
                          return (
                            <div className={`group relative flex flex-col bg-card border rounded-md overflow-hidden h-full ${isUpcoming ? "border-primary/30 border-dashed" : "border-border border-dashed"}`}>
                              <div className={`relative aspect-[16/9] overflow-hidden ${isUpcoming ? "bg-primary/[0.03]" : "bg-muted/10"}`}>
                                {isUpcoming ? (
                                  <>
                                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 180" fill="none">
                                      <path d="M 60 140 Q 160 20 260 140" stroke="currentColor" className="text-primary/15" strokeWidth="1.5" strokeDasharray="4 4" />
                                    </svg>
                                    <div className="absolute top-[28%] left-1/2 -translate-x-1/2">
                                      <Plane size={20} className="text-primary/40 -rotate-45" />
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 gap-1">
                                      <span className="text-primary/50 text-[11px] font-medium tracking-widest uppercase">Can't wait!</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="absolute inset-6 border border-muted-foreground/15 rounded-sm">
                                      <div className="absolute -top-px -left-px w-3 h-3 border-t border-l border-muted-foreground/30 rounded-tl-sm" />
                                      <div className="absolute -top-px -right-px w-3 h-3 border-t border-r border-muted-foreground/30 rounded-tr-sm" />
                                      <div className="absolute -bottom-px -left-px w-3 h-3 border-b border-l border-muted-foreground/30 rounded-bl-sm" />
                                      <div className="absolute -bottom-px -right-px w-3 h-3 border-b border-r border-muted-foreground/30 rounded-br-sm" />
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-px bg-muted-foreground/15" />
                                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-px bg-muted-foreground/15" />
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                                      <div className="relative">
                                        <Camera size={24} className="text-muted-foreground/30" />
                                        <div className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
                                      </div>
                                      <span className="text-muted-foreground/40 text-[11px] font-medium tracking-widest uppercase">Still in the camera</span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                  <MapPin size={14} className={`flex-shrink-0 ${isUpcoming ? "text-primary/50" : "text-warm/50"}`} />
                                  <h2 className={`text-lg font-semibold ${isUpcoming ? "text-foreground/70" : "text-foreground/60"}`}>{trip.country}</h2>
                                </div>
                                {trip.description && <p className={`text-sm mb-3 line-clamp-2 flex-1 ${isUpcoming ? "text-muted-foreground/60" : "text-muted-foreground/50"}`}>{trip.description}</p>}
                                {trip.date && (
                                  <div className={`flex items-center gap-1.5 text-xs ${isUpcoming ? "text-primary/50" : "text-muted-foreground/50"}`}>
                                    <Calendar size={12} />
                                    {trip.date}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-2" staggerDelay={0.04}>
                  {sortedTrips.map((trip) => {
                    const isUpcoming = trip.photoCount === 0 && trip.dateRaw && new Date(trip.dateRaw + "T00:00:00") > new Date();
                    const isEmpty = trip.photoCount === 0;
                    return (
                      <StaggerItem key={trip.slug}>
                        {trip.photoCount > 0 ? (
                          <Link
                            to={`/photography/${trip.slug}`}
                            className="group flex items-center gap-4 bg-card border border-border rounded-md p-3 hover:border-primary/40 transition-colors duration-200"
                          >
                            <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <PhotoImage src={trip.coverImage} alt={trip.country} className="w-full h-full object-cover" loading="lazy" aspectHint="1/1" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <MapPin size={13} className="text-warm flex-shrink-0" />
                                <h2 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{trip.country}</h2>
                              </div>
                              {trip.description && <p className="text-muted-foreground text-xs truncate mt-0.5">{trip.description}</p>}
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0 text-xs text-muted-foreground">
                              {trip.date && (
                                <span className="hidden sm:flex items-center gap-1">
                                  <Calendar size={11} />
                                  {trip.date}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Image size={11} />
                                {trip.photoCount}
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <div className={`flex items-center gap-4 border rounded-md p-3 ${isUpcoming ? "border-primary/30 border-dashed bg-primary/[0.02]" : "border-border border-dashed bg-card"}`}>
                            <div className={`w-16 h-16 rounded flex items-center justify-center flex-shrink-0 ${isUpcoming ? "bg-primary/[0.05]" : "bg-muted/10"}`}>
                              {isUpcoming ? (
                                <Plane size={18} className="text-primary/40 -rotate-45" />
                              ) : (
                                <Camera size={18} className="text-muted-foreground/30" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <MapPin size={13} className={isEmpty ? (isUpcoming ? "text-primary/50" : "text-warm/50") : "text-warm"} />
                                <h2 className={`text-sm font-semibold truncate ${isUpcoming ? "text-foreground/70" : "text-foreground/60"}`}>{trip.country}</h2>
                              </div>
                              <p className={`text-xs mt-0.5 ${isUpcoming ? "text-primary/50" : "text-muted-foreground/40"}`}>
                                {isUpcoming ? "Can't wait!" : "Still in the camera"}
                              </p>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0 text-xs text-muted-foreground/50">
                              {trip.date && (
                                <span className={`hidden sm:flex items-center gap-1 ${isUpcoming ? "text-primary/50" : ""}`}>
                                  <Calendar size={11} />
                                  {trip.date}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </StaggerItem>
                    );
                  })}
                </StaggerContainer>
              )}
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
            {isLoading ? (
              <FeaturedSkeleton />
            ) : favPhotos.length === 0 ? (
              <p className="text-muted-foreground text-center py-16">No featured photos yet.</p>
            ) : (
              <>
                <PhotoGrid photos={favPhotos} onPhotoClick={openFeaturedLightbox} />

                {/* Lightbox */}
                <PhotoLightbox photos={favPhotos} index={lightboxIndex} onClose={closeFeaturedLightbox} onNext={goNextFeatured} onPrev={goPrevFeatured} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
