export function injectBrand(html) {
  if (!html.includes('assets/brand.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="assets/styles.css">',
      '<link rel="stylesheet" href="assets/styles.css">\n  <link rel="stylesheet" href="assets/brand.css">'
    );
  }

  if (!html.includes('rel="icon"')) {
    html = html.replace(
      '</head>',
      '  <link rel="icon" type="image/svg+xml" href="assets/password-lab-logo.svg">\n</head>'
    );
  }

  if (!html.includes('class="site-brand"')) {
    html = html.replace(
      /(<h1><span data-i18n="title">Password Strength Lab<\/span>[\s\S]*?<\/h1>)/,
      '<div class="site-brand">\n      <img class="site-logo" src="assets/password-lab-logo.svg" width="86" height="86" alt="Password Strength Lab logo">\n      $1\n    </div>'
    );
  }

  return html;
}
