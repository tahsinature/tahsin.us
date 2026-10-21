import { describe, expect, test } from "bun:test";
import { findShortLinkDestination } from "@server/lib/short-link-destination";
import { createShortLinkResolutionRoutes } from "@server/routes/short-link-resolution";
import type { ShortLinkFetch } from "@server/lib/short-link-destination";

const redirect = (location: string) => new Response(null, { status: 302, headers: { location } });

describe("short-link destination lookup", () => {
  test("opens an existing destination without requesting the meeting itself", async () => {
    const calls: string[] = [];
    const fetchLink: ShortLinkFetch = async (url, init) => {
      calls.push(url);
      expect(init.method).toBe("HEAD");
      expect(init.redirect).toBe("manual");
      return redirect("https://zoom.us/j/123?pwd=example");
    };
    expect(await findShortLinkDestination("/short/Team-Zoom", "", fetchLink)).toEqual({
      status: "available", destination: "https://zoom.us/j/123?pwd=example",
    });
    expect(calls).toEqual(["https://url.tahsin.us/Team-Zoom"]);
  });

  test("recognizes both fallback URL formats and prevents self-redirect loops", async () => {
    for (const location of ["https://tahsin.us/short/404", "https://tahsin.us/short/team-zoom", "https://tahsin.us/short/404?slug=team-zoom", "https://url.tahsin.us/team-zoom", "javascript:alert(1)", "https://name:secret@example.com/"]) {
      const result = await findShortLinkDestination("/short/team-zoom", "", async () => redirect(location));
      expect(result.status).toBe("unavailable");
      expect(result.destination).toBeNull();
    }
  });

  test("follows aliases only on the configured short domain", async () => {
    const calls: string[] = [];
    const result = await findShortLinkDestination("/short/zoom", "", async (url) => {
      calls.push(url);
      return redirect(calls.length === 1 ? "/meeting" : "https://example.com/event");
    });
    expect(result).toEqual({ status: "available", destination: "https://example.com/event" });
    expect(calls).toEqual(["https://url.tahsin.us/zoom", "https://url.tahsin.us/meeting"]);
  });

  test("does not request a generic fallback or accept arbitrary lookup hosts", async () => {
    let calls = 0;
    const fetchLink: ShortLinkFetch = async () => { calls++; return redirect("https://example.com"); };
    expect((await findShortLinkDestination("/short/404", "", fetchLink)).status).toBe("unavailable");
    expect((await findShortLinkDestination("/short", "", fetchLink)).status).toBe("unavailable");
    const app = createShortLinkResolutionRoutes(fetchLink);
    expect((await app.request("/short-links/resolve?path=https://example.com")).status).toBe(400);
    expect(calls).toBe(0);
  });

  test("distinguishes missing, protected, and temporarily unreachable links", async () => {
    expect((await findShortLinkDestination("/short/zoom", "", async () => new Response(null, { status: 404 }))).status).toBe("unavailable");
    expect((await findShortLinkDestination("/short/zoom", "", async () => new Response(null, { status: 503 }))).status).toBe("error");
    expect((await findShortLinkDestination("/short/zoom", "", async () => { throw new Error("timeout"); })).status).toBe("error");
    expect(await findShortLinkDestination("/short/zoom", "", async () => new Response("Password required"))).toEqual({ status: "available", destination: "https://url.tahsin.us/zoom" });
  });

  test("returns uncached resolution results for the API", async () => {
    const app = createShortLinkResolutionRoutes(async () => redirect("https://example.com/meeting"));
    const response = await app.request("/short-links/resolve?path=/short/zoom");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ status: "available", destination: "https://example.com/meeting" });
  });
});
