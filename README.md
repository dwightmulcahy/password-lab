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

The password itself stays in the browser.

The optional Pwned Passwords lookup is performed only after the password field loses focus. The browser computes SHA-1 locally and sends only the first 5 hash characters to the Pwned Passwords range API with response padding enabled. The password and full hash are never transmitted.

The deployed page has no runtime dependency on npm or a JavaScript CDN. zxcvbn-ts and its dictionaries are bundled into the site during the build.

At runtime, the only optional third-party request is:

- `api.pwnedpasswords.com` when a breach lookup is performed

There are no analytics, advertising networks, tracking pixels, tag managers, or remote fonts.

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
docker compose up -d --build
```

Open `http://localhost:8080`.

Health check:

```text
http://localhost:8080/healthz
```

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
  app.js               application logic
  attack-rates.js      attack-rate assumptions
  i18n.js              translations
  styles.css            UI styles
src/
  zxcvbn-entry.js       pinned local zxcvbn entry
tools/
  build-web.mjs         production bundle builder
  build-offline.mjs     offline bundle builder
tests/
  test_no_trackers.py   network/privacy guardrail
Dockerfile
nginx.conf
docker-compose.yml
```

## Validation

```bash
node --check assets/app.js
node --check assets/i18n.js
node --check assets/attack-rates.js
node --check src/zxcvbn-entry.js
pytest -q tests/test_*.py
npm run build:web
```

GitHub Actions builds the local bundle, runs the browser smoke test, builds the offline edition, and builds the Docker image after the repository is pushed.

## Push to GitHub later

Create an empty GitHub repository, then from this directory:

```bash
git remote add origin git@github.com:dwightmulcahy/password-lab.git
git push -u origin main
```

No Git tags or automatic release tagging are created by this project.

## Security

See `SECURITY.md`. Do not include real passwords or credentials in issues, screenshots, test fixtures, or pull requests.
