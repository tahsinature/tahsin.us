import { siteConfig } from "@/config/site";

export interface WorkExperience {
  company: string;
  role: string;
  from: string;
  to: string;
  description: string;
  logo?: string;
  url?: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool";
}

/**
 * All personal data is sourced from siteConfig.
 * These re-exports keep existing imports working.
 */
export const workExperiences: WorkExperience[] = [...siteConfig.workExperiences];
export const skills: Skill[] = siteConfig.skills;
export const socialLinks = siteConfig.social;
