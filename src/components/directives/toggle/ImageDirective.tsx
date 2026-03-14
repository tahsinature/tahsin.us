import { useContext } from "react";
import type { DirectiveProps } from "../types";
import { ImageViewerContext } from "../contexts";
import { resolveAccent } from "../utils";

const WIDTH_MAP: Record<string, string> = {
  small: "max-w-sm",
  half: "max-w-lg",
  medium: "max-w-2xl",
  large: "max-w-4xl",
  full: "max-w-none",
};

function resolveWidth(raw?: string): string {
  if (!raw) return "max-w-2xl";
  return WIDTH_MAP[raw.trim().toLowerCase()] ?? "max-w-2xl";
}

interface ImageVariantProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  source?: string;
  color: string;
  widthClass: string;
  onOpen?: () => void;
}

function Caption({ caption, source }: { caption?: string; source?: string }) {
  if (!caption && !source) return null;
  return (
    <figcaption className="mt-3 text-center text-sm text-muted-foreground">
      {caption && <span>{caption}</span>}
      {caption && source && <span className="mx-1">&mdash;</span>}
      {source && <cite className="not-italic opacity-70">{source}</cite>}
    </figcaption>
  );
}

/* ── Variant: default — clean card ── */
function ImageDefault({ src, alt, title, caption, source, widthClass, onOpen }: ImageVariantProps) {
  return (
    <figure className={`my-6 mx-auto ${widthClass}`}>
      {title && <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>}
      <div className="rounded-xl border border-border/50 overflow-hidden bg-muted/20">
        <img src={src} alt={alt} className="w-full block cursor-pointer" onClick={onOpen} loading="lazy" />
      </div>
      <Caption caption={caption} source={source} />
    </figure>
  );
}

/* ── Variant: polaroid — tilted polaroid frame ── */
function ImagePolaroid({ src, alt, caption, source, widthClass, onOpen }: ImageVariantProps) {
  return (
    <figure className={`my-8 mx-auto ${widthClass} flex justify-center`}>
      <div
        className="bg-white dark:bg-zinc-100 p-3 pb-12 rounded-sm shadow-xl shadow-black/10 dark:shadow-black/30 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500 cursor-pointer"
        onClick={onOpen}
      >
        <img src={src} alt={alt} className="w-full block" loading="lazy" />
        {(caption || source) && (
          <p className="absolute bottom-3 left-0 right-0 text-center text-sm text-zinc-500 dark:text-zinc-600 font-medium">
            {caption}
            {caption && source && <span className="mx-1">&mdash;</span>}
            {source && <span className="opacity-70">{source}</span>}
          </p>
        )}
      </div>
    </figure>
  );
}

/* ── Variant: browser — fake browser chrome ── */
function ImageBrowser({ src, alt, title, caption, source, widthClass, onOpen }: ImageVariantProps) {
  return (
    <figure className={`my-6 mx-auto ${widthClass}`}>
      <div className="rounded-xl border border-border overflow-hidden shadow-lg shadow-black/5">
        {/* Chrome bar */}
        <div className="bg-muted/80 border-b border-border px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          {title && (
            <div className="flex-1 text-center">
              <span className="text-xs text-muted-foreground bg-background/60 px-3 py-1 rounded-md border border-border/50">
                {title}
              </span>
            </div>
          )}
          {!title && <div className="flex-1" />}
          <div className="w-[54px]" />
        </div>
        <img src={src} alt={alt} className="w-full block cursor-pointer" onClick={onOpen} loading="lazy" />
      </div>
      <Caption caption={caption} source={source} />
    </figure>
  );
}

/* ── Variant: spotlight — dark bg with glow ── */
function ImageSpotlight({ src, alt, title, caption, source, color, widthClass, onOpen }: ImageVariantProps) {
  return (
    <figure className={`my-6 mx-auto ${widthClass}`}>
      {title && <h3 className="text-sm font-semibold text-foreground mb-2">{title}</h3>}
      <div className="relative rounded-xl bg-zinc-950 p-4 md:p-6 overflow-hidden">
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-15 blur-3xl"
          style={{ background: `radial-gradient(ellipse at center, ${color}, transparent 70%)` }}
        />
        <img
          src={src}
          alt={alt}
          className="relative w-full block rounded-lg cursor-pointer"
          onClick={onOpen}
          loading="lazy"
        />
      </div>
      <Caption caption={caption} source={source} />
    </figure>
  );
}

/* ── Variant: float — shadow + subtle rotation ── */
function ImageFloat({ src, alt, title, caption, source, widthClass, onOpen }: ImageVariantProps) {
  return (
    <figure className={`my-8 mx-auto ${widthClass}`}>
      {title && <h3 className="text-sm font-semibold text-foreground mb-2 text-center">{title}</h3>}
      <div className="flex justify-center">
        <div
          className="rotate-[0.5deg] hover:rotate-0 transition-transform duration-500 rounded-xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/40 cursor-pointer"
          onClick={onOpen}
        >
          <img src={src} alt={alt} className="w-full block" loading="lazy" />
        </div>
      </div>
      <Caption caption={caption} source={source} />
    </figure>
  );
}

/* ── Variant map ── */
const variants: Record<string, React.ComponentType<ImageVariantProps>> = {
  polaroid: ImagePolaroid,
  browser: ImageBrowser,
  spotlight: ImageSpotlight,
  float: ImageFloat,
};

export default function ImageDirective({ props }: { props: DirectiveProps }) {
  const { image, title, caption, body, source, alt, width, accent, variant } = props;
  const color = resolveAccent(accent as string | undefined);
  const widthClass = resolveWidth(width as string | undefined);
  const src = image as string;

  const { photos, open } = useContext(ImageViewerContext);

  if (!src) return null;

  const photoIndex = photos.findIndex((p) => p.src === src);
  const handleOpen = photoIndex !== -1 ? () => open(photoIndex) : undefined;

  const resolvedCaption = (caption as string) || (body as string) || undefined;
  const resolvedAlt = (alt as string) || (title as string) || "";

  const Variant = (variant && variants[variant as string]) || ImageDefault;

  return (
    <Variant
      src={src}
      alt={resolvedAlt}
      title={title as string | undefined}
      caption={resolvedCaption}
      source={source as string | undefined}
      color={color}
      widthClass={widthClass}
      onOpen={handleOpen}
    />
  );
}
