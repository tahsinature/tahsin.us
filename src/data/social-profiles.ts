import type { PlatformKey } from "@/config/platforms";

export interface SocialLink {
  platform: PlatformKey;
  handle: string;
  href: string;
}

export const socialProfiles: SocialLink[] = [
  { platform: "github", handle: "@tahsinature", href: "https://github.com/tahsinature" },
  { platform: "linkedin", handle: "/in/t4h51n", href: "https://www.linkedin.com/in/t4h51n/" },
  { platform: "twitter", handle: "@tahsinature", href: "https://x.com/tahsinature" },
  { platform: "facebook", handle: "@tahsinature", href: "https://facebook.com/tahsinature" },
  { platform: "instagram", handle: "@tahsinature", href: "https://instagram.com/tahsinature" },
  { platform: "npm", handle: "~tahsinature", href: "https://www.npmjs.com/~tahsinature" },
  { platform: "dockerhub", handle: "@tahsinature", href: "https://hub.docker.com/u/tahsinature" },
  { platform: "stackoverflow", handle: "tahsin", href: "https://stackoverflow.com/users/7522955/tahsin" },
  { platform: "devto", handle: "@tahsinature", href: "https://dev.to/tahsinature" },
  { platform: "medium", handle: "@tahsinature", href: "https://medium.com/@tahsinature" },
  { platform: "email", handle: "hello@tahsin.us", href: "mailto:hello@tahsin.us" },
];

/** Look up a social profile by platform key */
export function getSocial(platform: PlatformKey): SocialLink | undefined {
  return socialProfiles.find((p) => p.platform === platform);
}
