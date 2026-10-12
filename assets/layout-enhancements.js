(() => {
  const ANALYSIS_DELAY_MS = 900;
  const TEXT = {
    en: { calculate: "Calculate", pending: "Analysis pending…", breachPending: "Breach check will run with analysis." },
    es: { calculate: "Calcular", pending: "Análisis pendiente…", breachPending: "La comprobación de filtraciones se ejecutará con el análisis." },
    pt: { calculate: "Calcular", pending: "Análise pendente…", breachPending: "A verificação de vazamentos será executada com a análise." },
    fr: { calculate: "Calculer", pending: "Analyse en attente…", breachPending: "La vérification des fuites s’exécutera avec l’analyse." },
    de: { calculate: "Berechnen", pending: "Analyse ausstehend…", breachPending: "Die Leak-Prüfung wird mit der Analyse ausgeführt." }
  };

  function language() {
    const lang = (document.documentElement.lang || "en").toLowerCase();
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("de")) return "de";
    return "en";
  }

  function internalEvent(type, options = {}) {
    const event = new Event(type, options);
    Object.defineProperty(event, "__passwordLabCalculate", { value: true });
    return event;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const passwordRow = document.querySelector(".password-row");
    const password = document.getElementById("password");
    const clearBtn = document.getElementById("clear");
    const generatorToggle = document.getElementById("generatorToggle");
    const generatorPanel = document.getElementById("generatorPanel");
    const strengthLabel = document.getElementById("strengthLabel");
    const scoreText = document.getElementById("scoreText");
    const lengthStat = document.getElementById("lengthStat");
    const breachStatus = document.getElementById("breachStatus");

    if (passwordRow && generatorToggle && generatorPanel && !document.getElementById("generatorToolsRow")) {
      const toolsRow = document.createElement("div");
      toolsRow.id = "generatorToolsRow";
      toolsRow.className = "generator-tools-row";
      passwordRow.insertAdjacentElement("afterend", toolsRow);
      toolsRow.append(generatorToggle, generatorPanel);
    }

    const strengthLine = document.querySelector(".strength-line");
    const scoreWhy = document.getElementById("scoreWhy");

    if (strengthLine && scoreText && scoreWhy && !document.getElementById("scoreWithExplanation")) {
      const scoreGroup = document.createElement("div");
      scoreGroup.id = "scoreWithExplanation";
      scoreGroup.className = "score-with-explanation";
      scoreText.replaceWith(scoreGroup);
      scoreWhy.classList.add("score-why-inline");
      scoreGroup.append(scoreText, scoreWhy);
    }

    if (!password || !passwordRow || !scoreText || !strengthLabel) return;

    const calculate = document.createElement("button");
    calculate.id = "calculatePassword";
    calculate.type = "button";
    calculate.className = "calculate-password";
    calculate.textContent = TEXT[language()].calculate;
    clearBtn?.insertAdjacentElement("afterend", calculate);

    let timer = null;
    let pending = false;

    function markPending() {
      const text = TEXT[language()];
      pending = Boolean(password.value);
      if (lengthStat) {
        const count = password.value.length;
        lengthStat.textContent = `${count} ${count === 1 ? "char" : "chars"}`;
      }
      if (!pending) return;
      strengthLabel.textContent = text.pending;
      strengthLabel.style.color = "";
      scoreText.textContent = "Score —";
      if (breachStatus) {
        breachStatus.className = "breach-status";
        breachStatus.textContent = text.breachPending;
      }
    }

    function runAnalysis() {
      if (timer) clearTimeout(timer);
      timer = null;
      pending = false;
      password.dispatchEvent(internalEvent("input", { bubbles: true }));
      if (password.value) password.dispatchEvent(internalEvent("blur"));
    }

    function scheduleAnalysis() {
      if (timer) clearTimeout(timer);
      markPending();
      if (!password.value) {
        runAnalysis();
        return;
      }
      timer = setTimeout(runAnalysis, ANALYSIS_DELAY_MS);
    }

    document.addEventListener("input", event => {
      if (event.target !== password || event.__passwordLabCalculate) return;
      event.stopPropagation();
      scheduleAnalysis();
    }, true);

    document.addEventListener("blur", event => {
      if (event.target !== password || event.__passwordLabCalculate) return;
      event.stopPropagation();
    }, true);

    calculate.addEventListener("click", runAnalysis);
    password.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        runAnalysis();
      }
    });

    new MutationObserver(() => {
      calculate.textContent = TEXT[language()].calculate;
      if (pending) markPending();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  });
})();
