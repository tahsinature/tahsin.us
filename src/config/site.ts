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
  headline: "Software Developer",
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

  /* ── Work experience ── */
  workExperiences: [
    {
      company: "CARFAX",
      role: "Software Engineer",
      from: "2023",
      to: "Present",
      description: "Part of the engineering team focusing on developing reliable, high-performance backend services.",
      url: "https://www.carfax.com",
    },
    {
      company: "EnPowered",
      role: "Software Engineer",
      from: "2022",
      to: "2023",
      description: "Worked on energy technology platform, building scalable backend services and cloud infrastructure.",
      url: "https://www.enpowered.com",
    },
    {
      company: "Rakuten Travel Xchange",
      role: "Software Engineer",
      from: "2022",
      to: "2022",
      description: "Developed backend systems for the travel exchange platform serving global markets.",
      url: "https://travel.rakuten.com",
    },
    {
      company: "Bountie",
      role: "Software Engineer",
      from: "2021",
      to: "2022",
      description: "Built gaming platform features and backend services for competitive gaming ecosystem.",
      url: "https://www.facebook.com/BountieGaming/",
    },
    {
      company: "HaloJasa",
      role: "Software Engineer",
      from: "2019",
      to: "2021",
      description: "Developed on-demand services platform, working on backend APIs and system architecture.",
      url: "https://play.google.com/store/apps/details?id=halo.jasa.startup",
    },
  ] as const,

  /* ── Skills ── */
  skills: [
    { name: "Python", category: "language" as const },
    { name: "Java", category: "language" as const },
    { name: "TypeScript", category: "language" as const },
    { name: "JavaScript", category: "language" as const },
    { name: "Go", category: "language" as const },
    { name: "AWS", category: "tool" as const },
    { name: "Docker", category: "tool" as const },
    { name: "Kubernetes", category: "tool" as const },
    { name: "Node.js", category: "framework" as const },
    { name: "React", category: "framework" as const },
    { name: "Microservices", category: "framework" as const },
    { name: "PostgreSQL", category: "tool" as const },
    { name: "Redis", category: "tool" as const },
    { name: "Git", category: "tool" as const },
  ],

  /* ── Misc / feature flags ── */
  /** Year the site / career started (used for copyright) */
  startYear: 2019,
  /** Show the newsletter signup form in the sidebar */
  enableNewsletter: false,

  /* ── Maintenance mode ── */
  maintenance: {
    /** Set to true to show maintenance page instead of the normal site */
    enabled: true,
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
