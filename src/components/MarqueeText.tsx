import { useRef, useState, useEffect } from "react";

export default function MarqueeText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollWidth > el.clientWidth);
  }, [text]);

  return (
    <div className={`overflow-hidden min-w-0 flex-1 ${overflows ? "[mask-image:linear-gradient(to_right,black_90%,transparent)]" : ""}`}>
      <p ref={ref} className={`whitespace-nowrap ${overflows ? "group-hover:animate-marquee" : ""} ${className}`}>{text}</p>
    </div>
  );
}
