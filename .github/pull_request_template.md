## Summary

<!-- What changed and why? -->

## Validation

- [ ] `npm ci && npm run build:web && npm run build:offline` passes
- [ ] `ruff check . --select F && pytest -q` passes
- [ ] Local and QNAP Compose validation passes
- [ ] Docker health, browser smoke, and Trivy checks pass

## Security and compatibility

- [ ] Passwords still remain entirely browser-local.
- [ ] No analytics, trackers, remote fonts, or unrelated network requests were added.
- [ ] QNAP loopback / Hotpot route is unchanged (or documented).
- [ ] Documentation updated for any behavior changes.
- [ ] PR title follows Conventional Commits.
