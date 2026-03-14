const ACCENT_MAP: Record<string, string> = {
  blue: "#3b82f6",
  green: "#22c55e",
  purple: "#a855f7",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  orange: "#f97316",
};

export const resolveAccent = (raw?: string, fallback = "var(--color-primary)"): string => {
  if (!raw) return fallback;
  const lower = raw.trim().toLowerCase();
  return ACCENT_MAP[lower] ?? (lower.startsWith("#") ? lower : fallback);
};

export interface TreeNode<T extends Record<string, unknown> = Record<string, never>> {
  text: string;
  children: TreeNode<T>[];
}

/**
 * Parse indented markdown list lines into a tree.
 * Works for `- item`, `* item`, `1. item`, `- [x] item`, `- [ ] item`.
 * Returns parsed items via the `extract` callback for per-line customisation.
 */
export function parseIndentedTree<T extends Record<string, unknown>>(
  body: string,
  lineParser: (line: string) => (T & { text: string }) | null,
): (T & { text: string; children: (T & { text: string; children: unknown[] })[] })[] {
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  type Node = T & { text: string; children: Node[] };
  const root: Node[] = [];
  const stack: { indent: number; items: Node[] }[] = [{ indent: -1, items: root }];

  for (const line of lines) {
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    const parsed = lineParser(line);
    if (!parsed) continue;

    const item: Node = { ...parsed, children: [] };

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    stack[stack.length - 1].items.push(item);
    stack.push({ indent, items: item.children });
  }

  return root;
}
