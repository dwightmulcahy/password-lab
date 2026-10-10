import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

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
html = html.replace(/<script type="module">[\s\S]*?<\/script>/, '<script src="./zxcvbn-offline.js"></script>');
html = html.replace('zxcvbn-ts • checking for updates…', 'zxcvbn-ts • offline pinned build');
await writeFile('offline/index.html', html);
console.log('Offline build written to offline/index.html');
