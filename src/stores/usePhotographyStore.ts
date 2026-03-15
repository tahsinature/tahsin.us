import { create } from "zustand";
import type { Photo, TripFolder } from "@/data/photography";
import type { PhotoData, TripData } from "@shared/api";
import { awaitPrefetch } from "@/lib/prefetch";

/** Clean a filename into a display-friendly alt text */
const fileNameToAlt = (name: string): string =>
  name
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const mapPhoto = (p: PhotoData, tripName?: string): Photo => ({
  src: p.src,
  alt: p.caption || fileNameToAlt(p.name),
  caption: p.caption,
  name: p.name,
  isFav: p.isFav,
  mediaType: p.mediaType,
  tripName,
  meta: p.exif ? {
    camera: p.exif.camera ?? undefined,
    lens: p.exif.lens ?? undefined,
    focalLength: p.exif.focalLength ?? undefined,
    aperture: p.exif.aperture ?? undefined,
    shutterSpeed: p.exif.shutterSpeed ?? undefined,
    iso: p.exif.iso ?? undefined,
  } : undefined,
});

interface PhotographyState {
  trips: TripFolder[];
  tripsStatus: "idle" | "loading" | "success" | "error";
  tripsError: string | null;
  tripsFetchedAt: number | null;

  // Photos cache keyed by trip ID (or "_all" for all photos)
  photosCache: Record<string, { photos: Photo[]; fetchedAt: number }>;
  photosFetching: Set<string>;

  fetchTrips: () => Promise<void>;
  fetchPhotos: (tripId?: string, opts?: { favOnly?: boolean }) => Promise<Photo[]>;
  getTripBySlug: (slug: string) => TripFolder | undefined;
  getFavPhotos: () => Photo[];

}

let tripsPromise: Promise<void> | null = null;

export const usePhotographyStore = create<PhotographyState>((set, get) => ({
  trips: [],
  tripsStatus: "idle",
  tripsError: null,
  tripsFetchedAt: null,
  photosCache: {},
  photosFetching: new Set(),

  fetchTrips: async () => {
    const state = get();

    if (state.tripsStatus === "success" && state.tripsFetchedAt && Date.now() - state.tripsFetchedAt < 25 * 60 * 1000) {
      return;
    }

    if (state.tripsStatus === "loading" && tripsPromise) {
      return tripsPromise;
    }

    const doFetch = async () => {
      set({ tripsStatus: "loading", tripsError: null });
      try {
        const data = (await awaitPrefetch<{ trips: TripData[] }>("/api/trips")) ?? await fetch("/api/trips").then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        });
        const trips: TripFolder[] = data.trips.map(
          (t: TripData) => ({
            id: t.id,
            slug: t.slug,
            country: t.name,
            coverImage: t.coverImage,
            description: t.description,
            date: t.date,
            dateRaw: t.dateRaw,
            photoCount: t.photoCount,
          }),
        );
        set({ trips, tripsStatus: "success", tripsFetchedAt: Date.now() });
      } catch (err) {
        set({ tripsStatus: "error", tripsError: err instanceof Error ? err.message : "Unknown error" });
      } finally {
        tripsPromise = null;
      }
    };

    tripsPromise = doFetch();
    return tripsPromise;
  },

  fetchPhotos: async (tripId?: string, opts?: { favOnly?: boolean }) => {
    const cacheKey = `${tripId ?? "_all"}${opts?.favOnly ? ":fav" : ""}`;
    const state = get();

    // Return cached if fresh (< 25 min)
    const cached = state.photosCache[cacheKey];
    if (cached && Date.now() - cached.fetchedAt < 25 * 60 * 1000) {
      return cached.photos;
    }

    // Deduplicate
    if (state.photosFetching.has(cacheKey)) {
      // Wait for existing fetch
      await new Promise<void>((resolve) => {
        const unsub = usePhotographyStore.subscribe((s) => {
          if (!s.photosFetching.has(cacheKey)) {
            unsub();
            resolve();
          }
        });
      });
      return get().photosCache[cacheKey]?.photos ?? [];
    }

    set({ photosFetching: new Set(state.photosFetching).add(cacheKey) });

    try {
      // Try prefetched data for favOnly (no tripId) requests
      const prefetchKey = !tripId && opts?.favOnly ? "/api/photos?favonly=true" : null;
      let data: { photos: PhotoData[] };

      if (prefetchKey) {
        const prefetched = await awaitPrefetch<{ photos: PhotoData[] }>(prefetchKey);
        if (prefetched) {
          data = prefetched;
        } else {
          const params = new URLSearchParams();
          if (opts?.favOnly) params.set("favonly", "true");
          const res = await fetch(`/api/photos?${params}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          data = await res.json();
        }
      } else {
        const params = new URLSearchParams();
        if (tripId) params.set("trip-id", tripId);
        if (opts?.favOnly) params.set("favonly", "true");
        const url = `/api/photos${params.size ? `?${params}` : ""}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = await res.json();
      }

      const tripName = tripId ? get().trips.find((t) => t.id === tripId)?.country : undefined;
      const photos: Photo[] = (data.photos as PhotoData[]).map((p) => mapPhoto(p, tripName));

      const fetching = new Set(get().photosFetching);
      fetching.delete(cacheKey);
      set({
        photosCache: { ...get().photosCache, [cacheKey]: { photos, fetchedAt: Date.now() } },
        photosFetching: fetching,
      });

      return photos;
    } catch (err) {
      const fetching = new Set(get().photosFetching);
      fetching.delete(cacheKey);
      set({ photosFetching: fetching });
      throw err;
    }
  },

  getTripBySlug: (slug: string) => {
    return get().trips.find((t) => t.slug === slug);
  },

  getFavPhotos: () => {
    const { photosCache, trips } = get();
    // Collect favs from all cached trip photo sets
    const favs: Photo[] = [];
    for (const trip of trips) {
      const cached = photosCache[trip.id];
      if (cached) {
        favs.push(...cached.photos.filter((p) => p.isFav));
      }
    }
    return favs;
  },
}));
