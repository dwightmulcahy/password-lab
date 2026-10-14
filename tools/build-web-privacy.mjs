const PRIVACY_FAQ = `
    <section class="card pad mt16 privacy-faq" id="privacyFaq">
      <h2 class="section-title" data-i18n="privacyFaqTitle">Privacy &amp; browser-only design</h2>
      <p class="section-sub" data-i18n="privacyFaqSub">Your password-strength calculation and generator are self-contained in this page.</p>
      <details open>
        <summary data-i18n="privacyFaqQ1">Does my password ever leave my browser?</summary>
        <p class="note" data-i18n="privacyFaqA1">No. Password strength analysis, pattern detection, guess estimates, crack-time calculations, and password/passphrase generation all happen locally. Password Strength Lab never receives or stores the password you type.</p>
      </details>
      <details>
        <summary data-i18n="privacyFaqQ2">Is the estimator downloaded from a CDN?</summary>
        <p class="note" data-i18n="privacyFaqA2">No. zxcvbn-ts, the language dictionaries, the EFF passphrase word list, and the application code are bundled into the site at build time. Password analysis has no runtime npm or CDN dependency.</p>
      </details>
      <details>
        <summary data-i18n="privacyFaqQ3">What leaves the browser during a breach check?</summary>
        <p class="note" data-i18n="privacyFaqA3">Only the optional Pwned Passwords lookup makes a third-party request. The browser hashes the password locally with SHA-1 and sends only the first 5 hash characters using the k-anonymity range API. The password and complete hash are never transmitted.</p>
      </details>
      <details>
        <summary data-i18n="privacyFaqQ4">Can Password Strength Lab work offline?</summary>
        <p class="note" data-i18n="privacyFaqA4">Yes. Strength analysis and the password/passphrase generator can run from the bundled files without an internet connection. Only the optional Pwned Passwords breach lookup needs network access.</p>
      </details>
    </section>`;

export function injectPrivacyEnhancements(html) {
  if (!html.includes('id="privacyFaq"')) {
    html = html.replace(
      '    <section class="card pad mt16" id="notesSection">',
      `${PRIVACY_FAQ}\n\n    <section class="card pad mt16" id="notesSection">`
    );
  }

  if (!html.includes('assets/privacy-ui.js')) {
    html = html.replace(
      '<script src="assets/i18n.js" defer></script>',
      '<script src="assets/i18n.js" defer></script>\n<script src="assets/privacy-ui.js" defer></script>'
    );
  }

  return html;
}
