import { getFaviconAssets } from "./favicons";

export type ShortLinkTheme = "general" | "meeting";

export interface ShortLinkContent {
  theme: ShortLinkTheme;
  label: string;
  title: string;
  description: string;
  preview: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
}

export type ShortLinkOverride = Partial<Omit<ShortLinkContent, "preview">> & {
  preview?: Partial<ShortLinkContent["preview"]>;
};

/** Public configuration, shared by the page and the HTML served to preview crawlers. */
export const shortLinkConfig = {
  origin: "https://tahsin.us",
  shortOrigin: "https://url.tahsin.us",
  /** "portal" retries on the current host; "short-link" visits Short.io directly. */
  retryMode: "portal" as "portal" | "short-link",
  siteName: "Shared links",
  handoff: {
    durationMs: 5000,
    label: "A little closer",
    title: "Good things are connected.",
    description: "Finding the next stop on your journey.",
    readyTitle: "You’re connected.",
    readyDescription: "Your next stop is ready. Taking you there now.",
  },
  themes: {
    general: {
      theme: "general",
      label: "A small detour",
      title: "This link isn’t available.",
      description: "The destination may have changed, expired, or hasn’t been set up yet.",
      preview: {
        title: "Shared link",
        description: "Open this link for the latest destination and updates.",
        image: getFaviconAssets().png,
        imageAlt: "Tahsin logo",
      },
    },
    meeting: {
      theme: "meeting",
      label: "A moment before we meet",
      title: "This meeting link isn’t available.",
      description: "Meeting access may not be set up yet, or the invitation may have changed.",
      preview: {
        title: "Meeting details",
        description: "Open this link for meeting access and updates.",
        image: getFaviconAssets().png,
        imageAlt: "Tahsin logo",
      },
    },
  } satisfies Record<ShortLinkTheme, ShortLinkContent>,
  // Match whole words separated by punctuation, spaces, or slashes.
  meetingKeywords: ["zoom", "meet", "meeting", "teams", "webex", "call"],
  // Keys are decoded, lowercase slugs without /short/. Exact overrides win.
  // zoom: { preview: { title: "Project catch-up", image: "/my-preview.png" } },
  links: {} as Record<string, ShortLinkOverride>,
};

export function isShortLinkPath(pathname: string): boolean {
  return pathname === "/short" || pathname.startsWith("/short/");
}

function getShortLinkSlug(pathname: string, search: string): string {
  const forwardedSlug = new URLSearchParams(search).get("slug");
  if (forwardedSlug) return forwardedSlug.replace(/^\/+|\/+$/g, "");
  const value = pathname.replace(/^\/short\/?/, "");
  try {
    return decodeURIComponent(value).replace(/^\/+|\/+$/g, "");
  } catch {
    return value.replace(/^\/+|\/+$/g, "");
  }
}

export function getShortLinkRetryUrl(pathname: string, search = ""): string | null {
  if (!isShortLinkPath(pathname)) return null;
  const slug = getShortLinkSlug(pathname, search);
  // /short/404 is the generic fallback, not the original short-link slug.
  if (!slug || slug === "404") return null;
  const segments = slug.split("/");
  if (segments.some((segment) => segment === "." || segment === "..")) return null;
  const path = segments.map(encodeURIComponent).join("/");
  return `${shortLinkConfig.shortOrigin}/${path}`;
}

export function getShortLinkRetryHref(pathname: string, search = ""): string | null {
  const originalUrl = getShortLinkRetryUrl(pathname, search);
  if (!originalUrl) return null;
  return shortLinkConfig.retryMode === "portal" ? `${pathname}${search}` : originalUrl;
}

export function resolveShortLink(pathname: string, search = ""): ShortLinkContent {
  // A fixed fallback can also receive /short/404?slug=team-zoom.
  const slug = getShortLinkSlug(pathname, search).toLowerCase();
  const override = Object.hasOwn(shortLinkConfig.links, slug) ? shortLinkConfig.links[slug] : undefined;
  const words = slug.split(/[^\p{L}\p{N}]+/u);
  const theme = override?.theme ?? (words.some((word) => shortLinkConfig.meetingKeywords.includes(word)) ? "meeting" : "general");
  const defaults = shortLinkConfig.themes[theme];

  return { ...defaults, ...override, preview: { ...defaults.preview, ...override?.preview } };
}
