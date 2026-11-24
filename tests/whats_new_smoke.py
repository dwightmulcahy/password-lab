#!/usr/bin/env python3
"""Browser smoke: the "What's new" dialog after an upgrade, under the site's strict CSP."""
import json
import os

from playwright.sync_api import sync_playwright

NOTES = {"current": "9.1.0", "repository": "dwightmulcahy/password-lab", "releases": [
    {"version": "9.1.0", "tag": "v9.1.0", "previous": "v9.0.0", "date": "2026-11-24", "internal": 1,
     "sections": [{"type": "feat", "title": "Features", "items": [{"text": "smoke-test feature (#5)", "sha": "a"}]}]},
    {"version": "9.0.0", "tag": "v9.0.0", "previous": None, "date": "2026-11-01", "internal": 0, "sections": []}]}


def main():
    base_url = os.environ.get("PASSWORD_LAB_BASE_URL", "http://127.0.0.1:18080")
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
        page.on("console", lambda m: errors.append(f"console: {m.text}") if m.type == "error" else None)
        page.route("**/changelog.json", lambda r: r.fulfill(content_type="application/json", body=json.dumps(NOTES)))
        page.add_init_script("if(!sessionStorage.seeded){localStorage.setItem('pwlab.seenVersion','9.0.0');sessionStorage.seeded=1}")
        page.goto(f"{base_url}/?lang=en", wait_until="domcontentloaded")
        dlg = page.locator("#wn-dlg")
        dlg.wait_for(state="visible", timeout=10000)
        assert "smoke-test feature" in dlg.inner_text()
        assert dlg.evaluate("d => getComputedStyle(d).position") == "fixed"  # styles loaded despite the CSP
        dlg.locator(".wn-ok").click()
        dlg.wait_for(state="hidden")
        assert page.evaluate("localStorage.getItem('pwlab.seenVersion')") == "9.1.0"
        page.reload(wait_until="domcontentloaded")
        page.wait_for_timeout(500)
        assert not page.locator("#wn-dlg[open]").count()
        page.locator("#versionBadge").focus()
        page.keyboard.press("Enter")
        dlg.wait_for(state="visible")
        browser.close()
    if errors:
        raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))
    print("what's new browser smoke test passed")


if __name__ == "__main__":
    main()
