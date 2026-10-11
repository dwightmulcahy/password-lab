from pathlib import Path

DOCKERFILE = Path('Dockerfile').read_text(encoding='utf-8')
COMPOSE = Path('docker-compose.yml').read_text(encoding='utf-8')
NGINX = Path('nginx.conf').read_text(encoding='utf-8')
BUILD = Path('tools/build-web.mjs').read_text(encoding='utf-8')


def test_container_runs_as_unprivileged_user():
    assert 'nginxinc/nginx-unprivileged:alpine' in DOCKERFILE
    assert 'USER 101:101' in DOCKERFILE
    assert 'cap_drop:' in COMPOSE and '- ALL' in COMPOSE
    assert 'no-new-privileges:true' in COMPOSE
    assert 'read_only: true' in COMPOSE


def test_health_endpoint_is_json_and_used_by_healthcheck():
    assert 'location = /health {' in NGINX
    assert '{"healthy":true}' in NGINX
    assert '127.0.0.1:8080/health' in DOCKERFILE
    assert '127.0.0.1:8080/health' in COMPOSE


def test_runtime_csp_only_allows_pwned_passwords_connection():
    assert "script-src 'self'" in NGINX
    assert "connect-src 'self' https://api.pwnedpasswords.com" in NGINX
    assert 'esm.sh' not in NGINX
    assert 'registry.npmjs.org' not in NGINX


def test_build_metadata_is_generated():
    assert 'build-info.json' in BUILD
    assert 'buildMeta' in BUILD
