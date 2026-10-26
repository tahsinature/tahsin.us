import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { shortLinkConfig } from "@shared/short-links";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function ShortLinkRoute({ destination, reducedMotion }: { destination: string | null; reducedMotion: boolean }) {
  const hostname = destination ? new URL(destination).hostname : null;
  const sourceHostname = new URL(shortLinkConfig.origin).hostname;

  return (
    <div className="short-transit-route">
      <div className="short-transit-endpoints">
        <div className="short-transit-endpoint">
          <span className="short-transit-endpoint-label">From</span>
          <span className="short-transit-host truncate">{sourceHostname}</span>
        </div>
        <span className="short-transit-direction" aria-hidden="true"><ArrowRight className="size-3.5" /></span>
        <div className="short-transit-endpoint short-transit-endpoint-destination">
          <span className="short-transit-endpoint-label">To</span>
          {hostname ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="short-transit-host short-transit-host-trigger" aria-label={`Destination: ${hostname}`}>
                  <span className="block truncate">{hostname}</span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8} className="max-w-[min(320px,calc(100vw-32px))] break-all">
                  {hostname}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : <span className="short-transit-host truncate">Locating…</span>}
        </div>
      </div>
      <div className="short-transit-route-line" aria-hidden="true">
        <motion.i
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reducedMotion ? 0 : shortLinkConfig.handoff.durationMs / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}
