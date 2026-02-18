# Build stage
FROM oven/bun:1.3 AS build

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# Production stage
FROM oven/bun:1.3

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

COPY <<'EOF' server.ts
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

export default {
  port: 3000,
  fetch: app.fetch,
};
EOF

RUN bun add hono

EXPOSE 3000

CMD ["bun", "server.ts"]
