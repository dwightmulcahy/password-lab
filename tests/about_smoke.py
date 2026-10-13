#!/usr/bin/env python3
import os

from playwright.sync_api import sync_playwright


def main():
    base_url = os.environ.get('PASSWORD_LAB_BASE_URL', 'http://127.0.0.1:18080')
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
        page.on("console", lambda msg: errors.append(f"console: {msg.text}") if msg.type == "error" else None)
        page.goto(f"{base_url}/?lang=en", wait_until="domcontentloaded")
        if page.locator("#privacyAccept").is_visible():
            page.locator("#privacyAccept").click()

        version = page.locator("#versionBadge")
        assert version.is_visible()
        assert version.inner_text().strip()

        about = page.locator('.tab-btn[data-tab="about"]')
        assert about.is_visible()
        about.click()
        assert page.locator("#tab-about").is_visible()
        assert not page.locator("#tab-test").is_visible()
        assert "password health" in page.locator("#tab-about").inner_text().lower()
        assert "shape security" in page.locator("#tab-about").inner_text().lower()
        assert "packetc programming" in page.locator("#tab-about").inner_text().lower()

        title = page.locator("#featuredTitle").inner_text()
        page.locator("#featuredNext").click()
        assert page.locator("#featuredTitle").inner_text() != title
        assert page.locator("#featuredLink").get_attribute("href").startswith("https://github.com/dwightmulcahy/")
        assert "/ 5" in page.locator("#featuredCount").inner_text()

        page.locator('.tab-btn[data-tab="test"]').click()
        assert page.locator("#tab-test").is_visible()
        assert not page.locator("#tab-about").is_visible()
        browser.close()

    if errors:
        raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))
    print("about browser smoke test passed")


if __name__ == "__main__":
    main()
