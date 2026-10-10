from pathlib import Path

APP = Path('assets/app.js').read_text(encoding='utf-8')


def test_language_controls_declared_before_apply_language():
    apply_pos = APP.index('function applyLanguage')
    for name in (
        'modalLangEn', 'modalLangEs', 'modalLangPt', 'modalLangFr', 'modalLangDe',
        'mobileLanguageSelect', 'modalLanguageSelect',
    ):
        decl = f'const {name} ='
        assert decl in APP, f'{name} declaration missing'
        assert APP.index(decl) < apply_pos, f'{name} must be initialized before applyLanguage'


def test_app_listeners_are_registered_after_language_controls():
    handler_pos = APP.index('langButtons.forEach(btn => btn.addEventListener')
    assert APP.index('const modalLangEn =') < handler_pos
    assert APP.index('const mobileLanguageSelect =') < handler_pos
