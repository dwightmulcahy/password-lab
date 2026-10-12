(() => {
  const STRINGS = {
    en: { separator: "Separator", entropy: "Generator entropy", words: "words", bitsPerWord: "bits/word", source: "EFF 7,776-word list", recommend: "6+ words recommended" },
    es: { separator: "Separador", entropy: "Entropía del generador", words: "palabras", bitsPerWord: "bits/palabra", source: "lista EFF de 7.776 palabras", recommend: "se recomiendan 6+ palabras" },
    pt: { separator: "Separador", entropy: "Entropia do gerador", words: "palavras", bitsPerWord: "bits/palavra", source: "lista EFF de 7.776 palavras", recommend: "6+ palavras recomendadas" },
    fr: { separator: "Séparateur", entropy: "Entropie du générateur", words: "mots", bitsPerWord: "bits/mot", source: "liste EFF de 7 776 mots", recommend: "6+ mots recommandés" },
    de: { separator: "Trennzeichen", entropy: "Generator-Entropie", words: "Wörter", bitsPerWord: "Bits/Wort", source: "EFF-Liste mit 7.776 Wörtern", recommend: "6+ Wörter empfohlen" }
  };

  function language() {
    const lang = (document.documentElement.lang || "en").toLowerCase();
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("de")) return "de";
    return "en";
  }

  function secureIndex(max) {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % max;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const password = document.getElementById("password");
    const panel = document.getElementById("generatorPanel");
    const mode = document.getElementById("generatorMode");
    const size = document.getElementById("generatorSize");
    const create = document.getElementById("generatorCreate");
    const copy = document.getElementById("generatorCopy");
    const grid = panel?.querySelector(".generator-grid");
    const words = Array.isArray(window.PASSPHRASE_WORDS) ? window.PASSPHRASE_WORDS : [];

    if (!password || !panel || !mode || !size || !create || !copy || !grid) return;
    if (words.length < 7000) {
      console.error(`Passphrase word list unavailable or unexpectedly small (${words.length} entries).`);
      return;
    }

    const separatorLabel = document.createElement("label");
    separatorLabel.id = "generatorSeparatorLabel";
    const separatorText = document.createElement("span");
    separatorText.id = "generatorSeparatorText";
    const separator = document.createElement("select");
    separator.id = "generatorSeparator";
    separator.setAttribute("aria-label", "Passphrase separator");
    separator.innerHTML = [
      ["-", "-  hyphen"],
      [" ", "space"],
      ["_", "_  underscore"],
      [".", ".  period"]
    ].map(([value, label]) => `<option value="${value === " " ? "&#32;" : value}">${label}</option>`).join("");
    separator.value = "-";
    separatorLabel.append(separatorText, separator);

    const entropy = document.createElement("div");
    entropy.id = "generatorEntropy";
    entropy.className = "note";
    entropy.style.gridColumn = "1 / -1";
    entropy.setAttribute("aria-live", "polite");

    grid.append(separatorLabel, entropy);

    const isPassphrase = () => mode.value === "passphrase";
    const clampWords = () => Math.min(12, Math.max(4, Number(size.value) || 6));

    function render() {
      const text = STRINGS[language()];
      const passphrase = isPassphrase();
      separatorLabel.hidden = !passphrase;
      entropy.hidden = !passphrase;
      separatorText.textContent = `${text.separator}: `;
      separator.setAttribute("aria-label", text.separator);

      if (!passphrase) return;

      const count = clampWords();
      const bitsPerWord = Math.log2(words.length);
      const totalBits = count * bitsPerWord;
      entropy.textContent = `${text.entropy}: ${count} ${text.words} × ${bitsPerWord.toFixed(1)} ${text.bitsPerWord} ≈ ${totalBits.toFixed(1)} bits • ${text.source} • ${text.recommend}`;
    }

    function generatePassphrase() {
      const count = clampWords();
      const joiner = separator.value;
      password.value = Array.from({ length: count }, () => words[secureIndex(words.length)]).join(joiner);
      password.dispatchEvent(new Event("input", { bubbles: true }));
      password.focus();
      render();
    }

    mode.addEventListener("change", () => {
      const becomingPassphrase = isPassphrase();
      queueMicrotask(() => {
        if (becomingPassphrase) {
          size.min = "4";
          size.max = "12";
          size.value = "6";
        }
        render();
      });
    });

    size.addEventListener("input", render);
    size.addEventListener("change", render);
    separator.addEventListener("change", render);

    create.addEventListener("click", (event) => {
      if (!isPassphrase()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      generatePassphrase();
    }, true);

    copy.addEventListener("click", () => {
      if (isPassphrase() && !password.value) generatePassphrase();
    }, true);

    new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    render();
  });
})();
