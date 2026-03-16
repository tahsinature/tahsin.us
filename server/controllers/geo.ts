import type { Context } from "hono";
import type { GeoResponse, ApiError } from "@shared/api";

export async function getGeo(c: Context) {
  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    c.req.header("x-real-ip") ||
    "unknown";

  const res = await fetch(`https://ipapi.co/${ip === "unknown" || ip === "127.0.0.1" || ip === "::1" ? "" : `${ip}/`}json/`);
  if (!res.ok) {
    return c.json<ApiError>({ error: `Upstream returned ${res.status}` }, 502);
  }
  const data = (await res.json()) as GeoResponse;
  return c.json<GeoResponse>(data);
}
