# Prompt Lab Roadmap Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the README roadmap features as tested, offline Prompt Lab functionality.

**Architecture:** Keep the shared prompt engine deterministic and dependency-free. Add one quality module, one local fixture evaluation script, and browser-only draft import/export behavior in the existing static UI.

**Tech Stack:** Node.js ESM, `node:test`, static HTML/CSS/JavaScript, localStorage, browser File/Blob APIs.

---

### Task 1: Expanded Categories and Examples

**Files:**
- Modify: `src/prompt-engine.mjs`
- Modify: `src/i18n.mjs`
- Modify: `examples/requirements.md`
- Test: `test/prompt-engine.test.mjs`

- [ ] Write failing tests for `marketing`, `research`, `data-analysis`, `legal-review`, `learning`, and `product-management` category detection.
- [ ] Run `npm test -- test/prompt-engine.test.mjs` and confirm the new tests fail because categories are missing.
- [ ] Add category definitions with keywords, variables, output formats, constraints, and patterns.
- [ ] Add category examples to browser example copy and `examples/requirements.md`.
- [ ] Run `npm test -- test/prompt-engine.test.mjs` and confirm the tests pass.
- [ ] Commit as `feat: expand prompt categories`.

### Task 2: Quality Checklist and Local Evaluation

**Files:**
- Create: `src/prompt-quality.mjs`
- Create: `test/prompt-quality.test.mjs`
- Create: `examples/evaluation-fixtures.json`
- Create: `scripts/evaluate-fixtures.mjs`
- Modify: `package.json`

- [ ] Write failing tests for checklist pass/fail behavior and fixture script output.
- [ ] Run the targeted tests and confirm they fail because the module and script are missing.
- [ ] Implement deterministic checklist rules and fixture evaluation.
- [ ] Add `npm run evaluate`.
- [ ] Run targeted tests and `npm run evaluate`.
- [ ] Commit as `feat: add prompt quality evaluation`.

### Task 3: Draft Import and Export UI

**Files:**
- Modify: `web/index.html`
- Modify: `web/app.js`
- Modify: `web/styles.css`
- Modify: `src/i18n.mjs`
- Test: `test/web-assets.test.mjs`

- [ ] Write failing web asset tests for draft controls, import file input, and quality checklist wiring.
- [ ] Run `npm test -- test/web-assets.test.mjs` and confirm the tests fail because controls are absent.
- [ ] Add browser controls for save, load, export, import, and clear.
- [ ] Wire controls to localStorage and JSON file import/export.
- [ ] Render the prompt quality checklist after generate, load, and import.
- [ ] Run the targeted tests.
- [ ] Commit as `feat: add draft import export workflow`.

### Task 4: Documentation and Verification

**Files:**
- Modify: `README.md`

- [ ] Update README features, quick start, examples, and roadmap status.
- [ ] Run `npm test`.
- [ ] Run `npm run evaluate`.
- [ ] Run `npm run build:pages`.
- [ ] Commit as `docs: document roadmap features`.
