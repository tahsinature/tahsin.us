import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useThemeStore } from "@/stores/useThemeStore";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BlurFadeIn } from "@/components/MotionWrapper";
import type { HealthResponse } from "@shared/api";

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

export default function DebugPage() {
  useDocumentTitle("Debug");

  const location = useLocation();
  const theme = useThemeStore((s) => s.theme);
  const nav = navigator;

  const [health, setHealth] = useState<HealthResponse | null>(null);
  useEffect(() => {
    fetch("/api/ops/health")
      .then((r) => r.json())
      .then((data: HealthResponse) => setHealth(data))
      .catch(() => {});
  }, []);

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
            <Row label="enableDebug" value={siteConfig.enableDebug} />
            <Row label="maintenance.enabled" value={siteConfig.maintenance.enabled} />
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

        <BlurFadeIn delay={0.3}>
          <Section title="Local Storage">
            {Object.keys(localStorage).length === 0 ? (
              <span className="text-muted-foreground">(empty)</span>
            ) : (
              Object.keys(localStorage).map((key) => <Row key={key} label={key} value={localStorage.getItem(key) ?? ""} />)
            )}
          </Section>
        </BlurFadeIn>
      </div>
    </div>
  );
}
