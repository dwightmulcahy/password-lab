import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_external_actions_are_pinned_to_immutable_commit_shas():
    for path in (ROOT / ".github" / "workflows").glob("*.yml"):
        workflow = path.read_text(encoding="utf-8")
        for reference in re.findall(r"uses:\\s+([^\\s#]+)", workflow):
            if reference.startswith("./"):
                continue
            assert re.fullmatch(r"[^@]+@[0-9a-f]{40}", reference), (
                f"{path.name}: mutable action reference {reference}"
            )


def test_base_images_are_versioned_and_digest_pinned():
    dockerfile = (ROOT / "Dockerfile").read_text(encoding="utf-8")
    images = re.findall(r"^FROM\\s+(\\S+)", dockerfile, re.MULTILINE)
    assert len(images) == 2
    for image in images:
        assert re.fullmatch(r"[^:]+:[^@]+@sha256:[0-9a-f]{64}", image)


def test_ci_scans_the_built_image():
    workflow = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
    assert "aquasecurity/trivy-action@" in workflow
    assert "severity: CRITICAL,HIGH" in workflow
    assert "ignore-unfixed: true" in workflow
    assert "exit-code: '1'" in workflow


def test_qnap_retains_loopback_and_rotates_logs():
    compose = (ROOT / "docker-compose.qnap.yml").read_text(encoding="utf-8")
    assert '"127.0.0.1:${PASSWORD_LAB_HOST_PORT:-18081}:8080"' in compose
    assert "max-size: \"10m\"" in compose
    assert "max-file: \"3\"" in compose
    assert "read_only: true" in compose


def test_ci_and_docker_use_pinned_npm_lockfile():
    ci = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
    dockerfile = (ROOT / "Dockerfile").read_text(encoding="utf-8")
    assert (ROOT / "package-lock.json").exists()
    assert "npm ci" in ci
    assert "npm ci" in dockerfile
