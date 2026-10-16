from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_logo_and_favicon_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    logo = DIST / "assets" / "password-lab-logo.png"

    assert logo.exists()
    assert logo.read_bytes().startswith(b"\x89PNG\r\n\x1a\n")
    assert '<link rel="icon" type="image/png" href="assets/password-lab-logo.png">' in html
    assert 'class="site-brand"' in html
    assert 'class="site-logo"' in html
    assert 'src="assets/password-lab-logo.png"' in html
    assert 'assets/brand.css' in html


def test_readme_uses_project_logo():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert (
        '<img src="https://raw.githubusercontent.com/dwightmulcahy/password-lab/main/assets/password-lab-logo.png" '
        'alt="Password Strength Lab logo" width="180">'
    ) in readme


def test_old_recreated_svg_is_not_used():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert "password-lab-logo.svg" not in html
    assert "password-lab-logo.svg" not in readme
