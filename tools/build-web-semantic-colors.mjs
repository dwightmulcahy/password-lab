export function injectSemanticColors(html) {
  if (!html.includes('assets/semantic-colors.css')) {
    html = html.replace(
      '</head>',
      '  <link rel="stylesheet" href="assets/semantic-colors.css">\n</head>'
    );
  }

  if (!html.includes('assets/semantic-colors.js')) {
    html = html.replace(
      '</body>',
      '<script src="assets/semantic-colors.js" defer></script>\n</body>'
    );
  }

  return html;
}
