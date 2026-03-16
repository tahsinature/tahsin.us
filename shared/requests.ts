/** Shared request schemas — Zod schemas for API request validation. */

import { z } from "zod";

// ── Helper type: extract body type from a request schema ──

export type RequestBody<T extends z.ZodObject<{ body: z.ZodTypeAny }>> = z.infer<T>["body"];

// ── PUT /api/ops/config ──

export const updateAppConfigRequest = z.object({
  body: z
    .object({
      debugMode: z.boolean().optional(),
      maintenanceMode: z.boolean().optional(),
    })
    .strict(),
});

export type UpdateAppConfigBody = RequestBody<typeof updateAppConfigRequest>;

// ── POST /api/cms/resolve-files ──

export const resolveFilesRequest = z.object({
  body: z.object({
    blockIds: z.array(z.string()),
  }),
});

export type ResolveFilesBody = RequestBody<typeof resolveFilesRequest>;
