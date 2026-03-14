import type { DirectiveProps, DirectiveConfig, DirectiveResult, DirectiveError, PageLink } from "./types";
import { directiveRegistry } from "./registry";

/**
 * Extract the first fenced code block from toggle inner text.
 * Returns the code block content and the remaining text (everything outside the code block).
 * Handles Notion's tab-indented fences and optional language tags.
 */
function extractCodeBlock(text: string): { code: string; rest: string } | null {
  const lines = text.split("\n");
  let fenceStart = -1;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].replace(/^\t+/, "");
    if (fenceStart === -1) {
      if (/^```\w*$/.test(trimmed)) fenceStart = i;
    } else {
      if (/^```$/.test(trimmed)) {
        const code = lines.slice(fenceStart + 1, i).join("\n");
        const rest = [...lines.slice(0, fenceStart), ...lines.slice(i + 1)].join("\n");
        return { code, rest };
      }
    }
  }
  return null;
}

/**
 * Parse annotations from code block lines.
 * Simple key-value: `@key: value` or boolean flag: `@key`
 */
function parseAnnotations(code: string, config: DirectiveConfig): { annotations: Record<string, string>; warnings: string[] } {
  const annotations: Record<string, string> = {};
  const warnings: string[] = [];
  const known = new Set(config.annotations);

  for (const line of code.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("@type:") || trimmed.startsWith("@type :")) continue;

    const match = trimmed.match(/^@(\S+?)(?::\s*(.*))?$/);
    if (match) {
      const key = match[1].toLowerCase();
      const value = match[2]?.trim() ?? "true";
      if (known.has(key)) {
        annotations[key] = value;
      } else {
        warnings.push(`Unknown annotation @${key} — supported: ${config.annotations.map((a) => `@${a}`).join(", ")}`);
      }
    }
  }

  return { annotations, warnings };
}

/**
 * Extract content (images, pages, body text) from the non-code-block portion of the toggle.
 */
function extractContent(text: string, config: DirectiveConfig): Partial<DirectiveProps> {
  const props: Partial<DirectiveProps> = {};
  const lines = text.split("\n");
  const usedLines = new Set<number>();

  // Mark callout wrapper lines as used (they're just containers)
  lines.forEach((l, i) => {
    const t = l.trim();
    if (t === "<callout>" || t === "</callout>" || /^<callout\s/.test(t)) usedLines.add(i);
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
      const pm = t.match(/<page\s+url=["']([^"']*)["']>([^<]*)<\/page>/);
      if (pm) {
        const idMatch = pm[1].match(/([a-f0-9]{32})\/?$/i);
        if (idMatch) pages.push({ pageId: idMatch[1], title: pm[2] || "Untitled" });
        usedLines.add(i);
        return;
      }
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

  // Extract media src (<audio src="...">, <video src="...">, etc.)
  if (config.extractMedia) {
    lines.forEach((l, i) => {
      const m = l.match(/<(?:audio|video)\s+src="([^"]+)"/);
      if (m) {
        props.src = m[1];
        usedLines.add(i);
      }
    });
  }

  // Collect remaining text as body.
  // Notion wraps content in tabs for nesting (toggle → callout → item) — we need to
  // find the common tab prefix and strip it so the list's own relative indentation is preserved.
  if (config.collectBody) {
    const candidateLines = lines
      .filter((_, i) => !usedLines.has(i))
      .map((l) => l.replace(/^>\s?/, ""))
      .filter((l) => l.trim().length > 0);
    // Find minimum leading tab count across all content lines
    const minTabs = candidateLines.reduce((min, l) => {
      const m = l.match(/^\t*/);
      const count = m ? m[0].length : 0;
      return Math.min(min, count);
    }, Infinity);
    const stripRe = minTabs > 0 && minTabs < Infinity ? new RegExp(`^\\t{${minTabs}}`) : null;
    const bodyLines = candidateLines
      .map((l) => (stripRe ? l.replace(stripRe, "") : l))
      .map((l) => l.replace(/\t/g, "    "));
    const body = bodyLines.join("\n").trim();
    if (body) props.body = body;
  }

  return props;
}

/**
 * Try to parse toggle inner text as a directive.
 *
 * Detection rule: a toggle is a directive ONLY if it contains a fenced code block
 * with `@type: <name>`. The code block holds all annotations. Everything outside
 * the code block (text, images, pages) is content.
 *
 * Returns a result, an error, or null (not a directive).
 */
export function tryParseDirective(
  innerText: string,
): { result: DirectiveResult } | { error: DirectiveError } | null {
  // Step 1: Extract the code block — no code block means not a directive
  const extracted = extractCodeBlock(innerText);
  if (!extracted) return null;

  const { code, rest } = extracted;

  // Step 2: Check for @type — no @type means not a directive
  const typeMatch = code.match(/^@type:\s*(.+)$/im);
  if (!typeMatch) return null;

  // Step 3: Resolve directive type (exact match or prefix variant)
  const rawType = typeMatch[1].trim().toLowerCase();
  let config = directiveRegistry[rawType];
  let variant: string | undefined;

  if (!config) {
    const dashIdx = rawType.indexOf("-");
    if (dashIdx > 0) {
      const prefix = rawType.slice(0, dashIdx);
      const prefixConfig = directiveRegistry[prefix];
      if (prefixConfig) {
        config = prefixConfig;
        variant = rawType.slice(dashIdx + 1);
      }
    }
  }

  if (!config) {
    const available = Object.keys(directiveRegistry);
    return { error: { directiveType: rawType, message: `Unknown directive "@type: ${rawType}". Available: ${available.join(", ")}` } };
  }

  // Step 4: Parse annotations from code block
  const { annotations, warnings } = parseAnnotations(code, config);

  // Step 5: Extract content from the rest of the toggle
  const content = extractContent(rest, config);

  // Step 6: Merge everything into props
  const props: DirectiveProps = { ...content, ...annotations };
  if (variant) props.variant = variant;

  const resolvedType = variant ? rawType.slice(0, rawType.indexOf("-")) : rawType;

  return { result: { directiveType: resolvedType, props, warnings } };
}
