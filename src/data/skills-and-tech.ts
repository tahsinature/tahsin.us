export interface Skill {
  name: string;
  category: "language" | "framework" | "tool";
}

export const languages = [
  "Python", //
  "Java",
  "TypeScript",
  "JavaScript",
  "Go",
];

export const frameworks = [
  "Express.js", //
  "React",
  "React Native",
  "Vue.js",
  "Medusa",
  "Next.js",
  "Gin",
  "Spring Boot",
];

export const tools = [
  "AWS", //
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "Redis",
  "Git",
  "Socket.io",
  "MongoDB",
  "GitHub Actions",
  "Ansible",
  "gRPC",
  "GraphQL",
  "Elasticsearch",
];

/** All skills combined with category attached */
export const skills: Skill[] = [
  ...languages.map((name) => ({ name, category: "language" as const })),
  ...frameworks.map((name) => ({ name, category: "framework" as const })),
  ...tools.map((name) => ({ name, category: "tool" as const })),
];
