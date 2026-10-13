(() => {
  const projects = [
    {
      name: 'hotpot',
      language: 'Python',
      description: 'A lightweight Docker security gateway that proxies legitimate web traffic while detecting probes, serving deceptive responses, tarpitting scanners, and tracking repeat attackers.'
    },
    {
      name: 'noip-bot',
      language: 'Python',
      description: 'Automatically renews No-IP free hostnames, handles the code challenge, persists renewal state, and adjusts when it checks again based on expiration timing.'
    },
    {
      name: 'hvac-dashboard',
      language: 'Python',
      description: 'A self-hosted web dashboard for controlling and monitoring Innovair mini-splits through SMLIGHT SLWF-01 Pro ESPHome dongles using the Midea protocol.'
    },
    {
      name: 'TapListBuilder',
      language: 'JavaScript',
      description: 'Creates printable tap-list menus in full-page and 4×6 formats, with optional one-click English-to-Spanish translation.'
    },
    {
      name: 'git-suggest-version',
      language: 'Shell',
      description: 'A lightweight Bash utility that calculates the next Semantic Version tag from a major, minor, or patch bump.'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const aboutPanel = document.getElementById('tab-about');
    const buttons = [...document.querySelectorAll('.tab-btn')];
    if (!aboutPanel || !buttons.length) return;

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

    let index = Math.floor(Math.random() * projects.length);
    const title = document.getElementById('featuredTitle');
    const description = document.getElementById('featuredDescription');
    const language = document.getElementById('featuredLanguage');
    const link = document.getElementById('featuredLink');
    const count = document.getElementById('featuredCount');

    function renderProject() {
      const project = projects[index];
      title.textContent = project.name;
      description.textContent = project.description;
      language.textContent = project.language;
      link.href = `https://github.com/dwightmulcahy/${project.name}`;
      count.textContent = `${index + 1} / ${projects.length}`;
    }

    document.getElementById('featuredPrev')?.addEventListener('click', () => {
      index = (index - 1 + projects.length) % projects.length;
      renderProject();
    });
    document.getElementById('featuredNext')?.addEventListener('click', () => {
      index = (index + 1) % projects.length;
      renderProject();
    });
    renderProject();

    if (location.hash === '#about') setTimeout(showAbout, 0);
  });
})();
