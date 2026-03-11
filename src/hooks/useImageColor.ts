import { useEffect, useState } from "react";

/**
 * Extracts the dominant color from an image URL using a canvas.
 * Returns a hex color string or null while loading / on failure.
 */
export function useImageColor(src: string): string | null {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          // Skip transparent and near-white/near-black pixels
          if (alpha < 128) continue;
          const pr = data[i], pg = data[i + 1], pb = data[i + 2];
          if (pr + pg + pb < 30 || pr + pg + pb > 720) continue;
          r += pr;
          g += pg;
          b += pb;
          count++;
        }

        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          if (!cancelled) setColor(hex);
        }
      } catch {
        // Canvas tainted by CORS — silently fail
      }
    };

    img.src = src;

    return () => { cancelled = true; };
  }, [src]);

  return color;
}
