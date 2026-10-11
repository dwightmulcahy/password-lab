import { cp, mkdir, rm } from 'node:fs/promises';
import './build-web.mjs';

await rm('offline', { recursive: true, force: true });
await mkdir('offline', { recursive: true });
await cp('dist', 'offline', { recursive: true, force: true });
console.log('Offline build written to offline/');
