(() => {
  const COPY = {
    en: {
      privacyFine: "All password-analysis code, language dictionaries, and generator data are bundled into Password Strength Lab at build time and run locally in your browser. No CDN or npm request is needed for password analysis.",
      updateFallback: "Bundled locally • pinned build",
      libTip: "zxcvbn-ts, language dictionaries, and generator data are compiled into this site at build time. The browser does not fetch the estimator from npm or a CDN.",
      privacyBreach: "The optional breach check runs with password analysis. Your browser computes SHA-1 locally and sends only the first 5 hash characters to Pwned Passwords; your password and full hash never leave the browser.",
      breachIdle: "Breach check runs with the next password analysis.",
      networkBreachValue: "Only the first 5 SHA-1 characters, when analysis runs",
      networkDepsValue: "Estimator, dictionaries, and generator data are bundled locally",
      privacyFaqTitle: "Privacy & browser-only design",
      privacyFaqSub: "Your password-strength calculation and generator are self-contained in this page.",
      privacyFaqQ1: "Does my password ever leave my browser?",
      privacyFaqA1: "No. Password strength analysis, pattern detection, guess estimates, crack-time calculations, and password/passphrase generation all happen locally. Password Strength Lab never receives or stores the password you type.",
      privacyFaqQ2: "Is the estimator downloaded from a CDN?",
      privacyFaqA2: "No. zxcvbn-ts, the language dictionaries, the EFF passphrase word list, and the application code are bundled into the site at build time. Password analysis has no runtime npm or CDN dependency.",
      privacyFaqQ3: "What leaves the browser during a breach check?",
      privacyFaqA3: "Only the optional Pwned Passwords lookup makes a third-party request. The browser hashes the password locally with SHA-1 and sends only the first 5 hash characters using the k-anonymity range API. The password and complete hash are never transmitted.",
      privacyFaqQ4: "Can Password Strength Lab work offline?",
      privacyFaqA4: "Yes. Strength analysis and the password/passphrase generator can run from the bundled files without an internet connection. Only the optional Pwned Passwords breach lookup needs network access.",
      footer: "Password Strength Lab • Browser-local analysis • Bundled estimator • Educational tool • Do not paste a real password into a page you do not trust.",
      bundled: "Bundled locally; no runtime CDN/npm dependency"
    },
    es: {
      privacyFine: "Todo el código de análisis, los diccionarios de idiomas y los datos del generador se incluyen en Password Strength Lab durante la compilación y se ejecutan localmente en tu navegador. El análisis no necesita CDN ni npm.",
      updateFallback: "Incluido localmente • versión fija",
      libTip: "zxcvbn-ts, los diccionarios y los datos del generador se compilan dentro del sitio. El navegador no descarga el estimador desde npm ni desde una CDN.",
      privacyBreach: "La consulta opcional de filtraciones se ejecuta con el análisis. El navegador calcula SHA-1 localmente y envía solo los primeros 5 caracteres del hash a Pwned Passwords; la contraseña y el hash completo nunca salen del navegador.",
      breachIdle: "La consulta de filtraciones se ejecuta con el próximo análisis.",
      networkBreachValue: "Solo los primeros 5 caracteres SHA-1 cuando se ejecuta el análisis",
      networkDepsValue: "Estimador, diccionarios y datos del generador incluidos localmente",
      privacyFaqTitle: "Privacidad y diseño solo en el navegador",
      privacyFaqSub: "El cálculo de fortaleza y el generador están contenidos en esta página.",
      privacyFaqQ1: "¿Mi contraseña sale del navegador?",
      privacyFaqA1: "No. El análisis de fortaleza, la detección de patrones, las estimaciones de intentos y tiempos, y la generación de contraseñas o frases se realizan localmente. Password Strength Lab no recibe ni guarda la contraseña que escribes.",
      privacyFaqQ2: "¿El estimador se descarga desde una CDN?",
      privacyFaqA2: "No. zxcvbn-ts, los diccionarios, la lista EFF para frases de contraseña y el código de la aplicación se incluyen durante la compilación. El análisis no depende de npm ni de una CDN en tiempo de ejecución.",
      privacyFaqQ3: "¿Qué sale del navegador durante la consulta de filtraciones?",
      privacyFaqA3: "Solo la consulta opcional a Pwned Passwords realiza una petición externa. El navegador calcula SHA-1 localmente y envía únicamente los primeros 5 caracteres del hash mediante la API de rango con k-anonimato. Nunca se transmiten la contraseña ni el hash completo.",
      privacyFaqQ4: "¿Password Strength Lab funciona sin conexión?",
      privacyFaqA4: "Sí. El análisis y el generador funcionan con los archivos incluidos sin conexión. Solo la consulta opcional de Pwned Passwords necesita acceso a la red.",
      footer: "Laboratorio de Fortaleza de Contraseñas • Análisis local en el navegador • Estimador incluido • Herramienta educativa.",
      bundled: "Incluido localmente; sin dependencia de CDN/npm en tiempo de ejecución"
    },
    pt: {
      privacyFine: "Todo o código de análise, dicionários de idiomas e dados do gerador são incluídos no Password Strength Lab durante a compilação e executados localmente no navegador. A análise não precisa de CDN nem npm.",
      updateFallback: "Incluído localmente • versão fixa",
      libTip: "zxcvbn-ts, dicionários e dados do gerador são compilados dentro do site. O navegador não baixa o estimador do npm nem de uma CDN.",
      privacyBreach: "A consulta opcional de vazamentos é executada com a análise. O navegador calcula SHA-1 localmente e envia apenas os 5 primeiros caracteres do hash ao Pwned Passwords; a senha e o hash completo nunca saem do navegador.",
      breachIdle: "A consulta de vazamentos é executada com a próxima análise.",
      networkBreachValue: "Apenas os 5 primeiros caracteres SHA-1 quando a análise é executada",
      networkDepsValue: "Estimador, dicionários e dados do gerador incluídos localmente",
      privacyFaqTitle: "Privacidade e funcionamento somente no navegador",
      privacyFaqSub: "O cálculo de força e o gerador ficam contidos nesta página.",
      privacyFaqQ1: "Minha senha sai do navegador?",
      privacyFaqA1: "Não. Análise de força, detecção de padrões, estimativas de tentativas e tempo e geração de senhas ou frases acontecem localmente. O Password Strength Lab não recebe nem armazena a senha digitada.",
      privacyFaqQ2: "O estimador é baixado de uma CDN?",
      privacyFaqA2: "Não. zxcvbn-ts, os dicionários, a lista EFF de frases e o código do aplicativo são incluídos durante a compilação. A análise não depende de npm nem CDN em tempo de execução.",
      privacyFaqQ3: "O que sai do navegador durante a consulta de vazamentos?",
      privacyFaqA3: "Somente a consulta opcional ao Pwned Passwords faz uma requisição externa. O navegador calcula SHA-1 localmente e envia apenas os 5 primeiros caracteres do hash pela API de intervalo com k-anonimato. A senha e o hash completo nunca são transmitidos.",
      privacyFaqQ4: "O Password Strength Lab funciona offline?",
      privacyFaqA4: "Sim. A análise e o gerador funcionam com os arquivos incluídos sem internet. Somente a consulta opcional ao Pwned Passwords precisa de rede.",
      footer: "Laboratório de Força de Senhas • Análise local no navegador • Estimador incluído • Ferramenta educacional.",
      bundled: "Incluído localmente; sem dependência de CDN/npm em tempo de execução"
    },
    fr: {
      privacyFine: "Tout le code d’analyse, les dictionnaires et les données du générateur sont intégrés à Password Strength Lab lors de la compilation et s’exécutent localement dans votre navigateur. L’analyse ne nécessite ni CDN ni npm.",
      updateFallback: "Intégré localement • version fixe",
      libTip: "zxcvbn-ts, les dictionnaires et les données du générateur sont compilés dans le site. Le navigateur ne télécharge pas l’estimateur depuis npm ou un CDN.",
      privacyBreach: "La recherche facultative de fuite s’exécute avec l’analyse. Le navigateur calcule SHA-1 localement et envoie seulement les 5 premiers caractères du hash à Pwned Passwords ; le mot de passe et le hash complet ne quittent jamais le navigateur.",
      breachIdle: "La recherche de fuite s’exécute avec la prochaine analyse.",
      networkBreachValue: "Seulement les 5 premiers caractères SHA-1 lors de l’analyse",
      networkDepsValue: "Estimateur, dictionnaires et données du générateur intégrés localement",
      privacyFaqTitle: "Confidentialité et fonctionnement dans le navigateur",
      privacyFaqSub: "Le calcul de robustesse et le générateur sont autonomes dans cette page.",
      privacyFaqQ1: "Mon mot de passe quitte-t-il le navigateur ?",
      privacyFaqA1: "Non. L’analyse de robustesse, la détection de motifs, les estimations d’essais et de temps ainsi que la génération se font localement. Password Strength Lab ne reçoit ni ne stocke le mot de passe saisi.",
      privacyFaqQ2: "L’estimateur est-il téléchargé depuis un CDN ?",
      privacyFaqA2: "Non. zxcvbn-ts, les dictionnaires, la liste EFF de phrases de passe et le code de l’application sont intégrés lors de la compilation. L’analyse ne dépend ni de npm ni d’un CDN à l’exécution.",
      privacyFaqQ3: "Qu’est-ce qui quitte le navigateur pendant la recherche de fuite ?",
      privacyFaqA3: "Seule la recherche facultative Pwned Passwords effectue une requête externe. Le navigateur calcule SHA-1 localement et envoie uniquement les 5 premiers caractères du hash via l’API de plage k-anonyme. Le mot de passe et le hash complet ne sont jamais transmis.",
      privacyFaqQ4: "Password Strength Lab fonctionne-t-il hors ligne ?",
      privacyFaqA4: "Oui. L’analyse et le générateur fonctionnent avec les fichiers intégrés sans connexion. Seule la recherche facultative Pwned Passwords nécessite le réseau.",
      footer: "Laboratoire de Robustesse des Mots de Passe • Analyse locale • Estimateur intégré • Outil éducatif.",
      bundled: "Intégré localement ; aucune dépendance CDN/npm à l’exécution"
    },
    de: {
      privacyFine: "Der gesamte Analysecode, die Sprachwörterbücher und Generatordaten werden beim Build in Password Strength Lab eingebettet und laufen lokal im Browser. Für die Passwortanalyse ist kein CDN- oder npm-Aufruf erforderlich.",
      updateFallback: "Lokal eingebettet • feste Build-Version",
      libTip: "zxcvbn-ts, Sprachwörterbücher und Generatordaten werden beim Build in die Website kompiliert. Der Browser lädt den Schätzer nicht von npm oder einem CDN.",
      privacyBreach: "Die optionale Leak-Prüfung läuft zusammen mit der Analyse. Der Browser berechnet SHA-1 lokal und sendet nur die ersten 5 Hash-Zeichen an Pwned Passwords; Passwort und vollständiger Hash verlassen den Browser nie.",
      breachIdle: "Die Leak-Prüfung läuft mit der nächsten Passwortanalyse.",
      networkBreachValue: "Nur die ersten 5 SHA-1-Zeichen bei der Analyse",
      networkDepsValue: "Schätzer, Wörterbücher und Generatordaten lokal eingebettet",
      privacyFaqTitle: "Datenschutz und reine Browser-Verarbeitung",
      privacyFaqSub: "Stärkeberechnung und Generator sind vollständig in dieser Seite enthalten.",
      privacyFaqQ1: "Verlässt mein Passwort den Browser?",
      privacyFaqA1: "Nein. Stärkeanalyse, Mustererkennung, Schätzungen der Versuche und Zeiten sowie die Generierung laufen lokal. Password Strength Lab empfängt oder speichert das eingegebene Passwort nicht.",
      privacyFaqQ2: "Wird der Schätzer von einem CDN geladen?",
      privacyFaqA2: "Nein. zxcvbn-ts, die Wörterbücher, die EFF-Passphrasenliste und der Anwendungscode werden beim Build eingebettet. Die Analyse hat keine Laufzeitabhängigkeit von npm oder einem CDN.",
      privacyFaqQ3: "Was verlässt den Browser bei der Leak-Prüfung?",
      privacyFaqA3: "Nur die optionale Pwned-Passwords-Abfrage stellt eine externe Anfrage. Der Browser berechnet SHA-1 lokal und sendet ausschließlich die ersten 5 Hash-Zeichen über die k-anonyme Range-API. Passwort und vollständiger Hash werden nie übertragen.",
      privacyFaqQ4: "Funktioniert Password Strength Lab offline?",
      privacyFaqA4: "Ja. Analyse und Generator funktionieren mit den eingebetteten Dateien ohne Internet. Nur die optionale Pwned-Passwords-Abfrage benötigt Netzwerkzugriff.",
      footer: "Passwortstärke-Labor • Lokale Browser-Analyse • Eingebetteter Schätzer • Lernwerkzeug.",
      bundled: "Lokal eingebettet; keine CDN/npm-Laufzeitabhängigkeit"
    }
  };

  for (const [lang, copy] of Object.entries(COPY)) {
    if (window.I18N?.[lang]) {
      Object.assign(window.I18N[lang], {
        privacyFine: copy.privacyFine,
        updateFallback: copy.updateFallback,
        libTip: copy.libTip,
      });
    }
    if (window.EXTRA_I18N?.[lang]) {
      Object.assign(window.EXTRA_I18N[lang], {
        privacyBreach: copy.privacyBreach,
        breachIdle: copy.breachIdle,
        networkBreachValue: copy.networkBreachValue,
        networkDepsValue: copy.networkDepsValue,
        privacyFaqTitle: copy.privacyFaqTitle,
        privacyFaqSub: copy.privacyFaqSub,
        privacyFaqQ1: copy.privacyFaqQ1,
        privacyFaqA1: copy.privacyFaqA1,
        privacyFaqQ2: copy.privacyFaqQ2,
        privacyFaqA2: copy.privacyFaqA2,
        privacyFaqQ3: copy.privacyFaqQ3,
        privacyFaqA3: copy.privacyFaqA3,
        privacyFaqQ4: copy.privacyFaqQ4,
        privacyFaqA4: copy.privacyFaqA4,
      });
    }
  }

  function activeLanguage() {
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('de')) return 'de';
    return 'en';
  }

  function setTextIfNeeded(element, value) {
    if (element && element.textContent !== value) element.textContent = value;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const footerText = document.getElementById('footerText');
    const networkGrid = document.getElementById('networkGrid');

    function syncStaticPrivacyCopy() {
      const copy = COPY[activeLanguage()] || COPY.en;
      setTextIfNeeded(footerText, copy.footer);
      const networkValues = networkGrid?.querySelectorAll('span');
      if (networkValues?.length >= 4) setTextIfNeeded(networkValues[3], copy.bundled);
    }

    if (footerText) new MutationObserver(syncStaticPrivacyCopy).observe(footerText, { childList: true, subtree: true, characterData: true });
    if (networkGrid) new MutationObserver(syncStaticPrivacyCopy).observe(networkGrid, { childList: true, subtree: true, characterData: true });
    new MutationObserver(syncStaticPrivacyCopy).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    syncStaticPrivacyCopy();
  });
})();
