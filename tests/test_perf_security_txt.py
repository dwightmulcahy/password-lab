from pathlib import Path

BUILD = Path('tools/build-web.mjs').read_text(encoding='utf-8')
NGINX = Path('nginx.conf').read_text(encoding='utf-8')
INDEX = Path('index.html').read_text(encoding='utf-8')


def test_zxcvbn_bundle_is_deferred():
    assert 'src="assets/zxcvbn-bundle.js" defer' in BUILD


def test_assets_revalidate_instead_of_no_store():
    assert '~^/assets/  "no-cache";' in NGINX
    assert 'add_header Cache-Control $pl_cache_control always;' in NGINX


def test_security_txt_served():
    assert "dist/.well-known/security.txt" in BUILD
    assert 'location = /.well-known/security.txt' in NGINX


def test_custom_rate_input_labelled():
    assert 'id="customRate"' in INDEX and 'aria-labelledby="customRateName"' in INDEX
