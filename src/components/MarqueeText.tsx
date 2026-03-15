import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";

export default function MarqueeText({ text, children, className = "", autoScroll = false, delay }: { text?: string; children?: ReactNode; className?: string; autoScroll?: boolean; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);

  const content = children ?? text;

  const checkOverflow = useCallback(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollWidth > el.clientWidth);
  }, []);

  useEffect(() => {
    checkOverflow();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(container);
    return () => ro.disconnect();
  }, [checkOverflow, content]);

  const scrollClass = overflows
    ? autoScroll
      ? "animate-marquee group-hover:[animation-play-state:paused]"
      : "group-hover:animate-marquee"
    : "";

  return (
    <div ref={containerRef} className={`overflow-hidden min-w-0 flex-1 ${overflows ? "[mask-image:linear-gradient(to_right,black_90%,transparent)]" : ""}`}>
      <div
        ref={ref}
        className={`whitespace-nowrap ${scrollClass} ${className}`}
        style={delay && overflows ? { animationDelay: `${delay}s` } : undefined}
      >
        {content}
      </div>
    </div>
  );
}
