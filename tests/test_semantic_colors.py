from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_semantic_color_assets_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    css = (DIST / "assets" / "semantic-colors.css").read_text(encoding="utf-8")
    js = (DIST / "assets" / "semantic-colors.js").read_text(encoding="utf-8")

    assert 'assets/semantic-colors.css' in html
    assert 'assets/semantic-colors.js' in html
    assert '--semantic-danger:#ff5d73' in css
    assert '--semantic-warning:#f6c453' in css
    assert '--semantic-info:#38bdf8' in css
    assert '--semantic-success:#34d399' in css
    assert '--semantic-analysis:#a78bfa' in css
    assert 'SCORE_STATES' in js
    assert "'semantic-danger'" in js
    assert "'semantic-success'" in js


def test_score_palette_uses_color_by_meaning():
    css = (ROOT / "assets" / "semantic-colors.css").read_text(encoding="utf-8")
    js = (ROOT / "assets" / "semantic-colors.js").read_text(encoding="utf-8")

    for state in ("danger", "caution", "warning", "info", "success"):
        assert f"#strengthLabel.semantic-{state}" in css
        assert f"#meterFill.semantic-{state}" in css

    assert "semantic-breached" in css
    assert "breachFound" in js
    assert "breachClean" in js
    assert ".breach-status.bad" in css
    assert ".breach-status.good" in css


def test_dark_theme_uses_brighter_layered_surfaces():
    css = (ROOT / "assets" / "semantic-colors.css").read_text(encoding="utf-8")

    assert "--panel:#102b45" in css
    assert "--panel2:#173a59" in css
    assert "linear-gradient(155deg,#071827 0%,#0a2035 46%,#091a2c 100%)" in css
    assert ".card{" in css
    assert ".scenario-card{" in css
    assert ".detected-card{" in css
    assert ".privacy-faq{" in css
    assert ".about-career{" in css
    assert ".stat:nth-child(1)" in css
    assert ".stat:nth-child(2)" in css
