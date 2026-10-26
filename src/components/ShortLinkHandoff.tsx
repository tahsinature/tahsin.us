import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { shortLinkConfig } from "@shared/short-links";
import type { ShortLinkTheme } from "@shared/short-links";
import type { ShortLinkHandoffState } from "@/hooks/useShortLinkDestination";
import ShortLinkPortal from "@/components/ShortLinkPortal";
import ShortLinkRoute from "@/components/ShortLinkRoute";
import { buttonVariants } from "@/components/ui/button";

export default function ShortLinkHandoff({ state, theme }: { state: ShortLinkHandoffState; theme: ShortLinkTheme }) {
  const reducedMotion = Boolean(useReducedMotion());
  const ready = state.status === "ready";
  const destination = ready ? state.destination : null;
  const copy = shortLinkConfig.handoff;

  return (
    <main className="short-transit" data-theme={theme} data-ready={ready}>
      <div className="short-transit-coordinate" aria-hidden="true">01 — THE SPACE BETWEEN</div>
      <ShortLinkPortal theme={theme} reducedMotion={reducedMotion} />
      <div className="short-transit-copy" role="status" aria-live="polite" aria-atomic="true">
        <p className="short-link-eyebrow">{copy.label}</p>
        <motion.h1 key={ready ? "ready" : "checking"} initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.45 }}>
          {ready ? copy.readyTitle : copy.title}
        </motion.h1>
        <p className="short-transit-description">{ready ? copy.readyDescription : copy.description}</p>
        <ShortLinkRoute destination={destination} reducedMotion={reducedMotion} />
        <p className="short-transit-status">{ready ? <Check className="size-3" aria-hidden="true" /> : <span className="short-transit-dot" aria-hidden="true" />}{ready ? "Destination found · Opening shortly" : "Looking up your link"}</p>
      </div>
      <div className="short-transit-continue">
        {destination ? <a href={destination} className={buttonVariants({ variant: "ghost", size: "sm" })}>Continue now<ArrowUpRight data-icon="inline-end" aria-hidden="true" /></a> : <span>One link. The right place.</span>}
      </div>
    </main>
  );
}
