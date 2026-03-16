import type { Context } from "hono";
import type { ApiError } from "@shared/api";

export async function proxyImage(c: Context) {
  const url = c.req.query("url");
  if (!url) {
    return c.json<ApiError>({ error: "url parameter required" }, 400);
  }

  try {
    new URL(url);
  } catch {
    return c.json<ApiError>({ error: "Invalid URL" }, 400);
  }

  const res = await fetch(url);
  if (!res.ok) {
    return c.json<ApiError>({ error: `Upstream returned ${res.status}` }, 502);
  }

  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const body = await res.arrayBuffer();

  return new Response(body, {
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=86400",
    },
  });
}
