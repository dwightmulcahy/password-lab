from pathlib import Path

CI = Path(".github/workflows/ci.yml").read_text(encoding="utf-8")
DEPENDABOT = Path(".github/dependabot.yml").read_text(encoding="utf-8")


def test_ci_uses_ruff_and_pyflakes():
    assert "pytest ruff pyflakes" in CI
    assert "ruff check ." in CI
    assert "xargs -0 pyflakes" in CI


def test_ci_runs_all_test_suites_as_gates():
    assert "pytest -q" in CI
    assert "python3 tests/browser_smoke.py" in CI
    assert "python3 tests/about_smoke.py" in CI
    assert "Verify health endpoint" in CI


def test_dependabot_covers_project_dependency_ecosystems():
    assert "package-ecosystem: npm" in DEPENDABOT
    assert "package-ecosystem: docker" in DEPENDABOT
    assert "package-ecosystem: github-actions" in DEPENDABOT
