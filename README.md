<p align="center">
  <img src="assets/password-lab-logo.png" alt="Password Strength Lab logo" width="180">
</p>

# Password Strength Lab

A browser-based password-strength and attack-scenario estimator built around zxcvbn-ts.

## Features

- Browser-local zxcvbn-ts password analysis
- English, Spanish, Portuguese, French, and German UI/dictionaries
- Browser-language detection, URL language selection, and saved manual preference
- Multiple configurable attack-rate scenarios with uncertainty ranges
- Pattern detection, score rationale, passphrase analysis, and human-vs-random heuristics
- Cryptographically secure password and passphrase generator
- Optional Have I Been Pwned Pwned Passwords lookup using k-anonymity
- Breached-password override so a compromised password is never presented as reassuringly strong
- zxcvbn-ts and all language dictionaries bundled locally at build time
- Dependency updates reviewed through Dependabot/CI rather than executed dynamically in visitors’ browsers
- Offline-capable bundled build
- Strict Content Security Policy and tracker-free network policy
- Responsive/mobile layout and accessibility improvements
- Docker deployment and health endpoint

## Privacy model

The password itself stays in the browser. Password-strength analysis, pattern detection, guess estimates, crack-time calculations, and password/passphrase generation all run locally.

The optional Pwned Passwords lookup runs with password analysis after Calculate, Enter, or the typing debounce completes. The browser computes SHA-1 locally and sends only the first 5 hash characters to the Pwned Passwords range API with response padding enabled. The password and full hash are never transmitted.

The deployed page has no runtime dependency on npm or a JavaScript CDN. zxcvbn-ts, its language dictionaries, and generator data are bundled into the site during the build.

At runtime, the only optional third-party request is:

- `api.pwnedpasswords.com` when a breach lookup is performed

There are no analytics, advertising networks, tracking pixels, tag managers, or remote fonts.

## Featured projects

The rotating Featured Project card on the About tab is sourced from the public GitHub list at `https://github.com/stars/dwightmulcahy/lists/featured`.

`npm run build:web`, `npm run build:offline`, and Docker builds refresh `assets/featured-projects.json` from that list before building. Repository descriptions and primary languages are filled from GitHub's public repository metadata. The browser reads only the generated local JSON file, so visitors do not make runtime requests to GitHub.

A committed snapshot is retained as a build fallback if GitHub is temporarily unavailable. CI requires a successful live sync so markup changes on GitHub cannot silently leave the production carousel stale.

## Run locally

Build the local bundle, then serve the generated `dist/` directory:

```bash
npm install
npm run build:web
python3 -m http.server 8080 -d dist
```

Then open `http://localhost:8080`.

## Docker

```bash
BUILD_SHA=$(git rev-parse --short=12 HEAD) BUILD_DATE=$(date -u +%FT%TZ) docker compose up -d --build
```

Open `http://localhost:8080`.

Health check:

```text
http://localhost:8080/health
```

It returns `{"healthy":true}`. Build metadata is available at `/build-info.json` and is also shown in the footer.

## Offline build

Install the pinned packages and build the offline edition:

```bash
npm install
npm run build:offline
```

The result is written under `offline/`. Local password analysis and generation work without network access. The Pwned Passwords check naturally requires a network connection.

## Language links

Share a page in a specific language with:

```text
?lang=en
?lang=es
?lang=pt
?lang=fr
?lang=de
```

Precedence is URL parameter → saved preference → browser language → English.

## Repository layout

```text
assets/
  app.js                    application logic
  attack-rates.js           attack-rate assumptions
  featured-projects.json    build-time GitHub Featured-list snapshot
  i18n.js                   translations
  privacy-ui.js             browser-local privacy copy and runtime labels
  styles.css                UI styles
src/
  zxcvbn-entry.js            pinned local zxcvbn entry
tools/
  build-web.mjs              production bundle builder
  build-web-privacy.mjs      privacy FAQ/build injection
  build-offline.mjs          offline bundle builder
  sync-featured-projects.mjs GitHub Featured-list build sync
tests/
  test_no_trackers.py        network/privacy guardrail
  test_privacy_build.py      privacy copy and layout regression coverage
Dockerfile
nginx.conf
docker-compose.yml
```

## Validation

```bash
npm install
npm run build:web
node --check assets/app.js
node --check assets/i18n.js
node --check assets/attack-rates.js
node --check assets/about.js
node --check assets/privacy-ui.js
node --check tools/build-web-privacy.mjs
node --check tools/sync-featured-projects.mjs
node --check src/zxcvbn-entry.js
pytest -q tests/test_*.py
```

GitHub Actions builds the local bundle and hardened Docker image, starts the container, verifies `/health`, then runs a real Chromium smoke test against that container.

No Git tags or automatic release tagging are created by this project.

## Security

See `SECURITY.md`. Do not include real passwords or credentials in issues, screenshots, test fixtures, or pull requests.

## License

Password Strength Lab is open-source software released under the MIT License. See `LICENSE` for the full terms.