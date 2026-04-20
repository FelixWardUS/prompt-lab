const ADVANCED_PATTERN_IDS = new Set([
  'source-grounding',
  'safety-boundaries',
  'verification-loop',
  'few-shot-ready',
]);

const ROLE_HEADING_PATTERN = /(^|\n)(Role:|角色：|भूमिका:|Rol:|الدور:|役割：|Rôle :|Papel:)/;

function hasText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function includesAll(haystack, needles) {
  return needles.every((needle) => hasText(needle) && haystack.includes(needle));
}

function makeCheck(id, label, passed, guidance) {
  return {
    id,
    label,
    passed,
    guidance,
  };
}

export function evaluatePromptQuality(result) {
  const prompt = result?.prompt ?? '';
  const analysis = result?.analysis ?? {};
  const variables = result?.variables ?? analysis.variables ?? [];
  const patterns = result?.patternsUsed ?? analysis.patterns ?? [];
  const outputFormat = analysis.outputFormat ?? [];
  const constraints = analysis.constraints ?? [];
  const requirement = analysis.requirement ?? result?.input ?? '';

  const variableTokens = variables.map((variable) => variable.token ?? `{{${variable.name}}}`);
  const patternIds = patterns.map((pattern) => pattern.id);

  const checks = [
    makeCheck(
      'role-framing',
      'Role framing',
      patternIds.includes('role-framing') && ROLE_HEADING_PATTERN.test(prompt),
      'Include a clear role so the model knows what job it is doing.'
    ),
    makeCheck(
      'task-clarity',
      'Task clarity',
      hasText(requirement) && prompt.includes(requirement),
      'Restate the user requirement inside the generated task.'
    ),
    makeCheck(
      'input-variables',
      'Input variables',
      variableTokens.length > 0 && includesAll(prompt, variableTokens),
      'Expose concrete input variables such as source text, goals, or constraints.'
    ),
    makeCheck(
      'constraints',
      'Constraints',
      constraints.length >= 3 && includesAll(prompt, constraints.slice(0, 3)),
      'Include enough boundaries to prevent vague or unsupported output.'
    ),
    makeCheck(
      'structured-output',
      'Structured output',
      outputFormat.length >= 3 && includesAll(prompt, outputFormat),
      'Name the sections or schema expected in the answer.'
    ),
    makeCheck(
      'language-guidance',
      'Language guidance',
      hasText(analysis.language) && prompt.toLowerCase().includes(String(analysis.language).toLowerCase()),
      'State the intended answer language.'
    ),
    makeCheck(
      'advanced-pattern',
      'Advanced prompt pattern',
      patternIds.some((patternId) => ADVANCED_PATTERN_IDS.has(patternId)),
      'Use a pattern such as grounding, safety boundaries, examples, or verification.'
    ),
  ];

  return {
    passed: checks.filter((check) => check.passed).length,
    total: checks.length,
    checks,
  };
}
