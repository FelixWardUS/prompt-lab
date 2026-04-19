import assert from 'node:assert/strict';
import test from 'node:test';

import { analyzeRequirement, generatePrompt } from '../src/prompt-engine.mjs';

test('analyzes a support request without requiring a selected category', () => {
  const analysis = analyzeRequirement('帮我写一个客服机器人提示词，用来回答退款政策，要礼貌并且不要承诺人工审核结果');

  assert.equal(analysis.category.id, 'support');
  assert.ok(analysis.constraints.includes('语气保持礼貌、清晰、务实。'));
  assert.ok(analysis.constraints.includes('不要承诺政策内容中没有明确说明的结果。'));
  assert.ok(analysis.patterns.some((pattern) => pattern.id === 'safety-boundaries'));
});

test('generates a structured reusable prompt from a rough requirement', () => {
  const result = generatePrompt('帮我总结会议记录，提取决定和待办事项，用中文输出');

  assert.equal(result.analysis.category.id, 'summarization');
  assert.match(result.prompt, /角色：/);
  assert.match(result.prompt, /任务：/);
  assert.match(result.prompt, /输出格式：/);
  assert.match(result.prompt, /决定事项/);
  assert.match(result.prompt, /待办事项/);
  assert.match(result.prompt, /语言：中文/);
  assert.ok(result.variables.some((variable) => variable.name === 'source_text'));
});

test('detects developer requests and adds implementation-focused output guidance', () => {
  const result = generatePrompt('帮我生成一个提示词，让 AI 分析一段 React 代码里的 bug，并给出修复方案');

  assert.equal(result.analysis.category.id, 'developer');
  assert.match(result.prompt, /调试助手/);
  assert.match(result.prompt, /根因分析/);
  assert.match(result.prompt, /修复计划/);
  assert.ok(result.patternsUsed.some((pattern) => pattern.id === 'verification-loop'));
});

test('detects automation program requests instead of treating 写 as copywriting', () => {
  const result = generatePrompt('写个跟单机器人程序');

  assert.equal(result.analysis.category.id, 'developer');
  assert.equal(result.analysis.category.label, '开发者任务');
  assert.match(result.prompt, /软件实现助手/);
  assert.match(result.prompt, /需求摘要/);
  assert.match(result.prompt, /实现计划/);
  assert.doesNotMatch(result.prompt, /Why This Works/);
});

test('infers Chinese output language from Chinese input', () => {
  const result = generatePrompt('写个跟单机器人程序');

  assert.equal(result.analysis.language, 'Chinese');
  assert.match(result.prompt, /最终回答请使用中文。/);
  assert.match(result.prompt, /语言：中文/);
  assert.doesNotMatch(result.prompt, /same language as the user input/);
});

test('renders Chinese prompt scaffolding for Chinese requirements', () => {
  const result = generatePrompt('写个跟单机器人');

  assert.match(result.prompt, /角色：/);
  assert.match(result.prompt, /任务：/);
  assert.match(result.prompt, /输入变量：/);
  assert.match(result.prompt, /执行要求：/);
  assert.match(result.prompt, /约束：/);
  assert.match(result.prompt, /输出格式：/);
  assert.match(result.prompt, /需求摘要/);
  assert.match(result.prompt, /实现计划/);
  assert.doesNotMatch(result.prompt, /Role:/);
  assert.doesNotMatch(result.prompt, /Output Format:/);
});

test('localizes pattern names and descriptions for Chinese requirements', () => {
  const result = generatePrompt('写个跟单机器人');

  assert.deepEqual(
    result.patternsUsed.map((pattern) => pattern.name),
    ['角色设定', '结构化输出', '约束设置', '验证闭环']
  );
  assert.ok(result.patternsUsed.every((pattern) => /[\u3400-\u9fff]/.test(pattern.description)));
  assert.ok(result.analysis.patterns.every((pattern) => /[\u3400-\u9fff]/.test(pattern.name)));
});

test('renders Spanish prompts from Spanish input', () => {
  const result = generatePrompt('Escribe un prompt para un bot de soporte que responda preguntas de reembolso.');

  assert.equal(result.analysis.language, 'Spanish');
  assert.match(result.prompt, /Rol:/);
  assert.match(result.prompt, /Formato de salida:/);
  assert.match(result.prompt, /Idioma: español/);
  assert.equal(result.analysis.category.label, 'Soporte al cliente');
  assert.ok(result.patternsUsed.every((pattern) => pattern.name !== 'Role framing'));
});

test('renders Arabic prompts from Arabic input', () => {
  const result = generatePrompt('اكتب تعليمة لروبوت دعم يجيب عن سياسة الاسترداد.');

  assert.equal(result.analysis.language, 'Arabic');
  assert.match(result.prompt, /الدور:/);
  assert.match(result.prompt, /تنسيق الإخراج:/);
  assert.match(result.prompt, /اللغة: العربية/);
  assert.equal(result.analysis.category.label, 'دعم العملاء');
});

test('renders Japanese prompts from Japanese input', () => {
  const result = generatePrompt('返金ポリシーに答えるサポートボットのプロンプトを書いてください。');

  assert.equal(result.analysis.language, 'Japanese');
  assert.match(result.prompt, /役割：/);
  assert.match(result.prompt, /出力形式：/);
  assert.match(result.prompt, /言語：日本語/);
});

test('renders Hindi prompts from Hindi input', () => {
  const result = generatePrompt('रिफंड नीति के सवालों का जवाब देने वाले सपोर्ट बॉट के लिए प्रॉम्प्ट लिखें।');

  assert.equal(result.analysis.language, 'Hindi');
  assert.match(result.prompt, /भूमिका:/);
  assert.match(result.prompt, /आउटपुट प्रारूप:/);
  assert.match(result.prompt, /भाषा: हिन्दी/);
});

test('renders French prompts from French input', () => {
  const result = generatePrompt('Rédige un prompt pour un bot de support qui répond aux questions de remboursement.');

  assert.equal(result.analysis.language, 'French');
  assert.match(result.prompt, /Rôle :/);
  assert.match(result.prompt, /Instructions :/);
  assert.match(result.prompt, /Langue : français/);
  assert.equal(result.analysis.category.label, 'Support client');
  assert.doesNotMatch(result.prompt, /Instrucciones/);
});

test('renders Portuguese prompts from Portuguese input', () => {
  const result = generatePrompt('Escreva um prompt para um bot de suporte responder perguntas sobre reembolso.');

  assert.equal(result.analysis.language, 'Portuguese');
  assert.match(result.prompt, /Papel:/);
  assert.match(result.prompt, /Instruções:/);
  assert.match(result.prompt, /Idioma: português/);
  assert.equal(result.analysis.category.label, 'Suporte ao cliente');
  assert.doesNotMatch(result.prompt, /Instrucciones/);
});

test('throws a helpful error for empty requirements', () => {
  assert.throws(
    () => generatePrompt('   '),
    /Please describe the task you want to turn into a prompt./
  );
});
