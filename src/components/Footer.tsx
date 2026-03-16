import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/MotionWrapper";
import { getSocial } from "@/data/social-profiles";

const NAV_ITEMS = [
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/contributions" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

const SOCIAL_LINKS = [
  { href: getSocial("github")?.href, icon: Github, label: "GitHub" },
  { href: getSocial("linkedin")?.href, icon: Linkedin, label: "LinkedIn" },
  { href: getSocial("email")?.href, icon: Mail, label: "Email" },
].filter((link) => link.href) as { href: string; icon: typeof Github; label: string }[];

export default function Footer() {
  return (
    <footer className="mt-24 relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <Container className="pt-12 pb-6 md:pt-16 md:pb-8">
        <FadeIn>
          <div className="flex flex-col items-center text-center gap-6">
            {/* Nav links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {NAV_ITEMS.map((item, i) => (
                <span key={item.href} className="flex items-center gap-6">
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                  {i < NAV_ITEMS.length - 1 && (
                    <span className="text-border hidden sm:inline">&middot;</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Contact */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground/60">
              <span>{siteConfig.locationShort}</span>
              <span className="hidden sm:inline">&middot;</span>
              <a
                href={getSocial("email")?.href}
                className="hover:text-foreground transition-colors duration-200"
              >
                {getSocial("email")?.handle}
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-1.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <social.icon className="h-[16px] w-[16px]" />
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/50">
          <p>
            &copy; {siteConfig.startYear}–{new Date().getFullYear()} {siteConfig.name.brand}
          </p>
          <p>Built with care.</p>
        </div>
      </Container>
    </footer>
  );
}
