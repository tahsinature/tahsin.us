import type { DirectiveProps } from "../types";
import { resolveAccent } from "../utils";

interface HeadingVariantProps {
  title: string;
  subtitle?: string;
  label?: string;
  number?: string;
  color: string;
}

/* ── Variant: default — accent underline ── */
function HeadingDefault({ title, subtitle, label, color }: HeadingVariantProps) {
  return (
    <div className="my-8">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 block" style={{ color }}>
          {label}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: color }} />
        <div className="h-1 w-4 rounded-full opacity-40" style={{ backgroundColor: color }} />
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

/* ── Variant: gradient — gradient text with subtle bg ── */
function HeadingGradient({ title, subtitle, label, color }: HeadingVariantProps) {
  return (
    <div className="my-8 relative py-6 px-6 rounded-xl bg-card/30 border border-border/40 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ background: `linear-gradient(135deg, ${color}, transparent 60%)` }}
      />
      {label && (
        <span className="relative text-xs font-semibold uppercase tracking-[0.2em] mb-2 block" style={{ color }}>
          {label}
        </span>
      )}
      <h2
        className="relative text-2xl md:text-3xl font-bold leading-tight bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, var(--color-foreground)))` }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="relative mt-3 text-muted-foreground text-base leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

/* ── Variant: numbered — big number + title ── */
function HeadingNumbered({ title, subtitle, number, label, color }: HeadingVariantProps) {
  const num = number || "01";
  return (
    <div className="my-8 flex items-start gap-5">
      <div className="shrink-0 flex flex-col items-center">
        <span
          className="text-4xl md:text-5xl font-black leading-none opacity-20"
          style={{ color }}
        >
          {num}
        </span>
      </div>
      <div className="pt-1">
        {label && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-1 block" style={{ color }}>
            {label}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-muted-foreground text-base leading-relaxed max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/* ── Variant: center — centered with decorative lines ── */
function HeadingCenter({ title, subtitle, label, color }: HeadingVariantProps) {
  return (
    <div className="my-10 text-center">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 block" style={{ color }}>
          {label}
        </span>
      )}
      <div className="flex items-center gap-4 justify-center mb-1">
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {title}
        </h2>
        <div className="h-px flex-1 max-w-16" style={{ background: `linear-gradient(270deg, transparent, ${color})` }} />
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

/* ── Variant: split — title left, subtitle right ── */
function HeadingSplit({ title, subtitle, label, color }: HeadingVariantProps) {
  return (
    <div className="my-8 flex flex-col md:flex-row md:items-end gap-3 md:gap-8 pb-4 border-b border-border/50">
      <div className="shrink-0">
        {label && (
          <span className="text-xs font-semibold uppercase tracking-[0.2em] mb-1 block" style={{ color }}>
            {label}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-base leading-relaxed md:pb-0.5">{subtitle}</p>
      )}
    </div>
  );
}

/* ── Variant: pill — compact with accent pill background ── */
function HeadingPill({ title, subtitle, label, color }: HeadingVariantProps) {
  return (
    <div className="my-8">
      <div className="flex items-center gap-3 flex-wrap">
        {label && (
          <span
            className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}
          >
            {label}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

/* ── Variant map ── */
const variants: Record<string, React.ComponentType<HeadingVariantProps>> = {
  gradient: HeadingGradient,
  numbered: HeadingNumbered,
  center: HeadingCenter,
  split: HeadingSplit,
  pill: HeadingPill,
};

export default function HeadingDirective({ props }: { props: DirectiveProps }) {
  const { title, subtitle, body, label, number, accent, variant } = props;
  const color = resolveAccent(accent as string | undefined);
  const resolvedTitle = (title as string) || "Untitled";
  const resolvedSubtitle = (subtitle as string) || (body as string) || undefined;

  const Variant = (variant && variants[variant as string]) || HeadingDefault;

  return (
    <Variant
      title={resolvedTitle}
      subtitle={resolvedSubtitle}
      label={label as string | undefined}
      number={number as string | undefined}
      color={color}
    />
  );
}
