import { useEffect, useRef } from "react";
import type { ShortLinkTheme } from "@shared/short-links";

export default function ShortLinkPortal({ theme, reducedMotion }: { theme: ShortLinkTheme; reducedMotion: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    void import("@/lib/link-transit-scene").then(({ createLinkTransitScene }) => {
      if (cancelled || !canvas.current) return;
      try {
        dispose = createLinkTransitScene(canvas.current, theme === "meeting" ? "#96caff" : "#8fe0ca");
        canvas.current.dataset.ready = "true";
      } catch {
        // The CSS portal stays visible if WebGL is unavailable.
      }
    }).catch(() => {});
    return () => { cancelled = true; dispose?.(); };
  }, [theme, reducedMotion]);

  return (
    <div className="short-transit-art" aria-hidden="true">
      <div className="short-transit-static"><span /><span /><span /><i /></div>
      <canvas ref={canvas} className="short-transit-canvas" />
    </div>
  );
}
