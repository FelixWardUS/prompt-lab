import assert from 'node:assert/strict';
import test from 'node:test';

import { generatePrompt } from '../src/prompt-engine.mjs';
import { evaluatePromptQuality } from '../src/prompt-quality.mjs';

test('evaluates a generated prompt with a passing checklist', () => {
  const result = generatePrompt('Write a data analysis prompt for a CSV dataset that explains trends and caveats.');
  const quality = evaluatePromptQuality(result);

  assert.equal(quality.total, 7);
  assert.equal(quality.passed, 7);
  assert.ok(quality.checks.every((check) => check.passed));
  assert.deepEqual(
    quality.checks.map((check) => check.id),
    [
      'role-framing',
      'task-clarity',
      'input-variables',
      'constraints',
      'structured-output',
      'language-guidance',
      'advanced-pattern',
    ]
  );
});

test('flags incomplete prompt artifacts', () => {
  const quality = evaluatePromptQuality({
    prompt: 'Task: explain this.',
    analysis: {
      requirement: 'explain this',
      constraints: [],
      outputFormat: [],
      language: '',
    },
    variables: [],
    patternsUsed: [],
  });

  assert.equal(quality.total, 7);
  assert.ok(quality.passed < quality.total);
  assert.deepEqual(
    quality.checks.filter((check) => !check.passed).map((check) => check.id),
    [
      'role-framing',
      'input-variables',
      'constraints',
      'structured-output',
      'language-guidance',
      'advanced-pattern',
    ]
  );
});
