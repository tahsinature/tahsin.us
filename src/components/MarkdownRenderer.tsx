/**
 * Renders Notion "enhanced markdown" as React components.
 *
 * The Notion markdown API returns standard markdown mixed with custom XML-like
 * tags (<columns>, <column>, <callout>, <video>, etc.). Content inside these
 * tags is still markdown that needs parsing. We recursively split the enhanced
 * markdown into segments, rendering standard markdown with react-markdown and
 * wrapping custom blocks in React components.
 *
 * File/video/PDF attachments come as file:// URIs that aren't usable directly.
 * We resolve them in the background via the block API and update the UI.
 */
import { useContext, useEffect, useRef, useState, useCallback, useMemo, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { codeToHtml, type BundledLanguage } from "shiki";
import { FileText, Download, Loader2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PhotoLightbox from "@/components/PhotoLightbox";
import Mermaid from "@/components/Mermaid";
import { useThemeStore } from "@/stores/useThemeStore";
import type { Photo } from "@/data/photography";
import { ImageViewerContext, FileResolverContext, isFileUri, extractBlockId, useResolvedSrc } from "@/components/directives/contexts";
import { RenderDirective, RenderDirectiveError } from "@/components/directives/index";
import { tryParseDirective } from "@/components/directives/parser";
import type { DirectiveProps, DirectiveError } from "@/components/directives/types";

/** Collect all image URLs from markdown text (standard markdown images) */
function collectImagesFromMarkdown(text: string): Photo[] {
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const photos: Photo[] = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    photos.push({ src: m[2], alt: m[1] });
  }
  return photos;
}

/** Recursively collect images from segments */
function collectImagesFromSegments(segments: Segment[]): Photo[] {
  const photos: Photo[] = [];
  for (const seg of segments) {
    if (seg.type === "markdown") {
      photos.push(...collectImagesFromMarkdown(seg.content));
    } else if (seg.type === "columns") {
      for (const col of seg.children) photos.push(...collectImagesFromSegments(col));
    } else if (seg.type === "callout" || seg.type === "details") {
      photos.push(...collectImagesFromSegments(seg.children));
    } else if (seg.type === "directive") {
      // Skip isolated image-grids — they have their own lightbox
      if (seg.directiveType === "image-grid" && seg.props.isolated !== undefined) continue;
      const imgs = seg.props.images as string[] | undefined;
      const img = seg.props.image as string | undefined;
      if (imgs) photos.push(...imgs.map((src) => ({ src, alt: "" })));
      else if (img) photos.push({ src: img, alt: "" });
    }
  }
  return photos;
}


/** Recursively collect all file:// URIs from segments */
function collectFileUris(segments: Segment[]): string[] {
  const uris: string[] = [];
  for (const seg of segments) {
    if ((seg.type === "video" || seg.type === "audio" || seg.type === "pdf" || seg.type === "file") && isFileUri(seg.src)) {
      uris.push(seg.src);
    }
    if (seg.type === "directive" && seg.props.src && isFileUri(seg.props.src)) {
      uris.push(seg.props.src);
    }
    if (seg.type === "columns") {
      for (const col of seg.children) uris.push(...collectFileUris(col));
    }
    if (seg.type === "callout" || seg.type === "details") {
      uris.push(...collectFileUris(seg.children));
    }
  }
  return uris;
}

/* ── Shiki code highlighting ── */

const SHIKI_THEMES = { dark: "github-dark-dimmed", light: "github-light" } as const;

function HighlightedCode({ code, language }: { code: string; language: string }) {
  const theme = useThemeStore((s) => s.theme);
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    codeToHtml(code, { lang: language as BundledLanguage, theme: SHIKI_THEMES[theme] })
      .then((r) => {
        if (!cancelled) setHtml(r);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [code, language, theme]);

  if (html) {
    return <div className="rounded border border-border overflow-x-auto text-sm leading-relaxed [&_pre]:p-5 [&_pre]:m-0 [&_pre]:bg-[var(--code-bg)]!" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return (
    <pre className="bg-[var(--code-bg)] border border-border rounded p-5 overflow-x-auto text-sm leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

/* ── Loading placeholder for unresolved files ── */

function FileLoadingPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30 my-4 animate-pulse">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground">Fetching {label}...</p>
      </div>
    </div>
  );
}

/* ── Video player ── */

function VideoPlayer({ src, caption }: { src?: string; caption?: string }) {
  const { resolvedUrls, isResolving } = useContext(FileResolverContext);
  const [isPlaying, setIsPlaying] = useState(false);

  const actualSrc = useMemo(() => {
    if (!src || !isFileUri(src)) return src;
    const blockId = extractBlockId(src);
    if (blockId) {
      const resolved = resolvedUrls.get(blockId);
      return resolved?.url ?? undefined;
    }
    return undefined;
  }, [src, resolvedUrls]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.querySelector("video");
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  if (src && isFileUri(src) && !actualSrc) {
    if (isResolving) return <FileLoadingPlaceholder label="video" />;
    return <div className="text-sm text-muted-foreground/50 italic my-4">[video unavailable]</div>;
  }

  return (
    <figure className="my-4">
      <div className="group relative rounded-xl border border-border overflow-hidden shadow-md shadow-black/5 bg-black cursor-pointer" onClick={handleClick}>
        <video src={actualSrc} controls className="w-full block" />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="h-16 w-16 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-foreground ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
}

/** Convert inline markdown (bold, italic, code, strikethrough, links) to HTML */
function inlineMarkdownToHtml(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/~~(.+?)~~/g, "<s>$1</s>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

/* ── Enhanced markdown parser ── */

type Segment =
  | { type: "markdown"; content: string }
  | { type: "columns"; children: Segment[][] }
  | { type: "callout"; icon?: string; children: Segment[] }
  | { type: "empty-block" }
  | { type: "video"; src: string; caption?: string }
  | { type: "audio"; src: string; caption?: string }
  | { type: "pdf"; src: string; caption?: string }
  | { type: "file"; src: string; caption?: string }
  | { type: "details"; summary: string; children: Segment[] }
  | { type: "table"; html: string }
  | { type: "page"; pageId: string; title: string }
  | { type: "directive"; directiveType: string; props: DirectiveProps; warnings?: string[] }
  | { type: "directive-error"; error: DirectiveError };

/** Remove common leading tab indentation from lines */
function dedent(lines: string[]): string[] {
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return lines;
  let common = Infinity;
  for (const l of nonEmpty) {
    let tabs = 0;
    while (tabs < l.length && l[tabs] === "\t") tabs++;
    if (tabs < common) common = tabs;
  }
  if (common === 0 || common === Infinity) return lines;
  return lines.map((l) => l.slice(common));
}

/** Extract attribute value from an XML-like tag string */
function attr(tag: string, name: string): string | undefined {
  const re = new RegExp(`${name}=["']([^"']*)["']`);
  const m = tag.match(re);
  return m?.[1];
}

function parseEnhancedMarkdown(text: string): Segment[] {
  const lines = text.split("\n");
  const segments: Segment[] = [];
  let mdBuffer: string[] = [];

  function flushMd() {
    if (mdBuffer.length > 0) {
      const content = mdBuffer.join("\n").trim();
      if (content) segments.push({ type: "markdown", content });
      mdBuffer = [];
    }
  }

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Self-closing tags
    if (trimmed === "<empty-block/>") {
      flushMd();
      segments.push({ type: "empty-block" });
      i++;
      continue;
    }
    if (trimmed === "<table_of_contents/>") {
      i++;
      continue;
    }

    // <columns>...</columns>
    if (trimmed === "<columns>") {
      flushMd();
      i++;
      const columns: Segment[][] = [];
      let colLines: string[] = [];
      let inColumn = false;
      while (i < lines.length && lines[i].trim() !== "</columns>") {
        const ct = lines[i].trim();
        if (ct === "<column>") {
          inColumn = true;
          colLines = [];
          i++;
          continue;
        }
        if (ct === "</column>") {
          columns.push(parseEnhancedMarkdown(dedent(colLines).join("\n")));
          inColumn = false;
          i++;
          continue;
        }
        if (inColumn) {
          colLines.push(lines[i]);
        }
        i++;
      }
      i++; // skip </columns>
      segments.push({ type: "columns", children: columns });
      continue;
    }

    // <callout icon="..." color="...">...</callout>
    if (trimmed.startsWith("<callout")) {
      flushMd();
      const icon = attr(trimmed, "icon");
      i++;
      const inner: string[] = [];
      while (i < lines.length && lines[i].trim() !== "</callout>") {
        inner.push(lines[i]);
        i++;
      }
      i++; // skip </callout>
      segments.push({ type: "callout", icon, children: parseEnhancedMarkdown(dedent(inner).join("\n")) });
      continue;
    }

    // <details>...</details> (toggles)
    if (trimmed.startsWith("<details")) {
      flushMd();
      i++;
      let summary = "";
      if (i < lines.length && lines[i].trim().startsWith("<summary>")) {
        const sumLine = lines[i].trim();
        summary = sumLine.replace(/<\/?summary>/g, "");
        i++;
      }
      const inner: string[] = [];
      while (i < lines.length && lines[i].trim() !== "</details>") {
        inner.push(lines[i]);
        i++;
      }
      i++; // skip </details>

      const dedented = dedent(inner).join("\n");
      const parsed = tryParseDirective(dedented);

      if (parsed && "error" in parsed) {
        segments.push({ type: "directive-error", error: parsed.error });
      } else if (parsed && "result" in parsed) {
        const { directiveType, props, warnings } = parsed.result;
        segments.push({ type: "directive", directiveType, props, warnings });
      } else {
        segments.push({ type: "details", summary, children: parseEnhancedMarkdown(dedented) });
      }
      continue;
    }

    // <table>...</table> — pass through as raw HTML
    if (trimmed.startsWith("<table")) {
      flushMd();
      const tableLines: string[] = [line];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("</table>")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        tableLines.push(lines[i]);
        i++;
      }
      segments.push({ type: "table", html: tableLines.join("\n") });
      continue;
    }

    // <synced_block>...</synced_block> — render children
    if (trimmed.startsWith("<synced_block") && !trimmed.includes("/>")) {
      flushMd();
      i++;
      const inner: string[] = [];
      const closeTag = trimmed.startsWith("<synced_block_reference") ? "</synced_block_reference>" : "</synced_block>";
      while (i < lines.length && lines[i].trim() !== closeTag) {
        inner.push(lines[i]);
        i++;
      }
      i++; // skip closing tag
      const children = parseEnhancedMarkdown(dedent(inner).join("\n"));
      segments.push(...children);
      continue;
    }

    // <page url="...">Title</page> — child page links
    const pageMatch = trimmed.match(/^<page\s+([^>]*)>(.*?)<\/page>$/);
    if (pageMatch) {
      flushMd();
      const url = attr(trimmed, "url") ?? "";
      // Extract page ID from Notion URL (last 32 hex chars)
      const idMatch = url.match(/([a-f0-9]{32})\/?$/i);
      const pageId = idMatch?.[1] ?? "";
      segments.push({ type: "page", pageId, title: pageMatch[2] || "Untitled" });
      i++;
      continue;
    }

    // Media tags: <video src="...">caption</video> etc.
    let mediaHandled = false;
    for (const tag of ["video", "audio", "pdf", "file"] as const) {
      const re = new RegExp(`^<${tag}\\s+([^>]*)>(.*?)</${tag}>$`);
      const m = trimmed.match(re);
      if (m) {
        flushMd();
        const mediaSrc = attr(trimmed, "src") ?? "";
        const caption = m[2] || "";
        segments.push({ type: tag, src: mediaSrc, caption: caption || undefined });
        i++;
        mediaHandled = true;
        break;
      }
      // Self-closing: <video src="..."/>
      const reSelf = new RegExp(`^<${tag}\\s+([^/]*)/?>$`);
      const ms = trimmed.match(reSelf);
      if (ms) {
        flushMd();
        segments.push({ type: tag, src: attr(trimmed, "src") ?? "" });
        i++;
        mediaHandled = true;
        break;
      }
    }
    if (mediaHandled) continue;

    // Everything else is regular markdown
    mdBuffer.push(line);
    i++;
  }

  flushMd();
  return segments;
}

/* ── Segment renderers ── */

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function ClickableImage({ src, alt }: { src?: string; alt?: string }) {
  const { photos, open } = useContext(ImageViewerContext);
  const index = photos.findIndex((p) => p.src === src);
  const clickable = index !== -1;
  return (
    <figure className="mx-auto max-w-2xl" style={{ marginTop: "4rem", marginBottom: "4rem" }}>
      <div className="rounded-xl border border-border/50 overflow-hidden">
        <img src={src} alt={alt ?? ""} className={`w-full ${clickable ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`} style={{ display: "block", margin: 0 }} onClick={() => clickable && open(index)} loading="lazy" />
      </div>
      {alt && <figcaption className="text-xs text-muted-foreground mt-2 text-center">{alt}</figcaption>}
    </figure>
  );
}

const mdComponents = {
  pre: ({ children }: { children?: ReactNode }) => <>{children}</>,
  p: ({ children }: { children?: ReactNode }) => {
    // If a paragraph contains only a single image, unwrap it so <figure> isn't nested inside <p>
    const childArray = Array.isArray(children) ? children : [children];
    const nonEmpty = childArray.filter((c) => c !== "\n" && c !== " " && c != null);
    if (nonEmpty.length === 1 && typeof nonEmpty[0] === "object" && nonEmpty[0] !== null && "type" in nonEmpty[0] && (nonEmpty[0] as { type: unknown }).type === ClickableImage) {
      return <>{children}</>;
    }
    return <p>{children}</p>;
  },
  img: ClickableImage,
  code: function CodeBlock({ className, children }: { className?: string; children?: ReactNode }) {
    const text = extractText(children);
    const langMatch = className?.match(/language-(\w+)/);
    const lang = langMatch?.[1];

    if (!lang) {
      return <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-accent">{children}</code>;
    }
    if (lang === "mermaid") {
      return <Mermaid chart={text} />;
    }
    return <HighlightedCode code={text} language={lang} />;
  },
};

/** Normalize markdown: ensure proper paragraph breaks outside code blocks */
function normalizeMarkdown(text: string): string {
  // Split by fenced code blocks to avoid modifying code content
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts
    .map((part, i) => {
      // Odd indices are code blocks — leave them alone
      if (i % 2 === 1) return part;

      return part
        // Strip color annotations
        .replace(/\s*\{color="[^"]+"\}/g, "")
        // Strip leading tabs from non-code lines (Notion uses tabs for indentation)
        .replace(/^\t+/gm, "")
        // Single newlines between non-empty lines → double newlines (paragraph break)
        .replace(/([^\n])\n(?!\n)/g, "$1\n\n")
        // Add blank line before/after horizontal rules
        .replace(/([^\n])\n(---)/g, "$1\n\n$2")
        .replace(/(---)\n([^\n])/g, "$1\n\n$2");
    })
    .join("");
}
function MarkdownSegment({ content }: { content: string }) {
  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none [&_code]:before:content-none [&_code]:after:content-none">
      <Markdown remarkPlugins={[remarkGfm]} components={mdComponents as Record<string, React.ComponentType>}>
        {normalizeMarkdown(content)}
      </Markdown>
    </div>
  );
}

function RenderSegments({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <RenderSegment key={i} segment={seg} />
      ))}
    </>
  );
}


function RenderSegment({ segment }: { segment: Segment }) {
  switch (segment.type) {
    case "markdown":
      return <MarkdownSegment content={segment.content} />;

    case "empty-block":
      return <div className="h-4" />;

    case "columns":
      return (
        <div className="grid gap-4 max-md:!grid-cols-1 my-4" style={{ gridTemplateColumns: `repeat(${segment.children.length}, 1fr)` }}>
          {segment.children.map((col, i) => (
            <div key={i} className="space-y-2 min-w-0">
              <RenderSegments segments={col} />
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border border-border my-4">
          {segment.icon && <span className="text-xl shrink-0">{segment.icon}</span>}
          <div className="text-muted-foreground text-[0.95rem] leading-relaxed space-y-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 flex-1 min-w-0">
            <RenderSegments segments={segment.children} />
          </div>
        </div>
      );

    case "details":
      return (
        <details className="text-muted-foreground my-4">
          <summary className="cursor-pointer font-medium text-foreground">{segment.summary}</summary>
          <div className="pl-4 mt-2 space-y-3">
            <RenderSegments segments={segment.children} />
          </div>
        </details>
      );

    case "table":
      return (
        <div
          className="my-4 overflow-x-auto [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_td]:px-4 [&_td]:py-2.5 [&_td]:border-t [&_td]:border-border [&_th]:px-4 [&_th]:py-2.5 [&_th]:border-t [&_th]:border-border [&_th]:text-left [&_th]:font-semibold [&_tr]:transition-colors [&_tr:hover]:bg-secondary/30"
          dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(segment.html) }}
        />
      );

    case "video":
      return <ResolvedVideo src={segment.src} caption={segment.caption} />;

    case "audio":
      return <ResolvedAudio src={segment.src} caption={segment.caption} />;

    case "pdf":
      return <ResolvedPdf src={segment.src} caption={segment.caption} />;

    case "file":
      return <ResolvedFile src={segment.src} caption={segment.caption} />;

    case "page":
      return <PageLink pageId={segment.pageId} title={segment.title} />;

    case "directive":
      return <RenderDirective type={segment.directiveType} props={segment.props} warnings={segment.warnings} />;

    case "directive-error":
      return <RenderDirectiveError error={segment.error} />;

    default:
      return null;
  }
}

/* ── Resolved media components ── */

function ResolvedVideo({ src, caption }: { src: string; caption?: string }) {
  const { url, loading } = useResolvedSrc(src);
  if (loading) return <FileLoadingPlaceholder label="video" />;
  if (!url) return <div className="text-xs text-muted-foreground/50 italic my-4">[video unavailable]</div>;
  return <VideoPlayer src={url} caption={caption} />;
}

function ResolvedAudio({ src, caption }: { src: string; caption?: string }) {
  const { url, loading } = useResolvedSrc(src);
  if (loading) return <FileLoadingPlaceholder label="audio" />;
  if (!url) return <div className="text-xs text-muted-foreground/50 italic my-4">[audio unavailable]</div>;
  return (
    <figure className="my-4">
      <audio src={url} controls className="w-full" />
      {caption && <figcaption className="text-xs text-muted-foreground mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
}

function ResolvedPdf({ src, caption }: { src: string; caption?: string }) {
  const { url, loading } = useResolvedSrc(src);
  if (loading) return <FileLoadingPlaceholder label="PDF" />;
  if (!url) return <div className="text-xs text-muted-foreground/50 italic my-4">[PDF unavailable]</div>;
  return (
    <figure className="my-4">
      <div className="rounded-xl border border-border overflow-hidden shadow-md shadow-black/5">
        <iframe src={url} className="w-full h-[600px]" />
      </div>
      {caption && <figcaption className="text-xs text-muted-foreground mt-2 text-center">{caption}</figcaption>}
    </figure>
  );
}

function ResolvedFile({ src, caption }: { src: string; caption?: string }) {
  const { url, name, loading } = useResolvedSrc(src);
  if (loading) return <FileLoadingPlaceholder label="file" />;
  if (!url) return <div className="text-xs text-muted-foreground/50 italic my-4">[file unavailable]</div>;
  const fileName = caption || name || url.split("/").pop()?.split("?")[0] || "Download file";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors group no-underline my-4"
    >
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <FileText className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
        <p className="text-xs text-muted-foreground">Click to open</p>
      </div>
      <Download className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
    </a>
  );
}

/* ── Page link component ── */

function PageLink({ pageId, title }: { pageId: string; title: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/page/${pageId}`)}
      className="flex items-center gap-3 w-full p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/50 transition-colors group text-left my-1.5"
    >
      <span className="text-lg shrink-0">📄</span>
      <span className="flex-1 text-sm font-medium text-foreground truncate">{title}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
    </button>
  );
}

/* ── Main component ── */

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  const segments = useMemo(() => parseEnhancedMarkdown(markdown), [markdown]);
  const [resolvedUrls, setResolvedUrls] = useState<Map<string, { url: string | null; name?: string }>>(new Map());
  const resolvingRef = useRef(false);
  const [isResolving, setIsResolving] = useState(false);

  // Lightbox state
  const photos = useMemo(() => collectImagesFromSegments(segments), [segments]);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const imageCtx = useMemo(
    () => ({
      photos,
      open: (index: number) => setViewerIndex(index),
    }),
    [photos],
  );
  const handleNext = useCallback(() => {
    setViewerIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
  }, [photos.length]);
  const handlePrev = useCallback(() => {
    setViewerIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  // Collect file:// URIs and resolve them in the background
  useEffect(() => {
    const fileUris = collectFileUris(segments);
    if (fileUris.length === 0) return;

    const blockIdMap = new Map<string, string>();
    for (const uri of fileUris) {
      const blockId = extractBlockId(uri);
      if (blockId) blockIdMap.set(blockId, uri);
    }

    if (blockIdMap.size === 0) return;

    let cancelled = false;
    resolvingRef.current = true;
    // Defer the state update to avoid synchronous setState in effect
    queueMicrotask(() => {
      if (!cancelled) setIsResolving(true);
    });

    fetch("/api/notion/resolve-files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blockIds: Array.from(blockIdMap.keys()) }),
    })
      .then((res) => res.json())
      .then((data: Array<{ blockId: string; url: string | null; name?: string }>) => {
        if (cancelled) return;
        const map = new Map<string, { url: string | null; name?: string }>();
        for (const item of data) {
          map.set(item.blockId.replace(/-/g, ""), { url: item.url, name: item.name });
        }
        setResolvedUrls(map);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          resolvingRef.current = false;
          setIsResolving(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [segments]);

  const fileCtx = useMemo(() => ({ resolvedUrls, isResolving }), [resolvedUrls, isResolving]);

  return (
    <ImageViewerContext.Provider value={imageCtx}>
      <FileResolverContext.Provider value={fileCtx}>
        <article className="space-y-0">
          <RenderSegments segments={segments} />
        </article>
        <PhotoLightbox photos={photos} index={viewerIndex} onClose={() => setViewerIndex(null)} onNext={handleNext} onPrev={handlePrev} />
      </FileResolverContext.Provider>
    </ImageViewerContext.Provider>
  );
}
