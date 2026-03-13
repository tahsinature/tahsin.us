import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { DirectiveProps } from "../types";

function CardThumbnail({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-28 shrink-0 bg-muted/20 relative overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className="block w-1 h-1 rounded-full transition-colors"
              style={{ backgroundColor: i === index ? "white" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CardDirective({ props }: { props: DirectiveProps }) {
  const navigate = useNavigate();
  const { images, image, title, description, body, pageId } = props;
  const desc = (description as string) ?? (body as string);
  const allImages = (images as string[])?.length ? (images as string[]) : image ? [image as string] : [];

  const content = (
    <>
      {allImages.length > 0 && <CardThumbnail images={allImages} alt={(title as string) ?? ""} />}
      <div className="p-4 min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-foreground leading-snug">{(title as string) ?? "Untitled"}</h3>
        {desc && (
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{desc}</p>
        )}
      </div>
      {pageId && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 self-center mr-3" />}
    </>
  );

  const cls = "flex rounded-xl border border-border overflow-hidden my-3 hover:bg-muted/30 transition-colors";

  if (pageId) {
    return (
      <button onClick={() => navigate(`/page/${pageId}`)} className={`${cls} w-full text-left cursor-pointer`}>
        {content}
      </button>
    );
  }
  return <div className={cls}>{content}</div>;
}
