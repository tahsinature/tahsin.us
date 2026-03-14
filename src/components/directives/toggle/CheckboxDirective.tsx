import { useMemo } from "react";
import { Check } from "lucide-react";
import type { DirectiveProps } from "../types";
import { resolveAccent, parseIndentedTree } from "../utils";

interface CheckboxItem {
  checked: boolean;
  text: string;
  children: CheckboxItem[];
}

const parseCheckboxItems = (body: string): CheckboxItem[] =>
  parseIndentedTree(body, (line) => {
    const m = line.match(/^\s*[-*]\s+\[([ xX])\]\s+(.+)$/);
    return m ? { checked: m[1].toLowerCase() === "x", text: m[2].trim() } : null;
  });

function CheckboxTree({ items, color, depth = 0 }: { items: CheckboxItem[]; color: string; depth?: number }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginTop: depth > 0 ? "0.375rem" : 0, paddingLeft: depth > 0 ? 32 : 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      {items.map((item, i) => (
        <li key={i} className="relative">
          <div className={`group flex items-start gap-3 py-1.5 px-2 -mx-2 rounded-lg transition-colors ${item.checked ? "" : "hover:bg-muted/30"}`}>
            {item.checked ? (
              <span
                className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md shadow-sm"
                style={{ backgroundColor: color }}
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            ) : (
              <span className="relative mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border-2 border-border/80 bg-background shadow-sm transition-colors group-hover:border-muted-foreground/40" />
            )}
            <span
              className={`text-sm leading-relaxed transition-colors ${
                item.checked
                  ? "text-muted-foreground line-through decoration-1 decoration-muted-foreground/40"
                  : "text-foreground"
              }`}
            >
              {item.text}
            </span>
          </div>
          {item.children.length > 0 && (
            <CheckboxTree items={item.children} color={color} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

function CheckboxProgress({ items, color }: { items: CheckboxItem[]; color: string }) {
  const { done, total } = useMemo(() => {
    const flat = (list: CheckboxItem[]): CheckboxItem[] =>
      list.flatMap((item) => [item, ...flat(item.children)]);
    const all = flat(items);
    return { done: all.filter((i) => i.checked).length, total: all.length };
  }, [items]);

  if (total === 0) return null;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-medium text-muted-foreground tabular-nums">
        {done}/{total}
      </span>
    </div>
  );
}

export default function CheckboxDirective({ props }: { props: DirectiveProps }) {
  const title = props.title as string | undefined;
  const { body, accent } = props;
  const color = resolveAccent(accent as string | undefined, "#22c55e");
  const items = useMemo(() => parseCheckboxItems((body as string) || ""), [body]);
  const showProgress = (props.progress as string) === "true";

  if (items.length === 0) return null;

  return (
    <div className="my-6">
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      )}
      {showProgress && <CheckboxProgress items={items} color={color} />}
      <CheckboxTree items={items} color={color} />
    </div>
  );
}
