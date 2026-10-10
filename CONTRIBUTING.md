# Contributing

Use focused changes and conventional commit messages.

Before opening a pull request:

```bash
node --check assets/app.js
node --check assets/i18n.js
node --check assets/attack-rates.js
node --check assets/zxcvbn-loader.js
python3 tests/test_no_trackers.py
```

If npm dependencies are installed, also run:

```bash
npm run build:offline
```

Do not add analytics, ad networks, tracking pixels, remote fonts, or unrelated third-party network requests to the password-testing page.
