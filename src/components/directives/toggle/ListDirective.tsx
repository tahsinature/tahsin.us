import { useMemo } from "react";
import type { DirectiveProps } from "../types";
import { resolveAccent, parseIndentedTree } from "../utils";

interface ListItem {
  text: string;
  children: ListItem[];
}

const parseListItems = (body: string): ListItem[] =>
  parseIndentedTree(body, (line) => {
    const m = line.match(/^\s*(?:[-*]|\d+\.)\s+(.+)$/);
    return m ? { text: m[1].trim() } : null;
  });

interface ListVariantProps {
  title?: string;
  items: ListItem[];
  color: string;
}

function ListTree({ items, color, depth, marker }: {
  items: ListItem[];
  color: string;
  depth: number;
  marker: (index: number, depth: number, color: string) => React.ReactNode;
}) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: depth > 0 ? 8 : 0, paddingLeft: depth > 0 ? 32 : 0 }}>
      {items.map((item, i) => (
        <li key={i} style={{ position: "relative", marginTop: i > 0 ? (depth > 0 ? 6 : 8) : 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "0.15em" }}>
              {marker(i, depth, color)}
            </span>
            <span className="text-foreground/90 leading-relaxed">{item.text}</span>
          </div>
          {item.children.length > 0 && (
            <ListTree items={item.children} color={color} depth={depth + 1} marker={marker} />
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── Variant: default — accent dot markers ── */
function ListDefault({ title, items, color }: ListVariantProps) {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ListTree
        items={items}
        color={color}
        depth={0}
        marker={(_i, depth, c) => (
          <span
            className="rounded-full"
            style={{
              width: depth === 0 ? 6 : 5,
              height: depth === 0 ? 6 : 5,
              backgroundColor: c,
              opacity: depth === 0 ? 1 : 0.5,
            }}
          />
        )}
      />
    </div>
  );
}

/* ── Variant: timeline — vertical line with dots ── */
function TimelineTree({ items, color, depth }: { items: ListItem[]; color: string; depth: number }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: depth > 0 ? "0.5rem" : 0, paddingLeft: depth > 0 ? 32 : 0 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <li key={i} className="relative">
            {depth === 0 && (
              <>
                {!isLast && (
                  <div
                    className="absolute left-[3px] top-[1.1em] bottom-0"
                    style={{ width: 2, backgroundColor: `color-mix(in srgb, ${color} 25%, transparent)` }}
                  />
                )}
                <div
                  className="absolute left-0 top-[0.45em] w-2 h-2 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 15%, transparent)` }}
                />
              </>
            )}
            {depth > 0 && (
              <div
                className="absolute left-0 top-[0.55em] w-[5px] h-[5px] rounded-full"
                style={{ backgroundColor: color, opacity: 0.4 }}
              />
            )}
            <div className={`${depth === 0 ? "pl-5 pb-5" : "pl-4"} ${isLast && depth === 0 ? "pb-0" : ""} ${i > 0 && depth > 0 ? "mt-1.5" : ""}`}>
              <span className="text-foreground/90 leading-relaxed">{item.text}</span>
              {item.children.length > 0 && (
                <TimelineTree items={item.children} color={color} depth={depth + 1} />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ListTimeline({ title, items, color }: ListVariantProps) {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold text-foreground mb-5">{title}</h3>}
      <TimelineTree items={items} color={color} depth={0} />
    </div>
  );
}

/* ── Variant: cards — each top-level item as a mini card ── */
function ListCards({ title, items, color }: ListVariantProps) {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {items.map((item, i) => (
          <li
            key={i}
            className="relative rounded-lg border border-border/50 bg-card/40 px-4 py-3 transition-colors hover:bg-card/70"
            style={{ borderLeftWidth: 3, borderLeftColor: color }}
          >
            <span className="text-foreground/90 leading-relaxed">{item.text}</span>
            {item.children.length > 0 && (
              <ListTree
                items={item.children}
                color={color}
                depth={1}
                marker={(_i, depth, c) => (
                  <span className="font-semibold" style={{ color: c, opacity: depth > 1 ? 0.4 : 0.5, fontSize: depth > 1 ? "0.875rem" : "1rem" }}>
                    {depth > 1 ? "›" : "—"}
                  </span>
                )}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Variant: numbered — big styled numbers ── */
function ListNumbered({ title, items, color }: ListVariantProps) {
  return (
    <div className="my-6">
      {title && <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>}
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item, i) => (
          <li key={i} className="relative" style={{ paddingLeft: "2.5rem", marginTop: i > 0 ? "1rem" : 0 }}>
            <span
              className="absolute left-0 text-lg font-extrabold tabular-nums"
              style={{ color, opacity: 0.6, top: "-0.05em" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-foreground/90 leading-relaxed">{item.text}</span>
            {item.children.length > 0 && (
              <ListTree
                items={item.children}
                color={color}
                depth={1}
                marker={(_i, _d, c) => (
                  <span className="text-base font-semibold" style={{ color: c, opacity: 0.4 }}>›</span>
                )}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const variants: Record<string, React.ComponentType<ListVariantProps>> = {
  timeline: ListTimeline,
  cards: ListCards,
  numbered: ListNumbered,
};

export default function ListDirective({ props }: { props: DirectiveProps }) {
  const { body, accent, variant } = props;
  const title = props.title as string | undefined;
  const color = resolveAccent(accent as string | undefined);

  const items = useMemo(() => parseListItems((body as string) || ""), [body]);
  if (items.length === 0) return null;

  const Variant = (variant && variants[variant as string]) || ListDefault;

  return (
    <div style={{ paddingLeft: 16 }}>
      <Variant title={title} items={items} color={color} />
    </div>
  );
}
