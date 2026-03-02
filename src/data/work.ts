export interface WorkExperience {
  company: string;
  role: string;
  from: string;
  to: string;
  description: string;
  logo?: string;
  url?: string;
  country?: { flag: string; name: string };
}

export const workExperiences: WorkExperience[] = [
  {
    company: "CARFAX",
    role: "Software Engineer",
    from: "2023",
    to: "Present",
    description: "Part of the engineering team focusing on developing reliable, high-performance backend services.",
    url: "https://www.carfax.com",
    country: { flag: "🇨🇦", name: "Canada" },
  },
  {
    company: "EnPowered",
    role: "Software Engineer",
    from: "2022",
    to: "2023",
    description: "Worked on energy technology platform, building scalable backend services and cloud infrastructure.",
    url: "https://www.enpowered.com",
    country: { flag: "🇨🇦", name: "Canada" },
  },
  {
    company: "Rakuten Travel Xchange",
    role: "Software Engineer",
    from: "2022",
    to: "2022",
    description: "Developed backend systems for the travel exchange platform serving global markets.",
    url: "https://travel.rakuten.com",
    country: { flag: "🇸🇬", name: "Singapore" },
  },
  {
    company: "Bountie",
    role: "Software Engineer",
    from: "2021",
    to: "2022",
    description: "Built gaming platform features and backend services for competitive gaming ecosystem.",
    url: "https://www.facebook.com/BountieGaming/",
    country: { flag: "🇸🇬", name: "Singapore" },
  },
  {
    company: "HaloJasa",
    role: "Software Engineer",
    from: "2019",
    to: "2021",
    description: "Developed on-demand services platform, working on backend APIs and system architecture.",
    url: "https://play.google.com/store/apps/details?id=halo.jasa.startup",
    country: { flag: "🇮🇩", name: "Indonesia" },
  },
];
