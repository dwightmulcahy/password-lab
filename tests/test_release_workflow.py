import re
from pathlib import Path

WORKFLOW = Path(".github/workflows/publish-docker.yml").read_text(encoding="utf-8")
CI = Path(".github/workflows/ci.yml").read_text(encoding="utf-8")


def test_release_only_runs_for_manual_semver_tags_and_reuses_validation():
    assert "tags: ['v*.*.*', '[0-9]*.*.*']" in WORKFLOW
    assert "uses: ./.github/workflows/ci.yml" in WORKFLOW
    assert 'git merge-base --is-ancestor "$GITHUB_SHA" origin/main' in WORKFLOW
    assert "Release tags must be M.m.p or vM.m.p" in WORKFLOW
    assert "workflow_call:" in CI


def test_release_runs_quality_and_all_tests_through_ci():
    assert "needs: verify" in WORKFLOW
    assert "needs: [verify, validate]" in WORKFLOW
    assert "ruff check . --select F" in CI
    assert "xargs -0 pyflakes" in CI
    assert "pytest -q" in CI
    assert "python3 tests/browser_smoke.py" in CI
    assert "python3 tests/about_smoke.py" in CI


def test_release_publishes_expected_dockerhub_semver_tags_and_protects_latest():
    assert "dwightmulcahy/password-lab" in WORKFLOW
    assert "type=semver,pattern={{major}}" in WORKFLOW
    assert "type=semver,pattern={{major}}.{{minor}}" in WORKFLOW
    assert "type=semver,pattern={{version}}" in WORKFLOW
    assert "type=raw,value=latest" in WORKFLOW
    assert WORKFLOW.count("needs.verify.outputs.is_latest == 'true'") == 3
    assert "sort -V" in WORKFLOW
    assert "secrets.DOCKERHUB_USERNAME" in WORKFLOW
    assert "secrets.DOCKERHUB_TOKEN" in WORKFLOW


def test_release_builds_multi_architecture_image():
    for action in ("setup-qemu-action", "setup-buildx-action", "build-push-action"):
        matches = re.findall(
            rf"(?m)^[ ]*uses:[ ]+docker/{re.escape(action)}@([0-9a-f]{{40}})[ ]+# v[0-9]+[ ]*$",
            WORKFLOW,
        )
        assert len(matches) == 1, f"Expected SHA-pinned docker/{action}"
    assert "platforms: linux/amd64,linux/arm64" in WORKFLOW
    assert "push: true" in WORKFLOW
    assert "provenance: mode=max" in WORKFLOW
    assert "sbom: true" in WORKFLOW


def test_github_release_uses_grouped_conventional_notes():
    assert "node tools/release-notes.mjs" in WORKFLOW
    assert "release-notes.md" in WORKFLOW
    assert "--notes-file release-notes.md" in WORKFLOW
    assert "--generate-notes" not in WORKFLOW
    assert "needs: [verify, validate, publish, offline]" in WORKFLOW
