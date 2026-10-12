export function injectLayoutEnhancements(html) {
  if (!html.includes('assets/layout-enhancements.css')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="assets/layout-enhancements.css">\n</head>');
  }
  if (!html.includes('assets/layout-enhancements.js')) {
    html = html.replace('</body>', '<script src="assets/layout-enhancements.js" defer></script>\n</body>');
  }
  return html;
}
