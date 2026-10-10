from pathlib import Path
import re

APP = Path(__file__).resolve().parents[1] / "assets" / "app.js"


def test_language_controls_are_declared_before_listener_registration():
    source = APP.read_text(encoding="utf-8")
    listener = source.index('langButtons.forEach(btn => btn.addEventListener')
    for name in (
        "modalLangEn",
        "modalLangEs",
        "modalLangPt",
        "modalLangFr",
        "modalLangDe",
        "mobileLanguageSelect",
        "modalLanguageSelect",
    ):
        declaration = re.search(rf"const {name}\s*=", source)
        assert declaration, f"missing declaration for {name}"
        assert declaration.start() < listener, f"{name} is used before initialization"


def test_password_input_listener_is_installed():
    source = APP.read_text(encoding="utf-8")
    assert 'password.addEventListener("input"' in source
    assert "evaluate();" in source
