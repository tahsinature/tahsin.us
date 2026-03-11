export interface WorkExperience {
  company: string;
  role: string;
  from: string;
  to: string;
  description: string;
  logo?: string;
  url?: string;
  technologies?: string[];
  country?: { flag: string; name: string };
}

export const workExperiences: WorkExperience[] = [
  {
    company: "CARFAX",
    role: "Sr. Software Engineer",
    from: "2023",
    to: "Present",
    description:
      "Core engineer on the payments team at the industry leader in vehicle history data — a 1,500+ people organization established in 1984. Owning the transaction infrastructure that processes all purchase revenue company-wide, powering hundreds of millions of dollars in annual transactions.",
    technologies: ["AWS", "Java", "Spring Boot", "Medusa", "React", "PostgreSQL", "Redis"],
    url: "https://www.carfax.com",
    country: { flag: "🇨🇦", name: "Canada" },
  },
  {
    company: "EnPowered",
    role: "Software Engineer",
    from: "2022",
    to: "2023",
    description:
      "Drove critical improvements on the Customer Insights team — architecting data streaming capabilities that transformed how historical usage data was aggregated and processed. Built and maintained internal CLI tools that became core to the team's development workflow.",
    technologies: ["AWS", "JavaScript", "React"],
    url: "https://www.enpowered.com",
    country: { flag: "🇨🇦", name: "Canada" },
  },
  {
    company: "Rakuten Travel Xchange",
    role: "Software Engineer",
    from: "2022",
    to: "2022",
    description:
      "Full-stack engineer on the core API team, building and shipping features across the Node.js/Express backend and Vue.js frontend for a global travel exchange platform. Delivered sprint-driven features with a focus on search and data performance.",
    technologies: ["Node.js", "Vue.js", "PostgreSQL", "Elasticsearch"],
    url: "https://travel.rakuten.com",
    country: { flag: "🇸🇬", name: "Singapore" },
  },
  {
    company: "Bountie",
    role: "Software Engineer",
    from: "2021",
    to: "2022",
    description:
      "Engineered a payment service in Go with gRPC for a competitive gaming platform, handling real-time transaction flows. Built automation tooling and CLI applications that drove measurable efficiency gains across the engineering workflow.",
    technologies: ["Go", "AWS", "Angular", "Node.js", "gRPC", "PostgreSQL"],
    url: "https://www.facebook.com/BountieGaming/",
    country: { flag: "🇸🇬", name: "Singapore" },
  },
  {
    company: "HaloJasa",
    role: "Software Engineer",
    from: "2019",
    to: "2021",
    description:
      "First professional engineering role, where I built my foundation in system design and team collaboration. Architected gRPC-based inter-service communication that tripled API performance across the platform's microservices. Learned what it means to ship, iterate, and grow as an engineer.",
    technologies: ["Firebase", "Docker", "Node.js", "gRPC", "MongoDB", "PostgreSQL", "Socket.io"],
    url: "https://play.google.com/store/apps/details?id=halo.jasa.startup",
    country: { flag: "🇮🇩", name: "Indonesia" },
  },
];
