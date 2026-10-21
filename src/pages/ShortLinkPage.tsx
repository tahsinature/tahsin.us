import { useLocation } from "react-router-dom";
import { RotateCw } from "lucide-react";
import { getShortLinkRetryHref, resolveShortLink } from "@shared/short-links";
import { useShortLinkMetadata } from "@/hooks/useShortLinkMetadata";
import { ShortLinkIllustration } from "@/components/SVGs";
import { buttonVariants } from "@/components/ui/button";
import { useShortLinkDestination } from "@/hooks/useShortLinkDestination";
import ShortLinkHandoff from "@/components/ShortLinkHandoff";

export default function ShortLinkPage() {
  const { pathname, search } = useLocation();
  const content = resolveShortLink(pathname, search);
  const retryUrl = getShortLinkRetryHref(pathname, search);
  useShortLinkMetadata(pathname, search);
  const destination = useShortLinkDestination(pathname, search);

  if (destination.status === "checking" || destination.status === "ready") {
    return <ShortLinkHandoff state={destination} theme={content.theme} />;
  }

  return (
    <div className="short-link-page" data-theme={content.theme}>
      <main className="short-link-main">
        <ShortLinkIllustration theme={content.theme} />
        <p className="short-link-eyebrow">{content.label}</p>
        <h1>{destination.status === "error" ? "We couldn’t check this link." : content.title}</h1>
        <p className="short-link-description">{destination.status === "error" ? "The connection is taking longer than expected. Please try again in a moment." : content.description}</p>
        {retryUrl ? (
          <div className="short-link-actions">
            <a href={retryUrl} className={buttonVariants({ variant: "secondary", size: "lg" })}>
              <RotateCw data-icon="inline-start" aria-hidden="true" />Try again
            </a>
          </div>
        ) : null}
      </main>
      <footer className="short-link-footer">You’re at the right place to check this link.</footer>
    </div>
  );
}
