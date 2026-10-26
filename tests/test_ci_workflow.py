from pathlib import Path

CI = Path(".github/workflows/ci.yml").read_text(encoding="utf-8")
DEPENDABOT = Path(".github/dependabot.yml").read_text(encoding="utf-8")


def test_ci_uses_ruff_and_pyflakes():
    assert "ruff check . --select F" in CI
    assert "xargs -0 pyflakes" in CI
    assert "JS syntax + Ruff/Pyflakes" in CI


def test_ci_runs_all_test_suites_as_gates():
    assert "workflow_call:" in CI
    for job in ("lint:", "compose:", "build:", "test:", "docker-smoke:"):
        assert job in CI
    assert "pytest -q" in CI
    assert "python3 tests/browser_smoke.py" in CI
    assert "python3 tests/about_smoke.py" in CI
    assert "Verify health endpoint" in CI
    assert "aquasecurity/trivy-action@" in CI
    assert "severity: CRITICAL,HIGH" in CI


def test_dependabot_covers_project_dependency_ecosystems():
    for ecosystem in ("npm", "docker", "docker-compose", "github-actions", "pip"):
        assert f"package-ecosystem: {ecosystem}" in DEPENDABOT
