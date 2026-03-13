import type { Context } from "hono";

export async function getGeo(c: Context) {
  const ip =
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
    c.req.header("x-real-ip") ||
    "unknown";

  try {
    const res = await fetch(`https://ipapi.co/${ip === "unknown" || ip === "127.0.0.1" || ip === "::1" ? "" : `${ip}/`}json/`);
    if (!res.ok) {
      return c.json({ error: `Upstream returned ${res.status}` }, 502);
    }
    const data = await res.json();
    return c.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 502);
  }
}
