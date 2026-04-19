import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);

test('CLI generates a readable prompt from an inline requirement', async () => {
  const { stdout } = await execFileAsync('node', [
    './bin/prompt-lab.mjs',
    '帮我写一个提示词，让 AI 分析 React bug',
  ]);

  assert.match(stdout, /Category: 开发者任务/);
  assert.match(stdout, /角色：/);
  assert.match(stdout, /输出格式：/);
  assert.match(stdout, /根因分析/);
});

test('CLI can return JSON for automation', async () => {
  const { stdout } = await execFileAsync('node', [
    './bin/prompt-lab.mjs',
    '--json',
    '总结会议记录，输出决定和待办',
  ]);

  const parsed = JSON.parse(stdout);
  assert.equal(parsed.analysis.category.id, 'summarization');
  assert.equal(parsed.analysis.category.label, '总结摘要');
  assert.match(parsed.prompt, /待办事项/);
});
