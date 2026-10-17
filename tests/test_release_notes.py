import os
import subprocess
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "tools" / "release-notes.mjs"


def _git(repo: Path, *args: str) -> None:
    subprocess.run(["git", *args], cwd=repo, check=True, capture_output=True, text=True)


def _commit(repo: Path, subject: str, marker: str) -> None:
    change_file = repo / "changes.txt"
    with change_file.open("a", encoding="utf-8") as handle:
        handle.write(f"{marker}\n")
    _git(repo, "add", "changes.txt")
    _git(repo, "commit", "-m", subject)


def test_release_notes_group_conventional_commits(tmp_path: Path):
    repo = tmp_path / "repo"
    repo.mkdir()
    _git(repo, "init")
    _git(repo, "config", "user.name", "Password Lab CI")
    _git(repo, "config", "user.email", "ci@example.invalid")

    _commit(repo, "chore: initial snapshot", "initial")
    _git(repo, "tag", "v1.0.0")
    _commit(repo, "feat(ui): add color states", "feature")
    _commit(repo, "fix: correct score display", "fix")
    _commit(repo, "docs: explain privacy model", "docs")
    _commit(repo, "feat!: remove legacy mode", "breaking")
    _commit(repo, "Update project wording", "other")
    _git(repo, "tag", "v1.1.0")

    output = repo / "release-notes.md"
    env = os.environ.copy()
    env["GITHUB_REPOSITORY"] = "dwightmulcahy/password-lab"
    subprocess.run(
        ["node", str(SCRIPT), "v1.1.0", str(output)],
        cwd=repo,
        env=env,
        check=True,
        capture_output=True,
        text=True,
    )

    notes = output.read_text(encoding="utf-8")
    assert "Changes since **v1.0.0**." in notes
    assert "### ⚠️ Breaking Changes" in notes
    assert "remove legacy mode" in notes
    assert "### ✨ Features" in notes
    assert "**ui:** add color states" in notes
    assert "### 🐛 Fixes" in notes
    assert "correct score display" in notes
    assert "### 📝 Documentation" in notes
    assert "explain privacy model" in notes
    assert "### Other Changes" in notes
    assert "Update project wording" in notes
    assert "compare/v1.0.0...v1.1.0" in notes
