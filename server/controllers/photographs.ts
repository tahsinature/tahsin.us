import type { Context } from "hono";
import { fetchTrips, fetchPhotos } from "@server/lib/photographs";

function getToken() {
  const token = process.env.N_TOK;
  if (!token || token === "your_notion_token_here") return null;
  return token;
}

export async function getTrips(c: Context) {
  const token = getToken();
  if (!token) return c.json({ error: "N_TOK not configured" }, 500);

  try {
    const trips = await fetchTrips(token);
    return c.json({ trips });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
}

export async function getPhotos(c: Context) {
  const token = getToken();
  if (!token) return c.json({ error: "N_TOK not configured" }, 500);

  const tripId = c.req.query("trip-id");
  const favOnly = c.req.query("favonly") === "true";

  try {
    const photos = await fetchPhotos(token, tripId, favOnly);
    return c.json({ photos });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
}
