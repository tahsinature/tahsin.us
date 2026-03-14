import type { DirectiveProps } from "../types";
import { resolveAccent } from "../utils";

/* ── Variant: default ── */
function QuoteDefault({ body, author, source, color }: { body: string; author?: string; source?: string; color: string }) {
  return (
    <figure className="relative my-6 py-6 px-6 rounded-xl bg-card/40 border border-border/50 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ backgroundColor: color }} />
      <div className="absolute -top-2 left-5 text-[5rem] leading-none font-serif pointer-events-none select-none opacity-[0.07]" style={{ color }}>
        &ldquo;
      </div>
      <blockquote className="relative text-foreground text-base md:text-lg leading-relaxed italic pl-4">
        {body}
      </blockquote>
      <Attribution author={author} source={source} color={color} />
    </figure>
  );
}

/* ── Variant: minimal ── */
function QuoteMinimal({ body, author, source, color }: { body: string; author?: string; source?: string; color: string }) {
  return (
    <figure className="my-6 pl-5 border-l-2" style={{ borderColor: color }}>
      <blockquote className="text-foreground/90 text-base leading-relaxed">
        {body}
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-2 text-sm text-muted-foreground">
          {author && <span className="font-medium text-foreground/70">{author}</span>}
          {author && source && ", "}
          {source && <cite className="not-italic">{source}</cite>}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Variant: large ── */
function QuoteLarge({ body, author, source, color }: { body: string; author?: string; source?: string; color: string }) {
  return (
    <figure className="relative my-8 py-10 px-8 md:px-12 text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[7rem] leading-none font-serif pointer-events-none select-none opacity-[0.06]" style={{ color }}>
        &ldquo;
      </div>
      <blockquote className="relative text-foreground text-xl md:text-2xl leading-relaxed italic max-w-2xl mx-auto">
        {body}
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-6 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-block w-8 h-px" style={{ backgroundColor: color }} />
          <span>
            {author && <span className="font-semibold text-foreground/80">{author}</span>}
            {author && source && <span className="mx-1.5">&middot;</span>}
            {source && <cite className="not-italic">{source}</cite>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

/* ── Variant: bordered ── */
function QuoteBordered({ body, author, source, color }: { body: string; author?: string; source?: string; color: string }) {
  return (
    <figure className="relative my-6 p-6 rounded-xl border border-border/50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div className="absolute bottom-0 right-0 left-0 h-px" style={{ background: `linear-gradient(270deg, ${color}, transparent)` }} />
      <div className="absolute -top-1 left-6 text-[4rem] leading-none font-serif pointer-events-none select-none opacity-[0.08]" style={{ color }}>
        &ldquo;
      </div>
      <blockquote className="relative text-foreground text-base md:text-lg leading-relaxed italic">
        {body}
      </blockquote>
      <Attribution author={author} source={source} color={color} />
    </figure>
  );
}

/* ── Shared attribution ── */
function Attribution({ author, source, color }: { author?: string; source?: string; color: string }) {
  if (!author && !source) return null;
  return (
    <figcaption className="relative mt-4 flex items-center gap-2 text-sm text-muted-foreground">
      <span className="inline-block w-6 h-px" style={{ backgroundColor: color }} />
      <span>
        {author && <span className="font-medium text-foreground/80">{author}</span>}
        {author && source && <span className="mx-1">&middot;</span>}
        {source && <cite className="not-italic">{source}</cite>}
      </span>
    </figcaption>
  );
}

/* ── Variant map ── */
const variants: Record<string, React.ComponentType<{ body: string; author?: string; source?: string; color: string }>> = {
  minimal: QuoteMinimal,
  large: QuoteLarge,
  bordered: QuoteBordered,
};

export default function QuoteDirective({ props }: { props: DirectiveProps }) {
  const { body, author, source, accent, variant } = props;
  const color = resolveAccent(accent as string | undefined);

  if (!body) return null;

  const Variant = (variant && variants[variant as string]) || QuoteDefault;

  return <Variant body={body as string} author={author as string | undefined} source={source as string | undefined} color={color} />;
}
