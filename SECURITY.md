# Security Policy

This project handles password text only inside the visitor's browser.

Please do not include real passwords, credentials, API keys, or other secrets in bug reports or screenshots.

Security-sensitive reports should be sent privately to the repository owner rather than opened as public issues.

The optional Pwned Passwords lookup uses k-anonymity: the browser computes SHA-1 locally and sends only the first five hash characters after the password field loses focus. The password and complete hash are not sent.
