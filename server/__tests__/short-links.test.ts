import { describe, expect, test } from "bun:test";
import { getShortLinkRetryHref, getShortLinkRetryUrl, resolveShortLink, shortLinkConfig, isShortLinkPath } from "@shared/short-links";
import { injectShortLinkMetadata } from "@shared/short-link-metadata";
import { createShortLinkRoutes } from "@server/routes/short-links";
import { getFaviconAssets } from "@shared/favicons";

describe.each(["/short", "/s"])("short link fallback (%s)", (prefix) => {
  test("retry mode can stay on the current host or open the original short link", () => {
    const previousMode = shortLinkConfig.retryMode;
    try {
      shortLinkConfig.retryMode = "portal";
      expect(getShortLinkRetryHref(`${prefix}/Team-Zoom`)).toBe(`${prefix}/Team-Zoom`);
      expect(getShortLinkRetryHref(`${prefix}/404`, "?slug=Team-Zoom")).toBe(`${prefix}/404?slug=Team-Zoom`);
      expect(getShortLinkRetryHref(`${prefix}/404`)).toBeNull();
      shortLinkConfig.retryMode = "short-link";
      expect(getShortLinkRetryHref(`${prefix}/Team-Zoom`)).toBe("https://url.tahsin.us/Team-Zoom");
      expect(getShortLinkRetryHref(`${prefix}/404`, "?slug=Team-Zoom")).toBe("https://url.tahsin.us/Team-Zoom");
      expect(getShortLinkRetryHref(`${prefix}/404`)).toBeNull();
    } finally {
      shortLinkConfig.retryMode = previousMode;
    }
  });
  test("retries the original short domain, preserving case and encoding slug characters", () => {
    expect(getShortLinkRetryUrl(`${prefix}/Team-Zoom`)).toBe("https://url.tahsin.us/Team-Zoom");
    expect(getShortLinkRetryUrl(`${prefix}/team/Zoom`)).toBe("https://url.tahsin.us/team/Zoom");
    expect(getShortLinkRetryUrl(`${prefix}/404`, "?slug=Team-Zoom")).toBe("https://url.tahsin.us/Team-Zoom");
    expect(getShortLinkRetryUrl(`${prefix}/404`, "?slug=Team%3Fzoom%23invite")).toBe("https://url.tahsin.us/Team%3Fzoom%23invite");
    expect(getShortLinkRetryUrl(`${prefix}/Team%20Zoom`)).toBe("https://url.tahsin.us/Team%20Zoom");
    expect(getShortLinkRetryUrl(`${prefix}/404`, "?slug=%2F%2Fevil.example%2Fzoom")).toBe("https://url.tahsin.us/evil.example/zoom");
    for (const pathname of [prefix, `${prefix}/`, `${prefix}/404`, `${prefix}/../zoom`, "/blog/zoom"]) {
      expect(getShortLinkRetryUrl(pathname)).toBeNull();
    }
  });
  test("recognizes only the dedicated route prefix", () => {
    expect(isShortLinkPath(prefix)).toBe(true);
    expect(isShortLinkPath(`${prefix}/404`)).toBe(true);
    expect(isShortLinkPath("/shorter/zoom")).toBe(false);
    expect(isShortLinkPath("/something/zoom")).toBe(false);
  });

  test("uses meeting words without matching unrelated substrings", () => {
    for (const slug of ["ZOOM", "team-meeting", "google%20meet", "meeting/weekly", "teams_call"]) {
      expect(resolveShortLink(`${prefix}/${slug}`).theme).toBe("meeting");
    }
    for (const slug of ["404", "zoomorphic", "recall", "meetings", "%zz", "__proto__"]) {
      expect(resolveShortLink(`${prefix}/${slug}`).theme).toBe("general");
    }
    expect(resolveShortLink(`${prefix}/404`, "?slug=weekly-zoom").theme).toBe("meeting");
  });

  test("exact configuration overrides keywords and merges preview defaults", () => {
    shortLinkConfig.links["zoom-test"] = { theme: "general", preview: { title: 'Custom <title> & "preview"' } };
    try {
      const content = resolveShortLink(`${prefix}/ZOOM-TEST/`);
      expect(content.theme).toBe("general");
      expect(content.preview.title).toBe('Custom <title> & "preview"');
      expect(content.preview.image).toBe(shortLinkConfig.themes.general.preview.image);
      const html = injectShortLinkMetadata("<head><title>Tahsin</title></head>", `${prefix}/zoom-test`);
      expect(html).toContain("Custom &lt;title&gt; &amp; &quot;preview&quot;");
      expect(html).not.toContain("<title>Tahsin</title>");
    } finally {
      delete shortLinkConfig.links["zoom-test"];
    }
  });

  test("serves crawler metadata in initial HTML without changing ordinary routes", async () => {
    const template = '<html><head><title>Tahsin</title><meta name="description" content="Personal bio"></head><body><div id="root"></div></body></html>';
    const app = createShortLinkRoutes(async () => template);
    const response = await app.request(`http://localhost${prefix}/404?slug=team-zoom&utm_source=private`);
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-cache");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    expect(html).toContain('<title>Meeting details</title>');
    const previewImage = `https://tahsin.us${getFaviconAssets().png}`;
    expect(html).toContain(`property="og:image" content="${previewImage}"`);
    expect(html).toContain(`name="twitter:image" content="${previewImage}"`);
    expect(html).toContain('name="twitter:card" content="summary"');
    expect(html).toContain(`https://tahsin.us${prefix}/404?slug=team-zoom`);
    expect(html).not.toContain("Personal bio");
    expect(html).not.toContain("utm_source");
    const generalResponse = await app.request(`http://localhost${prefix}`);
    expect(generalResponse.status).toBe(200);
    const generalHtml = await generalResponse.text();
    expect(generalHtml).toContain(`property="og:image" content="${previewImage}"`);
    expect(generalHtml).toContain('name="twitter:card" content="summary"');
    expect((await app.request("http://localhost/shorter")).status).toBe(404);
    expect((await app.request("http://localhost/blog")).status).toBe(404);
  });
});
