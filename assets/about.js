(() => {
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
