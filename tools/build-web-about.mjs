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
          <p class="about-kicker">Security background</p>
          <h2 class="section-title">My cybersecurity background</h2>
          <p>I’ve spent more than two decades as a software engineer, including cybersecurity work at Shape Security and F5. My work there has included maintaining and improving core security-engine software, developing product features, troubleshooting complex systems, CI/CD, and JavaScript analysis tooling.</p>
          <p>Earlier in my career I worked deeply in high-performance network packet processing and co-authored <em>packetC Programming</em>, which covers programming scalable network applications with security-focused language features and controlled memory access.</p>
        </section>

        <section class="about-contact" id="aboutContact" aria-labelledby="aboutContactHeading">
          <h2 id="aboutContactHeading">Get in Touch</h2>
          <p class="about-contact-subtitle">Explore active projects &amp; developer credentials.</p>

          <div class="about-contact-grid">
            <article class="about-contact-card about-featured" aria-labelledby="featuredHeading">
              <p class="about-contact-label about-contact-label-project">
                <svg class="about-label-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95Z"/></svg>
                Featured project
              </p>
              <h3 class="about-contact-title" id="featuredTitle">hotpot</h3>
              <p class="about-contact-body" id="featuredDescription">A lightweight Docker security gateway that proxies legitimate web traffic while detecting probes, serving deceptive responses, tarpitting scanners, and tracking repeat attackers.</p>
              <p class="about-contact-meta" id="featuredLanguage">Python</p>

              <div class="about-featured-foot">
                <a id="featuredLink" class="about-contact-link about-contact-launch" href="https://github.com/dwightmulcahy/hotpot" target="_blank" rel="noopener">
                  View on GitHub
                  <svg class="about-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                </a>
                <div class="featured-nav" id="featuredNav" aria-label="Featured project navigation">
                  <button id="featuredPrev" class="featured-nav-btn" type="button" aria-label="Previous featured project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <span id="featuredCount" class="featured-count" aria-live="polite"></span>
                  <button id="featuredNext" class="featured-nav-btn" type="button" aria-label="Next featured project">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </div>
              </div>
            </article>

            <article class="about-contact-card about-developer">
              <p class="about-contact-label about-contact-label-developer">dWiGhT Mulcahy</p>
              <div class="about-contact-links">
                <a href="mailto:dWiGhT.Codes@gmail.com" class="about-contact-link">
                  <svg class="about-contact-icon about-icon-email" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/></svg>
                  dWiGhT.Codes@gmail.com
                </a>
                <a href="https://github.com/dwightmulcahy" target="_blank" rel="noopener" class="about-contact-link">
                  <svg class="about-contact-icon about-icon-github" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub Repository
                </a>
                <a href="https://www.linkedin.com/in/dwightmulcahy/" target="_blank" rel="noopener" class="about-contact-link">
                  <svg class="about-contact-icon about-icon-linkedin" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn Profile
                </a>
                <a href="https://hub.docker.com/u/dwightmulcahy" target="_blank" rel="noopener" class="about-contact-link">
                  <svg class="about-contact-icon about-icon-docker" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.98 11.08h2.12a.19.19 0 0 0 .19-.19V9a.19.19 0 0 0-.19-.19h-2.12a.18.18 0 0 0-.19.19v1.89c0 .1.09.19.19.19m-2.95-5.43h2.12a.19.19 0 0 0 .19-.19V3.57a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.89c0 .1.09.19.19.19m0 2.71h2.12a.19.19 0 0 0 .19-.19V6.28a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.89c0 .11.09.19.19.19m-2.93 0h2.12a.19.19 0 0 0 .19-.19V6.28a.19.19 0 0 0-.19-.19H8.1a.19.19 0 0 0-.19.19v1.89c0 .11.09.19.19.19m-2.96 0h2.12a.19.19 0 0 0 .19-.19V6.28a.19.19 0 0 0-.19-.19H5.14a.19.19 0 0 0-.19.19v1.89c0 .11.09.19.19.19m5.89 2.72h2.12a.19.19 0 0 0 .19-.19V9a.19.19 0 0 0-.19-.19h-2.12a.19.19 0 0 0-.19.19v1.89c0 .1.09.19.19.19m-2.93 0h2.12a.19.19 0 0 0 .19-.19V9a.19.19 0 0 0-.19-.19H8.1a.19.19 0 0 0-.19.19v1.89c0 .1.09.19.19.19m-2.96 0h2.12a.19.19 0 0 0 .19-.19V9a.19.19 0 0 0-.19-.19H5.14a.19.19 0 0 0-.19.19v1.89c0 .1.09.19.19.19m-2.94 0h2.12a.19.19 0 0 0 .19-.19V9a.19.19 0 0 0-.19-.19H2.2a.19.19 0 0 0-.19.19v1.89c0 .1.08.19.19.19m21.54-1.19c-.06-.05-.67-.51-1.95-.29-.34-2.48-2.89-3.91-3-3.97l-.4-.18-.27.35c-.34.53-.57 1.24-.53 1.9.02.47.18.98.52 1.4-.78.44-2.03.55-2.28.55H.39c-.1 0-.18.08-.18.18 0 1.7.26 3.4 1 4.95.57 1.21 1.43 2.13 2.58 2.75 1.29.7 3.39 1.08 5.74 1.08 1.06 0 2.12-.1 3.12-.29 1.39-.26 2.66-.7 3.77-1.3 1.41-.77 2.58-1.78 3.46-3 .73-1 1.27-2.15 1.61-3.39.08 0 .15.01.23.01 1.37 0 2.21-.55 2.59-1.04.16-.21.27-.42.34-.57l.1-.29z"/></svg>
                  Docker Hub Images
                </a>
                <a href="https://link.springer.com/book/10.1007/978-1-4302-4159-1" target="_blank" rel="noopener" class="about-contact-link">
                  <svg class="about-contact-icon about-icon-book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
                  packetC Programming
                </a>
              </div>
            </article>
          </div>
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
