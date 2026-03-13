import { describe, test, expect, mock, beforeEach } from "bun:test";
import { Hono } from "hono";
import { proxyImage } from "@server/controllers/image-proxy";

const app = new Hono();
app.get("/image-proxy", proxyImage);

describe("GET /image-proxy", () => {
  test("returns 400 when url param is missing", async () => {
    const res = await app.request("/image-proxy");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("url");
  });

  test("returns 400 for invalid URL", async () => {
    const res = await app.request("/image-proxy?url=not-a-url");
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid");
  });

  test("proxies a valid image URL", async () => {
    const fakeImage = new Uint8Array([0x89, 0x50, 0x4e, 0x47]); // PNG magic bytes
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () =>
      new Response(fakeImage, {
        status: 200,
        headers: { "content-type": "image/png" },
      })
    ) as typeof fetch;

    const res = await app.request("/image-proxy?url=https://example.com/img.png");
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("image/png");
    expect(res.headers.get("cache-control")).toContain("max-age=86400");

    const buf = await res.arrayBuffer();
    expect(new Uint8Array(buf)).toEqual(fakeImage);

    globalThis.fetch = originalFetch;
  });

  test("returns 502 when upstream fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () =>
      new Response(null, { status: 404 })
    ) as typeof fetch;

    const res = await app.request("/image-proxy?url=https://example.com/missing.png");
    expect(res.status).toBe(502);

    globalThis.fetch = originalFetch;
  });
});
