from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def test_privacy_and_footer_layout_are_built():
    html = (DIST / "index.html").read_text(encoding="utf-8")

    assert 'id="privacyFaq"' in html
    assert 'assets/privacy-ui.js' in html

    main_end = html.index("</main>")
    network = html.index('class="network-trust"')
    footer = html.index('<footer class="wrap">')
    badge = html.index('id="libBadge"')

    assert main_end < network < footer
    assert footer < badge


def test_privacy_copy_describes_bundled_browser_local_analysis():
    script = (ROOT / "assets" / "privacy-ui.js").read_text(encoding="utf-8")

    assert "Password Strength Lab never receives or stores the password you type." in script
    assert "bundled into Password Strength Lab at build time" in script
    assert "Breach check runs with the next password analysis." in script
    assert "only the first 5 hash characters" in script
    assert "no runtime CDN/npm dependency" in script
