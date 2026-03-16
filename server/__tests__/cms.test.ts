import { describe, test, expect, mock } from "bun:test";
import { Hono } from "hono";
import { getPage, resolveFiles } from "@server/controllers/cms";

// Mock env
process.env.N_TOK = "test-token";

// We can't easily mock CMS client imports, so test the HTTP layer:
// validation, error handling, response shape.

const app = new Hono();
app.get("/cms/:pageId", getPage);
app.post("/cms/resolve-files", resolveFiles);

describe("GET /cms/:pageId", () => {
  test("returns 500 when token is not configured", async () => {
    const original = process.env.N_TOK;
    delete process.env.N_TOK;

    const res = await app.request("/cms/abc123");
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("N_TOK");

    process.env.N_TOK = original;
  });
});

describe("POST /cms/resolve-files", () => {
  test("returns 400 when blockIds is missing", async () => {
    const res = await app.request("/cms/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("blockIds");
  });

  test("returns 400 when blockIds is empty", async () => {
    const res = await app.request("/cms/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockIds: [] }),
    });
    expect(res.status).toBe(400);
  });

  test("returns 500 when token is not configured", async () => {
    const original = process.env.N_TOK;
    delete process.env.N_TOK;

    const res = await app.request("/cms/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockIds: ["abc"] }),
    });
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("N_TOK");

    process.env.N_TOK = original;
  });
});
