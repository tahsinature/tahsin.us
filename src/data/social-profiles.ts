import { siteConfig } from "@/config/site";
import type { PlatformKey } from "@/config/platforms";

export interface SocialLink {
  platform: PlatformKey;
  handle: string;
  href: string;
}

export const socialProfiles: SocialLink[] = [
  { platform: "github", handle: "@tahsinature", href: siteConfig.social.github },
  { platform: "linkedin", handle: "/in/t4h51n", href: siteConfig.social.linkedin },
  { platform: "twitter", handle: "@tahsinature", href: "https://x.com/tahsinature" },
  { platform: "facebook", handle: "@tahsinature", href: "https://facebook.com/tahsinature" },
  { platform: "instagram", handle: "@tahsinature", href: "https://instagram.com/tahsinature" },
  { platform: "npm", handle: "~tahsinature", href: "https://www.npmjs.com/~tahsinature" },
  { platform: "dockerhub", handle: "@tahsinature", href: "https://hub.docker.com/u/tahsinature" },
  { platform: "stackoverflow", handle: "tahsin", href: "https://stackoverflow.com/users/7522955/tahsin" },
  { platform: "devto", handle: "@tahsinature", href: "https://dev.to/tahsinature" },
  { platform: "medium", handle: "@tahsinature", href: "https://medium.com/@tahsinature" },
  { platform: "email", handle: "hello@tahsin.us", href: siteConfig.social.email },
];
