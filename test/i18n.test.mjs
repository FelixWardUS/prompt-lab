import assert from 'node:assert/strict';
import test from 'node:test';

import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  getInitialLanguage,
  getLanguage,
  translate,
} from '../src/i18n.mjs';

test('supported languages match the timezone overlap finder language set', () => {
  assert.equal(DEFAULT_LANGUAGE, 'en');
  assert.deepEqual(
    SUPPORTED_LANGUAGES.map((language) => language.code),
    ['en', 'zh-CN', 'hi', 'es', 'ar', 'fr', 'pt', 'ja']
  );
});

test('browser language preference resolves exact and base language matches', () => {
  assert.equal(getInitialLanguage(['zh-CN', 'en-US']), 'zh-CN');
  assert.equal(getInitialLanguage(['es-MX', 'en-US']), 'es');
  assert.equal(getInitialLanguage(['pt-BR', 'en-US']), 'pt');
  assert.equal(getInitialLanguage(['de-DE']), 'en');
});

test('language metadata includes rtl direction for Arabic', () => {
  assert.equal(getLanguage('ar').dir, 'rtl');
  assert.equal(getLanguage('ja').dir, 'ltr');
  assert.equal(getLanguage('unknown').code, 'en');
});

test('translate falls back to English for missing keys', () => {
  assert.equal(translate('zh-CN', 'actions.generate'), '生成提示词');
  assert.equal(translate('xx', 'actions.generate'), 'Generate Prompt');
});

test('new draft and quality UI copy is localized for every supported language', () => {
  const localizedKeys = [
    'actions.saveDraft',
    'actions.loadDraft',
    'actions.exportDraft',
    'actions.importDraft',
    'actions.clearDraft',
    'status.draftSaved',
    'status.draftLoaded',
    'status.draftMissing',
    'status.draftExported',
    'status.draftImported',
    'status.draftCleared',
    'status.draftInvalid',
    'details.quality',
    'quality.waiting',
    'quality.pass',
    'quality.review',
  ];

  for (const language of SUPPORTED_LANGUAGES.filter((item) => item.code !== DEFAULT_LANGUAGE)) {
    for (const key of localizedKeys) {
      assert.notEqual(
        translate(language.code, key),
        translate(DEFAULT_LANGUAGE, key),
        `${language.code} should localize ${key}`
      );
    }
  }

  assert.equal(translate('ja', 'details.quality'), 'プロンプト品質チェックリスト');
  assert.equal(translate('ja', 'quality.waiting'), 'プロンプトを生成すると品質チェックが表示されます。');
});
