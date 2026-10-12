import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { injectPassphraseGenerator } from './build-web-passphrase.mjs';
import { injectLayoutEnhancements } from './build-web-layout.mjs';

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
  .replace('assets/zxcvbn-loader.js', 'assets/zxcvbn-bundle.js')
  .replace('type="module" src="assets/zxcvbn-bundle.js"', 'src="assets/zxcvbn-bundle.js"')
  .replace("script-src 'self' https://esm.sh", "script-src 'self'")
  .replace("connect-src 'self' https://registry.npmjs.org https://api.pwnedpasswords.com https://esm.sh", "connect-src 'self' https://api.pwnedpasswords.com")
  // frame-ancestors is ignored in a meta CSP. nginx sends it as a response header.
  .replace("frame-ancestors 'none'; ", '');
html = injectPassphraseGenerator(html);
html = injectLayoutEnhancements(html);

if (!html.includes('id="buildMeta"')) {
  html = html.replace('</footer>', `  <div id="buildMeta" class="build-meta">Build <code>${buildSha}</code> • ${buildDate}</div>\n  </footer>`);
}

await writeFile('dist/index.html', html);
await writeFile('dist/build-info.json', `${JSON.stringify({ build_sha: buildSha, build_date: buildDate })}\n`);
console.log(`Web build written to dist/ (build ${buildSha})`);
