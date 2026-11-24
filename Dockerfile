FROM node:26.13.1-alpine3.24@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5 AS build
WORKDIR /app
ARG BUILD_SHA=local
ARG BUILD_DATE=unknown
ARG BUILD_VERSION=dev
ARG PUBLIC_SITE_URL=https://password-lab.dwights.dev
# release notes for the "What's new" dialog (base64 JSON from scripts/build_changelog.py)
ARG CHANGELOG_B64=
ENV BUILD_SHA=${BUILD_SHA} \
    BUILD_DATE=${BUILD_DATE} \
    BUILD_VERSION=${BUILD_VERSION} \
    PUBLIC_SITE_URL=${PUBLIC_SITE_URL} \
    CHANGELOG_B64=${CHANGELOG_B64}
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build:web

FROM nginxinc/nginx-unprivileged:alpine@sha256:b5047b9b76845eac124358373c6852377c52e4b05834a47647e955dd91cb8f1e
# Apply Alpine security fixes not yet included in the pinned base image.
# Upstream digest remains immutable; Trivy enforces a clean final runtime.
USER root
RUN apk upgrade --no-cache
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080/health | grep -q '"healthy":true' || exit 1
