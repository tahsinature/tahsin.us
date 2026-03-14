import { Hono } from "hono";
import { cached } from "@server/middleware/cache";
import { getPhotographs } from "@server/controllers/photographs";

export const photographRoutes = new Hono();

photographRoutes.get("/photographs", cached({ ttl: 1800 }), getPhotographs);
