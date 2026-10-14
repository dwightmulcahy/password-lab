export function injectLayoutEnhancements(html) {
  const libraryBadge = html.match(/\s*<div class="lib-badge" id="libBadge"[\s\S]*?<\/div>/)?.[0];
  if (libraryBadge) {
    html = html.replace(libraryBadge, '');
    html = html.replace(
      '<footer class="wrap">',
      `<footer class="wrap">\n    ${libraryBadge.trim()}`
    );
  }

  const networkTrust = html.match(/\s*<details class="network-trust">[\s\S]*?<\/details>/)?.[0];
  if (networkTrust) {
    html = html.replace(networkTrust, '');
    html = html.replace(
      '</main>',
      `</main>\n\n  <div class="wrap page-bottom-network">${networkTrust.trim()}</div>`
    );
  }

  if (!html.includes('assets/layout-enhancements.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="assets/layout-enhancements.css">\n</head>');
  }
  if (!html.includes('assets/layout-enhancements.js')) {
    html = html.replace('</body>', '<script src="assets/layout-enhancements.js" defer></script>\n</body>');
  }
  return html;
}
