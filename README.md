# Prompt Lab

Offline prompt engineering playground that turns rough task descriptions into structured, reusable prompts.

Prompt Lab does not call an AI model. It uses deterministic prompt patterns, keyword analysis, and category-specific templates, so it runs without an API key and is easy to inspect.

## Demo

Try it online: https://felixwardus.github.io/prompt-lab/

## Features

- Converts a rough requirement into a structured prompt.
- Detects common task types automatically: support, developer, summarization, extraction, translation, writing, RAG, and planning.
- Shows the prompt patterns used, such as role framing, structured output, constraint setting, source grounding, and verification loops.
- Provides both a browser UI and a CLI from the same shared engine.
- Runs fully offline after cloning the repository.
- Localizes the browser UI in English, Simplified Chinese, Hindi, Spanish, Arabic, French, Portuguese, and Japanese.
- Covers practical prompt categories including marketing, research, data analysis, legal review, learning, and product management.
- Saves drafts in the browser and imports or exports Prompt Lab drafts as JSON.
- Scores generated prompts with a deterministic local quality checklist.
- Includes local fixture evaluation for regression checks.

## Quick Start

```bash
npm test
npm run evaluate
npm run cli -- "Summarize meeting notes, extract decisions and action items, and output in Chinese."
npm run serve
```

Then open:

```text
http://localhost:4173
```

Do not open `web/index.html` by double-clicking it. The browser can block local JavaScript modules from `file://` pages, which prevents the generator from starting.

The browser UI uses your saved language choice first, then your browser language. If neither matches a supported language, it falls back to English.

The browser UI can save one local draft in your browser storage. Use Export JSON when you want a portable draft file, and Import JSON to restore it later.

## CLI Usage

Generate a readable prompt:

```bash
npm run cli -- "Write a prompt for a support bot that answers refund policy questions politely."
```

Generate JSON for automation:

```bash
npm run cli -- --json "Create a prompt that helps AI debug a React bug and propose a fix plan."
```

Pipe input from another command:

```bash
echo "Extract names, dates, and prices from a messy invoice" | npm run cli
```

## Local Evaluation

Run deterministic fixture checks:

```bash
npm run evaluate
```

The evaluation script checks example requirements against expected categories, variables, prompt patterns, output snippets, and the local prompt quality checklist. It does not call an AI model.

## Example Output

```text
Category: Developer task
Patterns: Role framing, Structured output, Constraint setting, Verification loop
Variables: {{code_snippet}}, {{error_message}}, {{expected_behavior}}

Role: You are a debugging assistant for software developers.

Task: Transform this rough requirement into a high-quality response: "Create a prompt that helps AI debug a React bug and propose a safe fix plan."

Input Variables:
{{code_snippet}}
{{error_message}}
{{expected_behavior}}

Output Format:
- Problem Summary
- Root Cause
- Fix Plan
- Suggested Patch
- Verification Steps
```

## Project Structure

```text
prompt-lab/
  bin/                  CLI entry point
  docs/                 Prompt engineering notes
  examples/             Example requirements
  scripts/              Local static server
  src/                  Shared prompt engine
  test/                 Node test runner tests
  web/                  Static browser UI
```

## Prompt Patterns

Prompt Lab currently uses these reusable patterns:

- Role framing: assign the model a clear job before asking for output.
- Structured output: specify sections or schema instead of asking for a loose answer.
- Constraint setting: state what the model should avoid or ask about.
- Source grounding: require answers to stay close to provided source text.
- Safety boundaries: prevent unsupported promises or invented policy.
- Verification loop: ask for risks, assumptions, and verification steps.

More details are in [docs/prompt-patterns.md](docs/prompt-patterns.md).

## Limitations

- This is a prompt builder, not an AI chatbot.
- It does not evaluate whether the generated prompt works well with a specific model.
- Category detection is simple and deterministic, so unusual wording may fall back to the general template.

## Roadmap

- Add more localized category copy for the expanded prompt categories.
- Add named draft collections instead of a single saved browser draft.
- Add more fixture coverage for multilingual prompts and edge-case category detection.
- Add optional checklist explanations in exported draft reports.

## License

MIT
