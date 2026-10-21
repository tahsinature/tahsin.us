import { useEffect, useState } from "react";
import { getShortLinkRetryUrl, shortLinkConfig } from "@shared/short-links";
import type { ShortLinkResolution } from "@shared/short-link-resolution";

export type ShortLinkHandoffState =
  | { status: "checking" | "unavailable" | "error"; destination: null }
  | { status: "ready"; destination: string };

export function useShortLinkDestination(pathname: string, search: string) {
  const shortUrl = getShortLinkRetryUrl(pathname, search);
  const [state, setState] = useState<ShortLinkHandoffState>({
    status: shortUrl ? "checking" : "unavailable", destination: null,
  });

  useEffect(() => {
    if (!shortUrl) return;
    const controller = new AbortController();
    let timer: number | undefined;
    const started = performance.now();

    async function resolve() {
      let result: ShortLinkResolution;
      try {
        const query = new URLSearchParams({ path: pathname, search });
        const response = await fetch(`/api/short-links/resolve?${query}`, {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(6000)]),
        });
        if (!response.ok) throw new Error("Link lookup failed");
        result = await response.json();
        if (result.status === "available") {
          const url = new URL(result.destination);
          if (!["https:", "http:"].includes(url.protocol)) throw new Error("Invalid destination");
        } else if (result.status !== "unavailable" && result.status !== "error") {
          throw new Error("Invalid link response");
        }
      } catch {
        result = { status: "error", destination: null };
      }
      if (controller.signal.aborted) return;

      const remaining = Math.max(0, shortLinkConfig.handoff.durationMs - (performance.now() - started));
      if (result.status === "available") {
        const destination = result.destination;
        setState({ status: "ready", destination });
        timer = window.setTimeout(() => window.location.replace(destination), Math.max(700, remaining));
      } else {
        const status = result.status;
        timer = window.setTimeout(() => setState({ status, destination: null }), remaining);
      }
    }
    void resolve();
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [pathname, search, shortUrl]);

  return state;
}
