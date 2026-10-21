import { resolveShortLink, shortLinkConfig } from "./short-links";

export function getShortLinkMetadata(pathname: string, search = "") {
  const { preview } = resolveShortLink(pathname, search);
  const image = new URL(preview.image, shortLinkConfig.origin).href;
  const url = new URL(pathname, shortLinkConfig.origin);
  // Keep only the theme-relevant slug, not tracking or arbitrary query parameters.
  const slug = new URLSearchParams(search).get("slug");
  if (slug) url.searchParams.set("slug", slug);

  return {
    title: preview.title,
    tags: [
      { name: "description", content: preview.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: shortLinkConfig.siteName },
      { property: "og:title", content: preview.title },
      { property: "og:description", content: preview.description },
      { property: "og:url", content: url.href },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: preview.imageAlt },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: preview.title },
      { name: "twitter:description", content: preview.description },
      { name: "twitter:image", content: image },
      { name: "twitter:image:alt", content: preview.imageAlt },
    ],
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

/** Insert metadata before JavaScript runs, including for crawlers that don't render React. */
export function injectShortLinkMetadata(html: string, pathname: string, search = ""): string {
  const { title, tags } = getShortLinkMetadata(pathname, search);
  const metadata = tags.map(({ name, property, content }) =>
    `<meta data-short-link="" ${name ? `name="${name}"` : `property="${property}"`} content="${escapeHtml(content)}" />`,
  ).join("\n    ");

  return html
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<meta\b[^>]*(?:name\s*=\s*["'](?:description|robots|twitter:[^"']*)["']|property\s*=\s*["']og:[^"']*["'])[^>]*>/gi, "")
    .replace("</head>", `<title>${escapeHtml(title)}</title>\n    ${metadata}\n  </head>`);
}
