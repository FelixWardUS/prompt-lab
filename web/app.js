import { generatePrompt } from '../src/prompt-engine.mjs';
import { evaluatePromptQuality } from '../src/prompt-quality.mjs';
import {
  SUPPORTED_LANGUAGES,
  getInitialLanguage,
  getLanguage,
  translate,
} from '../src/i18n.mjs';

const LANGUAGE_STORAGE_KEY = 'prompt-lab-language';
const PROMPT_DRAFT_STORAGE_KEY = 'prompt-lab-draft';
const DRAFT_VERSION = 1;

const form = document.querySelector('#prompt-form');
const requirement = document.querySelector('#requirement');
const generatedPrompt = document.querySelector('#generated-prompt');
const category = document.querySelector('#category');
const language = document.querySelector('#language');
const variables = document.querySelector('#variables');
const patterns = document.querySelector('#patterns');
const generateButton = document.querySelector('#generate-prompt');
const languageSelect = document.querySelector('#ui-language');
const examplesRoot = document.querySelector('#examples');
const copyButton = document.querySelector('#copy-prompt');
const status = document.querySelector('#status');
const qualityChecks = document.querySelector('#quality-checks');
const saveDraftButton = document.querySelector('#save-draft');
const loadDraftButton = document.querySelector('#load-draft');
const exportDraftButton = document.querySelector('#export-draft');
const importDraftInput = document.querySelector('#import-draft');
const clearDraftButton = document.querySelector('#clear-draft');
const descriptionMeta = document.querySelector('meta[name="description"]');

function readStoredLanguage() {
  try {
    return globalThis.localStorage?.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return undefined;
  }
}

function persistLanguage(languageCode) {
  try {
    globalThis.localStorage?.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch {
    // Keep the selected language in memory if storage is unavailable.
  }
}

const state = {
  language: getInitialLanguage(navigator.languages ?? [navigator.language], readStoredLanguage()),
  result: undefined,
  quality: undefined,
};

function t(key) {
  return translate(state.language, key);
}

function renderList(root, items, renderItem) {
  root.replaceChildren(...items.map((item) => {
    const element = document.createElement('li');
    element.textContent = renderItem(item);
    return element;
  }));
}

function renderQuality(quality = state.quality) {
  if (!quality) {
    const item = document.createElement('li');
    item.className = 'quality-empty';
    item.textContent = t('quality.waiting');
    qualityChecks.replaceChildren(item);
    return;
  }

  const items = quality.checks.map((check) => {
    const item = document.createElement('li');
    item.className = check.passed ? 'quality-pass' : 'quality-review';
    const statusLabel = check.passed ? t('quality.pass') : t('quality.review');
    item.textContent = `${statusLabel}: ${check.label}`;
    item.title = check.guidance;
    return item;
  });

  qualityChecks.replaceChildren(...items);
}

function renderResult(result) {
  state.result = result;
  state.quality = evaluatePromptQuality(result);
  category.textContent = `${t('result.categoryLabel')}: ${result.analysis.category.label}`;
  language.textContent = `${t('result.languageLabel')}: ${result.analysis.language}`;
  generatedPrompt.textContent = result.prompt;
  renderList(variables, result.variables, (variable) => variable.token);
  renderList(patterns, result.patternsUsed, (pattern) => `${pattern.name}: ${pattern.description}`);
  renderQuality();
}

function resetResult() {
  state.result = undefined;
  state.quality = undefined;
  category.textContent = `${t('result.categoryLabel')}: ${t('result.categoryWaiting')}`;
  language.textContent = `${t('result.languageLabel')}: ${t('result.languageAuto')}`;
  generatedPrompt.textContent = t('result.initial');
  variables.replaceChildren();
  patterns.replaceChildren();
  renderQuality();
}

function generateFromInput() {
  try {
    const result = generatePrompt(requirement.value);
    renderResult(result);
    status.textContent = t('status.generated');
  } catch (error) {
    status.textContent = t('status.empty') || error.message;
  }
}

function createDraft(timestampKey) {
  return {
    version: DRAFT_VERSION,
    requirement: requirement.value,
    result: state.result ?? null,
    quality: state.quality ?? null,
    [timestampKey]: new Date().toISOString(),
  };
}

function isDraft(value) {
  return value && typeof value === 'object' && typeof value.requirement === 'string';
}

function applyDraft(draft) {
  if (!isDraft(draft)) {
    throw new Error('Invalid draft');
  }

  requirement.value = draft.requirement;
  if (draft.result?.prompt && draft.result?.analysis) {
    renderResult(draft.result);
  } else {
    resetResult();
  }
}

function saveDraft() {
  try {
    globalThis.localStorage?.setItem(PROMPT_DRAFT_STORAGE_KEY, JSON.stringify(createDraft('savedAt')));
    status.textContent = t('status.draftSaved');
  } catch {
    status.textContent = t('status.draftInvalid');
  }
}

function loadDraft() {
  try {
    const stored = globalThis.localStorage?.getItem(PROMPT_DRAFT_STORAGE_KEY);
    if (!stored) {
      status.textContent = t('status.draftMissing');
      return;
    }

    applyDraft(JSON.parse(stored));
    status.textContent = t('status.draftLoaded');
  } catch {
    status.textContent = t('status.draftInvalid');
  }
}

function exportDraft() {
  const draft = createDraft('exportedAt');
  const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `prompt-lab-draft-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  status.textContent = t('status.draftExported');
}

function importDraft(file) {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    try {
      applyDraft(JSON.parse(String(reader.result)));
      status.textContent = t('status.draftImported');
    } catch {
      status.textContent = t('status.draftInvalid');
    }
  });

  reader.addEventListener('error', () => {
    status.textContent = t('status.draftInvalid');
  });

  reader.readAsText(file);
}

function clearDraft() {
  try {
    globalThis.localStorage?.removeItem(PROMPT_DRAFT_STORAGE_KEY);
  } catch {
    // Clearing the in-memory UI state still works if storage is unavailable.
  }
  status.textContent = t('status.draftCleared');
}

function mountExamples() {
  const examples = t('examples');
  const buttons = examples.map((example) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'example';
    button.textContent = example;
    button.addEventListener('click', () => {
      requirement.value = example;
      generateFromInput();
    });
    return button;
  });

  examplesRoot.replaceChildren(...buttons);
}

function renderLanguageOptions() {
  const options = SUPPORTED_LANGUAGES.map((supportedLanguage) => {
    const option = document.createElement('option');
    option.value = supportedLanguage.code;
    option.textContent = supportedLanguage.label;
    option.selected = supportedLanguage.code === state.language;
    return option;
  });

  languageSelect.replaceChildren(...options);
}

function renderStaticCopy() {
  const activeLanguage = getLanguage(state.language);

  document.documentElement.lang = activeLanguage.code;
  document.documentElement.dir = activeLanguage.dir;
  document.title = t('meta.title');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', t('meta.description'));
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  requirement.placeholder = t('form.placeholder');
  resetResult();
  status.textContent = t('status.ready');
  renderLanguageOptions();
  mountExamples();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  generateFromInput();
});

generateButton.addEventListener('click', generateFromInput);

languageSelect.addEventListener('change', () => {
  state.language = getLanguage(languageSelect.value).code;
  persistLanguage(state.language);
  renderStaticCopy();
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(generatedPrompt.textContent);
  status.textContent = t('status.copied');
});

saveDraftButton.addEventListener('click', saveDraft);
loadDraftButton.addEventListener('click', loadDraft);
exportDraftButton.addEventListener('click', exportDraft);
clearDraftButton.addEventListener('click', clearDraft);

importDraftInput.addEventListener('change', () => {
  const file = importDraftInput.files?.[0];
  if (file) {
    importDraft(file);
  }
  importDraftInput.value = '';
});

renderStaticCopy();
