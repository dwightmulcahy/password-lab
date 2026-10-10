from pathlib import Path

APP = Path('assets/app.js').read_text(encoding='utf-8')
LOADER = Path('assets/zxcvbn-loader.js').read_text(encoding='utf-8')


def test_app_does_not_read_local_storage_directly_during_startup():
    assert 'const savedLanguage = localStorage.getItem' not in APP
    assert 'localStorage.setItem("passwordStrengthLanguage"' not in APP
    assert 'function safeStorageGet' in APP
    assert 'function safeStorageSet' in APP


def test_loader_does_not_require_storage_access():
    assert 'const saved = localStorage.getItem' not in LOADER
    assert 'function safeStorageGet' in LOADER
    assert 'const saved = safeStorageGet("passwordStrengthLanguage")' in LOADER


def test_boot_marker_is_set_after_initialization():
    assert 'window.__PASSWORD_LAB_BOOT_OK__ = true;' in APP
