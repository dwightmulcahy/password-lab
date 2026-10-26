FROM node:26.12.1-alpine3.24@sha256:40cd011b55415bc894e45b02fdd5a5dfde056921b7d23a64c74f80497af48797 AS build
WORKDIR /app
ARG BUILD_SHA=local
ARG BUILD_DATE=unknown
ARG BUILD_VERSION=dev
ARG PUBLIC_SITE_URL=https://passwordlab.dwights.dev
ENV BUILD_SHA=${BUILD_SHA} \
    BUILD_DATE=${BUILD_DATE} \
    BUILD_VERSION=${BUILD_VERSION} \
    PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build:web

FROM nginxinc/nginx-unprivileged:alpine@sha256:378d0c32f6562f7fd9629170797f57d2b953aa09be983b3daaf4809bb039ca00
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:8080/health | grep -q '"healthy":true' || exit 1
