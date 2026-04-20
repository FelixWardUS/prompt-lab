# Prompt Lab Roadmap Features Design

## Goal

Implement the README roadmap items while keeping Prompt Lab offline, dependency-free, and easy to inspect.

## Scope

The update adds six practical prompt categories, broader examples, draft import/export, local fixture evaluation, and a browser quality checklist. The app remains a static browser UI plus CLI built on shared Node modules.

## Architecture

- `src/prompt-engine.mjs` continues to own deterministic requirement analysis and prompt generation.
- `src/prompt-quality.mjs` owns reusable checklist rules for prompt quality.
- `scripts/evaluate-fixtures.mjs` runs local fixture checks against `examples/evaluation-fixtures.json`.
- `web/app.js` owns browser-only draft persistence, import, export, and UI state.

## Categories

Add these categories to the prompt engine:

- `marketing`
- `research`
- `data-analysis`
- `legal-review`
- `learning`
- `product-management`

Each category has keywords, variables, output format, constraints, and prompt patterns. Non-English prompt scaffolding can reuse localized headings and general instructions while falling back to English category labels/copy when category-specific translation is unavailable.

## Draft Import and Export

Browser draft data is JSON with:

- `version`
- `requirement`
- `result`
- `quality`
- `savedAt` or `exportedAt`

Saving and loading use `localStorage`. Export downloads a JSON file. Import reads the selected JSON file, validates basic shape, restores the requirement, and renders any included result.

## Local Evaluation

Fixture evaluation is deterministic. Each fixture declares an input requirement and expected category, language, variables, patterns, and output snippets. The script exits with code `1` if a fixture fails and prints a concise report.

## Quality Checklist

The checklist evaluates generated prompt objects, not model output. It checks for role framing, task clarity, variables, constraints, structured output, language guidance, and relevant advanced patterns such as source grounding or verification loops.

## Testing

Tests cover category detection, fixture evaluation, quality checklist behavior, web asset wiring, and draft JSON helpers. Full verification is `npm test` and `npm run build:pages`.
