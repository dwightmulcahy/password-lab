from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_production_seo_metadata_is_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")

    assert "<title>Password Strength Checker & Passphrase Generator | Password Strength Lab</title>" in html
    assert (
        '<meta name="description" content="Test password strength, estimate cracking time across attack scenarios, '
        'check breached passwords, and generate secure passwords and passphrases—all in your browser." />'
    ) in html
    assert '<meta name="robots" content="index,follow,max-image-preview:large">' in html
    assert '<link rel="canonical" href="https://passwordlab.dwights.dev/">' in html
    assert '<meta property="og:type" content="website">' in html
    assert '<meta property="og:site_name" content="Password Strength Lab">' in html
    assert '<meta property="og:url" content="https://passwordlab.dwights.dev/">' in html
    assert '<meta property="og:locale" content="en_US">' in html
    assert '<meta name="twitter:card" content="summary">' in html
    assert html.count('rel="canonical"') == 1


def test_robots_and_sitemap_point_to_production_site():
    robots = (DIST / "robots.txt").read_text(encoding="utf-8")
    sitemap = (DIST / "sitemap.xml").read_text(encoding="utf-8")

    assert "User-agent: *" in robots
    assert "Allow: /" in robots
    assert "Sitemap: https://passwordlab.dwights.dev/sitemap.xml" in robots
    assert "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" in sitemap
    assert "<loc>https://passwordlab.dwights.dev/</loc>" in sitemap


def test_release_image_defaults_to_production_site_url():
    dockerfile = (ROOT / "Dockerfile").read_text(encoding="utf-8")
    assert "ARG PUBLIC_SITE_URL=https://passwordlab.dwights.dev" in dockerfile
