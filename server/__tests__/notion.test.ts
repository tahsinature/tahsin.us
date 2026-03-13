import { describe, test, expect, mock } from "bun:test";
import { Hono } from "hono";
import { getPage, resolveFiles } from "@server/controllers/notion";

// Mock env
process.env.NOTION_TOKEN = "test-token";

// We can't easily mock @notionhq/client imports, so test the HTTP layer:
// validation, error handling, response shape.

const app = new Hono();
app.get("/notion/:pageId", getPage);
app.post("/notion/resolve-files", resolveFiles);

describe("GET /notion/:pageId", () => {
  test("returns 500 when token is not configured", async () => {
    const original = process.env.NOTION_TOKEN;
    delete process.env.NOTION_TOKEN;

    const res = await app.request("/notion/abc123");
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("NOTION_TOKEN");

    process.env.NOTION_TOKEN = original;
  });
});

describe("POST /notion/resolve-files", () => {
  test("returns 400 when blockIds is missing", async () => {
    const res = await app.request("/notion/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("blockIds");
  });

  test("returns 400 when blockIds is empty", async () => {
    const res = await app.request("/notion/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockIds: [] }),
    });
    expect(res.status).toBe(400);
  });

  test("returns 500 when token is not configured", async () => {
    const original = process.env.NOTION_TOKEN;
    delete process.env.NOTION_TOKEN;

    const res = await app.request("/notion/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockIds: ["abc"] }),
    });
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("NOTION_TOKEN");

    process.env.NOTION_TOKEN = original;
  });
});
