import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { trips } from "@/data/trips";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import PhotoImage from "@/components/PhotoImage";
import ExifMetaDisplay from "@/components/ExifMetaDisplay";
import PhotoLightbox from "@/components/PhotoLightbox";
import { FadeIn, BlurFadeIn, motion } from "@/components/MotionWrapper";

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
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover="hover"
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            className="w-full break-inside-avoid"
          >
            <motion.button
              onClick={() => openLightbox(index)}
              className="w-full rounded overflow-hidden border border-border group cursor-pointer block"
              variants={{ hover: { borderColor: "oklch(0.88 0.17 90 / 0.35)" } }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative overflow-hidden">
                <motion.div
                  className="w-full h-auto"
                  variants={{ hover: { scale: 1.03 } }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <PhotoImage src={photo.src} alt={photo.alt} className="w-full h-auto object-cover" loading="lazy" aspectHint="4/3" />
                </motion.div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm font-medium drop-shadow-lg mb-1">{photo.alt}</span>
                  <ExifMetaDisplay meta={photo.meta ?? null} compact />
                </div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      <PhotoLightbox photos={trip.photos} index={lightboxIndex} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} />
    </main>
  );
}
