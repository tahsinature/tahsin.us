export type ShortLinkResolution =
  | { status: "available"; destination: string }
  | { status: "unavailable" | "error"; destination: null };
