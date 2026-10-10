import { build } from 'esbuild';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('offline', {recursive:true});
await build({
  entryPoints:['src/offline-entry.js'],
  outfile:'offline/zxcvbn-offline.js',
  bundle:true,
  minify:true,
  format:'iife',
  target:['es2020']
});

let html = await readFile('index.html', 'utf8');
html = html.replace('<script type="module" src="assets/zxcvbn-loader.js"></script>', '<script src="./zxcvbn-offline.js"></script>');
html = html.replace('zxcvbn-ts • checking for updates…', 'zxcvbn-ts • offline pinned build');
await cp('assets', 'offline/assets', {recursive:true, force:true});
await writeFile('offline/index.html', html);
console.log('Offline build written to offline/index.html');
