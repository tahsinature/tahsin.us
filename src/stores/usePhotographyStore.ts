import { create } from "zustand";
import type { Photo, TripFolder } from "@/data/photography";

interface PhotographyState {
  trips: TripFolder[];
  favPhotos: Photo[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
  fetchedAt: number | null;

  fetchPhotographs: () => Promise<void>;
  getTripBySlug: (slug: string) => TripFolder | undefined;

  prefetchedPages: Set<string>;
  prefetchTripPage: (pageId: string) => void;
}

/** Clean a filename into a display-friendly alt text */
const fileNameToAlt = (name: string): string =>
  name
    .replace(/\.[^.]+$/, "") // remove extension
    .replace(/[-_]+/g, " ") // replace dashes/underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // title case

let fetchPromise: Promise<void> | null = null;

export const usePhotographyStore = create<PhotographyState>((set, get) => ({
  trips: [],
  favPhotos: [],
  status: "idle",
  error: null,
  fetchedAt: null,
  prefetchedPages: new Set(),

  fetchPhotographs: async () => {
    const state = get();

    // Skip if already fresh (< 25 min old)
    if (state.status === "success" && state.fetchedAt && Date.now() - state.fetchedAt < 25 * 60 * 1000) {
      return;
    }

    // Deduplicate concurrent calls
    if (state.status === "loading" && fetchPromise) {
      return fetchPromise;
    }

    const doFetch = async () => {
      set({ status: "loading", error: null });

      try {
        const res = await fetch("/api/photographs");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const trips: TripFolder[] = data.trips.map(
          (t: {
            id: string;
            slug: string;
            name: string;
            coverImage: string;
            description: string;
            date: string;
            photoCount: number;
            favCount: number;
            photos: Array<{ src: string; name: string; isFav: boolean; mediaType: string }>;
          }) => ({
            id: t.id,
            slug: t.slug,
            country: t.name,
            coverImage: t.coverImage,
            description: t.description,
            date: t.date,
            photoCount: t.photoCount,
            favCount: t.favCount,
            photos: t.photos.map((p) => ({
              src: p.src,
              alt: fileNameToAlt(p.name),
              name: p.name,
              isFav: p.isFav,
              mediaType: p.mediaType as "image" | "video" | "gif",
            })),
          }),
        );

        const favPhotos = trips.flatMap((trip) => trip.photos.filter((p) => p.isFav));

        set({
          trips,
          favPhotos,
          status: "success",
          fetchedAt: data.fetchedAt,
        });
      } catch (err) {
        set({
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      } finally {
        fetchPromise = null;
      }
    };

    fetchPromise = doFetch();
    return fetchPromise;
  },

  getTripBySlug: (slug: string) => {
    return get().trips.find((t) => t.slug === slug);
  },

  prefetchTripPage: (pageId: string) => {
    const { prefetchedPages } = get();
    if (prefetchedPages.has(pageId)) return;

    set({ prefetchedPages: new Set(prefetchedPages).add(pageId) });
    fetch(`/api/notion/${pageId}`).catch(() => {});
  },
}));
