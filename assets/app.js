document.addEventListener("DOMContentLoaded", () => {

  const password = document.getElementById("password");
  const toggle = document.getElementById("toggle");
  const clearBtn = document.getElementById("clear");
  const generatorToggle = document.getElementById("generatorToggle");
  const generatorPanel = document.getElementById("generatorPanel");
  const generatorMode = document.getElementById("generatorMode");
  const generatorSize = document.getElementById("generatorSize");
  const generatorSymbols = document.getElementById("generatorSymbols");
  const generatorCreate = document.getElementById("generatorCreate");
  const meterFill = document.getElementById("meterFill");
  const strengthLabel = document.getElementById("strengthLabel");
  const scoreText = document.getElementById("scoreText");
  const guessCount = document.getElementById("guessCount");
  const entropyBits = document.getElementById("entropyBits");
  const originStat = document.getElementById("originStat");
  const lengthStat = document.getElementById("lengthStat");
  const scenarioList = document.getElementById("scenarioList");
  const attackUpdated = document.getElementById("attackUpdated");
  const patterns = document.getElementById("patterns");
  const passphraseInfo = document.getElementById("passphraseInfo");
  const feedback = document.getElementById("feedback");
  const breachStatus = document.getElementById("breachStatus");
  const securityAdvice = document.getElementById("securityAdvice");
  const scoreWhyBody = document.getElementById("scoreWhyBody");
  const customRate = document.getElementById("customRate");
  const customRateLabel = document.getElementById("customRateLabel");
  const customTime = document.getElementById("customTime");
  const libBadgeText = document.getElementById("libBadgeText");
  const libBadgeTip = document.getElementById("libBadgeTip");
  const langButtons = [...document.querySelectorAll(".lang-btn")];
  const networkGrid = document.getElementById("networkGrid");

  const I18N = window.I18N;

  const EXTRA_I18N = window.EXTRA_I18N;

  function detectBrowserLanguage() {
    const langs = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || "en"];
    for (const raw of langs) {
      const lang = String(raw).toLowerCase();
      if (lang.startsWith("es")) return "es";
      if (lang.startsWith("pt")) return "pt";
      if (lang.startsWith("fr")) return "fr";
      if (lang.startsWith("de")) return "de";
      if (lang.startsWith("en")) return "en";
    }
    return "en";
  }

  const urlLanguage = new URLSearchParams(location.search).get("lang");
  const savedLanguage = localStorage.getItem("passwordStrengthLanguage");
  let currentLanguage = ["en","es","pt","fr","de"].includes(urlLanguage)
    ? urlLanguage
    : (["en","es","pt","fr","de"].includes(savedLanguage) ? savedLanguage : detectBrowserLanguage());

  function tr(key) { return I18N[currentLanguage][key] ?? EXTRA_I18N[currentLanguage]?.[key] ?? key; }
  function activeLocale() {
    return {en:"en-US",es:"es-ES",pt:"pt-BR",fr:"fr-FR",de:"de-DE"}[currentLanguage] || "en-US";
  }


  function applyLanguage(lang) {
    currentLanguage = ["en","es","pt","fr","de"].includes(lang) ? lang : "en";
    localStorage.setItem("passwordStrengthLanguage", currentLanguage);
    const url = new URL(location.href);
    url.searchParams.set("lang", currentLanguage);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    const htmlLang = {en:"en",es:"es",pt:"pt-BR",fr:"fr",de:"de"}[currentLanguage] || "en";
    document.documentElement.lang = htmlLang;
    const modalLangGroup = document.querySelector(".modal-lang");
    const topLangGroup = document.querySelector(".language-toggle");
    const languageLabel = {en:"Language",es:"Idioma",pt:"Idioma",fr:"Langue",de:"Sprache"}[currentLanguage] || "Language";
    if (modalLangGroup) modalLangGroup.setAttribute("aria-label", languageLabel);
    if (topLangGroup) topLangGroup.setAttribute("aria-label", languageLabel);

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      const value = I18N[currentLanguage][key] ?? EXTRA_I18N[currentLanguage]?.[key];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (I18N[currentLanguage][key] != null) el.placeholder = I18N[currentLanguage][key];
    });

    langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === currentLanguage));
    [modalLangEn, modalLangEs, modalLangPt, modalLangFr, modalLangDe].forEach(btn => {
      if (btn) btn.classList.toggle("active", btn.dataset.lang === currentLanguage);
    });
    if (mobileLanguageSelect) mobileLanguageSelect.value = currentLanguage;
    if (modalLanguageSelect) modalLanguageSelect.value = currentLanguage;

    if (window.passwordEstimators) {
      window.passwordEstimator = window.passwordEstimators[currentLanguage];
    }

    toggle.textContent = password.type === "password" ? tr("show") : tr("hide");
    updateLibraryBadge();
    renderNetworkTrust();
    translateFaqBlocks();
    const footerText = document.getElementById("footerText");
    if (footerText) footerText.textContent = ({
      en:"Password Strength Lab • zxcvbn-ts auto-update enabled • Educational estimator • Do not paste a real password into a page you do not trust.",
      es:"Laboratorio de Fortaleza de Contraseñas • actualización automática de zxcvbn-ts activada • Estimador educativo • No pegues una contraseña real en una página que no sea de confianza.",
      pt:"Laboratório de Força de Senhas • atualização automática do zxcvbn-ts ativada • Estimador educativo • Não cole uma senha real em uma página em que você não confia.",
      fr:"Laboratoire de Robustesse des Mots de Passe • mise à jour automatique de zxcvbn-ts activée • Estimateur éducatif • Ne collez pas un vrai mot de passe sur une page non fiable.",
      de:"Passwortstärke-Labor • automatische zxcvbn-ts-Aktualisierung aktiviert • Lernwerkzeug • Geben Sie kein echtes Passwort auf einer nicht vertrauenswürdigen Seite ein."
    })[currentLanguage] || "";
    attackUpdated.textContent = `${tr("attackUpdated")}: ${ATTACK_ASSUMPTIONS_UPDATED}`;
    renderScenarios(lastResult ? Math.max(1, Number(lastResult.guesses) || 1) : null);
    renderBreachStatus();
    evaluate();
  }

  langButtons.forEach(btn => btn.addEventListener("click", () => applyLanguage(btn.dataset.lang)));
  [modalLangEn, modalLangEs, modalLangPt, modalLangFr, modalLangDe].forEach(btn => {
    if (btn) btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });
  mobileLanguageSelect?.addEventListener("change", () => applyLanguage(mobileLanguageSelect.value));
  modalLanguageSelect?.addEventListener("change", () => applyLanguage(modalLanguageSelect.value));

  function renderNetworkTrust() {
    networkGrid.innerHTML = `<strong>${tr("networkLocal")}</strong><span>${tr("networkLocalValue")}</span><strong>${tr("networkTransmit")}</strong><span>${tr("networkTransmitValue")}</span><strong>${tr("networkBreach")}</strong><span>${tr("networkBreachValue")}</span><strong>${tr("networkDeps")}</strong><span>${window.OFFLINE_BUILD ? "offline bundle" : tr("networkDepsValue")}</span>`;
  }

  function updateLibraryBadge() {
    const info = window.zxcvbnPackageInfo;
    if (!info) {
      libBadgeText.textContent = tr("updateChecking");
      libBadgeTip.textContent = tr("libTip");
      return;
    }
    const v = info.versions;
    const state = info.status === "updated" ? tr("updateActive") :
                  info.status === "major-blocked" ? tr("updateBlocked") : tr("updateFallback");
    let dateText = "";
    if (info.published?.core) {
      const d = new Date(info.published.core);
      dateText = ` • ${new Intl.DateTimeFormat(activeLocale(), {
        year:"numeric", month:"short", day:"numeric"
      }).format(d)}`;
    }
    libBadgeText.textContent = `zxcvbn-ts core ${v.core}${dateText} • ${state}`;
    libBadgeTip.textContent = `${tr("libTip")} core ${v.core}; common ${v.common}; ${({en:"en",es:"es-es",pt:"pt-br",fr:"fr",de:"de"}[currentLanguage])} ${v[currentLanguage]}.`;
  }

  function translateFaqBlocks() {
    const how = document.getElementById("howTable");
    const attack = document.getElementById("attackTable");
    const notes = document.getElementById("notesSection");
    if (!how || !attack || !notes) return;

    if (currentLanguage === "es") {
      how.innerHTML = `
        <thead><tr><th>Paso</th><th>Qué ocurre</th></tr></thead>
        <tbody>
          <tr><td>1. Detección de patrones</td><td>zxcvbn-ts busca palabras de diccionario, contraseñas comunes, nombres, fechas, repeticiones, secuencias, patrones de teclado y sustituciones l33t.</td></tr>
          <tr><td>2. Estimación de intentos</td><td>Encuentra una ruta de ataque de bajo costo y devuelve un número estimado de intentos.</td></tr>
          <tr><td>3. Vista de entropía</td><td>Esta página muestra <code>log2(intentos)</code> como “entropía de intentos”. Es una forma práctica de representar el número de intentos, no una prueba de que la contraseña fue generada aleatoriamente.</td></tr>
          <tr><td>4. Tiempo de descifrado</td><td><code>intentos estimados ÷ intentos por segundo</code>.</td></tr>
        </tbody>`;
      attack.previousElementSibling.textContent = "Estas tasas son escenarios, no hechos universales. Las velocidades reales dependen del algoritmo de hash, su configuración de costo, el hardware, el paralelismo y el presupuesto del atacante.";
      attack.innerHTML = `
        <thead><tr><th>Escenario</th><th>Tasa predefinida</th><th>Objetivo</th></tr></thead>
        <tbody>
          <tr><td>En línea, limitado</td><td>10/seg</td><td>Representa un inicio de sesión con límites de velocidad o bloqueos significativos.</td></tr>
          <tr><td>En línea, permisivo</td><td>1.000/seg</td><td>Representa un inicio de sesión mal protegido.</td></tr>
          <tr><td>Sin conexión, hash lento</td><td>100.000/seg</td><td>Escenario ilustrativo de menor velocidad. Argon2id, bcrypt, scrypt y PBKDF2 varían mucho según configuración y hardware.</td></tr>
          <tr><td>Sin conexión, hash rápido / GPU</td><td>10 mil millones/seg</td><td>Escenario ilustrativo con GPU y hash rápido.</td></tr>
          <tr><td>Equipo potente, hash rápido</td><td>500 mil millones/seg</td><td>Escenario de prueba exigente para hashes muy rápidos y hardware considerable.</td></tr>
        </tbody>`;
      notes.querySelectorAll("details")[0].innerHTML = `<summary>¿Por qué no mostrar un solo “tiempo para descifrar”?</summary><p class="note">Porque no existe una sola velocidad de ataque. Un inicio de sesión en línea puede limitarse a pocos intentos por segundo, mientras que un hash rápido robado puede atacarse muchísimo más rápido sin conexión.</p>`;
      notes.querySelectorAll("details")[1].innerHTML = `<summary>¿Por qué usar zxcvbn-ts?</summary><p class="note">Su ventaja principal es reconocer patrones como lo haría un atacante. Una contraseña como <code>P@ssw0rd123!</code> no debería recibir crédito completo por cada carácter solo por mezclar mayúsculas, minúsculas, números y símbolos.</p>`;
      notes.querySelectorAll("details")[2].innerHTML = `<summary>¿Una puntuación de 4 significa que es “segura”?</summary><p class="note">No. Significa que el estimador considera que es relativamente difícil de adivinar dentro de su modelo. Reutilización, phishing, malware, robo de credenciales y almacenamiento débil son riesgos separados.</p>`;
      notes.querySelectorAll("details")[3].innerHTML = `<summary>¿Qué debe hacer un sistema de inicio de sesión en producción?</summary><p class="note">Usar contraseñas únicas, MFA cuando corresponda, verificación de contraseñas filtradas, límites de velocidad y una configuración moderna de hash. OWASP recomienda actualmente Argon2id como primera opción, seguido de scrypt, bcrypt para sistemas heredados o PBKDF2 cuando se requiere FIPS.</p>`;
    } else if (currentLanguage === "pt") {
      how.innerHTML = `<thead><tr><th>Etapa</th><th>O que acontece</th></tr></thead><tbody>
        <tr><td>1. Detecção de padrões</td><td>zxcvbn-ts procura palavras de dicionário, senhas comuns, nomes, datas, repetições, sequências, padrões de teclado e substituições l33t.</td></tr>
        <tr><td>2. Estimativa de tentativas</td><td>Encontra uma rota de ataque de baixo custo e retorna um número estimado de tentativas.</td></tr>
        <tr><td>3. Entropia</td><td>Esta página mostra <code>log2(tentativas)</code> como entropia de tentativas.</td></tr>
        <tr><td>4. Tempo para quebrar</td><td><code>tentativas estimadas ÷ tentativas por segundo</code>.</td></tr></tbody>`;
      attack.previousElementSibling.textContent = "Estas taxas são cenários, não fatos universais. As velocidades reais dependem do algoritmo de hash, configurações de custo, hardware e orçamento do invasor.";
      attack.innerHTML = `<thead><tr><th>Cenário</th><th>Taxa</th><th>Objetivo</th></tr></thead><tbody>
        <tr><td>Online, limitado</td><td>10/seg</td><td>Login com limitação significativa.</td></tr>
        <tr><td>Online, permissivo</td><td>1.000/seg</td><td>Login online mal protegido.</td></tr>
        <tr><td>Offline, hash lento</td><td>100.000/seg</td><td>Cenário ilustrativo de hash lento.</td></tr>
        <tr><td>Offline, hash rápido / GPU</td><td>10 bilhões/seg</td><td>Cenário ilustrativo com GPU.</td></tr>
        <tr><td>Equipamento potente</td><td>500 bilhões/seg</td><td>Teste de estresse com hash muito rápido.</td></tr></tbody>`;
    } else if (currentLanguage === "fr") {
      how.innerHTML = `<thead><tr><th>Étape</th><th>Ce qui se passe</th></tr></thead><tbody>
        <tr><td>1. Détection des motifs</td><td>zxcvbn-ts recherche les mots de dictionnaire, mots de passe courants, noms, dates, répétitions, séquences, motifs clavier et substitutions l33t.</td></tr>
        <tr><td>2. Estimation des essais</td><td>Il trouve une stratégie d’attaque peu coûteuse et renvoie un nombre estimé d’essais.</td></tr>
        <tr><td>3. Entropie</td><td>Cette page affiche <code>log2(essais)</code> comme entropie des essais.</td></tr>
        <tr><td>4. Temps de cassage</td><td><code>essais estimés ÷ essais par seconde</code>.</td></tr></tbody>`;
      attack.previousElementSibling.textContent = "Ces taux sont des scénarios, pas des valeurs universelles. Les vitesses réelles dépendent du hachage, du matériel et du budget de l’attaquant.";
      attack.innerHTML = `<thead><tr><th>Scénario</th><th>Taux</th><th>Objectif</th></tr></thead><tbody>
        <tr><td>En ligne, limité</td><td>10/s</td><td>Connexion avec limitation significative.</td></tr>
        <tr><td>En ligne, permissif</td><td>1 000/s</td><td>Connexion en ligne mal protégée.</td></tr>
        <tr><td>Hors ligne, hachage lent</td><td>100 000/s</td><td>Scénario illustratif de hachage lent.</td></tr>
        <tr><td>Hors ligne, GPU</td><td>10 milliards/s</td><td>Scénario GPU illustratif.</td></tr>
        <tr><td>Configuration haut de gamme</td><td>500 milliards/s</td><td>Test de contrainte pour hachages très rapides.</td></tr></tbody>`;
    } else if (currentLanguage === "de") {
      how.innerHTML = `<thead><tr><th>Schritt</th><th>Was passiert</th></tr></thead><tbody>
        <tr><td>1. Mustererkennung</td><td>zxcvbn-ts sucht nach Wörterbuchwörtern, häufigen Passwörtern, Namen, Daten, Wiederholungen, Sequenzen, Tastaturmustern und l33t-Ersetzungen.</td></tr>
        <tr><td>2. Versuchsschätzung</td><td>Es findet einen kostengünstigen Angriffspfad und gibt eine geschätzte Anzahl von Versuchen zurück.</td></tr>
        <tr><td>3. Entropie</td><td>Diese Seite zeigt <code>log2(Versuche)</code> als Versuchsentropie.</td></tr>
        <tr><td>4. Knackzeit</td><td><code>geschätzte Versuche ÷ Versuche pro Sekunde</code>.</td></tr></tbody>`;
      attack.previousElementSibling.textContent = "Diese Raten sind Szenarien, keine universellen Fakten. Reale Geschwindigkeiten hängen vom Hash, der Hardware und dem Budget des Angreifers ab.";
      attack.innerHTML = `<thead><tr><th>Szenario</th><th>Rate</th><th>Zweck</th></tr></thead><tbody>
        <tr><td>Online, gedrosselt</td><td>10/s</td><td>Login mit deutlicher Begrenzung.</td></tr>
        <tr><td>Online, großzügig</td><td>1.000/s</td><td>Schlecht geschützter Online-Login.</td></tr>
        <tr><td>Offline, langsamer Hash</td><td>100.000/s</td><td>Beispiel für einen langsamen Hash.</td></tr>
        <tr><td>Offline, schneller Hash / GPU</td><td>10 Mrd./s</td><td>Beispielhaftes GPU-Szenario.</td></tr>
        <tr><td>High-End-System</td><td>500 Mrd./s</td><td>Stresstest für sehr schnelle Hashes.</td></tr></tbody>`;
    } else {
      how.innerHTML = `
        <thead><tr><th>Step</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td>1. Pattern matching</td><td>zxcvbn-ts searches for dictionary words, common passwords, names, dates, repeats, sequences, keyboard patterns and l33t substitutions.</td></tr>
          <tr><td>2. Guess estimate</td><td>It finds a low-cost attack path and returns an estimated number of guesses.</td></tr>
          <tr><td>3. Entropy view</td><td>This page shows <code>log2(guesses)</code> as “guess entropy.” It is a convenient representation of the guess count, not proof that the password was generated randomly.</td></tr>
          <tr><td>4. Crack time</td><td><code>estimated guesses ÷ guesses per second</code>.</td></tr>
        </tbody>`;
      attack.previousElementSibling.textContent = "These are deliberately presented as scenarios, not universal facts. Real rates depend on the hash algorithm, its cost settings, GPU/CPU hardware, parallelism, salts, peppers and the attacker’s budget.";
      attack.innerHTML = `
        <thead><tr><th>Scenario</th><th>Preset rate</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>Online, throttled</td><td>10/sec</td><td>Represents a login endpoint with meaningful throttling or lockouts.</td></tr>
          <tr><td>Online, permissive</td><td>1,000/sec</td><td>Represents a poorly protected online guessing endpoint.</td></tr>
          <tr><td>Offline, slow hash</td><td>100,000/sec</td><td>Illustrative lower-speed offline scenario. Actual Argon2id/bcrypt/PBKDF2 rates vary greatly with configuration and hardware.</td></tr>
          <tr><td>Offline, fast hash / GPU</td><td>10 billion/sec</td><td>Illustrative fast-hash GPU scenario.</td></tr>
          <tr><td>High-end fast-hash rig</td><td>500 billion/sec</td><td>Stress-test scenario for very fast hashes and substantial hardware.</td></tr>
        </tbody>`;
      notes.querySelectorAll("details")[0].innerHTML = `<summary>Why not show just one “time to crack”?</summary><p class="note">Because there is no single attacker speed. An online login can be limited to a handful of attempts per second, while a stolen fast password hash may be attacked vastly faster offline.</p>`;
      notes.querySelectorAll("details")[1].innerHTML = `<summary>Why use zxcvbn-ts?</summary><p class="note">Its core advantage is attacker-inspired pattern matching. A password such as <code>P@ssw0rd123!</code> should not receive full credit for every character merely because it contains upper/lowercase letters, numbers and symbols.</p>`;
      notes.querySelectorAll("details")[2].innerHTML = `<summary>Does a score of 4 mean “safe”?</summary><p class="note">No. It means the estimator considers it relatively difficult to guess under its model. Reuse, phishing, malware, credential theft, weak password storage and breached secrets are separate risks.</p>`;
      notes.querySelectorAll("details")[3].innerHTML = `<summary>What should a production login system do?</summary><p class="note">Use unique passwords, MFA where appropriate, breach screening, rate limiting, and a modern password-hashing configuration. OWASP currently recommends Argon2id first, with scrypt, bcrypt for legacy systems, or PBKDF2 where FIPS requirements apply.</p>`;
    }
  }

  const privacyModal = document.getElementById("privacyModal");
  const privacyAccept = document.getElementById("privacyAccept");
  const modalLangEn = document.getElementById("modalLangEn");
  const modalLangEs = document.getElementById("modalLangEs");
  const modalLangPt = document.getElementById("modalLangPt");
  const modalLangFr = document.getElementById("modalLangFr");
  const modalLangDe = document.getElementById("modalLangDe");
  const mobileLanguageSelect = document.getElementById("mobileLanguageSelect");
  const modalLanguageSelect = document.getElementById("modalLanguageSelect");
  const tabButtons = [...document.querySelectorAll(".tab-btn")];
  const tabPanels = {
    test: document.getElementById("tab-test"),
    faq: document.getElementById("tab-faq")
  };

  function activateTab(name) {
    Object.entries(tabPanels).forEach(([key, panel]) => {
      panel.hidden = key !== name;
    });
    tabButtons.forEach(btn => {
      const active = btn.dataset.tab === name;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    history.replaceState(null, "", name === "faq" ? "#faq" : "#test");
  }

  tabButtons.forEach(btn => btn.addEventListener("click", () => activateTab(btn.dataset.tab)));
  activateTab(location.hash === "#faq" ? "faq" : "test");

  let privacySeen = false;
  try { privacySeen = sessionStorage.getItem("passwordStrengthPrivacySeen") === "1"; } catch (e) {}
  if (!privacySeen) {
    privacyModal.hidden = false;
    setTimeout(() => (modalLanguageSelect || modalLangEn || privacyAccept)?.focus(), 0);
  }

  privacyModal.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = [...privacyModal.querySelectorAll("button,select,[tabindex]:not([tabindex='-1'])")].filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  privacyAccept.addEventListener("click", () => {
    privacyModal.hidden = true;
    try { sessionStorage.setItem("passwordStrengthPrivacySeen", "1"); } catch (e) {}
    password.focus();
  });

  const ATTACK_ASSUMPTIONS_UPDATED = window.ATTACK_ASSUMPTIONS_UPDATED;
  const ATTACK_CONFIG = window.ATTACK_CONFIG;
  const scenarios = Object.entries(ATTACK_CONFIG).map(([key, config]) => ({key, ...config}));

  let lastResult = null;

  function formatGuessParts(n) {
    if (!Number.isFinite(n)) return { plain: "∞", html: null };
    const locale = activeLocale();
    if (n < 1e6) return { plain: Math.round(n).toLocaleString(locale), html: null };
    const exp = Math.floor(Math.log10(n));
    const mantissa = n / Math.pow(10, exp);
    return {
      plain: `${mantissa.toFixed(2)} × 10^${exp}`,
      html: `<span class="guess-value">${mantissa.toFixed(2)} × 10<sup>${exp}</sup></span>`
    };
  }

  function formatRate(n) {
    if (!Number.isFinite(n)) return "—";
    const l = currentLanguage;
    const locale = activeLocale();
    const labels = {
      en:{b:"billion/sec",m:"million/sec",k:"thousand/sec",s:"/sec"},
      es:{b:"mil millones/seg",m:"millones/seg",k:"mil/seg",s:"/seg"},
      pt:{b:"bilhões/seg",m:"milhões/seg",k:"mil/seg",s:"/seg"},
      fr:{b:"milliards/s",m:"millions/s",k:"milliers/s",s:"/s"},
      de:{b:"Mrd./s",m:"Mio./s",k:"Tsd./s",s:"/s"}
    }[l];
    if (n >= 1e9) return `${(n/1e9).toLocaleString(locale,{maximumFractionDigits:2})} ${labels.b}`;
    if (n >= 1e6) return `${(n/1e6).toLocaleString(locale,{maximumFractionDigits:2})} ${labels.m}`;
    if (n >= 1e3) return `${(n/1e3).toLocaleString(locale,{maximumFractionDigits:2})} ${labels.k}`;
    return `${n.toLocaleString(locale)} ${labels.s}`;
  }

  function formatDuration(seconds) {
    const lang = currentLanguage;
    const words = {
      en:{unbounded:"effectively unbounded",lt:"< 1 second",year:["year","years"],day:["day","days"],hour:["hour","hours"],minute:["minute","minutes"],second:["second","seconds"],years:"years"},
      es:{unbounded:"efectivamente ilimitado",lt:"< 1 segundo",year:["año","años"],day:["día","días"],hour:["hora","horas"],minute:["minuto","minutos"],second:["segundo","segundos"],years:"años"},
      pt:{unbounded:"praticamente ilimitado",lt:"< 1 segundo",year:["ano","anos"],day:["dia","dias"],hour:["hora","horas"],minute:["minuto","minutos"],second:["segundo","segundos"],years:"anos"},
      fr:{unbounded:"pratiquement illimité",lt:"< 1 seconde",year:["an","ans"],day:["jour","jours"],hour:["heure","heures"],minute:["minute","minutes"],second:["seconde","secondes"],years:"ans"},
      de:{unbounded:"praktisch unbegrenzt",lt:"< 1 Sekunde",year:["Jahr","Jahre"],day:["Tag","Tage"],hour:["Stunde","Stunden"],minute:["Minute","Minuten"],second:["Sekunde","Sekunden"],years:"Jahre"}
    }[lang] || null;

    if (!Number.isFinite(seconds)) return words.unbounded;
    if (seconds < 1) return words.lt;
    const units = [
      [words.year[0],words.year[1],31557600],
      [words.day[0],words.day[1],86400],
      [words.hour[0],words.hour[1],3600],
      [words.minute[0],words.minute[1],60],
      [words.second[0],words.second[1],1]
    ];
    if (seconds / 31557600 >= 1e9) {
      const years = seconds / 31557600;
      const exp = Math.floor(Math.log10(years));
      const mantissa = years / Math.pow(10, exp);
      return `${mantissa.toFixed(2)} × 10^${exp} ${words.years}`;
    }
    for (const [one,many,size] of units) {
      if (seconds >= size) {
        const value = seconds / size;
        const rounded = value >= 100 ? Math.round(value) :
                        value >= 10 ? Math.round(value * 10) / 10 :
                        Math.round(value * 100) / 100;
        return `${rounded.toLocaleString(activeLocale())} ${rounded === 1 ? one : many}`;
      }
    }
    return words.lt;
  }

  function strengthMeta(score) {
    const colors = ["#ff5e66","#ff815e","#f6b943","#58a6ff","#2ed07f"];
    return {
      label: I18N[currentLanguage].strengths[score] || "Unknown",
      color: colors[score] || "#9fb1c7"
    };
  }

  function patternDetail(item) {
    const p = item.pattern || "unknown";
    if (p === "dictionary") {
      const src = item.dictionary_name ? ` in ${item.dictionary_name}` : "";
      const rank = item.rank ? ` • rank ${item.rank.toLocaleString()}` : "";
      return `Dictionary match${src}${rank}`;
    }
    if (p === "spatial") return `Keyboard pattern${item.graph ? " • " + item.graph : ""}`;
    if (p === "sequence") return `${item.ascending === false ? "Descending" : "Ascending"} sequence`;
    if (p === "repeat") return `Repeated pattern${item.base_token ? " • base: " + item.base_token : ""}`;
    if (p === "date") return "Date-like pattern";
    if (p === "regex") return item.regex_name ? `Recognized ${item.regex_name} pattern` : "Recognized pattern";
    if (p === "bruteforce") return "No cheaper known pattern; brute-force segment";
    return p;
  }

  function renderScenarios(guesses) {
    scenarioList.innerHTML = "";
    scenarios.forEach(s => {
      const row = document.createElement("div");
      row.className = "scenario";
      row.innerHTML = `
        <div>
          <div class="scenario-name ">${I18N[currentLanguage].scenarioNames[s.key]}</div>
          <div class="scenario-rate">${formatRate(s.rate)}</div>
        </div>
        <div class="scenario-time ">${guesses ? formatDuration(guesses / s.rate) : "—"}</div>
      `;
      scenarioList.appendChild(row);
    });
    renderCustom(guesses);
  }

  function renderCustom(guesses) {
    const rate = Math.max(1, Number(customRate.value) || 1);
    const locale = activeLocale();
    customRateLabel.textContent = `${Math.round(rate).toLocaleString(locale)} ${tr("gps")}`;
    const name = document.getElementById("customRateName");
    const result = document.getElementById("customResultName");
    const rateTip = document.getElementById("customRateTip");
    const resultTip = document.getElementById("customResultTip");
    if (name) name.textContent = tr("customRate");
    if (result) result.textContent = tr("customResult");
    if (rateTip) rateTip.textContent = tr("customRateTip");
    if (resultTip) resultTip.textContent = tr("customResultTip");
    customTime.innerHTML = guesses ? `${formatDuration(guesses / rate)}<div class="scenario-range">${tr("uncertainty")}: ${formatDuration(guesses/(rate*10))} – ${formatDuration(guesses/(rate/10))}</div>` : "—";
  }

  function renderPatterns(result) {
    patterns.innerHTML = "";
    const seq = result.sequence || [];
    if (!seq.length) {
      patterns.innerHTML = `<div class="note">${tr("noPattern")}</div>`;
      return;
    }
    seq.forEach(item => {
      const bits = item.guesses && item.guesses > 0 ? Math.log2(item.guesses) : null;
      const el = document.createElement("div");
      el.className = "pattern";
      el.innerHTML = `
        <span class="pill">${I18N[currentLanguage].patternLabels[item.pattern] || item.pattern || "pattern"}</span>
        <div>
          <div class="token">${escapeHtml(item.token || "")}</div>
          <div class="entropy">${escapeHtml(patternDetail(item))}</div>
        </div>
        <div class="entropy">${bits !== null ? bits.toFixed(1) + " bits" : ""}</div>
      `;
      patterns.appendChild(el);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function renderPassphrase(result, value) {
    const words = value.trim().split(/[\s_-]+/).filter(w => w.length >= 2);
    if (words.length < 3) { passphraseInfo.hidden = true; return; }
    const common = (result.sequence || []).filter(x => x.pattern === "dictionary").length >= Math.max(2, words.length - 1);
    passphraseInfo.hidden = false;
    passphraseInfo.innerHTML = `<strong>${tr("passphraseTitle")}: ${words.length} ${tr("passphraseWords")}</strong><br>${common ? tr("passphraseCommon") : tr("passphraseRandom")}`;
  }

  function classifyOrigin(result, value) {
    const patterned = (result.sequence || []).filter(x => x.pattern !== "bruteforce");
    if (!patterned.length && value.length >= 12) return tr("originRandom");
    if (patterned.some(x => ["dictionary","spatial","sequence","repeat","date","regex"].includes(x.pattern))) return tr("originHuman");
    return tr("originMixed");
  }

  function renderScoreWhy(result, value) {
    const patternsFound = (result.sequence || []).filter(x => x.pattern !== "bruteforce");
    const strong = value.length >= 16 ? `${tr("length")}: ${value.length}` : (result.guesses > 1e10 ? tr("estimatedGuesses") : tr("originMixed"));
    const weak = patternsFound.length ? `${patternsFound[0].pattern}: ${patternsFound[0].token}` : (value.length < 12 ? `${tr("length")}: ${value.length}` : tr("originMixed"));
    const next = breachState.status === "found" ? tr("breachAdvice") : (patternsFound.length ? tr("weakAdvice") : tr("goodAdvice"));
    scoreWhyBody.innerHTML = `<strong>${tr("scoreStrong")}:</strong> ${escapeHtml(strong)}<br><strong>${tr("scoreWeak")}:</strong> ${escapeHtml(weak)}<br><strong>${tr("scoreNext")}:</strong> ${escapeHtml(next)}`;
  }

  function renderFeedback(result) {
    const warning = result.feedback?.warning || "";
    const suggestions = result.feedback?.suggestions || [];
    if (!warning && !suggestions.length) {
      feedback.innerHTML = result.score >= 3
        ? `<div class="feedback feedback-good">${currentLanguage === "es" ? "Sin advertencias importantes de zxcvbn-ts. Esto no garantiza que la contraseña sea segura o única." : "No major zxcvbn-ts warning. That does not guarantee the password is safe or unique."}</div>`
        : "";
      return;
    }
    feedback.innerHTML = `
      <div class="feedback">
        ${warning ? `<strong>${escapeHtml(warning)}</strong>` : "<strong>Suggestions</strong>"}
        ${suggestions.length ? `<ul>${suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>` : ""}
      </div>
    `;
  }

  const PASSPHRASE_WORDS = "amber apple atlas bamboo beacon berry biscuit breeze cedar citrus cloud coral delta ember falcon fern forest galaxy garden harbor hazel island ivory jungle lemon lunar mango maple meadow meteor moss ocean olive orchid pebble pepper pine planet plume quartz raven river rocket sage shadow silver solar sparrow stone storm sunset tiger velvet willow winter zebra acorn alpine anchor apricot arctic badge banana basil basket beach birch blossom bridge bronze brook cactus canyon carrot castle cherry comet copper cotton creek dawn desert eagle earth elm feather field flame flute frost ginger globe grape hill honey iris jade kettle kiwi lagoon lantern leaf lilac lime marble mint moon mountain navy oak orange panda paper peach pearl plum pond poppy rain reef ridge rose ruby sand shell sky snow spruce".split(" ");

  function secureIndex(max) {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % max;
  }

  function generateRandomPassword(length, useSymbols) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789" + (useSymbols ? "!@#$%^&*()-_=+[]{};:,.?" : "");
    return Array.from({length}, () => alphabet[secureIndex(alphabet.length)]).join("");
  }

  function generatePassphrase(words) {
    return Array.from({length:words}, () => PASSPHRASE_WORDS[secureIndex(PASSPHRASE_WORDS.length)]).join("-");
  }

  function createGeneratedPassword() {
    const passphrase = generatorMode.value === "passphrase";
    const requested = Number(generatorSize.value) || (passphrase ? 10 : 20);
    const size = passphrase ? Math.min(12, Math.max(8, requested)) : Math.min(64, Math.max(12, requested));
    password.value = passphrase ? generatePassphrase(size) : generateRandomPassword(size, generatorSymbols.checked);
    password.dispatchEvent(new Event("input", {bubbles:true}));
    password.focus();
  }

  let breachState = {status:"idle", count:0};

  async function sha1Hex(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-1", data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("").toUpperCase();
  }

  function renderSecurityAdvice() {
    if (breachState.status === "found") securityAdvice.textContent = tr("breachAdvice");
    else if (lastResult && lastResult.score < 3) securityAdvice.textContent = tr("weakAdvice");
    else if (lastResult) securityAdvice.textContent = tr("goodAdvice");
    else securityAdvice.textContent = "";
  }

  function applyBreachOverride() {
    if (breachState.status !== "found") return;
    strengthLabel.textContent = tr("compromised");
    strengthLabel.style.color = "#ff5e66";
    meterFill.style.width = "100%";
    meterFill.style.background = "#ff5e66";
    scoreText.textContent = lastResult ? `${tr("score")} ${lastResult.score}/4 • ${tr("compromised")}` : tr("compromised");
  }

  function renderBreachStatus() {
    breachStatus.className = "breach-status";
    if (breachState.status === "checking") breachStatus.textContent = tr("breachChecking");
    else if (breachState.status === "safe") { breachStatus.classList.add("good"); breachStatus.textContent = tr("breachSafe"); }
    else if (breachState.status === "found") { breachStatus.classList.add("bad"); breachStatus.textContent = `${tr("breachFound")}: ${breachState.count.toLocaleString(activeLocale())}×`; }
    else if (breachState.status === "error") breachStatus.textContent = tr("breachError");
    else breachStatus.textContent = tr("breachIdle");
    renderSecurityAdvice();
    if (lastResult && password.value) renderScoreWhy(lastResult, password.value);
  }

  async function checkPwnedPassword() {
    const value = password.value;
    if (!value) { breachState={status:"idle",count:0}; renderBreachStatus(); return; }
    breachState={status:"checking",count:0}; renderBreachStatus();
    try {
      const hash = await sha1Hex(value);
      const prefix = hash.slice(0,5), suffix = hash.slice(5);
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {headers:{"Add-Padding":"true"}, cache:"no-store"});
      if (!response.ok) throw new Error(`HIBP ${response.status}`);
      const text = await response.text();
      let count = 0;
      for (const line of text.split(/\r?\n/)) {
        const [candidate, rawCount] = line.split(":");
        if (candidate === suffix) { count = Number(rawCount) || 0; break; }
      }
      breachState = count > 0 ? {status:"found",count} : {status:"safe",count:0};
    } catch (error) {
      console.warn("Pwned Passwords check failed", error);
      breachState={status:"error",count:0};
    }
    renderBreachStatus();
  }

  function evaluate() {
    const value = password.value;
    lengthStat.textContent = `${value.length} ${value.length === 1 ? tr("char") : tr("chars")}`;

    if (!value) {
      lastResult = null;
      meterFill.style.width = "0%";
      strengthLabel.textContent = tr("noPassword");
      strengthLabel.style.color = "";
      scoreText.textContent = `${tr("score")} —`;
      guessCount.textContent = "—";
      entropyBits.textContent = "—";
      originStat.textContent = "—";
      scoreWhyBody.textContent = "";
      patterns.innerHTML = `<div class="note">${tr("enterPattern")}</div>`;
      passphraseInfo.hidden = true;
      feedback.innerHTML = "";
      breachState={status:"idle",count:0}; renderBreachStatus();
      renderScenarios(null);
      return;
    }

    if (!window.passwordEstimator) {
      strengthLabel.textContent = tr("loading");
      strengthLabel.className = "loading";
      return;
    }

    const result = window.passwordEstimator.check(value);
    lastResult = result;
    const score = result.score;
    const meta = strengthMeta(score);
    const guesses = Math.max(1, Number(result.guesses) || 1);
    const bits = Math.log2(guesses);

    meterFill.style.width = `${(score + 1) * 20}%`;
    meterFill.style.background = meta.color;
    strengthLabel.textContent = meta.label;
    strengthLabel.style.color = meta.color;
    scoreText.textContent = `${tr("score")} ${score}/4`;
    const guessParts = formatGuessParts(guesses);
    if (guessParts.html) {
      guessCount.innerHTML = guessParts.html;
    } else {
      guessCount.textContent = guessParts.plain;
    }
    entropyBits.textContent = `${bits.toFixed(1)} ${tr("bits")}`;
    originStat.textContent = classifyOrigin(result, value);

    renderScenarios(guesses);
    renderPassphrase(result, value);
    renderPatterns(result);
    renderFeedback(result);
    renderScoreWhy(result, value);
    renderSecurityAdvice();
    applyBreachOverride();
  }

  password.addEventListener("input", () => { breachState={status:"idle",count:0}; renderBreachStatus(); evaluate(); });
  password.addEventListener("blur", checkPwnedPassword);
  generatorToggle.addEventListener("click", () => { generatorPanel.hidden = !generatorPanel.hidden; });
  generatorMode.addEventListener("change", () => { generatorSize.value = generatorMode.value === "passphrase" ? 10 : 20; generatorSize.min = generatorMode.value === "passphrase" ? 8 : 12; generatorSize.max = generatorMode.value === "passphrase" ? 12 : 64; });
  generatorCreate.addEventListener("click", createGeneratedPassword);
  customRate.addEventListener("input", () => renderCustom(lastResult ? Math.max(1, Number(lastResult.guesses) || 1) : null));

  toggle.addEventListener("click", () => {
    const show = password.type === "password";
    password.type = show ? "text" : "password";
    toggle.textContent = show ? tr("hide") : tr("show");
    password.focus();
  });

  clearBtn.addEventListener("click", () => {
    password.value = "";
    evaluate();
    password.focus();
  });

  renderScenarios(null);

  // CDN script is defer-loaded. Retry once shortly after DOMContentLoaded if needed.
  if (!window.passwordEstimator) {
    window.addEventListener("password-estimator-ready", () => {
      window.passwordEstimator = window.passwordEstimators[currentLanguage];
      updateLibraryBadge();
      evaluate();
    }, { once:true });
  } else {
    updateLibraryBadge();
  }

  window.addEventListener("password-estimator-error", () => {
    libBadgeText.textContent = tr("updateFallback");
  });

  applyLanguage(currentLanguage);
});
