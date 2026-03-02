import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  { label: "Blog", href: "/blog" },
  { label: "Community", href: "/contributions" },
  { label: "Photography", href: "/photography" },
  { label: "About", href: "/about" },
];

const SOCIAL_LINKS = [
  { href: siteConfig.social.github, icon: Github, label: "GitHub" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.social.email, icon: Mail, label: "Email" },
].filter((link) => link.href);

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50 mt-20">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <Logo size={36} className="rounded-lg" />
              <span className="font-bold text-lg">{siteConfig.name.brand}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={
                    social.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.locationShort}</li>
              <li>
                <a
                  href={siteConfig.social.email}
                  className="hover:text-primary transition-colors"
                >
                  {siteConfig.social.email.replace("mailto:", "")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {siteConfig.startYear}–{new Date().getFullYear()}{" "}
            {siteConfig.name.brand}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
