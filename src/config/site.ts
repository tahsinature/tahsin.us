/**
 * Site-wide configuration — personal info, social links, feature flags.
 * Edit this file to update your details throughout the entire site.
 */
export const siteConfig = {
  /* ── Identity ── */
  name: {
    first: "Tahsin",
    full: "Mohammad Tahsin",
    display: "Tahsin",
    /** The stylised brand shown in header/footer (supports JSX via components) */
    brand: "Tahsin",
  },

  /* ── Bio ── */
  occupation: "Software Engineer",
  location: "London, Ontario, Canada",
  locationShort: "London, Ontario",
  locationEmoji: "🇨🇦",
  bio: "I'm a software engineer based in London, Ontario, Canada. I have 7+ years of experience building and scaling software systems, working across startups and enterprise environments.",
  bioExtended:
    "As a specialist in backend development, cloud computing, and scalable system design, I work extensively with technologies like Python, Java, AWS, Docker, Kubernetes, and microservices architecture.",
  tagline: "Code, coffee, cameras — not always in that order.",
  heroIntro: "Hi, I'm Mohammad Tahsin, a software engineer based in London, Ontario, Canada.",

  /* ── Social / contact ── */
  social: {
    github: "https://github.com/tahsinature",
    linkedin: "https://www.linkedin.com/in/t4h51n/",
    twitter: "", // leave empty to hide
    email: "mailto:hello@tahsin.us",
  },

  /* ── Hero ── */
  /** Hero background pattern: "grid" | "dots" | "waves" */
  heroPattern: "dots" as const,

  /* ── Misc / feature flags ── */
  /** Year the site / career started (used for copyright) */
  startYear: 2019,
  /** Show the newsletter signup form in the sidebar */
  enableNewsletter: false,

  /* ── Maintenance mode ── */
  maintenance: {
    /** Set to true to show maintenance page instead of the normal site */
    enabled: false,
    /** Heading displayed on the maintenance page */
    title: "Under Maintenance",
    /** Body text displayed below the heading */
    message: "Shipping core improvements across the stack. The interface will return soon.",
    /** Show social links (GitHub, LinkedIn, email) */
    showSocials: true,
    /** Allow visitors to toggle dark/light theme */
    showThemeToggle: true,
  },
};
