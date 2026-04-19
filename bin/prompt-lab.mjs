#!/usr/bin/env node
import { generatePrompt } from '../src/prompt-engine.mjs';

const HELP = `Prompt Lab

Usage:
  prompt-lab "describe the prompt you need"
  prompt-lab --json "summarize meeting notes and extract action items"
  echo "write a support bot prompt for refund policy" | prompt-lab

Options:
  --json    Print the full result as JSON
  --help    Show this help message
`;

function parseArgs(args) {
  return {
    json: args.includes('--json'),
    help: args.includes('--help') || args.includes('-h'),
    requirement: args.filter((arg) => !arg.startsWith('--')).join(' '),
  };
}

async function readStdin() {
  if (process.stdin.isTTY) return '';

  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8').trim();
}

function renderText(result) {
  const patterns = result.patternsUsed.map((pattern) => pattern.name).join(', ');
  const variables = result.variables.map((variable) => variable.token).join(', ');

  return [
    `Category: ${result.analysis.category.label}`,
    `Patterns: ${patterns}`,
    `Variables: ${variables}`,
    '',
    result.prompt,
    '',
  ].join('\n');
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    process.stdout.write(HELP);
    return;
  }

  const requirement = options.requirement || await readStdin();
  const result = generatePrompt(requirement);

  if (options.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  process.stdout.write(renderText(result));
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
