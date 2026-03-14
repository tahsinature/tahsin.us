# Build stage
FROM oven/bun:1.3 AS build

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

# Production stage
FROM oven/bun:1.3

RUN apt-get update && apt-get install -y tini curl gnupg ca-certificates

WORKDIR /app

COPY --from=build /app/scripts ./scripts
RUN ./scripts/install-doppler-inside-container.sh && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/tsconfig.json ./
COPY --from=build /app/tsconfig.server.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server ./server

EXPOSE 3000

ENTRYPOINT ["tini", "--"]
CMD ["./scripts/run-prod.sh"]
