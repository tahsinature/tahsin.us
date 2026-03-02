import { useState, useRef, useCallback, type ImgHTMLAttributes } from "react";

interface PhotoImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio hint for skeleton (e.g. "4/3", "3/2"). Defaults to "4/3". */
  aspectHint?: string;
}

/**
 * An `<img>` wrapper that shows a shimmer skeleton while loading,
 * then fades in the image once ready.
 */
export default function PhotoImage({ aspectHint = "4/3", className = "", style, ...rest }: PhotoImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Handle already-cached images that fire onLoad before React attaches the handler
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: loaded ? undefined : aspectHint, ...style }}>
      {/* Skeleton shimmer */}
      {!loaded && (
        <div className="absolute inset-0 bg-card animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>
      )}

      <img
        {...rest}
        ref={imgRef}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0 transition-opacity duration-500"}`}
        onLoad={(e) => {
          setLoaded(true);
          rest.onLoad?.(e);
        }}
        onError={() => {
          // Show the image anyway on error so it's not permanently invisible
          setLoaded(true);
        }}
      />
    </div>
  );
}
