#!/usr/bin/env python3
import http.server
import os
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO / 'dist' if (REPO / 'dist' / 'index.html').exists() else REPO
PORT = 8765


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


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
            page.wait_for_function("window.__PASSWORD_LAB_BOOT_OK__ === true")
            page.locator("#privacyAccept").click()

            page.locator("#password").fill("TestPassword123!")
            page.wait_for_function("document.querySelector('#scoreText').textContent.includes('/4')")
            assert page.locator("#guessCount").inner_text() != "—"
            assert "16" in page.locator("#lengthStat").inner_text()
            assert page.locator("#strengthLabel").inner_text() != "No password"

            page.locator('.lang-btn[data-lang="es"]').click()
            assert page.locator("html").get_attribute("lang") == "es"
            assert "Prueba" in page.locator('label[for="password"]').inner_text()

            page.locator("#generatorToggle").click()
            assert page.locator("#generatorPanel").is_visible()
            original = page.locator("#password").input_value()
            page.locator("#generatorCreate").click()
            generated = page.locator("#password").input_value()
            assert generated and generated != original
            page.wait_for_function("document.querySelector('#scoreText').textContent.includes('/4')")

            page.locator("#generatorMode").select_option("passphrase")
            page.wait_for_function("document.querySelector('#generatorSize').value === '6'")
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
