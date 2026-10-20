import re
from pathlib import Path

WORKFLOW = Path(".github/workflows/publish-docker.yml").read_text(encoding="utf-8")


def test_release_only_runs_for_tags_and_waits_for_validation():
    assert "tags:\n      - '*'" in WORKFLOW
    assert "needs: validate" in WORKFLOW
    assert 'git merge-base --is-ancestor "$GITHUB_SHA" origin/main' in WORKFLOW
    assert "Release tags must be M.m.p or vM.m.p" in WORKFLOW


def test_release_runs_python_quality_and_all_test_gates():
    assert "pytest ruff pyflakes" in WORKFLOW
    assert "ruff check ." in WORKFLOW
    assert "xargs -0 pyflakes" in WORKFLOW
    assert "pytest -q" in WORKFLOW
    assert "python3 tests/browser_smoke.py" in WORKFLOW
    assert "python3 tests/about_smoke.py" in WORKFLOW


def test_release_publishes_expected_dockerhub_semver_tags():
    assert "dwightmulcahy/password-lab" in WORKFLOW
    assert "type=semver,pattern={{major}}" in WORKFLOW
    assert "type=semver,pattern={{major}}.{{minor}}" in WORKFLOW
    assert "type=semver,pattern={{version}}" in WORKFLOW
    assert "type=raw,value=latest" in WORKFLOW
    assert "secrets.DOCKERHUB_USERNAME" in WORKFLOW
    assert "secrets.DOCKERHUB_TOKEN" in WORKFLOW


def test_release_builds_multi_architecture_image():
    # Dependabot upgrades these actions independently. Verify the required
    # actions and supported minimum versions, not a frozen major release.
    for action, minimum_major in (
        ("setup-qemu-action", 3),
        ("setup-buildx-action", 3),
        ("build-push-action", 6),
    ):
        matches = re.findall(
            rf"(?m)^[ ]*uses:[ ]+docker/{re.escape(action)}@v([0-9]+)[ ]*$",
            WORKFLOW,
        )
        assert len(matches) == 1, f"Expected exactly one docker/{action} action"
        assert int(matches[0]) >= minimum_major

    assert "platforms: linux/amd64,linux/arm64" in WORKFLOW
    assert "push: true" in WORKFLOW


def test_github_release_uses_grouped_conventional_notes():
    assert "node tools/release-notes.mjs" in WORKFLOW
    assert "release-notes.md" in WORKFLOW
    assert "--notes-file release-notes.md" in WORKFLOW
    assert "--generate-notes" not in WORKFLOW
    assert "needs: [validate, publish]" in WORKFLOW
