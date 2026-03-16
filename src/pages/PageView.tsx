import { useCallback, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useScroll, useSpring, motion, AnimatePresence } from "motion/react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { usePageStore } from "@/stores/usePageStore";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { PAGE_PADDING } from "@/config/layout";

const smooth = [0.25, 0.1, 0.25, 1] as const;

function SkeletonLine({ width, height = "h-4", delay }: { width: string; height?: string; delay: number }) {
  return (
    <motion.div
      className={`${height} ${width} rounded bg-muted/40`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: smooth }}
    />
  );
}

export default function PageView({ pageId: propId, fetchUrl, title }: { pageId?: string; fetchUrl?: string; title?: string } = {}) {
  useDocumentTitle(title ?? "Page");

  const { pageId: paramId } = useParams<{ pageId: string }>();
  const resolvedId = propId ?? paramId;
  const navigate = useNavigate();
  const fetchPage = usePageStore((s) => s.fetchPage);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  type State = { markdown: string | null; loading: boolean; error: string | null };
  type Action = { type: "fetch" } | { type: "success"; markdown: string } | { type: "error"; error: string };
  const [{ markdown, loading, error }, dispatch] = useReducer(
    (_: State, action: Action): State => {
      switch (action.type) {
        case "fetch": return { markdown: null, loading: true, error: null };
        case "success": return { markdown: action.markdown, loading: false, error: null };
        case "error": return { markdown: null, loading: false, error: action.error };
      }
    },
    { markdown: null, loading: false, error: null },
  );

  const url = fetchUrl ?? (resolvedId ? `/api/cms/${resolvedId.trim().replace(/[^a-f0-9-]/gi, "")}` : null);

  useEffect(() => {
    if (!url) return;
    dispatch({ type: "fetch" });
    fetchPage(url)
      .then((md) => dispatch({ type: "success", markdown: md }))
      .catch((err) => dispatch({ type: "error", error: err instanceof Error ? err.message : "Unknown error" }));
  }, [url, fetchPage]);

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
    <div className={`max-w-6xl mx-auto ${PAGE_PADDING}`}>
      <AnimatePresence mode="wait">
        {error && !loading && (
          <motion.div
            key="error"
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: smooth }}
          >
            <motion.div
              className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <span className="text-xl text-muted-foreground">!</span>
            </motion.div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">{error}</p>
            <button
              onClick={() => { if (url) { dispatch({ type: "fetch" }); fetchPage(url).then((md) => dispatch({ type: "success", markdown: md })).catch((e) => dispatch({ type: "error", error: e.message })); } }}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Try again
            </button>
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="skeleton"
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: smooth }}
          >
            <SkeletonLine width="w-2/3" height="h-8" delay={0} />
            <SkeletonLine width="w-full" delay={0.05} />
            <SkeletonLine width="w-5/6" delay={0.1} />
            <motion.div
              className="h-48 w-full rounded-lg bg-muted/30"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5, delay: 0.15, ease: smooth } }}
            />
            <SkeletonLine width="w-4/5" delay={0.2} />
            <SkeletonLine width="w-full" delay={0.25} />
            <SkeletonLine width="w-3/4" delay={0.3} />
          </motion.div>
        )}

        {markdown && !loading && (
          <motion.div
            key="content"
            onClick={handleContentClick}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: smooth }}
          >
            <MarkdownRenderer markdown={markdown} />
          </motion.div>
        )}

        {!markdown && !loading && !error && (
          <motion.div
            key="empty"
            className="flex flex-col items-center justify-center py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smooth }}
          >
            <motion.div
              className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
            >
              <span className="text-xl text-muted-foreground">~</span>
            </motion.div>
            <h2 className="text-lg font-semibold text-foreground mb-1">Nothing here yet</h2>
            <p className="text-sm text-muted-foreground">This page is empty or doesn't exist.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
