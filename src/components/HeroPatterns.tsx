import { siteConfig } from "@/config/site";

export type HeroPatternName = "grid" | "dots" | "waves";

export default function HeroPattern() {
  switch (siteConfig.heroPattern as HeroPatternName) {
    case "grid":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.2] dark:opacity-[0.20]" aria-hidden="true">
          <defs>
            <pattern id="hero-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="40" y1="0" x2="40" y2="40" className="stroke-foreground/50 dark:stroke-foreground/40" strokeWidth="1" />
              <line x1="0" y1="40" x2="40" y2="40" className="stroke-foreground/50 dark:stroke-foreground/40" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      );
    case "dots":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.3] dark:opacity-[0.30]" aria-hidden="true">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.2" className="fill-foreground/40 dark:fill-foreground/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>
      );
    case "waves":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-[0.25] dark:opacity-[0.15]" aria-hidden="true">
          <defs>
            <pattern id="hero-waves" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q20 0 40 20 Q60 40 80 20" className="stroke-foreground/40 dark:stroke-foreground/30" strokeWidth="1" fill="none" />
              <path d="M0 30 Q20 10 40 30 Q60 50 80 30" className="stroke-foreground/20 dark:stroke-foreground/15" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-waves)" />
        </svg>
      );
  }
}
