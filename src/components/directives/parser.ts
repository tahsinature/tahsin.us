import type { DirectiveProps, DirectiveConfig, DirectiveHost, DirectiveResult, DirectiveError, PageLink } from "./types";
import { directiveRegistry } from "./registry";

/** Parse directives (@key: value) and content from toggle inner text */
export function parseDirectiveContent(text: string, config: DirectiveConfig): { props: DirectiveProps; warnings: string[] } {
  const lines = text.split("\n");
  const props: DirectiveProps = {};
  const warnings: string[] = [];
  const usedLines = new Set<number>();

  // Mark @type line as used
  lines.forEach((l, i) => {
    if (l.trim().match(/^@type:\s*.+$/i)) usedLines.add(i);
  });

  // Extract known annotations — supports both @key: value and @key (flag)
  for (const key of config.annotations) {
    lines.forEach((l, i) => {
      const t = l.trim();
      const reVal = new RegExp(`^@${key}:\\s*(.+)$`, "i");
      const m = t.match(reVal);
      if (m) {
        props[key] = m[1].trim();
        usedLines.add(i);
        return;
      }
      if (t.toLowerCase() === `@${key}`) {
        props[key] = "true";
        usedLines.add(i);
      }
    });
  }

  // Detect unknown annotations (lines with @ that weren't consumed)
  lines.forEach((l, i) => {
    if (usedLines.has(i)) return;
    const t = l.trim();
    const m = t.match(/^@(\S+?)(?::\s*(.*))?$/);
    if (m && m[1].toLowerCase() !== "type") {
      warnings.push(`Unknown annotation @${m[1]} — supported: ${config.annotations.map((a) => `@${a}`).join(", ")}`);
      usedLines.add(i);
    }
  });

  // Extract images
  if (config.extractImage || config.extractAllImages) {
    const imgRe = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const images: string[] = [];
    lines.forEach((l, i) => {
      const matches = [...l.matchAll(imgRe)];
      if (matches.length > 0) {
        for (const m of matches) images.push(m[2]);
        usedLines.add(i);
      }
    });
    if (config.extractAllImages) props.images = images;
    if (config.extractImage && images.length > 0) props.image = images[0];
  }

  // Extract <page> tags
  if (config.extractPage || config.extractAllPages) {
    const pages: PageLink[] = [];
    lines.forEach((l, i) => {
      const t = l.trim();
      // <page url="...">Title</page>
      const pm = t.match(/<page\s+url=["']([^"']*)["']>([^<]*)<\/page>/);
      if (pm) {
        const idMatch = pm[1].match(/([a-f0-9]{32})\/?$/i);
        if (idMatch) pages.push({ pageId: idMatch[1], title: pm[2] || "Untitled" });
        usedLines.add(i);
        return;
      }
      // Markdown link to a page: - [Title](/id?pvs=...) or [Title](/id)
      const lm = t.match(/\[([^\]]+)\]\(\/([a-f0-9]{32})[^)]*\)/i);
      if (lm) {
        pages.push({ pageId: lm[2], title: lm[1] });
        usedLines.add(i);
      }
    });
    if (config.extractAllPages) props.pages = pages;
    if (config.extractPage && pages.length > 0) {
      props.pageId = pages[0].pageId;
      if (!props.title && pages[0].title) props.title = pages[0].title;
    }
  }

  // Collect remaining text as body
  if (config.collectBody) {
    const bodyLines = lines.filter((_, i) => !usedLines.has(i)).filter((l) => l.trim().length > 0);
    const body = bodyLines.join("\n").trim();
    if (body) props.body = body;
  }

  return { props, warnings };
}

/**
 * Try to parse text as a directive.
 * Returns a result, an error, or null (no @type found — not a directive).
 */
export function tryParseDirective(
  innerText: string,
  host: DirectiveHost,
  fallbackTitle?: string,
): { result: DirectiveResult } | { error: DirectiveError } | null {
  const typeMatch = innerText.match(/^@type:\s*(.+)$/im);
  if (!typeMatch) return null;

  const directiveType = typeMatch[1].trim().toLowerCase();
  const config = directiveRegistry[directiveType];

  // Unknown directive type
  if (!config) {
    const available = Object.entries(directiveRegistry)
      .filter(([, cfg]) => cfg.hosts.includes(host))
      .map(([name]) => name);
    const hint = available.length > 0 ? `Available for <${host}>: ${available.join(", ")}` : `No directives available for <${host}>`;
    return {
      error: {
        directiveType,
        host,
        message: `Unknown directive "@type: ${directiveType}". ${hint}`,
      },
    };
  }

  // Host mismatch
  if (!config.hosts.includes(host)) {
    const validHosts = config.hosts.join(", ");
    return {
      error: {
        directiveType,
        host,
        message: `"@type: ${directiveType}" cannot be used on <${host}>. Supported hosts: ${validHosts}`,
      },
    };
  }

  const { props, warnings } = parseDirectiveContent(innerText, config);

  if (!props.title && fallbackTitle?.trim()) {
    props.title = fallbackTitle.trim();
  }

  return { result: { directiveType, props, warnings } };
}
