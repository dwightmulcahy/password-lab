(() => {
  const ABOUT_COPY = {
    en: {
      tab: 'About',
      introKicker: 'About Password Strength Lab',
      introTitle: 'Why password health matters to me',
      introBody: 'I believe good password health is one of the simplest, highest-leverage parts of everyday security. Strong, unique passwords or passphrases, a password manager, breach awareness, and multi-factor authentication can turn a lot of common credential attacks from easy wins into much harder problems. I built Password Strength Lab to make password guessability and attack assumptions easier to understand while keeping the password itself in your browser.',
      careerKicker: 'Security background',
      careerTitle: 'My cybersecurity background',
      careerP1: 'I’ve spent more than two decades as a software engineer, including cybersecurity work at Shape Security and F5. My work there has included maintaining and improving core security-engine software, developing product features, troubleshooting complex systems, CI/CD, and JavaScript analysis tooling.',
      careerP2: 'Earlier in my career I worked deeply in high-performance network packet processing and co-authored <em>packetC Programming</em>, which covers programming scalable network applications with security-focused language features and controlled memory access.',
      sourceKicker: 'Open source',
      sourceTitle: 'License & source',
      sourceBody: 'Password Strength Lab is open-source software released under the MIT License. You can inspect the source, run your own copy, report issues, or contribute through the public GitHub repository.',
      sourceGithub: 'View Password Lab on GitHub ↗',
      sourceLicense: 'MIT License ↗',
      contactTitle: 'Get in Touch',
      contactSubtitle: 'Explore active projects & developer credentials.',
      featuredLabel: 'Featured project',
      viewGithub: 'View on GitHub',
      githubProfile: 'GitHub Repository',
      linkedinProfile: 'LinkedIn Profile',
      dockerHub: 'Docker Hub Images',
      featuredNav: 'Featured project navigation',
      previous: 'Previous featured project',
      next: 'Next featured project',
    },
    es: {
      tab: 'Acerca de',
      introKicker: 'Acerca de Password Strength Lab',
      introTitle: 'Por qué me importa la salud de las contraseñas',
      introBody: 'Creo que una buena higiene de contraseñas es una de las formas más sencillas y efectivas de mejorar la seguridad cotidiana. Las contraseñas o frases de contraseña fuertes y únicas, un gestor de contraseñas, la atención a filtraciones y la autenticación multifactor pueden convertir muchos ataques comunes contra credenciales en problemas mucho más difíciles. Creé Password Strength Lab para hacer más comprensibles la capacidad de adivinar una contraseña y las suposiciones de ataque, manteniendo la contraseña en tu navegador.',
      careerKicker: 'Experiencia en seguridad',
      careerTitle: 'Mi experiencia en ciberseguridad',
      careerP1: 'He trabajado más de dos décadas como ingeniero de software, incluido trabajo de ciberseguridad en Shape Security y F5. Allí he mantenido y mejorado software central de motores de seguridad, desarrollado funciones de producto, solucionado sistemas complejos, trabajado con CI/CD y creado herramientas de análisis de JavaScript.',
      careerP2: 'Anteriormente trabajé a fondo en procesamiento de paquetes de red de alto rendimiento y fui coautor de <em>packetC Programming</em>, que trata sobre la programación de aplicaciones de red escalables con funciones del lenguaje orientadas a la seguridad y acceso controlado a memoria.',
      sourceKicker: 'Código abierto',
      sourceTitle: 'Licencia y código fuente',
      sourceBody: 'Password Strength Lab es software de código abierto publicado bajo la licencia MIT. Puedes revisar el código, ejecutar tu propia copia, informar problemas o contribuir mediante el repositorio público de GitHub.',
      sourceGithub: 'Ver Password Lab en GitHub ↗',
      sourceLicense: 'Licencia MIT ↗',
      contactTitle: 'Contacto',
      contactSubtitle: 'Explora proyectos activos y credenciales del desarrollador.',
      featuredLabel: 'Proyecto destacado',
      viewGithub: 'Ver en GitHub',
      githubProfile: 'Repositorio de GitHub',
      linkedinProfile: 'Perfil de LinkedIn',
      dockerHub: 'Imágenes en Docker Hub',
      featuredNav: 'Navegación de proyectos destacados',
      previous: 'Proyecto destacado anterior',
      next: 'Siguiente proyecto destacado',
    },
    pt: {
      tab: 'Sobre',
      introKicker: 'Sobre o Password Strength Lab',
      introTitle: 'Por que a saúde das senhas é importante para mim',
      introBody: 'Acredito que uma boa higiene de senhas é uma das maneiras mais simples e eficazes de melhorar a segurança do dia a dia. Senhas ou frases-senha fortes e exclusivas, um gerenciador de senhas, atenção a vazamentos e autenticação multifator podem transformar muitos ataques comuns a credenciais em problemas muito mais difíceis. Criei o Password Strength Lab para tornar mais fáceis de entender a previsibilidade das senhas e as premissas de ataque, mantendo a senha no seu navegador.',
      careerKicker: 'Experiência em segurança',
      careerTitle: 'Minha experiência em cibersegurança',
      careerP1: 'Trabalho há mais de duas décadas como engenheiro de software, incluindo trabalho de cibersegurança na Shape Security e na F5. Meu trabalho incluiu manter e melhorar software central de mecanismos de segurança, desenvolver recursos de produto, solucionar sistemas complexos, CI/CD e ferramentas de análise de JavaScript.',
      careerP2: 'No início da carreira trabalhei intensamente com processamento de pacotes de rede de alto desempenho e fui coautor de <em>packetC Programming</em>, que aborda programação de aplicações de rede escaláveis com recursos de linguagem voltados à segurança e acesso controlado à memória.',
      sourceKicker: 'Código aberto',
      sourceTitle: 'Licença e código-fonte',
      sourceBody: 'Password Strength Lab é software de código aberto lançado sob a licença MIT. Você pode examinar o código, executar sua própria cópia, relatar problemas ou contribuir pelo repositório público no GitHub.',
      sourceGithub: 'Ver Password Lab no GitHub ↗',
      sourceLicense: 'Licença MIT ↗',
      contactTitle: 'Entre em contato',
      contactSubtitle: 'Explore projetos ativos e credenciais do desenvolvedor.',
      featuredLabel: 'Projeto em destaque',
      viewGithub: 'Ver no GitHub',
      githubProfile: 'Repositório no GitHub',
      linkedinProfile: 'Perfil no LinkedIn',
      dockerHub: 'Imagens no Docker Hub',
      featuredNav: 'Navegação dos projetos em destaque',
      previous: 'Projeto em destaque anterior',
      next: 'Próximo projeto em destaque',
    },
    fr: {
      tab: 'À propos',
      introKicker: 'À propos de Password Strength Lab',
      introTitle: 'Pourquoi la santé des mots de passe compte pour moi',
      introBody: 'Je pense qu’une bonne hygiène des mots de passe est l’un des moyens les plus simples et les plus efficaces d’améliorer la sécurité au quotidien. Des mots de passe ou phrases de passe forts et uniques, un gestionnaire de mots de passe, la vigilance face aux fuites et l’authentification multifacteur peuvent rendre de nombreuses attaques courantes sur les identifiants beaucoup plus difficiles. J’ai créé Password Strength Lab pour rendre la résistance aux tentatives et les hypothèses d’attaque plus faciles à comprendre tout en gardant le mot de passe dans votre navigateur.',
      careerKicker: 'Parcours en sécurité',
      careerTitle: 'Mon expérience en cybersécurité',
      careerP1: 'Je travaille depuis plus de vingt ans comme ingénieur logiciel, notamment dans la cybersécurité chez Shape Security et F5. J’y ai notamment maintenu et amélioré des logiciels essentiels de moteurs de sécurité, développé des fonctionnalités produit, dépanné des systèmes complexes, travaillé sur la CI/CD et créé des outils d’analyse JavaScript.',
      careerP2: 'Plus tôt dans ma carrière, j’ai beaucoup travaillé sur le traitement réseau haute performance et coécrit <em>packetC Programming</em>, consacré à la programmation d’applications réseau évolutives avec des fonctions de langage orientées sécurité et un accès mémoire contrôlé.',
      sourceKicker: 'Open source',
      sourceTitle: 'Licence et code source',
      sourceBody: 'Password Strength Lab est un logiciel open source publié sous licence MIT. Vous pouvez examiner le code, exécuter votre propre copie, signaler des problèmes ou contribuer via le dépôt GitHub public.',
      sourceGithub: 'Voir Password Lab sur GitHub ↗',
      sourceLicense: 'Licence MIT ↗',
      contactTitle: 'Me contacter',
      contactSubtitle: 'Découvrez les projets actifs et les références du développeur.',
      featuredLabel: 'Projet à la une',
      viewGithub: 'Voir sur GitHub',
      githubProfile: 'Dépôt GitHub',
      linkedinProfile: 'Profil LinkedIn',
      dockerHub: 'Images Docker Hub',
      featuredNav: 'Navigation des projets à la une',
      previous: 'Projet précédent',
      next: 'Projet suivant',
    },
    de: {
      tab: 'Über',
      introKicker: 'Über Password Strength Lab',
      introTitle: 'Warum mir Passwortsicherheit wichtig ist',
      introBody: 'Ich halte gute Passwort-Hygiene für eine der einfachsten und wirkungsvollsten Maßnahmen für mehr Sicherheit im Alltag. Starke, einzigartige Passwörter oder Passphrasen, ein Passwortmanager, Aufmerksamkeit für Datenlecks und Mehrfaktor-Authentifizierung können viele typische Angriffe auf Zugangsdaten deutlich erschweren. Ich habe Password Strength Lab entwickelt, um die Erratbarkeit von Passwörtern und die Annahmen hinter Angriffsszenarien verständlicher zu machen, während das Passwort selbst im Browser bleibt.',
      careerKicker: 'Sicherheitserfahrung',
      careerTitle: 'Mein Hintergrund in der Cybersicherheit',
      careerP1: 'Ich arbeite seit mehr als zwei Jahrzehnten als Softwareentwickler, darunter im Bereich Cybersicherheit bei Shape Security und F5. Dort gehörten die Pflege und Verbesserung zentraler Security-Engine-Software, Produktentwicklung, Fehlersuche in komplexen Systemen, CI/CD und JavaScript-Analysewerkzeuge zu meiner Arbeit.',
      careerP2: 'Früher in meiner Laufbahn arbeitete ich intensiv an leistungsfähiger Netzwerk-Paketverarbeitung und war Mitautor von <em>packetC Programming</em>. Das Buch behandelt die Entwicklung skalierbarer Netzwerkanwendungen mit sicherheitsorientierten Spracheigenschaften und kontrolliertem Speicherzugriff.',
      sourceKicker: 'Open Source',
      sourceTitle: 'Lizenz und Quellcode',
      sourceBody: 'Password Strength Lab ist Open-Source-Software unter der MIT-Lizenz. Sie können den Quellcode ansehen, eine eigene Kopie betreiben, Probleme melden oder über das öffentliche GitHub-Repository beitragen.',
      sourceGithub: 'Password Lab auf GitHub ansehen ↗',
      sourceLicense: 'MIT-Lizenz ↗',
      contactTitle: 'Kontakt',
      contactSubtitle: 'Aktive Projekte und Entwicklerreferenzen ansehen.',
      featuredLabel: 'Vorgestelltes Projekt',
      viewGithub: 'Auf GitHub ansehen',
      githubProfile: 'GitHub-Repository',
      linkedinProfile: 'LinkedIn-Profil',
      dockerHub: 'Docker-Hub-Images',
      featuredNav: 'Navigation der vorgestellten Projekte',
      previous: 'Vorheriges vorgestelltes Projekt',
      next: 'Nächstes vorgestelltes Projekt',
    },
  };

  function localeKey() {
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('pt')) return 'pt';
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('de')) return 'de';
    return 'en';
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  }

  function setHtml(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = value;
  }

  function replaceLinkText(selector, value) {
    const element = document.querySelector(selector);
    if (!element) return;
    [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => node.remove());
    element.insertBefore(document.createTextNode(`${value} `), element.firstChild);
  }

  function applyAboutLanguage() {
    const copy = ABOUT_COPY[localeKey()] || ABOUT_COPY.en;
    setText('.tab-btn[data-tab="about"]', copy.tab);
    setText('.about-intro .about-kicker', copy.introKicker);
    setText('.about-intro .section-title', copy.introTitle);
    setText('.about-intro > p:last-child', copy.introBody);
    setText('.about-career .about-kicker', copy.careerKicker);
    setText('.about-career .section-title', copy.careerTitle);
    setText('.about-career > p:nth-of-type(2)', copy.careerP1);
    setHtml('.about-career > p:nth-of-type(3)', copy.careerP2);
    setText('.about-source .about-kicker', copy.sourceKicker);
    setText('.about-source .section-title', copy.sourceTitle);
    setText('.about-source > p:nth-of-type(2)', copy.sourceBody);
    setText('.about-source-links a:nth-child(1)', copy.sourceGithub);
    setText('.about-source-links a:nth-child(2)', copy.sourceLicense);
    setText('#aboutContactHeading', copy.contactTitle);
    setText('.about-contact-subtitle', copy.contactSubtitle);

    const featuredLabel = document.querySelector('.about-contact-label-project');
    if (featuredLabel) {
      [...featuredLabel.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => node.remove());
      featuredLabel.appendChild(document.createTextNode(` ${copy.featuredLabel}`));
    }
    replaceLinkText('#featuredLink', copy.viewGithub);

    const contactLinks = [...document.querySelectorAll('.about-contact-links .about-contact-link')];
    if (contactLinks[1]) replaceLinkText('.about-contact-links .about-contact-link:nth-child(2)', copy.githubProfile);
    if (contactLinks[2]) replaceLinkText('.about-contact-links .about-contact-link:nth-child(3)', copy.linkedinProfile);
    if (contactLinks[3]) replaceLinkText('.about-contact-links .about-contact-link:nth-child(4)', copy.dockerHub);

    const nav = document.getElementById('featuredNav');
    const previous = document.getElementById('featuredPrev');
    const next = document.getElementById('featuredNext');
    if (nav) nav.setAttribute('aria-label', copy.featuredNav);
    if (previous) previous.setAttribute('aria-label', copy.previous);
    if (next) next.setAttribute('aria-label', copy.next);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const aboutPanel = document.getElementById('tab-about');
    const buttons = [...document.querySelectorAll('.tab-btn')];
    if (!aboutPanel || !buttons.length) return;

    applyAboutLanguage();
    new MutationObserver(applyAboutLanguage).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    function showAbout() {
      document.getElementById('tab-test').hidden = true;
      document.getElementById('tab-faq').hidden = true;
      aboutPanel.hidden = false;
      buttons.forEach((button) => {
        const active = button.dataset.tab === 'about';
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      history.replaceState(null, '', '#about');
    }

    document.querySelector('.tabs')?.addEventListener('click', (event) => {
      const button = event.target.closest('.tab-btn');
      if (!button) return;
      if (button.dataset.tab === 'about') {
        event.preventDefault();
        event.stopImmediatePropagation();
        showAbout();
      } else {
        aboutPanel.hidden = true;
      }
    }, true);

    const title = document.getElementById('featuredTitle');
    const description = document.getElementById('featuredDescription');
    const language = document.getElementById('featuredLanguage');
    const link = document.getElementById('featuredLink');
    const count = document.getElementById('featuredCount');
    let projects = [];
    let index = 0;

    function staticFallback() {
      return [{
        name: title?.textContent?.trim() || 'Password Strength Lab',
        description: description?.textContent?.trim() || 'GitHub repository.',
        language: language?.textContent?.trim() || '',
        url: link?.href || 'https://github.com/dwightmulcahy/password-lab',
      }];
    }

    function renderProject() {
      if (!projects.length || !title || !description || !language || !link || !count) return;
      const project = projects[index];
      title.textContent = project.name;
      description.textContent = project.description || 'GitHub repository.';
      language.textContent = project.language || '';
      link.href = project.url;
      count.textContent = `${index + 1} / ${projects.length}`;
    }

    async function loadProjects() {
      try {
        const response = await fetch('assets/featured-projects.json', { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const loaded = await response.json();
        if (!Array.isArray(loaded) || !loaded.length) throw new Error('empty project list');
        projects = loaded.filter((project) => project && project.name && project.url);
        if (!projects.length) throw new Error('no valid projects');
      } catch (error) {
        console.warn(`Featured projects unavailable; using static fallback: ${error.message}`);
        projects = staticFallback();
      }
      index = Math.floor(Math.random() * projects.length);
      renderProject();
    }

    document.getElementById('featuredPrev')?.addEventListener('click', () => {
      if (!projects.length) return;
      index = (index - 1 + projects.length) % projects.length;
      renderProject();
    });
    document.getElementById('featuredNext')?.addEventListener('click', () => {
      if (!projects.length) return;
      index = (index + 1) % projects.length;
      renderProject();
    });

    loadProjects();
    if (location.hash === '#about') setTimeout(showAbout, 0);
  });
})();
