"""The "What's new" dialog is wired into the web build (run `npm run build:web` first)."""
import base64
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_dialog_script_and_badge_trigger_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    assert ('<script src="assets/whats-new.js" data-src="changelog.json" '
            'data-css="assets/whats-new.css" data-key="pwlab.seenVersion" defer></script>') in html
    assert 'id="versionBadge" class="version-badge" data-whats-new role="button" tabindex="0"' in html
    assert (DIST / "assets" / "whats-new.js").is_file() and (DIST / "assets" / "whats-new.css").is_file()
    # the strict CSP has no 'unsafe-inline' for styles: the dialog must not need it
    assert "style-src 'self';" in html
    assert ".style." not in (DIST / "assets" / "whats-new.js").read_text(encoding="utf-8")


def test_dev_build_ships_an_empty_changelog():
    data = json.loads((DIST / "changelog.json").read_text(encoding="utf-8"))
    assert data["releases"] == [] and data["repository"] == "dwightmulcahy/password-lab"


def _changelog(env):
    js = ("import { changelogJson } from './tools/build-web-whats-new.mjs';"
          f"process.stdout.write(changelogJson({json.dumps(env)}, '1.2.3'));")
    return json.loads(subprocess.check_output(["node", "--input-type=module", "-e", js], cwd=ROOT, text=True))


def test_release_build_decodes_the_bundled_notes():
    notes = {"current": "1.2.3", "repository": "x/y", "releases": [{"version": "1.2.3", "sections": []}]}
    assert _changelog({"CHANGELOG_B64": base64.b64encode(json.dumps(notes).encode()).decode()}) == notes
    assert _changelog({})["current"] == "1.2.3"
