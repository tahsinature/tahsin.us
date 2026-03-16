import type { Context, Hono } from "hono";
import type { ApiError } from "@shared/api";
import type { z } from "zod";

export class ValidationError extends Error {
  issues: string[];
  constructor(issues: string[]) {
    super("Validation failed");
    this.name = "ValidationError";
    this.issues = issues;
  }
}

type RequestSchema = z.ZodObject<{
  body?: z.ZodTypeAny;
  headers?: z.ZodTypeAny;
}>;

/** Validate request body and/or headers against a request schema. Throws ValidationError on failure. */
export const validateRequest = async <T extends RequestSchema>(c: Context, schema: T): Promise<z.infer<T>> => {
  const shape = schema.shape;
  const input: Record<string, unknown> = {};

  if (shape.body) input.body = await c.req.json().catch(() => null);

  if (shape.headers) {
    const headers: Record<string, string> = {};
    c.req.raw.headers.forEach((value, key) => {
      headers[key] = value;
    });
    input.headers = headers;
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new ValidationError(parsed.error.issues.map((i) => i.message));

  return parsed.data;
};

/** Register the global error handler on a Hono app. */
export const registerErrorHandler = (app: Hono) => {
  app.onError((err, c) => {
    if (err instanceof ValidationError) {
      return c.json<ApiError>({ error: err.issues.join(", ") }, 400);
    }
    console.error(err);
    return c.json<ApiError>({ error: "Internal server error" }, 500);
  });
};
