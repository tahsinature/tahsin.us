import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScroll, useSpring, motion } from "motion/react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function PageView({ pageId: propId, title }: { pageId?: string; title?: string } = {}) {
  useDocumentTitle(title ?? "Page");

  const { pageId: paramId } = useParams<{ pageId: string }>();
  const resolvedId = propId ?? paramId;
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = useCallback(async (id: string) => {
    const cleanId = id.trim().replace(/[^a-f0-9-]/gi, "");
    if (!cleanId) return;

    setLoading(true);
    setError(null);
    setMarkdown(null);

    try {
      const res = await fetch(`/api/notion/${cleanId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch");
      setMarkdown(data.markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (resolvedId) fetchPage(resolvedId);
  }, [resolvedId, fetchPage]);

  // Intercept clicks on internal page links
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href") ?? "";
    const match = href.match(/^\/([a-f0-9-]{32,36})$/i);
    if (match) {
      e.preventDefault();
      navigate(`/page/${match[1]}`);
    }
  }, [navigate]);

  return (
    <>
    {!propId && (
      <motion.div
        className="fixed top-16 left-0 right-0 h-[2px] bg-primary/20 z-40 origin-left"
        style={{ scaleX }}
      />
    )}
    <div className="max-w-6xl mx-auto px-6 py-16">

      {/* Error */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-xl text-muted-foreground">!</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Something went wrong</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">{error}</p>
          <button
            onClick={() => resolvedId && fetchPage(resolvedId)}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-2/3 rounded bg-muted/50" />
          <div className="h-4 w-full rounded bg-muted/30" />
          <div className="h-4 w-5/6 rounded bg-muted/30" />
          <div className="h-48 w-full rounded-lg bg-muted/30" />
          <div className="h-4 w-4/5 rounded bg-muted/30" />
          <div className="h-4 w-full rounded bg-muted/30" />
          <div className="h-4 w-3/4 rounded bg-muted/30" />
        </div>
      )}

      {/* Rendered content */}
      {markdown && !loading && (
        <div onClick={handleContentClick}>
          <MarkdownRenderer markdown={markdown} />
        </div>
      )}

      {/* Empty state */}
      {!markdown && !loading && !error && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-xl text-muted-foreground">~</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Nothing here yet</h2>
          <p className="text-sm text-muted-foreground">This page is empty or doesn't exist.</p>
        </div>
      )}
    </div>
    </>
  );
}
