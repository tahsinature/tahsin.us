import type { Context } from "hono";
import { fetchPhotographs } from "@server/lib/photographs";

function getToken() {
  const token = process.env.N_TOK;
  if (!token || token === "your_notion_token_here") {
    return null;
  }
  return token;
}

export async function getPhotographs(c: Context) {
  const token = getToken();
  if (!token) return c.json({ error: "N_TOK not configured" }, 500);

  try {
    const result = await fetchPhotographs(token);
    return c.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return c.json({ error: message }, 500);
  }
}
