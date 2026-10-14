#!/usr/bin/env python3
import http.server
import os
import socketserver
import threading
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO / 'dist' if (REPO / 'dist' / 'index.html').exists() else REPO
PORT = 8765


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


def wait_for_text_contains(locator, expected, timeout_ms=5000):
    deadline = time.monotonic() + timeout_ms / 1000
    while time.monotonic() < deadline:
        if expected in locator.inner_text():
            return
        time.sleep(0.05)
    raise AssertionError(f"Timed out waiting for {locator} to contain {expected!r}; got {locator.inner_text()!r}")


def wait_for_input_value(locator, expected, timeout_ms=5000):
    deadline = time.monotonic() + timeout_ms / 1000
    while time.monotonic() < deadline:
        if locator.input_value() == expected:
            return
        time.sleep(0.05)
    raise AssertionError(f"Timed out waiting for {locator} value {expected!r}; got {locator.input_value()!r}")


def main():
    base_url = os.environ.get('PASSWORD_LAB_BASE_URL')
    server = None
    if not base_url:
        handler = lambda *args, **kwargs: QuietHandler(*args, directory=str(ROOT), **kwargs)
        server = socketserver.TCPServer(("127.0.0.1", PORT), handler)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base_url = f'http://127.0.0.1:{PORT}'

    errors = []
    try:
        with sync_playwright() as p:
            launch = {"headless": True}
            if Path("/usr/bin/chromium").exists() and not os.environ.get('CI'):
                launch["executable_path"] = "/usr/bin/chromium"
            browser = p.chromium.launch(**launch)
            page = browser.new_page()
            page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
            page.on("console", lambda msg: errors.append(f"console: {msg.text}") if msg.type == "error" else None)

            page.goto(f"{base_url}/?lang=en", wait_until="domcontentloaded")
            page.locator("#privacyAccept").wait_for(state="visible", timeout=5000)
            page.locator("#privacyAccept").click()

            # Typing should mark the analysis pending instead of calculating on every keystroke.
            page.locator("#password").fill("TestPassword123!")
            assert page.locator("#calculatePassword").is_visible()
            assert page.locator("#scoreText").inner_text() == "Score —"
            assert "pending" in page.locator("#strengthLabel").inner_text().lower()
            assert "16" in page.locator("#lengthStat").inner_text()

            # The button forces immediate analysis without requiring blur.
            page.locator("#calculatePassword").click()
            wait_for_text_contains(page.locator("#scoreText"), "/4")
            assert page.locator("#guessCount").inner_text() != "—"
            assert page.locator("#strengthLabel").inner_text() != "No password"

            # Leaving focus in the field still auto-calculates after the debounce delay.
            page.locator("#password").fill("AnotherPassword456!")
            assert page.locator("#scoreText").inner_text() == "Score —"
            wait_for_text_contains(page.locator("#scoreText"), "/4", timeout_ms=3000)
            assert page.evaluate("document.activeElement && document.activeElement.id") == "password"

            # Enter is an immediate keyboard shortcut for Calculate.
            page.locator("#password").fill("EnterShortcut789!")
            assert page.locator("#scoreText").inner_text() == "Score —"
            page.locator("#password").press("Enter")
            wait_for_text_contains(page.locator("#scoreText"), "/4")

            # Score explanation belongs with the displayed score.
            score_group = page.locator("#scoreWithExplanation")
            assert score_group.locator("#scoreText").count() == 1
            assert score_group.locator("#scoreWhy").count() == 1

            page.locator('.lang-btn[data-lang="es"]').click()
            assert page.locator("html").get_attribute("lang") == "es"
            assert "Prueba" in page.locator('label[for="password"]').inner_text()
            assert page.locator("#calculatePassword").inner_text() == "Calcular"

            # Generator lives under the password field with controls to its right on desktop.
            password_box = page.locator(".password-row").bounding_box()
            tools_box = page.locator("#generatorToolsRow").bounding_box()
            assert password_box and tools_box and tools_box["y"] > password_box["y"]

            page.locator("#generatorToggle").click()
            assert page.locator("#generatorPanel").is_visible()
            toggle_box = page.locator("#generatorToggle").bounding_box()
            panel_box = page.locator("#generatorPanel").bounding_box()
            assert toggle_box and panel_box and panel_box["x"] > toggle_box["x"]

            original = page.locator("#password").input_value()
            page.locator("#generatorCreate").click()
            generated = page.locator("#password").input_value()
            assert generated and generated != original
            wait_for_text_contains(page.locator("#scoreText"), "/4", timeout_ms=3000)

            page.locator("#generatorMode").select_option("passphrase")
            wait_for_input_value(page.locator("#generatorSize"), "6")
            assert page.locator("#generatorSize").get_attribute("min") == "4"
            assert page.locator("#generatorSize").get_attribute("max") == "12"
            assert page.evaluate("window.PASSPHRASE_WORDS.length") == 7776
            assert page.locator("#generatorSeparator").is_visible()
            assert "EFF" in page.locator("#generatorEntropy").inner_text()

            page.locator("#generatorSize").fill("4")
            page.locator("#generatorSeparator").select_option(".")
            page.locator("#generatorCreate").click()
            passphrase = page.locator("#password").input_value()
            assert len(passphrase.split(".")) == 4
            assert "51." in page.locator("#generatorEntropy").inner_text()
            wait_for_text_contains(page.locator("#scoreText"), "/4", timeout_ms=3000)

            # About uses the BrewWaterSolver-style Get in Touch card: featured project + developer links.
            page.locator('.tab-btn[data-tab="about"]').click()
            assert page.locator("#tab-about").is_visible()
            assert page.locator("#aboutContactHeading").inner_text() == "Get in Touch"
            assert page.locator(".about-contact-links .about-contact-link").count() == 5
            featured_box = page.locator(".about-featured").bounding_box()
            developer_box = page.locator(".about-developer").bounding_box()
            assert featured_box and developer_box and developer_box["x"] > featured_box["x"]
            assert " / 5" in page.locator("#featuredCount").inner_text()
            previous_title = page.locator("#featuredTitle").inner_text()
            page.locator("#featuredNext").click()
            assert page.locator("#featuredTitle").inner_text() != previous_title
            assert "linear-gradient" in page.evaluate(
                "getComputedStyle(document.querySelector('.about-contact'),'::before').backgroundImage"
            )

            build_meta = page.locator('#buildMeta').inner_text()
            assert 'Build' in build_meta
            browser.close()
    finally:
        if server:
            server.shutdown()
            server.server_close()

    if errors:
        raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))

    print("browser smoke test passed")


if __name__ == "__main__":
    main()
