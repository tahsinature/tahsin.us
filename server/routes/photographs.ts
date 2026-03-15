import { Hono } from "hono";
import { cached } from "@server/middleware/cache";
import { getTrips, getPhotos } from "@server/controllers/photographs";

export const photographRoutes = new Hono();

photographRoutes.get("/trips", cached({ ttl: 1800 }), getTrips);
photographRoutes.get("/photos", cached({ ttl: 1800 }), getPhotos);
