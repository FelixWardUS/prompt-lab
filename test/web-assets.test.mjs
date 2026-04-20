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

test('browser app exposes draft import export controls', async () => {
  const html = await readFile('./web/index.html', 'utf8');
  const app = await readFile('./web/app.js', 'utf8');

  assert.match(html, /id="save-draft"/);
  assert.match(html, /id="load-draft"/);
  assert.match(html, /id="export-draft"/);
  assert.match(html, /id="import-draft"/);
  assert.match(html, /id="clear-draft"/);
  assert.match(html, /type="file"/);
  assert.match(app, /PROMPT_DRAFT_STORAGE_KEY/);
  assert.match(app, /localStorage/);
  assert.match(app, /Blob/);
  assert.match(app, /FileReader/);
});

test('browser app renders a prompt quality checklist', async () => {
  const html = await readFile('./web/index.html', 'utf8');
  const app = await readFile('./web/app.js', 'utf8');

  assert.match(html, /id="quality-checks"/);
  assert.match(html, /details\.quality/);
  assert.match(app, /from '\.\.\/src\/prompt-quality\.mjs'/);
  assert.match(app, /evaluatePromptQuality/);
  assert.match(app, /renderQuality/);
});

test('local server serves the repo root so web can import shared modules', async () => {
  const server = await readFile('./scripts/serve.mjs', 'utf8');

  assert.match(server, /createServer/);
  assert.match(server, /Location': '\/web\/'/);
  assert.match(server, /endsWith\('\/'\)/);
});
