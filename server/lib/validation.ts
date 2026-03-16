import type { Context } from "hono";
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
