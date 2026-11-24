// "What's new" dialog: release notes bundled at release time (scripts/build_changelog.py,
// passed to the build as base64 in CHANGELOG_B64); dev builds get an empty placeholder.
export function changelogJson(env, version) {
  if (env.CHANGELOG_B64) {
    const data = JSON.parse(Buffer.from(env.CHANGELOG_B64, 'base64').toString('utf8'));
    return `${JSON.stringify(data)}\n`;
  }
  return `${JSON.stringify({ current: version, repository: 'dwightmulcahy/password-lab', releases: [] })}\n`;
}

export function injectWhatsNew(html) {
  if (!html.includes('assets/whats-new.js')) {
    html = html.replace(
      '</head>',
      '  <script src="assets/whats-new.js" data-src="changelog.json" data-css="assets/whats-new.css" data-key="pwlab.seenVersion" defer></script>\n</head>'
    );
  }
  // the version badge opens it
  return html.replace(
    '<span id="versionBadge" class="version-badge">',
    '<span id="versionBadge" class="version-badge" data-whats-new role="button" tabindex="0" title="What\'s new">'
  );
}
