import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { generatePrompt } from '../src/prompt-engine.mjs';
import { evaluatePromptQuality } from '../src/prompt-quality.mjs';

function missingItems(actualItems, expectedItems) {
  return expectedItems.filter((item) => !actualItems.includes(item));
}

function evaluateFixture(fixture) {
  const result = generatePrompt(fixture.requirement);
  const quality = evaluatePromptQuality(result);
  const expected = fixture.expected;
  const failures = [];

  if (result.analysis.category.id !== expected.category) {
    failures.push(`category expected ${expected.category}, got ${result.analysis.category.id}`);
  }

  if (result.analysis.language !== expected.language) {
    failures.push(`language expected ${expected.language}, got ${result.analysis.language}`);
  }

  const missingVariables = missingItems(
    result.variables.map((variable) => variable.name),
    expected.variables ?? []
  );
  if (missingVariables.length > 0) {
    failures.push(`missing variables: ${missingVariables.join(', ')}`);
  }

  const missingPatterns = missingItems(
    result.patternsUsed.map((pattern) => pattern.id),
    expected.patterns ?? []
  );
  if (missingPatterns.length > 0) {
    failures.push(`missing patterns: ${missingPatterns.join(', ')}`);
  }

  const missingSnippets = missingItems(result.prompt, expected.promptIncludes ?? []);
  if (missingSnippets.length > 0) {
    failures.push(`missing prompt text: ${missingSnippets.join(', ')}`);
  }

  if (quality.passed !== quality.total) {
    failures.push(`quality checklist passed ${quality.passed}/${quality.total}`);
  }

  return {
    name: fixture.name,
    passed: failures.length === 0,
    failures,
  };
}

export async function evaluateFixtures(filePath = './examples/evaluation-fixtures.json') {
  const fixtures = JSON.parse(await readFile(filePath, 'utf8'));
  const results = fixtures.map(evaluateFixture);
  const failed = results.filter((result) => !result.passed).length;

  return {
    total: results.length,
    passed: results.length - failed,
    failed,
    results,
  };
}

export function formatEvaluationReport(report) {
  return [
    'Prompt Lab fixture evaluation',
    `total: ${report.total}`,
    `passed: ${report.passed}`,
    `failed: ${report.failed}`,
    '',
    ...report.results.map((result) => {
      if (result.passed) return `PASS ${result.name}`;
      return `FAIL ${result.name}: ${result.failures.join('; ')}`;
    }),
  ].join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = await evaluateFixtures(process.argv[2] ?? './examples/evaluation-fixtures.json');
  console.log(formatEvaluationReport(report));
  if (report.failed > 0) {
    process.exitCode = 1;
  }
}
