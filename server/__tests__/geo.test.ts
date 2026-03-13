import { describe, test, expect, mock, beforeEach } from "bun:test";
import { Hono } from "hono";
import { getGeo } from "@server/controllers/geo";

const app = new Hono();
app.get("/geo", getGeo);

const fakeGeoData = {
  ip: "8.8.8.8",
  city: "Mountain View",
  country_name: "United States",
};

describe("GET /geo", () => {
  test("returns geo data", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () =>
      new Response(JSON.stringify(fakeGeoData), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    ) as typeof fetch;

    const res = await app.request("/geo");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.city).toBe("Mountain View");

    globalThis.fetch = originalFetch;
  });

  test("returns 502 when upstream fails", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () =>
      new Response(null, { status: 429 })
    ) as typeof fetch;

    const res = await app.request("/geo");
    expect(res.status).toBe(502);

    globalThis.fetch = originalFetch;
  });

  test("forwards x-forwarded-for IP", async () => {
    let requestedUrl = "";
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async (url: string | URL | Request) => {
      requestedUrl = url.toString();
      return new Response(JSON.stringify(fakeGeoData), { status: 200 });
    }) as typeof fetch;

    await app.request("/geo", {
      headers: { "x-forwarded-for": "1.2.3.4" },
    });

    expect(requestedUrl).toContain("1.2.3.4");

    globalThis.fetch = originalFetch;
  });
});
