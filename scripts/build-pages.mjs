#!/usr/bin/env node
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

await rm('./dist', { recursive: true, force: true });
await mkdir('./dist', { recursive: true });

await cp('./web', './dist/web', { recursive: true });
await cp('./src', './dist/src', { recursive: true });

const html = await readFile('./web/index.html', 'utf8');
const rootHtml = html
  .replace('href="./styles.css"', 'href="./web/styles.css"')
  .replace('src="./app.js"', 'src="./web/app.js"');

await writeFile('./dist/index.html', rootHtml);
await writeFile('./dist/.nojekyll', '');
