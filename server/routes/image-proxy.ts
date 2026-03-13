import { Hono } from "hono";
import { proxyImage } from "@server/controllers/image-proxy";

export const imageProxyRoutes = new Hono();

imageProxyRoutes.get("/image-proxy", proxyImage);
