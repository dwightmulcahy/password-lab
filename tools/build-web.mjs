import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { injectPassphraseGenerator } from './build-web-passphrase.mjs';
import { injectLayoutEnhancements } from './build-web-layout.mjs';
import { injectAbout } from './build-web-about.mjs';
import { injectPrivacyEnhancements } from './build-web-privacy.mjs';
import { injectSeo } from './build-web-seo.mjs';
import { injectBrand } from './build-web-brand.mjs';

function localGitSha() {
  try {
    return execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return 'local';
  }
}

const buildSha = process.env.BUILD_SHA || localGitSha();
const buildDate = process.env.BUILD_DATE && process.env.BUILD_DATE !== 'unknown'
  ? process.env.BUILD_DATE
  : new Date().toISOString();
const buildVersion = process.env.BUILD_VERSION || 'dev';
const publicSiteUrl = (process.env.PUBLIC_SITE_URL || 'https://passwordlab.dwights.dev').replace(/\/$/, '');
const canonicalUrl = `${publicSiteUrl}/`;

await rm('dist', { recursive: true, force: true });
await mkdir('dist/assets', { recursive: true });

await build({
  entryPoints: ['src/zxcvbn-entry.js'],
  outfile: 'dist/assets/zxcvbn-bundle.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  legalComments: 'none',
});

await cp('assets', 'dist/assets', { recursive: true, force: true });
await rm('dist/assets/zxcvbn-loader.js', { force: true });

let html = await readFile('index.html', 'utf8');
html = html
  .replace('<html lang="en">', '<html lang="en" translate="no" class="notranslate">')
  .replace('<meta charset="utf-8" />', '<meta charset="utf-8" />\n  <meta name="google" content="notranslate">')
  .replace('assets/zxcvbn-loader.js', 'assets/zxcvbn-bundle.js')
  .replace('type="module" src="assets/zxcvbn-bundle.js"', 'src="assets/zxcvbn-bundle.js"')
  .replace("script-src 'self' https://esm.sh", "script-src 'self'")
  .replace("connect-src 'self' https://registry.npmjs.org https://api.pwnedpasswords.com https://esm.sh", "connect-src 'self' https://api.pwnedpasswords.com")
  // frame-ancestors is ignored in a meta CSP. nginx sends it as a response header.
  .replace("frame-ancestors 'none'; ", '')
  .replace(
    '<h1 data-i18n="title">Password Strength Lab</h1>',
    `<h1><span data-i18n="title">Password Strength Lab</span> <span id="versionBadge" class="version-badge">${buildVersion}</span></h1>`
  );
html = injectSeo(html, publicSiteUrl);
html = injectBrand(html);
html = injectPassphraseGenerator(html);
html = injectAbout(html);
html = injectPrivacyEnhancements(html);
html = injectLayoutEnhancements(html);

if (!html.includes('id="buildMeta"')) {
  html = html.replace('</footer>', `  <div id="buildMeta" class="build-meta">Build <code>${buildSha}</code> • ${buildDate}</div>\n  </footer>`);
}

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${canonicalUrl}sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${canonicalUrl}</loc>\n  </url>\n</urlset>\n`;

await writeFile('dist/index.html', html);
await writeFile('dist/robots.txt', robots);
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('dist/build-info.json', `${JSON.stringify({ build_sha: buildSha, build_date: buildDate, version: buildVersion, site_url: publicSiteUrl })}\n`);
console.log(`Web build written to dist/ (version ${buildVersion}, build ${buildSha}, site ${publicSiteUrl})`);
