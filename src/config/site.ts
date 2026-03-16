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
  bio: "Senior software engineer with 7+ years shipping production systems at scale — from greenfield builds at startups to platform modernization in enterprise.",
  bioExtended: "I lead backend and infrastructure efforts, specializing in distributed architecture, cloud-native platforms on AWS, and containerized microservices with Kubernetes.",
  tagline: "Code, coffee, cameras — not always in that order.",
  heroIntro: "Hi, I'm Mohammad Tahsin, a software engineer based in London, Ontario, Canada.",

  /* ── Hero ── */
  /** Hero background pattern: "grid" | "dots" | "waves" */
  heroPattern: "dots" as const,

  /* ── Misc / feature flags ── */
  /** Year the site / career started (used for copyright) */
  startYear: 2019,
  /** Show the newsletter signup form in the sidebar */
  enableNewsletter: false,

  /* ── Maintenance page content ── */
  maintenance: {
    title: "Under Maintenance",
    message: "Shipping core improvements across the stack. The interface will return soon.",
    showSocials: true,
    showThemeToggle: true,
  },
};
