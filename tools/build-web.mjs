import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

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
html = html.replace('assets/zxcvbn-loader.js', 'assets/zxcvbn-bundle.js');
html = html.replace('type="module" src="assets/zxcvbn-bundle.js"', 'src="assets/zxcvbn-bundle.js"');
await writeFile('dist/index.html', html);
console.log('Web build written to dist/');
