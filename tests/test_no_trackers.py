from pathlib import Path
import re

HTML = Path('index.html').read_text(encoding='utf-8').lower()

FORBIDDEN = [
    'googletagmanager', 'google-analytics', 'doubleclick', 'facebook.com/tr',
    'hotjar', 'segment.io', 'mixpanel', 'clarity.ms'
]

for marker in FORBIDDEN:
    assert marker not in HTML, f'unexpected tracker reference: {marker}'

ALLOWED_REMOTE_HOSTS = {
    'api.pwnedpasswords.com',
}

hosts = set(re.findall(r'https://([a-z0-9.-]+)', HTML))
unexpected = hosts - ALLOWED_REMOTE_HOSTS
assert not unexpected, f'unexpected remote hosts: {sorted(unexpected)}'
