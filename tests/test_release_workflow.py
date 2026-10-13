from pathlib import Path

WORKFLOW = Path('.github/workflows/publish-docker.yml').read_text(encoding='utf-8')


def test_release_only_runs_for_tags_and_waits_for_validation():
    assert "tags:\n      - '*'" in WORKFLOW
    assert 'needs: validate' in WORKFLOW
    assert 'git merge-base --is-ancestor "$GITHUB_SHA" origin/main' in WORKFLOW


def test_release_publishes_expected_dockerhub_tags():
    assert 'dwightmulcahy/password-lab' in WORKFLOW
    assert 'type=ref,event=tag' in WORKFLOW
    assert 'type=raw,value=latest' in WORKFLOW
    assert 'secrets.DOCKERHUB_USERNAME' in WORKFLOW
    assert 'secrets.DOCKERHUB_TOKEN' in WORKFLOW


def test_release_builds_multi_architecture_image():
    assert 'docker/setup-qemu-action@v3' in WORKFLOW
    assert 'docker/setup-buildx-action@v3' in WORKFLOW
    assert 'docker/build-push-action@v6' in WORKFLOW
    assert 'platforms: linux/amd64,linux/arm64' in WORKFLOW
    assert 'push: true' in WORKFLOW
