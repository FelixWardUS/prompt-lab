import assert from 'node:assert/strict';
import { rm, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);

test('builds a GitHub Pages artifact with project-relative asset paths', async () => {
  await rm('./dist', { recursive: true, force: true });
  await execFileAsync('node', ['./scripts/build-pages.mjs']);

  const html = await readFile('./dist/index.html', 'utf8');

  assert.match(html, /href="\.\/web\/styles\.css"/);
  assert.match(html, /src="\.\/web\/app\.js"/);
  assert.doesNotMatch(html, /href="\/web\/styles\.css"/);
  assert.doesNotMatch(html, /src="\/web\/app\.js"/);
  assert.match(await readFile('./dist/web/app.js', 'utf8'), /from '\.\.\/src\/prompt-engine\.mjs'/);
});
