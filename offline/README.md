# Offline build

Run from the repository root:

```bash
npm install
npm run build:offline
```

This bundles the pinned zxcvbn-ts packages into `offline/zxcvbn-offline.js` and writes a self-contained application entry page to `offline/index.html`.

The Pwned Passwords breach lookup is an optional network feature and cannot operate without network access; all local zxcvbn analysis and password generation still work offline.
