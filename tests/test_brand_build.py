from hashlib import sha256
from pathlib import Path
import struct


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
EXPECTED_LOGO_SHA256 = "3c4b0bcc80a7b97a8a3bfe30899104fe41745855260c8874a21cdf8b854d0a0e"
README_LOGO_URL = (
    "https://raw.githubusercontent.com/dwightmulcahy/password-lab/"
    "f64465e6a2893792172e54c0f2fde7d5414bb88e/assets/password-lab-logo.png"
)


def _assert_project_logo(path: Path):
    data = path.read_bytes()
    assert data.startswith(b"\x89PNG\r\n\x1a\n")
    width, height = struct.unpack(">II", data[16:24])
    assert (width, height) == (180, 180)
    assert len(data) == 4312
    assert sha256(data).hexdigest() == EXPECTED_LOGO_SHA256


def test_logo_and_favicon_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    source_logo = ROOT / "assets" / "password-lab-logo.png"
    built_logo = DIST / "assets" / "password-lab-logo.png"

    _assert_project_logo(source_logo)
    _assert_project_logo(built_logo)
    assert '<link rel="icon" type="image/png" href="assets/password-lab-logo.png">' in html
    assert 'class="site-brand"' in html
    assert 'class="site-logo"' in html
    assert 'src="assets/password-lab-logo.png"' in html
    assert 'assets/brand.css' in html


def test_readme_uses_project_logo():
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert f'<img src="{README_LOGO_URL}" alt="Password Strength Lab logo" width="180" height="180">' in readme


def test_old_recreated_svg_is_not_used():
    html = (DIST / "index.html").read_text(encoding="utf-8")
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    assert "password-lab-logo.svg" not in html
    assert "password-lab-logo.svg" not in readme
