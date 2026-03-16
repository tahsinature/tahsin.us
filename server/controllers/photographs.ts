import type { Context } from "hono";
import { fetchTrips, fetchPhotos } from "@server/lib/photographs";
import type { TripsResponse, PhotosResponse } from "@shared/api";

export async function getTrips(c: Context) {
  const trips = await fetchTrips();
  return c.json<TripsResponse>({ trips });
}

export async function getPhotos(c: Context) {
  const tripId = c.req.query("trip-id");
  const favOnly = c.req.query("favonly") === "true";
  const photos = await fetchPhotos(tripId, favOnly);
  return c.json<PhotosResponse>({ photos });
}
