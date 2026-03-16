import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/stores/useAppStore";

const THEME_CONFIG = {
  dark: {
    theme: "dark" as const,
    themeVariables: {
      primaryColor: "#3b82f6",
      primaryTextColor: "#e2e8f0",
      primaryBorderColor: "#4b5563",
      lineColor: "#6b7280",
      secondaryColor: "#1e293b",
      tertiaryColor: "#0f172a",
      background: "#1e1e2e",
      mainBkg: "#1e293b",
      nodeBorder: "#4b5563",
      clusterBkg: "#1e293b",
      clusterBorder: "#4b5563",
      titleColor: "#e2e8f0",
      edgeLabelBackground: "#1e293b",
      fontFamily: "inherit",
    },
  },
  light: {
    theme: "default" as const,
    themeVariables: {
      primaryColor: "#3b82f6",
      primaryTextColor: "#1e293b",
      primaryBorderColor: "#cbd5e1",
      lineColor: "#94a3b8",
      secondaryColor: "#f1f5f9",
      tertiaryColor: "#e2e8f0",
      background: "#ffffff",
      mainBkg: "#f1f5f9",
      nodeBorder: "#cbd5e1",
      clusterBkg: "#f8fafc",
      clusterBorder: "#cbd5e1",
      titleColor: "#1e293b",
      edgeLabelBackground: "#f1f5f9",
      fontFamily: "inherit",
    },
  },
};

let mermaidModule: (typeof import("mermaid"))["default"] | null = null;

async function getMermaid() {
  if (!mermaidModule) {
    const m = await import("mermaid");
    mermaidModule = m.default;
  }
  return mermaidModule;
}

let idCounter = 0;

interface MermaidProps {
  chart: string;
  caption?: string;
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const hasRendered = useRef(false);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${idCounter++}`;

    // Only show skeleton on initial load, not theme switches
    if (!hasRendered.current) setError(null);

    getMermaid().then(async (m) => {
      if (cancelled) return;
      m.initialize({ startOnLoad: false, ...THEME_CONFIG[theme] });
      try {
        const { svg: renderedSvg } = await m.render(id, chart.trim());
        if (!cancelled) { setSvg(renderedSvg); hasRendered.current = true; }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (!cancelled) setError("Failed to render diagram");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  if (error) {
    return <div className="my-8 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">{error}</div>;
  }

  return (
    <figure className="my-10">
      <div ref={containerRef} className="rounded-lg border border-border bg-card overflow-x-auto flex justify-center [&_svg]:max-w-full" style={{ minHeight: svg ? undefined : 120 }}>
        {svg ? (
          <div className="p-6" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="w-full p-8 animate-pulse flex flex-col items-center gap-4">
            {/* Top node */}
            <div className="h-10 w-32 rounded-lg bg-border/30" />
            {/* Connector */}
            <div className="h-6 w-px bg-border/25" />
            {/* Middle row — two nodes */}
            <div className="flex items-center gap-8">
              <div className="h-10 w-28 rounded-lg bg-border/25" />
              <div className="h-10 w-28 rounded-lg bg-border/25" />
            </div>
            {/* Connectors */}
            <div className="flex items-center gap-20">
              <div className="h-6 w-px bg-border/20" />
              <div className="h-6 w-px bg-border/20" />
            </div>
            {/* Bottom row */}
            <div className="flex items-center gap-8">
              <div className="h-10 w-28 rounded-lg bg-border/20" />
              <div className="h-10 w-28 rounded-lg bg-border/20" />
            </div>
          </div>
        )}
      </div>
      {caption && <figcaption className="text-center text-muted-foreground text-sm mt-3 italic">{caption}</figcaption>}
    </figure>
  );
}
