const ABOUT_TAB_BUTTON = `        <button class="tab-btn" role="tab" aria-controls="tab-about" type="button" data-tab="about">About</button>`;

const ABOUT_PANEL = `
    <div id="tab-about" role="tabpanel" class="tab-panel" hidden>
      <div class="about-stack">
        <section class="card pad about-intro">
          <p class="about-kicker">About Password Strength Lab</p>
          <h2 class="section-title">Why password health matters to me</h2>
          <p>I believe good password health is one of the simplest, highest-leverage parts of everyday security. Strong, unique passwords or passphrases, a password manager, breach awareness, and multi-factor authentication can turn a lot of common credential attacks from easy wins into much harder problems. I built Password Strength Lab to make password guessability and attack assumptions easier to understand while keeping the password itself in your browser.</p>
        </section>

        <section class="card pad about-career">
          <h2 class="section-title">My cybersecurity background</h2>
          <p>I’ve spent more than two decades as a software engineer, including cybersecurity work at Shape Security and F5. My work there has included maintaining and improving core security-engine software, developing product features, troubleshooting complex systems, CI/CD, and JavaScript analysis tooling.</p>
          <p>Earlier in my career I worked deeply in high-performance network packet processing and co-authored <em>packetC Programming</em>, which covers programming scalable network applications with security-focused language features and controlled memory access.</p>
          <div class="about-links">
            <a href="https://www.linkedin.com/in/dwightmulcahy/" target="_blank" rel="noopener">LinkedIn profile</a>
            <a href="https://github.com/dwightmulcahy" target="_blank" rel="noopener">GitHub profile</a>
            <a href="https://link.springer.com/book/10.1007/978-1-4302-4159-1" target="_blank" rel="noopener">packetC Programming</a>
          </div>
        </section>

        <section class="card pad about-featured" aria-labelledby="featuredHeading">
          <div class="about-featured-head">
            <div>
              <p class="about-kicker">Featured GitHub project</p>
              <h2 class="section-title" id="featuredHeading">More things I build</h2>
            </div>
            <div class="featured-nav" aria-label="Featured project navigation">
              <button id="featuredPrev" class="featured-nav-btn" type="button" aria-label="Previous featured project">‹</button>
              <span id="featuredCount" class="featured-count" aria-live="polite"></span>
              <button id="featuredNext" class="featured-nav-btn" type="button" aria-label="Next featured project">›</button>
            </div>
          </div>
          <article class="featured-project-card">
            <div class="featured-project-meta">
              <span id="featuredLanguage" class="featured-language">Python</span>
            </div>
            <h3 id="featuredTitle">hotpot</h3>
            <p id="featuredDescription">A lightweight Docker security gateway that proxies legitimate web traffic while detecting probes, serving deceptive responses, tarpitting scanners, and tracking repeat attackers.</p>
            <a id="featuredLink" class="featured-link" href="https://github.com/dwightmulcahy/hotpot" target="_blank" rel="noopener">View on GitHub ↗</a>
          </article>
        </section>
      </div>
    </div>`;

export function injectAbout(html) {
  if (!html.includes('data-tab="about"')) {
    const faqButton = '        <button class="tab-btn" role="tab" aria-controls="tab-faq" type="button" data-tab="faq" data-i18n="tabFaq">FAQ</button>';
    html = html.replace(faqButton, `${faqButton}\n${ABOUT_TAB_BUTTON}`);
  }
  if (!html.includes('id="tab-about"')) {
    html = html.replace('</main>', `${ABOUT_PANEL}\n  </main>`);
  }
  if (!html.includes('assets/about.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="assets/about.css">\n</head>');
  }
  if (!html.includes('assets/about.js')) {
    html = html.replace('</body>', '<script src="assets/about.js" defer></script>\n</body>');
  }
  return html;
}
