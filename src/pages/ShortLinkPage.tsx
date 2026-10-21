import { useLocation } from "react-router-dom";
import { RotateCw } from "lucide-react";
import { getShortLinkRetryUrl, resolveShortLink } from "@shared/short-links";
import { useShortLinkMetadata } from "@/hooks/useShortLinkMetadata";
import ShortLinkIllustration from "@/components/ShortLinkIllustration";
import { buttonVariants } from "@/components/ui/button";

export default function ShortLinkPage() {
  const { pathname, search } = useLocation();
  const content = resolveShortLink(pathname, search);
  const retryUrl = getShortLinkRetryUrl(pathname, search);
  useShortLinkMetadata(pathname, search);

  return (
    <div className="short-link-page" data-theme={content.theme}>
      <main className="short-link-main">
        <ShortLinkIllustration theme={content.theme} />
        <p className="short-link-eyebrow">{content.label}</p>
        <h1>{content.title}</h1>
        <p className="short-link-description">{content.description}</p>
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
