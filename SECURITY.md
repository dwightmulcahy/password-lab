# Security Policy

## Supported versions

Only the latest published stable release receives security updates.

## Reporting a vulnerability

Use [private vulnerability reporting](https://github.com/dwightmulcahy/password-lab/security/advisories/new)
when available. Otherwise, open a public issue requesting a private contact
channel **without including any vulnerability details or secrets**.

Include the affected version, environment, impact, and reproduction steps.
Do not test systems or accounts without permission.

## Password privacy

Password evaluation and generation are browser-local. **Never** include real
passwords, access tokens, hash data, browser profiles, or private screenshots
in reports or commits. The optional Pwned Passwords lookup uses k-anonymity:
only the first five characters of a locally calculated SHA-1 hash are sent.
No complete password or full hash is transmitted.

Never commit `.env` files, credentials, or production diagnostic captures.
