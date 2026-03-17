import { PAGE_PADDING } from "@/config/layout";

export default function PageSkeleton() {
  return (
    <div className={`w-full max-w-5xl mx-auto ${PAGE_PADDING} space-y-6 animate-pulse`}>
      {/* Title */}
      <div className="h-8 w-1/3 rounded bg-muted" />

      {/* Subtitle */}
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-muted/70" />
        <div className="h-4 w-1/2 rounded bg-muted/50" />
      </div>

      {/* Content blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-border overflow-hidden">
            <div className="h-32 bg-muted/60" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/5 rounded bg-muted" />
              <div className="h-3 w-4/5 rounded bg-muted/70" />
            </div>
          </div>
        ))}
      </div>

      {/* Text lines */}
      <div className="space-y-3 pt-2">
        <div className="h-4 w-full rounded bg-muted/60" />
        <div className="h-4 w-5/6 rounded bg-muted/50" />
        <div className="h-4 w-4/6 rounded bg-muted/40" />
      </div>
    </div>
  );
}
