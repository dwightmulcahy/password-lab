FROM node:22-alpine AS build
WORKDIR /app
ARG BUILD_SHA=local
ARG BUILD_DATE=unknown
ARG BUILD_VERSION=dev
ARG PUBLIC_SITE_URL=http://localhost:8080
ENV BUILD_SHA=${BUILD_SHA} \
    BUILD_DATE=${BUILD_DATE} \
    BUILD_VERSION=${BUILD_VERSION} \
    PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build:web

FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080/health | grep -q '"healthy":true' || exit 1
