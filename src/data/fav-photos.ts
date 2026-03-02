import { trips } from "@/data/trips";

/** All photos marked as `myFav` across every trip, flattened into a single array. */
export const favPhotos = trips.flatMap((trip) => trip.photos.filter((p) => p.myFav));
