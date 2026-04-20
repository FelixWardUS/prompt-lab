import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

import { evaluateFixtures } from '../scripts/evaluate-fixtures.mjs';

const execFileAsync = promisify(execFile);

test('local evaluation fixtures all match deterministic prompt expectations', async () => {
  const report = await evaluateFixtures('./examples/evaluation-fixtures.json');

  assert.equal(report.failed, 0);
  assert.ok(report.passed >= 6);
});

test('fixture evaluation script prints a concise passing report', async () => {
  const { stdout } = await execFileAsync(process.execPath, ['./scripts/evaluate-fixtures.mjs']);

  assert.match(stdout, /Prompt Lab fixture evaluation/);
  assert.match(stdout, /failed: 0/);
});
