import { useState, type ImgHTMLAttributes } from "react";

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

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: loaded ? undefined : aspectHint, ...style }}>
      {/* Skeleton shimmer */}
      {!loaded && (
        <div className="absolute inset-0 bg-bg-card animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>
      )}

      <img
        {...rest}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          rest.onLoad?.(e);
        }}
      />
    </div>
  );
}
