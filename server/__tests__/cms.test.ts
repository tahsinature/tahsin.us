import { describe, test, expect } from "bun:test";
import { Hono } from "hono";
import { getPage, resolveFiles } from "@server/controllers/cms";
import { registerErrorHandler } from "@server/lib/validation";

const app = new Hono();
registerErrorHandler(app);
app.get("/cms/:pageId", getPage);
app.post("/cms/resolve-files", resolveFiles);

describe("POST /cms/resolve-files", () => {
  test("returns 400 when blockIds is missing", async () => {
    const res = await app.request("/cms/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  test("returns 400 when blockIds is empty", async () => {
    const res = await app.request("/cms/resolve-files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ blockIds: [] }),
    });
    expect(res.status).toBe(400);
  });
});
