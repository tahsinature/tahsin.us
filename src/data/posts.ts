export interface BlogPostResource {
  label: string;
  url: string;
  description?: string;
}

import type { PlatformKey } from "@/config/platforms";

export interface PublishedOn {
  platform: PlatformKey;
  url: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readMoreLabel?: string;
  popular?: boolean;
  publishedOn?: PublishedOn[];
  resources?: {
    note?: string;
    links: BlogPostResource[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "get-productive-with-lazydocker",
    title: "Get Productive with Docker Using Lazydocker",
    description: "A terminal UI for Docker that gives you logs, metrics, and container management in a single keyboard-driven interface. No more juggling docker ps, docker logs, and docker stats.",
    category: "General",
    date: "2026-03-11",
    publishedOn: [{ platform: "devto", url: "https://dev.to/tahsinature/get-productive-with-docker-using-lazydocker-4on2" }],
    resources: {
      links: [{ label: "Lazydocker on GitHub", url: "https://github.com/jesseduffield/lazydocker", description: "Source code, installation, and documentation" }],
    },
  },
  {
    slug: "get-lazy-with-lazygit",
    title: "Get Lazy with Lazygit",
    description: "A terminal UI for Git that makes staging, committing, branching, and PR creation feel effortless. If you live in the terminal, this will change your Git workflow.",
    category: "General",
    date: "2026-03-11",
    publishedOn: [
      { platform: "devto", url: "https://dev.to/tahsinature/get-lazy-with-lazygit-4h37" },
      { platform: "medium", url: "https://tahsinature.medium.com/get-lazy-with-lazygit-1984b1b0b5e7" },
    ],
    resources: {
      links: [
        { label: "Lazygit on GitHub", url: "https://github.com/jesseduffield/lazygit", description: "Source code, installation, and documentation" },
        { label: "Lazygit Keybindings", url: "https://github.com/jesseduffield/lazygit/blob/master/docs/keybindings/Keybindings_en.md", description: "Complete list of keyboard shortcuts" },
      ],
    },
  },
  {
    slug: "secure-traefik-dashboard",
    title: "Secure Your Traefik Dashboard with HTTPS and Basic Auth",
    description: "Traefik's dashboard is powerful but dangerously exposed by default. Here's how to lock it down with TLS, basic auth, and proper configuration — step by step.",
    category: "General",
    date: "2026-03-11",
    publishedOn: [
      { platform: "devto", url: "https://dev.to/tahsinature/secure-your-traefik-dashboard-with-https-and-basic-auth-nkh" },
      { platform: "medium", url: "https://tahsinature.medium.com/secure-your-traefik-dashboard-with-https-and-basic-auth-7d394d934b07" },
    ],
    resources: {
      links: [
        { label: "Traefik Dashboard Docs", url: "https://doc.traefik.io/traefik/operations/dashboard/", description: "Official documentation on the Traefik dashboard" },
        { label: "Traefik BasicAuth Middleware", url: "https://doc.traefik.io/traefik/middlewares/http/basicauth/", description: "How basic auth middleware works in Traefik" },
      ],
    },
  },
  {
    slug: "concurrency-is-not-parallelism",
    title: "Concurrency Is Not Parallelism",
    description: "They sound the same. They're not. Concurrency is about dealing with many things at once. Parallelism is about doing many things at once. Here's the difference — and why it matters.",
    category: "General",
    date: "2026-03-11",
    popular: true,
    publishedOn: [
      { platform: "devto", url: "https://dev.to/tahsinature/concurrency-is-not-parallelism-a-deeper-look-at-their-key-difference-3amb" },
      { platform: "medium", url: "https://tahsinature.medium.com/concurrency-is-not-parallelism-a-deeper-look-at-their-difference-7bdfe05190a5" },
    ],
  },
  {
    slug: "circular-dependency-typescript",
    title: "Tired of Circular Dependencies in TypeScript?",
    description: "Circular dependencies silently break your code — returning undefined where you expect values. Here's how to detect them, understand why they happen, and fix them for good.",
    category: "JavaScript",
    date: "2026-03-11",
    publishedOn: [
      { platform: "devto", url: "https://dev.to/tahsinature/tired-of-circular-dependency-in-typescriptnodejs-4i0a" },
      { platform: "medium", url: "https://tahsinature.medium.com/tired-of-circular-dependency-in-typescript-node-js-356d499a4479" },
    ],
    resources: {
      note: "Tools and reading for managing module dependencies.",
      links: [
        { label: "Madge", url: "https://github.com/pahen/madge", description: "Fast circular dependency detection" },
        { label: "Skott", url: "https://github.com/antoine-music/skott", description: "Full dependency graph analysis with web UI" },
        { label: "Node.js Modules Docs", url: "https://nodejs.org/api/modules.html#cycles", description: "Official documentation on how Node handles circular imports" },
      ],
    },
  },
  {
    slug: "coding-principles-explained",
    title: "8 Coding Principles Every Developer Should Know — With Real Examples",
    description: "SOLID, DRY, KISS, YAGNI — explained with side-by-side Python examples showing the wrong way and the right way. No abstract theory, just code you can recognize from real projects.",
    category: "General",
    date: "2026-03-11",
    popular: true,
    publishedOn: [
      { platform: "devto", url: "https://dev.to/tahsinature/easy-explanation-of-coding-principles-understand-key-concepts-in-simple-terms-32h1" },
      { platform: "medium", url: "https://tahsinature.medium.com/easy-explanation-of-coding-principles-understand-key-concepts-in-simple-terms-fc73168ecf27" },
    ],
    resources: {
      note: "Go deeper into software design principles with these resources.",
      links: [
        { label: "Coding Principles Repository", url: "https://github.com/tahsinature/coding-principles", description: "Python examples for every principle covered in this article" },
        { label: "SOLID Principles on Wikipedia", url: "https://en.wikipedia.org/wiki/SOLID", description: "The foundational five object-oriented design principles" },
        { label: "Clean Code by Robert C. Martin", url: "https://www.oreilly.com/library/view/clean-code-a/9780136083238/", description: "The classic book on writing maintainable software" },
      ],
    },
  },
  {
    slug: "ansible-fleet-kubernetes-platform",
    title: "Ansible + K3s: A Lightweight Kubernetes Platform That Actually Scales",
    description:
      "A practical, battle-tested approach to running multiple web applications on Kubernetes — without the cloud bill or the complexity of enterprise tooling. Ansible orchestrates everything over SSH: K3s clusters, secrets, dotfiles, and app deployments.",
    category: "General",
    date: "2026-03-11",
    popular: true,
    resources: {
      note: "Dive deeper into the tools and concepts covered in this article.",
      links: [
        { label: "Ansible Documentation", url: "https://docs.ansible.com/", description: "Official Ansible docs — inventory, playbooks, roles, and vault" },
        { label: "K3s Documentation", url: "https://docs.k3s.io/", description: "Lightweight Kubernetes — installation, configuration, and networking" },
        { label: "Doppler Secrets Management", url: "https://www.doppler.com/", description: "Universal secrets manager with Kubernetes integration" },
        { label: "Flux CD", url: "https://fluxcd.io/", description: "GitOps toolkit for Kubernetes — automate deployments on git push" },
      ],
    },
  },
  {
    slug: "grpc-the-speed-of-binary",
    title: "gRPC: The Speed of Binary",
    description:
      "I built two microservices and benchmarked gRPC against REST — the results were staggering. Up to 12x faster at scale. In this post, I break down the experiment, share the numbers, and explore when gRPC is the right choice for your architecture.",
    category: "General",
    date: "2026-03-11",
    popular: true,
    resources: {
      note: "Want to go deeper into gRPC and Protocol Buffers? Here are some resources I'd recommend.",
      links: [
        { label: "gRPC Official Documentation", url: "https://grpc.io/docs/", description: "The official guide covering all languages and concepts" },
        { label: "Protocol Buffers Language Guide", url: "https://protobuf.dev/programming-guides/proto3/", description: "Proto3 syntax and best practices" },
        { label: "My gRPC Demonstration Repo", url: "https://github.com/tahsinature/grpc-demonstration", description: "The full source code for the experiment in this post" },
        { label: "Connect by Buf", url: "https://connectrpc.com/", description: "A modern, browser-native alternative to gRPC-Web" },
      ],
    },
  },
  {
    slug: "the-const-deception",
    title: 'The "const" Deception',
    description:
      "Exploring the difference between assignment and mutation in JavaScript. The `const` keyword is not what it seems — it doesn't make things constant! In this tutorial, we'll dig into the difference between reassignment and mutation, and build a better mental model for how variables work in JavaScript.",
    category: "JavaScript",
    date: "2026-02-10",
    popular: true,
    resources: {
      note: "JavaScript is a wonderful-yet-confusing language, and I think it might be quite useful to explore some additional resources on this topic.",
      links: [
        { label: "Just JavaScript", url: "https://justjavascript.com", description: "A wonderful mental-model-first approach to learning JavaScript by Dan Abramov" },
        { label: "You Don't Know JS", url: "https://github.com/getify/You-Dont-Know-JS", description: "An excellent deep dive into the mechanics of JavaScript" },
        { label: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const", description: "The official documentation on const" },
      ],
    },
  },
];

export const categories = ["CSS", "React", "Animation", "Career", "JavaScript", "SVG", "Next.js", "General"];
