import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Camera, MapPin, Calendar, Image, Sparkles, Globe } from "lucide-react";
import { trips } from "@/data/trips";
import { featuredPhotos } from "@/data/featured-photos";

type ViewMode = "destinations" | "featured";

export default function PhotographyPage() {
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
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="text-accent-yellow" size={24} />
          <h1 className="text-3xl font-bold text-text-primary">Photography</h1>
        </div>
        <p className="text-text-secondary max-w-2xl leading-relaxed">A collection of moments from my travels around the world. Browse by destination or check out some of my favourite shots.</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setView("destinations")}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border transition-all ${
            view === "destinations"
              ? "bg-accent-yellow/10 border-accent-yellow/40 text-accent-yellow"
              : "bg-bg-card border-border text-text-secondary hover:text-text-primary hover:border-accent-yellow/20"
          }`}
        >
          <Globe size={15} />
          By Destination
        </button>
        <button
          onClick={() => setView("featured")}
          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium border transition-all ${
            view === "featured"
              ? "bg-accent-yellow/10 border-accent-yellow/40 text-accent-yellow"
              : "bg-bg-card border-border text-text-secondary hover:text-text-primary hover:border-accent-yellow/20"
          }`}
        >
          <Sparkles size={15} />
          Best Shots
        </button>
      </div>

      {/* Destinations View */}
      {view === "destinations" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.slug}
              to={`/photography/${trip.slug}`}
              className="group relative bg-bg-card border border-border rounded-md overflow-hidden hover:border-accent-yellow/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,214,68,0.08)]"
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={trip.coverImage} alt={trip.country} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 bg-bg-primary/70 backdrop-blur-sm text-text-secondary text-xs px-2.5 py-1 rounded flex items-center gap-1.5 border border-border/50">
                  <Image size={12} />
                  {trip.photoCount}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={14} className="text-accent-pink flex-shrink-0" />
                  <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent-yellow transition-colors">{trip.country}</h2>
                </div>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">{trip.description}</p>
                <div className="flex items-center gap-1.5 text-text-muted text-xs">
                  <Calendar size={12} />
                  {trip.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Featured / Best Shots View */}
      {view === "featured" && (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {featuredPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => openFeaturedLightbox(index)}
                className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-accent-yellow/40 transition-all duration-300 group cursor-pointer block"
              >
                <div className="relative overflow-hidden">
                  <img src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-white text-sm font-medium drop-shadow-lg mb-1">{photo.alt}</span>
                    {photo.meta && (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70 text-[11px]">
                        {photo.meta.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={10} />
                            {photo.meta.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Camera size={10} />
                          {photo.meta.camera}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox */}
          {lightboxIndex !== null && <FeaturedLightbox photos={featuredPhotos} index={lightboxIndex} onClose={closeFeaturedLightbox} onNext={goNextFeatured} onPrev={goPrevFeatured} />}
        </>
      )}
    </main>
  );
}

/* Lightbox sub-component for featured photos */
import { X, ChevronLeft, ChevronRight, Aperture, Focus, Gauge } from "lucide-react";
import type { Photo } from "@/data/trips";

function FeaturedLightbox({ photos, index, onClose, onNext, onPrev }: { photos: Photo[]; index: number; onClose: () => void; onNext: () => void; onPrev: () => void }) {
  const photo = photos[index];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") onNext();
    if (e.key === "ArrowLeft") onPrev();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Photo lightbox"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors z-10">
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 text-text-secondary hover:text-text-primary transition-colors z-10 bg-bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-accent-yellow/40"
      >
        <ChevronLeft size={24} />
      </button>

      <img src={photo.src} alt={photo.alt} className="max-w-[90vw] max-h-[85vh] object-contain rounded" onClick={(e) => e.stopPropagation()} />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 text-text-secondary hover:text-text-primary transition-colors z-10 bg-bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-accent-yellow/40"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center max-w-lg w-full px-4">
        <p className="text-text-primary text-sm font-medium mb-1">{photo.alt}</p>
        {photo.meta && (
          <div className="bg-bg-card/80 backdrop-blur-sm border border-border rounded px-4 py-3 mt-2">
            {photo.meta.location && (
              <p className="text-text-secondary text-xs mb-2 flex items-center justify-center gap-1.5">
                <MapPin size={12} className="text-accent-pink" />
                {photo.meta.location}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-text-muted text-[11px]">
              <span className="flex items-center gap-1">
                <Camera size={11} className="text-accent-blue" />
                {photo.meta.camera}
              </span>
              {photo.meta.lens && (
                <span className="flex items-center gap-1">
                  <Focus size={11} className="text-accent-purple" />
                  {photo.meta.lens}
                </span>
              )}
              {photo.meta.aperture && (
                <span className="flex items-center gap-1">
                  <Aperture size={11} className="text-accent-green" />
                  {photo.meta.aperture}
                </span>
              )}
              {photo.meta.shutterSpeed && (
                <span className="flex items-center gap-1">
                  <Gauge size={11} className="text-accent-yellow" />
                  {photo.meta.shutterSpeed}
                </span>
              )}
              {photo.meta.iso && <span>ISO {photo.meta.iso}</span>}
              {photo.meta.focalLength && <span>{photo.meta.focalLength}</span>}
            </div>
          </div>
        )}
        <p className="text-text-muted text-xs mt-2">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
