import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('web page loads the browser app and exposes the core interaction', async () => {
  const html = await readFile('./web/index.html', 'utf8');

  assert.match(html, /<textarea[^>]+id="requirement"/);
  assert.match(html, /id="generated-prompt"/);
  assert.match(html, /src="\.\/app\.js"/);
  assert.match(html, /href="\.\/styles\.css"/);
});

test('generate button does not trigger native form submission if JavaScript is unavailable', async () => {
  const html = await readFile('./web/index.html', 'utf8');

  assert.match(html, /<button[^>]+id="generate-prompt"[^>]+type="button"/);
  assert.doesNotMatch(html, /<button[^>]+type="submit"/);
});

test('example requirement is a placeholder instead of a prefilled value', async () => {
  const html = await readFile('./web/index.html', 'utf8');
  const app = await readFile('./web/app.js', 'utf8');

  assert.match(html, /placeholder="Write a prompt for a support bot/);
  assert.doesNotMatch(app, /requirement\.value = examples\[0\]/);
  assert.match(app, /requirement\.placeholder/);
});

test('browser app reuses the shared prompt engine', async () => {
  const app = await readFile('./web/app.js', 'utf8');

  assert.match(app, /from '\.\.\/src\/prompt-engine\.mjs'/);
  assert.match(app, /generatePrompt/);
  assert.match(app, /from '\.\.\/src\/i18n\.mjs'/);
  assert.match(app, /navigator\.languages/);
});

test('local server serves the repo root so web can import shared modules', async () => {
  const server = await readFile('./scripts/serve.mjs', 'utf8');

  assert.match(server, /createServer/);
  assert.match(server, /Location': '\/web\/'/);
  assert.match(server, /endsWith\('\/'\)/);
});
