import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
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
});

let idCounter = 0;

interface MermaidProps {
  chart: string;
  caption?: string;
}

export default function Mermaid({ chart, caption }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = `mermaid-${idCounter++}`;

    async function renderChart() {
      try {
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid render error:", err);
        setError("Failed to render diagram");
      }
    }

    renderChart();
  }, [chart]);

  if (error) {
    return <div className="my-8 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">{error}</div>;
  }

  return (
    <figure className="my-10">
      <div ref={containerRef} className="rounded-lg border border-border bg-[#1e1e2e] p-6 overflow-x-auto flex justify-center [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <figcaption className="text-center text-muted-foreground text-sm mt-3 italic">{caption}</figcaption>}
    </figure>
  );
}
