import type { Context } from "hono";
import { fetchTrips, fetchPhotos } from "@server/lib/photographs";
import type { TripsResponse, PhotosResponse, ApiError } from "@shared/api";

export async function getTrips(c: Context) {
  try {
    const trips = await fetchTrips();
    return c.json<TripsResponse>({ trips });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}

export async function getPhotos(c: Context) {
  const tripId = c.req.query("trip-id");
  const favOnly = c.req.query("favonly") === "true";

  try {
    const photos = await fetchPhotos(tripId, favOnly);
    return c.json<PhotosResponse>({ photos });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json<ApiError>({ error: message }, 500);
  }
}
