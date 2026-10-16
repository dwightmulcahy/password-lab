const SEO_TITLE = 'Password Strength Checker & Passphrase Generator | Password Strength Lab';
const SEO_DESCRIPTION = 'Test password strength, estimate cracking time across attack scenarios, check breached passwords, and generate secure passwords and passphrases—all in your browser.';

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function injectSeo(html, publicSiteUrl) {
  const canonicalUrl = `${String(publicSiteUrl).replace(/\/$/, '')}/`;
  const escapedUrl = escapeAttribute(canonicalUrl);
  const escapedTitle = escapeAttribute(SEO_TITLE);
  const escapedDescription = escapeAttribute(SEO_DESCRIPTION);

  html = html
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapedDescription}" />`)
    .replace(/<title>[^<]*<\/title>/, `<title>${SEO_TITLE}</title>`);

  if (!html.includes('rel="canonical"')) {
    const descriptionTag = `<meta name="description" content="${escapedDescription}" />`;
    const metadata = [
      '<meta name="robots" content="index,follow,max-image-preview:large">',
      `<link rel="canonical" href="${escapedUrl}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="Password Strength Lab">',
      `<meta property="og:title" content="${escapedTitle}">`,
      `<meta property="og:description" content="${escapedDescription}">`,
      `<meta property="og:url" content="${escapedUrl}">`,
      '<meta property="og:locale" content="en_US">',
      '<meta name="twitter:card" content="summary">',
      `<meta name="twitter:title" content="${escapedTitle}">`,
      `<meta name="twitter:description" content="${escapedDescription}">`,
    ].join('\n  ');
    html = html.replace(descriptionTag, `${descriptionTag}\n  ${metadata}`);
  }

  return html;
}
