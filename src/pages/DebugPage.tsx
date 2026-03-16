import { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useAppStore } from "@/stores/useAppStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BlurFadeIn } from "@/components/MotionWrapper";
import PhotoLightbox from "@/components/PhotoLightbox";
import { usePhotographyStore } from "@/stores/usePhotographyStore";
import type { HealthResponse, AppConfig, UpdateAppConfigBody } from "@shared/api";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-2 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-4 space-y-1 text-sm font-mono">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <span className="text-foreground break-all">{typeof value === "boolean" ? (value ? "true" : "false") : value}</span>
    </div>
  );
}

function ConfigToggle({ label, field, value }: { label: string; field: keyof UpdateAppConfigBody; value: boolean }) {
  const setConfig = useAppStore((s) => s.setConfig);
  const [saving, setSaving] = useState(false);

  const toggle = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/ops/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !value }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated: AppConfig = await res.json();
      setConfig(updated);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <button
        onClick={toggle}
        disabled={saving}
        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer disabled:opacity-50 ${value ? "bg-primary" : "bg-muted-foreground/30"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : ""}`} />
      </button>
    </div>
  );
}

function CacheBustButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const bust = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/ops/cache/bust", { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={bust}
        disabled={status === "loading"}
        className="px-3 py-1 text-xs rounded border border-border bg-muted/50 hover:bg-muted text-foreground transition-colors disabled:opacity-50 cursor-pointer"
      >
        {status === "loading" ? "Busting..." : "Bust Cache"}
      </button>
      {status === "success" && <span className="text-xs text-green-500">Cleared</span>}
      {status === "error" && <span className="text-xs text-red-500">Failed</span>}
    </div>
  );
}

export default function DebugPage() {
  useDocumentTitle("Debug");

  const location = useLocation();
  const theme = useAppStore((s) => s.theme);
  const appConfig = useAppStore((s) => s.config);
  const nav = navigator;

  const [health, setHealth] = useState<HealthResponse | null>(null);
  useEffect(() => {
    fetch("/api/ops/health")
      .then((r) => r.json())
      .then((data: HealthResponse) => setHealth(data))
      .catch(() => {});
  }, []);

  // Fetch fav photos for lightbox test
  const fetchPhotos = usePhotographyStore((s) => s.fetchPhotos);
  const [favPhotos, setFavPhotos] = useState<ReturnType<typeof usePhotographyStore.getState>["photosCache"][string]>();
  useEffect(() => {
    fetchPhotos(undefined, { favOnly: true }).then((photos) => setFavPhotos({ photos, fetchedAt: Date.now() }));
  }, [fetchPhotos]);
  const photos = favPhotos?.photos ?? [];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <BlurFadeIn>
        <h1 className="text-2xl font-bold text-foreground mb-6">Debug</h1>
      </BlurFadeIn>

      <div className="space-y-4">
        {/* ── Quick Links ── */}
        <BlurFadeIn delay={0.02}>
          <Section title="Pages">
            <Link to="/page/321960add9d380b4a9d3e22df97ee834" className="text-accent underline underline-offset-2 hover:text-primary transition-colors">
              Page Preview
            </Link>
          </Section>
        </BlurFadeIn>

        {/* ── Server Health ── */}
        <BlurFadeIn delay={0.03}>
          <Section title="Server Health">
            {health ? (
              <>
                <Row label="status" value={health.status} />
                <Row label="uptime" value={`${Math.round(health.uptime)}s`} />
              </>
            ) : (
              <span className="text-muted-foreground">Loading...</span>
            )}
          </Section>
        </BlurFadeIn>

        {/* ── Site Config ── */}
        <BlurFadeIn delay={0.05}>
          <Section title="Site Config">
            <Row label="name" value={siteConfig.name.full} />
            <Row label="heroPattern" value={siteConfig.heroPattern} />
            <Row label="enableNewsletter" value={siteConfig.enableNewsletter} />
          </Section>
        </BlurFadeIn>

        {/* ── Server Config ── */}
        <BlurFadeIn delay={0.07}>
          <Section title="Server Config">
            {appConfig ? (
              <div className="space-y-3">
                <ConfigToggle label="debugMode" field="debugMode" value={appConfig.debugMode} />
                <ConfigToggle label="maintenanceMode" field="maintenanceMode" value={appConfig.maintenanceMode} />
                {appConfig.geo && (
                  <div className="pt-2 border-t border-border/30 space-y-1">
                    <Row label="ip" value={appConfig.geo.ip} />
                    <Row label="location" value={[appConfig.geo.city, appConfig.geo.region, appConfig.geo.country].filter(Boolean).join(", ") || "Unknown"} />
                    <Row label="coords" value={appConfig.geo.latitude && appConfig.geo.longitude ? `${appConfig.geo.latitude}, ${appConfig.geo.longitude}` : "N/A"} />
                  </div>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Loading...</span>
            )}
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.1}>
          <Section title="App State">
            <Row label="theme" value={theme} />
            <Row label="route" value={location.pathname} />
            <Row label="search" value={location.search || "(none)"} />
            <Row label="hash" value={location.hash || "(none)"} />
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.15}>
          <Section title="Environment">
            <Row label="mode" value={import.meta.env.MODE} />
            <Row label="dev" value={import.meta.env.DEV} />
            <Row label="prod" value={import.meta.env.PROD} />
            <Row label="baseUrl" value={import.meta.env.BASE_URL} />
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.2}>
          <Section title="Browser">
            <Row label="userAgent" value={nav.userAgent} />
            <Row label="language" value={nav.language} />
            <Row label="cookieEnabled" value={nav.cookieEnabled} />
            <Row label="online" value={nav.onLine} />
            <Row label="viewport" value={`${window.innerWidth} × ${window.innerHeight}`} />
            <Row label="devicePixelRatio" value={window.devicePixelRatio} />
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.25}>
          <Section title="Performance">
            <Row
              label="pageLoad"
              value={(() => {
                const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
                return nav ? `${Math.round(nav.loadEventEnd - nav.startTime)}ms` : "N/A";
              })()}
            />
            <Row label="memoryEntries" value={performance.getEntries().length} />
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.28}>
          <Section title="Lightbox Test — Fav Photos">
            {photos.length === 0 ? (
              <span className="text-muted-foreground">Loading photos...</span>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-2">
                  {photos.slice(0, 8).map((p, i) => (
                    <button key={i} onClick={() => setLightboxIndex(i)} className="cursor-pointer">
                      <img src={p.src} alt={p.alt} className="w-full aspect-square object-cover rounded border border-border hover:opacity-80 transition-opacity" loading="lazy" />
                    </button>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mt-2">{photos.length} photos — click any to open lightbox, use arrow keys to navigate</p>
              </>
            )}
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.3}>
          <Section title="Cache">
            <CacheBustButton />
          </Section>
        </BlurFadeIn>

        <BlurFadeIn delay={0.32}>
          <Section title="Local Storage">
            {Object.keys(localStorage).length === 0 ? (
              <span className="text-muted-foreground">(empty)</span>
            ) : (
              Object.keys(localStorage).map((key) => <Row key={key} label={key} value={localStorage.getItem(key) ?? ""} />)
            )}
          </Section>
        </BlurFadeIn>
      </div>

      <PhotoLightbox photos={photos} index={lightboxIndex} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} />
    </div>
  );
}
