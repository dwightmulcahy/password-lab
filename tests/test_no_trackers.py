from pathlib import Path
import re

BUILT = Path('dist/index.html')
HTML = (BUILT if BUILT.exists() else Path('index.html')).read_text(encoding='utf-8').lower()

FORBIDDEN = [
    'googletagmanager', 'google-analytics', 'doubleclick', 'facebook.com/tr',
    'hotjar', 'segment.io', 'mixpanel', 'clarity.ms'
]

for marker in FORBIDDEN:
    assert marker not in HTML, f'unexpected tracker reference: {marker}'

ALLOWED_REMOTE_HOSTS = {
    'api.pwnedpasswords.com',
}

# Ordinary <a href> links do not make network requests unless a visitor clicks
# them. Exclude anchors so the guardrail stays focused on resources and runtime
# connections the page itself can initiate.
html_without_anchors = re.sub(r'<a\b[^>]*>', '', HTML)
hosts = set(re.findall(r'https://([a-z0-9.-]+)', html_without_anchors))
unexpected = hosts - ALLOWED_REMOTE_HOSTS
assert not unexpected, f'unexpected remote hosts: {sorted(unexpected)}'
