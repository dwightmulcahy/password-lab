#!/usr/bin/env python3
import os
import time

from playwright.sync_api import sync_playwright


def wait_for_featured_count(locator, timeout_ms=5000):
    deadline = time.monotonic() + timeout_ms / 1000
    while time.monotonic() < deadline:
        text = locator.inner_text().strip()
        if " / " in text:
            return text
        time.sleep(0.05)
    raise AssertionError(f"Timed out waiting for featured project count; got {locator.inner_text()!r}")


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

        count_text = wait_for_featured_count(page.locator("#featuredCount"))
        current, total = (int(value.strip()) for value in count_text.split("/"))
        assert 1 <= current <= total
        assert total >= 2

        title = page.locator("#featuredTitle").inner_text()
        page.locator("#featuredNext").click()
        assert page.locator("#featuredTitle").inner_text() != title
        assert page.locator("#featuredLink").get_attribute("href").startswith("https://github.com/")

        page.locator('.tab-btn[data-tab="test"]').click()
        assert page.locator("#tab-test").is_visible()
        assert not page.locator("#tab-about").is_visible()
        browser.close()

    if errors:
        raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))
    print("about browser smoke test passed")


if __name__ == "__main__":
    main()
