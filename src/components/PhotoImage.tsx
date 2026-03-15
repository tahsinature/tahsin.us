import { useState, useCallback, type ImgHTMLAttributes } from "react";

interface PhotoImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio hint for the wrapper (e.g. "4/3", "3/2"). Ignored when `bare`. Defaults to "4/3". */
  aspectHint?: string;
  /** When true, renders just the `<img>` with blur-up — no wrapper div or skeleton. */
  bare?: boolean;
}

/**
 * An `<img>` with blur-up loading transition.
 *
 * - Default: wraps in a div with aspect ratio + shimmer skeleton.
 * - `bare`: renders only the `<img>` element (for use inside custom containers).
 */
export default function PhotoImage({ aspectHint = "4/3", bare = false, className = "", style, ...rest }: PhotoImageProps) {
  const [loaded, setLoaded] = useState(false);

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const blurClass = loaded ? "opacity-100 blur-0" : "opacity-0 blur-md scale-105";

  const img = (
    <img
      {...rest}
      ref={imgRef}
      className={`${className} transition-[opacity,filter] duration-700 ease-out ${blurClass}`}
      style={bare ? style : undefined}
      onLoad={(e) => {
        setLoaded(true);
        rest.onLoad?.(e);
      }}
      onError={() => {
        setLoaded(true);
      }}
    />
  );

  if (bare) return img;

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: aspectHint, ...style }}>
      {!loaded && (
        <div className="absolute inset-0 bg-card animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>
      )}
      {img}
    </div>
  );
}
