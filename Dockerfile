# syntax=docker/dockerfile:1

# Build the static site
FROM node:24-trixie-slim AS build
WORKDIR /app

# Install dependencies first so they're cached when only content changes
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

# Only what Astro reads, so README/nginx edits don't trigger a rebuild
COPY astro.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src
# Astro's image cache: only new or changed images get re-encoded
RUN --mount=type=cache,target=/app/node_modules/.astro npm run build

# Serve dist/ with nginx (non-root, listens on 8080). Slim: no njs/geoip/image/xslt
# modules, which this config doesn't use.
FROM nginxinc/nginx-unprivileged:1.30-alpine-slim

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
