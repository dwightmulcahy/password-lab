from pathlib import Path

REPO = Path(__file__).resolve().parents[1]


def test_eff_diceware_words_are_exposed():
    source = (REPO / "src" / "zxcvbn-entry.js").read_text(encoding="utf-8")
    assert "common.dictionary['diceware-common']" in source
    assert "window.PASSPHRASE_WORDS" in source


def test_passphrase_generator_uses_four_to_twelve_words():
    source = (REPO / "assets" / "passphrase-generator.js").read_text(encoding="utf-8")
    assert 'size.min = "4"' in source
    assert 'size.max = "12"' in source
    assert 'size.value = "6"' in source
    assert "Math.log2(words.length)" in source
    assert 'separator.id = "generatorSeparator"' in source


def test_web_build_includes_passphrase_enhancer():
    source = (REPO / "tools" / "build-web.mjs").read_text(encoding="utf-8")
    assert "assets/passphrase-generator.js" in source
