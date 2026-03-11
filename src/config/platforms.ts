export interface Platform {
  name: string;
  favicon: string;
}

/** Google's favicon service — reliable, consistent 32px icons */
const g = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

/** Direct favicon from the site */
const f = (domain: string) => `https://${domain}/favicon.ico`;

export const platforms = {
  devto: { name: "Dev.to", favicon: g("dev.to") },
  medium: { name: "Medium", favicon: g("medium.com") },
  linkedin: { name: "LinkedIn", favicon: g("linkedin.com") },
  hashnode: { name: "Hashnode", favicon: f("hashnode.com") },
  twitter: { name: "Twitter", favicon: g("x.com") },
  github: { name: "GitHub", favicon: f("github.com") },
} as const satisfies Record<string, Platform>;

export type PlatformKey = keyof typeof platforms;
