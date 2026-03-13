---
name: use-bun-not-npm
description: User prefers bun over npm for all package management and script running
type: feedback
---

Always use `bun` instead of `npm` or `npx`. The user never uses npm.

**Why:** Strong preference for bun as their runtime and package manager.

**How to apply:** Use `bun install`, `bun add`, `bun run`, `bunx` instead of npm/npx equivalents. Scripts in package.json should use `bun`/`bunx` too.
