# AI Agent Instructions

## Package Manager

- **Always use `bun`** — never `npm`, `yarn`, or `pnpm`.
  - Install: `bun add <package>`
  - Dev install: `bun add -d <package>`
  - Run scripts: `bun run <script>`
  - Execute: `bunx <command>`

## Project Conventions

- **Routing**: Blog post routes use `/post/:slug` (not `/blog/:slug`).
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. Use utility classes directly.
- **Components**: React functional components with TypeScript in `src/components/`.
- **Pages**: Page components live in `src/pages/`.
- **Data**: Static data/config in `src/data/` and `src/config/`.
- **Content**: Blog posts are MDX files at `src/content/<slug>/index.mdx`.
- **Path aliases**: Use `@/` to reference `src/` (e.g., `@/components/Header`).

## Code Style

- TypeScript strict mode.
- Prefer `const` and arrow functions.
- Use named exports for data/utilities; default exports for components/pages.
