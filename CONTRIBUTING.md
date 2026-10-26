# Contributing

Use focused changes, Conventional Commit subjects, and never include real passwords
or credentials in screenshots, logs, test cases, issues, or pull requests.

## Local validation

Install the dependencies and run the same checks used by CI:

```bash
npm ci
find assets src tools -type f \( -name '*.js' -o -name '*.mjs' \) -print0 | xargs -0 -n1 node --check
python3 -m pip install -r requirements-dev.txt
ruff check . --select F
python3 -m pyflakes tests
npm run build:web
npm run build:offline
python3 -m pytest -q
docker compose -f docker-compose.yml config --quiet
docker compose -f docker-compose.qnap.yml config --quiet
```

For browser smoke tests, start the Docker container and run
`python3 tests/browser_smoke.py` and `python3 tests/about_smoke.py` with
`PASSWORD_LAB_BASE_URL` set to its HTTP address.

Do not introduce analytics, trackers, third-party scripts or font requests.
Only the explicitly optional Pwned Passwords k-anonymity lookup may contact a
third party at runtime. Keep QNAP's loopback binding intact.
