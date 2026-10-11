#!/usr/bin/env python3
import contextlib
import http.server
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
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=str(ROOT), **kwargs)
    server = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    errors = []
    try:
        with sync_playwright() as p:
            launch = {"headless": True, "args": ["--no-proxy-server", "--proxy-bypass-list=<-loopback>"]}
            # CI uses Playwright's managed Chromium; local environments may expose /usr/bin/chromium.
            if Path("/usr/bin/chromium").exists():
                launch["executable_path"] = "/usr/bin/chromium"
            browser = p.chromium.launch(**launch)
            page = browser.new_page()
            page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
            page.on("console", lambda msg: errors.append(f"console: {msg.text}") if msg.type == "error" else None)

            page.goto(f"http://127.0.0.1:{PORT}/?lang=en", wait_until="domcontentloaded")
            page.wait_for_function("window.__PASSWORD_LAB_BOOT_OK__ === true")
            page.locator("#privacyAccept").click()

            page.locator("#password").fill("TestPassword123!")
            page.locator("#scoreText").wait_for()
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

            browser.close()
    finally:
        server.shutdown()
        server.server_close()

    if errors:
        raise AssertionError("Browser console/page errors:\n" + "\n".join(errors))

    print("browser smoke test passed")


if __name__ == "__main__":
    main()
