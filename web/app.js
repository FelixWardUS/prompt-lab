import { generatePrompt } from '../src/prompt-engine.mjs';
import {
  SUPPORTED_LANGUAGES,
  getInitialLanguage,
  getLanguage,
  translate,
} from '../src/i18n.mjs';

const LANGUAGE_STORAGE_KEY = 'prompt-lab-language';

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

function renderResult(result) {
  category.textContent = `${t('result.categoryLabel')}: ${result.analysis.category.label}`;
  language.textContent = `${t('result.languageLabel')}: ${result.analysis.language}`;
  generatedPrompt.textContent = result.prompt;
  renderList(variables, result.variables, (variable) => variable.token);
  renderList(patterns, result.patternsUsed, (pattern) => `${pattern.name}: ${pattern.description}`);
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
  category.textContent = `${t('result.categoryLabel')}: ${t('result.categoryWaiting')}`;
  language.textContent = `${t('result.languageLabel')}: ${t('result.languageAuto')}`;
  generatedPrompt.textContent = t('result.initial');
  status.textContent = t('status.ready');
  variables.replaceChildren();
  patterns.replaceChildren();
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

renderStaticCopy();
