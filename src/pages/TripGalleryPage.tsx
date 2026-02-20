import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, X, ChevronLeft, ChevronRight, Camera, Aperture, Focus, Gauge } from "lucide-react";
import { trips } from "@/data/trips";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

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
        <h1 className="text-2xl font-bold text-text-primary mb-4">Trip not found</h1>
        <p className="text-text-secondary mb-6">This travel folder doesn't exist yet.</p>
        <Link to="/photography" className="text-accent-yellow hover:underline inline-flex items-center gap-2">
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
      <Link to="/photography" className="text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-2 text-sm mb-8">
        <ArrowLeft size={14} />
        Back to Photography
      </Link>

      {/* Trip Header */}
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-accent-pink" />
          <h1 className="text-3xl font-bold text-text-primary">{trip.country}</h1>
        </div>
        <p className="text-text-secondary text-lg mb-2">{trip.description}</p>
        <div className="flex items-center gap-1.5 text-text-muted text-sm">
          <Calendar size={14} />
          {trip.date}
          <span className="mx-2 text-border">·</span>
          {trip.photoCount} photos
        </div>
        <hr className="border-border mt-6" />
      </header>

      {/* Photo Grid — Masonry-like with CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {trip.photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="w-full break-inside-avoid rounded overflow-hidden border border-border hover:border-accent-yellow/40 transition-all duration-300 group cursor-pointer block"
          >
            <div className="relative overflow-hidden">
              <img src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              {/* Hover overlay */}
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
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label="Photo lightbox"
        >
          {/* Close button */}
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors z-10">
            <X size={24} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 md:left-8 text-text-secondary hover:text-text-primary transition-colors z-10 bg-bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-accent-yellow/40"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <img src={trip.photos[lightboxIndex].src} alt={trip.photos[lightboxIndex].alt} className="max-w-[90vw] max-h-[85vh] object-contain rounded" onClick={(e) => e.stopPropagation()} />

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 md:right-8 text-text-secondary hover:text-text-primary transition-colors z-10 bg-bg-card/50 backdrop-blur-sm p-2 rounded border border-border hover:border-accent-yellow/40"
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter & caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center max-w-lg w-full px-4">
            <p className="text-text-primary text-sm font-medium mb-1">{trip.photos[lightboxIndex].alt}</p>
            {trip.photos[lightboxIndex].meta && (
              <div className="bg-bg-card/80 backdrop-blur-sm border border-border rounded px-4 py-3 mt-2">
                {trip.photos[lightboxIndex].meta.location && (
                  <p className="text-text-secondary text-xs mb-2 flex items-center justify-center gap-1.5">
                    <MapPin size={12} className="text-accent-pink" />
                    {trip.photos[lightboxIndex].meta.location}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-text-muted text-[11px]">
                  <span className="flex items-center gap-1">
                    <Camera size={11} className="text-accent-blue" />
                    {trip.photos[lightboxIndex].meta.camera}
                  </span>
                  {trip.photos[lightboxIndex].meta.lens && (
                    <span className="flex items-center gap-1">
                      <Focus size={11} className="text-accent-purple" />
                      {trip.photos[lightboxIndex].meta.lens}
                    </span>
                  )}
                  {trip.photos[lightboxIndex].meta.aperture && (
                    <span className="flex items-center gap-1">
                      <Aperture size={11} className="text-accent-green" />
                      {trip.photos[lightboxIndex].meta.aperture}
                    </span>
                  )}
                  {trip.photos[lightboxIndex].meta.shutterSpeed && (
                    <span className="flex items-center gap-1">
                      <Gauge size={11} className="text-accent-yellow" />
                      {trip.photos[lightboxIndex].meta.shutterSpeed}
                    </span>
                  )}
                  {trip.photos[lightboxIndex].meta.iso && <span>ISO {trip.photos[lightboxIndex].meta.iso}</span>}
                  {trip.photos[lightboxIndex].meta.focalLength && <span>{trip.photos[lightboxIndex].meta.focalLength}</span>}
                </div>
              </div>
            )}
            <p className="text-text-muted text-xs mt-2">
              {lightboxIndex + 1} / {trip.photos.length}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
