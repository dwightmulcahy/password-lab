from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_logo_and_favicon_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    logo = DIST / "assets" / "password-lab-logo.svg"

    assert logo.exists()
    assert '<link rel="icon" type="image/svg+xml" href="assets/password-lab-logo.svg">' in html
    assert 'class="site-brand"' in html
    assert 'class="site-logo"' in html
    assert 'src="assets/password-lab-logo.svg"' in html
    assert 'assets/brand.css' in html


def test_readme_uses_project_logo():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert '<img src="assets/password-lab-logo.svg" alt="Password Strength Lab logo" width="180">' in readme


def test_logo_svg_contains_brand_elements():
    svg = (ROOT / "assets" / "password-lab-logo.svg").read_text(encoding="utf-8")
    assert "Password Strength Lab logo" in svg
    assert 'id="bar"' in svg
    assert 'id="lock"' in svg
    assert svg.count("<rect") >= 5
