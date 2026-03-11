export interface Platform {
  name: string;
  favicon: string;
}

/** Google's favicon service — reliable, consistent 32px icons */
const g = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

/** Direct favicon from the site */
const f = (domain: string) => `https://${domain}/favicon.ico`;

export const platforms = {
  github: { name: "GitHub", favicon: f("github.com") },
  linkedin: { name: "LinkedIn", favicon: g("linkedin.com") },
  twitter: { name: "Twitter / X", favicon: g("x.com") },
  facebook: { name: "Facebook", favicon: g("facebook.com") },
  instagram: { name: "Instagram", favicon: g("instagram.com") },
  npm: { name: "npm", favicon: g("npmjs.com") },
  dockerhub: { name: "Docker Hub", favicon: g("hub.docker.com") },
  stackoverflow: { name: "Stack Overflow", favicon: g("stackoverflow.com") },
  devto: { name: "Dev.to", favicon: g("dev.to") },
  medium: { name: "Medium", favicon: g("medium.com") },
  email: { name: "Email", favicon: g("gmail.com") },
  hashnode: { name: "Hashnode", favicon: f("hashnode.com") },
} as const satisfies Record<string, Platform>;

export type PlatformKey = keyof typeof platforms;
