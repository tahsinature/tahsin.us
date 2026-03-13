import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { DirectiveProps, PageLink } from "../types";

export default function HeroCardDirective({ props }: { props: DirectiveProps }) {
  const navigate = useNavigate();
  const title = props.title as string | undefined;
  const description = props.description as string | undefined;
  const cols = parseInt((props.columns as string) ?? "1", 10);
  const pageLinks = (props.pages as PageLink[]) ?? [];
  const images = (props.images as string[]) ?? [];

  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="rounded-xl border border-border overflow-hidden my-3">
      {/* Hero cover */}
      <div className="relative h-40 bg-muted/20">
        {images.length > 0 ? (
          <>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: i === imgIndex ? 1 : 0 }}
              />
            ))}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-3xl font-bold text-muted-foreground/20 select-none">{title ?? ""}</span>
          </div>
        )}
        {title && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white text-lg font-semibold leading-snug">{title}</h3>
            {description && (
              <p className="text-white/70 text-sm mt-0.5 line-clamp-2">{description}</p>
            )}
          </div>
        )}
      </div>
      {/* Page links */}
      {pageLinks.length > 0 && (
        <div
          className="grid gap-1 p-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {pageLinks.map((page) => (
            <button
              key={page.pageId}
              onClick={() => navigate(`/page/${page.pageId}`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <span className="text-sm text-foreground truncate flex-1">{page.title}</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
