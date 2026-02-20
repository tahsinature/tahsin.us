import type { Photo } from "@/data/trips";

/**
 * Featured / "best shots" photos.
 *
 * Only `location` is set manually — camera settings (camera, lens, aperture,
 * shutter speed, ISO, focal length) are read automatically from EXIF at
 * runtime via the `useImageExif` hook.  If the image has no EXIF (e.g.
 * Unsplash strips it), those fields simply won't appear.
 */
export const featuredPhotos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    alt: "Yosemite Valley at golden hour",
    meta: { location: "Yosemite National Park, USA" },
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    alt: "Starry night over snow-capped mountains",
    meta: { location: "Banff National Park, Canada" },
  },
  {
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
    alt: "Rolling green hills at sunset",
    meta: { location: "Tuscany, Italy" },
  },
  {
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
    alt: "Waterfall hidden in lush greenery",
    meta: { location: "Bali, Indonesia" },
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    alt: "Misty morning in the valley",
    meta: { location: "Dolomites, Italy" },
  },
  {
    src: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&q=80",
    alt: "Amalfi Coast",
    meta: { location: "Positano, Amalfi Coast" },
  },
  {
    src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80",
    alt: "Desert canyon at blue hour",
    meta: { location: "Antelope Canyon, Arizona" },
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    alt: "Tropical beach with crystal water",
    meta: { location: "Maldives" },
  },
  {
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&q=80",
    alt: "Mountain lake surrounded by peaks",
    meta: { location: "Moraine Lake, Canada" },
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    alt: "Dramatic mountain peak in clouds",
    meta: { location: "Patagonia, Argentina" },
  },
  {
    src: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80",
    alt: "Northern lights over calm lake",
    meta: { location: "Tromsø, Norway" },
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    alt: "Sun rays through misty forest",
    meta: { location: "Black Forest, Germany" },
  },
  {
    src: "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=800&q=80",
    alt: "Autumn colors reflected in river",
    meta: { location: "Kyoto, Japan" },
  },
  {
    src: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80",
    alt: "Silhouette at ocean sunset",
    meta: { location: "Big Sur, California" },
  },
  {
    src: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=800&q=80",
    alt: "Lavender fields under stormy sky",
    meta: { location: "Provence, France" },
  },
];
