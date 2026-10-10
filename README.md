# Password Strength Lab

A browser-based password strength and attack-scenario estimator built around zxcvbn-ts.

## Current features

- Browser-local password analysis
- English, Spanish, Portuguese, French, and German UI/dictionaries
- Browser-language detection and manual language override
- Multiple configurable crack-time scenarios
- Pattern detection and explanatory feedback
- zxcvbn-ts compatible-version auto-update with pinned fallback

## Run locally

Open `index.html` directly in a modern browser, or serve the directory with any static web server.

## Docker

Build and run:

```bash
docker compose up -d --build
```

Then open `http://localhost:8080`. The health endpoint is `http://localhost:8080/healthz`.

## Privacy

Password analysis runs in the browser. Review the Network Activity section and privacy notice in the application before deploying publicly.

## Development

The repository intentionally has no Git tags or automatic release versioning.
