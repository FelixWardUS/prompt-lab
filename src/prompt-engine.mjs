const BASE_PATTERNS = [
  {
    id: 'role-framing',
    name: 'Role framing',
    description: 'Give the model a clear role before describing the task.',
  },
  {
    id: 'structured-output',
    name: 'Structured output',
    description: 'Specify the exact sections or schema expected in the answer.',
  },
  {
    id: 'constraint-setting',
    name: 'Constraint setting',
    description: 'Make boundaries explicit so the model avoids unsupported assumptions.',
  },
];

const EXTRA_PATTERNS = {
  grounding: {
    id: 'source-grounding',
    name: 'Source grounding',
    description: 'Require the answer to stay grounded in the provided source text.',
  },
  safety: {
    id: 'safety-boundaries',
    name: 'Safety boundaries',
    description: 'State what the assistant must not promise, invent, or decide.',
  },
  verification: {
    id: 'verification-loop',
    name: 'Verification loop',
    description: 'Ask the model to identify assumptions, risks, and verification steps.',
  },
  fewShot: {
    id: 'few-shot-ready',
    name: 'Few-shot ready',
    description: 'Leave space for examples without requiring them in the first version.',
  },
};

const CATEGORIES = [
  {
    id: 'support',
    label: 'Customer support',
    role: 'You are a polite customer support assistant that answers using only the provided policy context.',
    keywords: [
      '客服',
      '客户',
      '售后',
      '退款',
      '退货',
      '投诉',
      '工单',
      'support',
      'customer',
      'refund',
      'policy',
      'soporte',
      'reembolso',
      'suporte',
      'remboursement',
      'دعم',
      'استرداد',
      'サポート',
      '返金',
      'सपोर्ट',
      'रिफंड',
    ],
    variables: ['policy_context', 'customer_message'],
    outputFormat: ['Answer', 'Policy Basis', 'Next Step', 'Escalation Needed'],
    patterns: [EXTRA_PATTERNS.grounding, EXTRA_PATTERNS.safety],
    constraints: [
      'Keep the tone polite and practical.',
      'Avoid making promises that are not stated in the provided context.',
      'If the policy context is missing, ask for it before answering.',
    ],
  },
  {
    id: 'developer',
    label: 'Developer task',
    role: 'You are a software implementation assistant for developers.',
    keywords: [
      '代码',
      'bug',
      '报错',
      '修复',
      '函数',
      '接口',
      '程序',
      '开发',
      '脚本',
      '自动化',
      '机器人',
      '跟单',
      'api',
      'react',
      'vue',
      'python',
      'javascript',
      'typescript',
      'debug',
      'readme',
      'commit',
      'program',
      'automation',
      'bot',
      'build',
    ],
    variables: ['code_snippet', 'error_message', 'expected_behavior'],
    outputFormat: ['Requirements Summary', 'Assumptions', 'Implementation Plan', 'Suggested Structure', 'Verification Steps'],
    patterns: [EXTRA_PATTERNS.verification],
    constraints: [
      'Separate confirmed requirements from assumptions.',
      'Prefer a small, testable implementation plan.',
      'Include a concrete way to verify the result.',
    ],
  },
  {
    id: 'summarization',
    label: 'Summarization',
    role: 'You are a precise meeting summarizer who extracts decisions, action items, and open questions.',
    keywords: ['总结', '摘要', '会议', '纪要', '待办', '决定', 'summary', 'summarize', 'meeting', 'notes', 'action items'],
    variables: ['source_text'],
    outputFormat: ['Brief Summary', 'Decisions', 'Action Items', 'Open Questions'],
    patterns: [EXTRA_PATTERNS.grounding],
    constraints: [
      'Use only information from the source text.',
      'Separate confirmed facts from open questions.',
      'Keep the summary concise and scannable.',
    ],
  },
  {
    id: 'extraction',
    label: 'Information extraction',
    role: 'You are a careful data extraction assistant that converts messy text into structured data.',
    keywords: ['提取', '抽取', '结构化', '字段', 'json', 'csv', '表格', 'extract', 'schema', 'fields'],
    variables: ['source_text', 'target_schema'],
    outputFormat: ['Extracted Data', 'Missing Fields', 'Uncertain Items'],
    patterns: [EXTRA_PATTERNS.grounding],
    constraints: [
      'Return only fields supported by the input text.',
      'Mark missing or uncertain values instead of guessing.',
      'Preserve names, numbers, and dates exactly when possible.',
    ],
  },
  {
    id: 'translation',
    label: 'Translation',
    role: 'You are a translation assistant that preserves meaning, tone, and formatting.',
    keywords: ['翻译', '中译英', '英译中', 'translate', 'translation'],
    variables: ['source_text', 'target_language'],
    outputFormat: ['Translation', 'Notes'],
    patterns: [EXTRA_PATTERNS.fewShot],
    constraints: [
      'Preserve the original meaning and formatting.',
      'Avoid adding information that is not in the source text.',
      'Mention ambiguous phrases only when necessary.',
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    role: 'You are a practical writing assistant that turns rough intent into clear, useful copy.',
    keywords: ['写', '润色', '邮件', '文案', '标题', '文章', 'rewrite', 'email', 'copy', 'post'],
    variables: ['goal', 'audience', 'draft_or_notes'],
    outputFormat: ['Draft', 'Why This Works', 'Optional Variations'],
    patterns: [EXTRA_PATTERNS.fewShot],
    constraints: [
      'Match the target audience and tone.',
      'Avoid vague claims and unsupported exaggeration.',
      'Make the output ready to edit or send.',
    ],
  },
  {
    id: 'rag',
    label: 'RAG answer',
    role: 'You are a retrieval-grounded assistant that answers questions from provided document excerpts.',
    keywords: ['rag', '知识库', '文档问答', '引用', '检索', 'docs', 'retrieval', 'citations'],
    variables: ['question', 'retrieved_context'],
    outputFormat: ['Answer', 'Evidence', 'Limitations'],
    patterns: [EXTRA_PATTERNS.grounding, EXTRA_PATTERNS.safety],
    constraints: [
      'Use only the retrieved context as evidence.',
      'Cite the relevant excerpt or document name when available.',
      'Say when the context is insufficient.',
    ],
  },
  {
    id: 'planning',
    label: 'Planning',
    role: 'You are a planning assistant that breaks goals into practical next steps.',
    keywords: ['计划', '规划', '路线图', '步骤', '拆解', 'plan', 'roadmap', 'strategy'],
    variables: ['goal', 'constraints', 'deadline'],
    outputFormat: ['Goal', 'Assumptions', 'Plan', 'Risks', 'Next Actions'],
    patterns: [EXTRA_PATTERNS.verification],
    constraints: [
      'Keep the plan realistic and sequenced.',
      'Call out assumptions before making recommendations.',
      'Prefer small next actions over vague advice.',
    ],
  },
  {
    id: 'general',
    label: 'General assistant',
    role: 'You are a helpful assistant that turns a rough task into a clear, reusable answer.',
    keywords: [],
    variables: ['task_context'],
    outputFormat: ['Answer', 'Reasoning Summary', 'Next Step'],
    patterns: [EXTRA_PATTERNS.fewShot],
    constraints: [
      'Ask clarifying questions if the task is underspecified.',
      'Keep the answer specific and actionable.',
      'Avoid inventing facts that were not provided.',
    ],
  },
];

const LANGUAGE_HINTS = [
  { label: 'Chinese', keywords: ['中文', '汉语', '用中文', 'chinese'] },
  { label: 'English', keywords: ['英文', '英语', '用英文', 'english'] },
  { label: 'Hindi', keywords: ['hindi', 'हिन्दी', 'हिंदी'] },
  { label: 'Spanish', keywords: ['spanish', 'español', 'escribe', 'reembolso', 'soporte', 'preguntas'] },
  { label: 'Arabic', keywords: ['arabic', 'العربية'] },
  { label: 'French', keywords: ['french', 'français', 'rédige', 'remboursement'] },
  { label: 'Portuguese', keywords: ['portuguese', 'português', 'escreva', 'suporte'] },
  { label: 'Japanese', keywords: ['日文', '日语', 'japanese'] },
  { label: 'Korean', keywords: ['韩文', '韩语', 'korean'] },
];

const CJK_PATTERN = /[\u3400-\u9fff]/;
const HIRAGANA_KATAKANA_PATTERN = /[\u3040-\u30ff]/;
const HANGUL_PATTERN = /[\uac00-\ud7af]/;
const ARABIC_PATTERN = /[\u0600-\u06ff]/;
const DEVANAGARI_PATTERN = /[\u0900-\u097f]/;

const CHINESE_CATEGORY_COPY = {
  support: {
    label: '客服支持',
    role: '你是一个礼貌的客服助手，只能根据提供的政策内容回答用户问题。',
    outputFormat: ['回答', '政策依据', '下一步', '是否需要升级处理'],
    constraints: [
      '语气保持礼貌、清晰、务实。',
      '不要承诺政策内容中没有明确说明的结果。',
      '如果缺少政策上下文，请先要求用户补充。',
    ],
  },
  developer: {
    label: '开发者任务',
    role: '你是一个面向开发者的软件实现助手。',
    outputFormat: ['需求摘要', '关键假设', '实现计划', '建议结构', '验证步骤'],
    constraints: [
      '区分已确认需求和你的假设。',
      '优先给出小而可测试的实现方案。',
      '包含明确的验证方式。',
    ],
    debugRole: '你是一个面向开发者的调试助手。',
    debugOutputFormat: ['问题摘要', '根因分析', '修复计划', '建议补丁', '验证步骤'],
    debugConstraints: [
      '基于提供的代码和错误信息推理。',
      '不要重写无关代码。',
      '包含明确的修复验证方式。',
    ],
  },
  summarization: {
    label: '总结摘要',
    role: '你是一个精确的会议总结助手，负责提取决定、待办事项和开放问题。',
    outputFormat: ['简要总结', '决定事项', '待办事项', '开放问题'],
    constraints: [
      '只使用原文中的信息。',
      '区分已确认事实和开放问题。',
      '保持总结简洁、易扫读。',
    ],
  },
  writing: {
    label: '写作任务',
    role: '你是一个实用写作助手，能把粗略想法转成清晰、有用的文案。',
    outputFormat: ['草稿', '为什么这样写', '可选版本'],
    constraints: [
      '匹配目标受众和语气。',
      '避免空泛表述和没有依据的夸张。',
      '让输出可以直接编辑或使用。',
    ],
  },
  general: {
    label: '通用任务',
    role: '你是一个有帮助的助手，负责把粗略任务转成清晰、可复用的回答。',
    outputFormat: ['回答', '推理摘要', '下一步'],
    constraints: [
      '如果任务信息不足，先提出澄清问题。',
      '保持回答具体、可执行。',
      '不要编造未提供的事实。',
    ],
  },
};

const CHINESE_PATTERN_COPY = {
  'role-framing': {
    name: '角色设定',
    description: '先为模型指定清晰角色，再描述具体任务。',
  },
  'structured-output': {
    name: '结构化输出',
    description: '明确要求回答使用固定章节或格式，减少发散输出。',
  },
  'constraint-setting': {
    name: '约束设置',
    description: '提前说明边界、限制和禁止事项，避免模型做无依据假设。',
  },
  'source-grounding': {
    name: '来源约束',
    description: '要求回答基于提供的原文或上下文，不依赖外部猜测。',
  },
  'safety-boundaries': {
    name: '安全边界',
    description: '说明助手不能承诺、编造或替用户做决定的内容。',
  },
  'verification-loop': {
    name: '验证闭环',
    description: '要求模型列出假设、风险和可验证的检查步骤。',
  },
  'few-shot-ready': {
    name: '示例预留',
    description: '为后续补充示例留出空间，但第一版不强制依赖示例。',
  },
};

const LANGUAGE_PROFILES = {
  English: {
    outputName: 'English',
    headings: {
      role: 'Role: ',
      task: 'Task: ',
      inputVariables: 'Input Variables:',
      instructions: 'Instructions:',
      constraints: 'Constraints:',
      outputFormat: 'Output Format:',
      language: 'Language: ',
    },
    task: (requirement) => `Transform this rough requirement into a high-quality response: "${requirement}"`,
    instructions: [
      'Identify the user goal before answering.',
      'Use the input variables as the source of truth.',
      'Follow the constraints exactly.',
      'If the input is incomplete, ask for the smallest missing piece of information.',
    ],
    missingInfoConstraint: 'Ask one concise clarifying question if required information is missing.',
    outputLanguageConstraint: 'Write the final answer in English.',
    politeConstraint: 'Keep the tone polite and respectful.',
    negativeConstraint: 'Respect all negative constraints mentioned in the user requirement.',
  },
  Chinese: {
    outputName: '中文',
    headings: {
      role: '角色：',
      task: '任务：',
      inputVariables: '输入变量：',
      instructions: '执行要求：',
      constraints: '约束：',
      outputFormat: '输出格式：',
      language: '语言：',
    },
    task: (requirement) => `将这个粗略需求转换成高质量、可直接使用的回答："${requirement}"`,
    instructions: [
      '先识别用户的真实目标。',
      '把输入变量作为事实来源。',
      '严格遵守约束条件。',
      '如果信息不足，只提出一个最关键的澄清问题。',
    ],
    missingInfoConstraint: '如果缺少必要信息，只提出一个最小且明确的澄清问题。',
    outputLanguageConstraint: '最终回答请使用中文。',
    politeConstraint: '保持礼貌、尊重的语气。',
    negativeConstraint: '严格遵守用户需求中提到的否定约束。',
    categories: CHINESE_CATEGORY_COPY,
    patterns: CHINESE_PATTERN_COPY,
  },
  Hindi: {
    outputName: 'हिन्दी',
    headings: {
      role: 'भूमिका: ',
      task: 'कार्य: ',
      inputVariables: 'इनपुट वैरिएबल:',
      instructions: 'निर्देश:',
      constraints: 'सीमाएं:',
      outputFormat: 'आउटपुट प्रारूप:',
      language: 'भाषा: ',
    },
    task: (requirement) => `इस सामान्य जरूरत को एक उच्च गुणवत्ता वाले उपयोगी उत्तर में बदलें: "${requirement}"`,
    instructions: [
      'उत्तर देने से पहले उपयोगकर्ता का लक्ष्य पहचानें।',
      'इनपुट वैरिएबल को सत्य स्रोत मानें।',
      'सभी सीमाओं का सख्ती से पालन करें।',
      'जानकारी अधूरी हो तो केवल एक छोटा और जरूरी स्पष्टता प्रश्न पूछें।',
    ],
    missingInfoConstraint: 'जरूरी जानकारी अधूरी हो तो एक संक्षिप्त स्पष्टता प्रश्न पूछें।',
    outputLanguageConstraint: 'अंतिम उत्तर हिन्दी में लिखें।',
    politeConstraint: 'स्वर विनम्र और सम्मानजनक रखें।',
    negativeConstraint: 'उपयोगकर्ता द्वारा बताई गई सभी नकारात्मक सीमाओं का पालन करें।',
    categories: {
      support: {
        label: 'ग्राहक सहायता',
        role: 'आप एक विनम्र ग्राहक सहायता सहायक हैं जो केवल दी गई नीति के आधार पर उत्तर देता है।',
        outputFormat: ['उत्तर', 'नीति आधार', 'अगला कदम', 'क्या एस्केलेशन चाहिए'],
        constraints: [
          'स्वर विनम्र, स्पष्ट और व्यावहारिक रखें।',
          'दी गई नीति में न लिखे गए परिणामों का वादा न करें।',
          'नीति संदर्भ न मिले तो पहले उसे मांगें।',
        ],
      },
      developer: {
        label: 'डेवलपर कार्य',
        role: 'आप डेवलपर्स के लिए एक सॉफ्टवेयर इम्प्लीमेंटेशन सहायक हैं।',
        outputFormat: ['जरूरतों का सारांश', 'मुख्य मान्यताएं', 'इम्प्लीमेंटेशन योजना', 'सुझाई गई संरचना', 'सत्यापन चरण'],
        constraints: [
          'पक्की जरूरतों और मान्यताओं को अलग रखें।',
          'छोटी और testable implementation plan को प्राथमिकता दें।',
          'नतीजे को verify करने का स्पष्ट तरीका शामिल करें।',
        ],
        debugRole: 'आप डेवलपर्स के लिए एक debugging assistant हैं।',
        debugOutputFormat: ['समस्या सारांश', 'मूल कारण', 'सुधार योजना', 'सुझाया गया patch', 'सत्यापन चरण'],
        debugConstraints: [
          'दिए गए code और error message के आधार पर reasoning करें।',
          'असंबंधित code को न बदलें।',
          'fix verify करने का स्पष्ट तरीका शामिल करें।',
        ],
      },
      summarization: {
        label: 'सारांश',
        role: 'आप एक सटीक meeting summarizer हैं जो decisions, action items और open questions निकालता है।',
        outputFormat: ['संक्षिप्त सारांश', 'निर्णय', 'कार्य आइटम', 'खुले प्रश्न'],
        constraints: [
          'केवल source text की जानकारी का उपयोग करें।',
          'confirmed facts और open questions को अलग रखें।',
          'सारांश छोटा और scan करने योग्य रखें।',
        ],
      },
      writing: {
        label: 'लेखन कार्य',
        role: 'आप एक practical writing assistant हैं जो rough intent को clear copy में बदलता है।',
        outputFormat: ['Draft', 'यह क्यों काम करता है', 'वैकल्पिक रूप'],
        constraints: [
          'target audience और tone से मेल रखें।',
          'अस्पष्ट दावों और unsupported exaggeration से बचें।',
          'output को edit या use करने योग्य बनाएं।',
        ],
      },
      general: {
        label: 'सामान्य कार्य',
        role: 'आप एक helpful assistant हैं जो rough task को clear और reusable answer में बदलता है।',
        outputFormat: ['उत्तर', 'Reasoning सारांश', 'अगला कदम'],
        constraints: [
          'Task अधूरा हो तो clarification question पूछें।',
          'उत्तर specific और actionable रखें।',
          'दिए बिना facts न बनाएं।',
        ],
      },
    },
    patterns: {
      'role-framing': { name: 'भूमिका निर्धारण', description: 'मॉडल को पहले स्पष्ट भूमिका दें, फिर कार्य बताएं।' },
      'structured-output': { name: 'संरचित आउटपुट', description: 'उत्तर के sections या format को साफ तय करें।' },
      'constraint-setting': { name: 'सीमा निर्धारण', description: 'बाउंड्री और मना की गई बातों को पहले से स्पष्ट करें।' },
      'source-grounding': { name: 'स्रोत आधारित उत्तर', description: 'उत्तर को दिए गए source text या context से जोड़े रखें।' },
      'safety-boundaries': { name: 'सुरक्षा सीमाएं', description: 'बताएं कि assistant क्या वादा, invent या decide नहीं कर सकता।' },
      'verification-loop': { name: 'सत्यापन चक्र', description: 'मॉडल से assumptions, risks और verification steps लिखवाएं।' },
      'few-shot-ready': { name: 'उदाहरण के लिए तैयार', description: 'बाद में examples जोड़ने की जगह रखें, पर पहली version में जरूरी न बनाएं।' },
    },
  },
  Spanish: {
    outputName: 'español',
    headings: {
      role: 'Rol: ',
      task: 'Tarea: ',
      inputVariables: 'Variables de entrada:',
      instructions: 'Instrucciones:',
      constraints: 'Restricciones:',
      outputFormat: 'Formato de salida:',
      language: 'Idioma: ',
    },
    task: (requirement) => `Convierte este requisito aproximado en una respuesta de alta calidad: "${requirement}"`,
    instructions: [
      'Identifica el objetivo del usuario antes de responder.',
      'Usa las variables de entrada como fuente de verdad.',
      'Sigue las restricciones exactamente.',
      'Si falta información, haz solo una pregunta breve y necesaria.',
    ],
    missingInfoConstraint: 'Si falta información necesaria, haz una sola pregunta de aclaración.',
    outputLanguageConstraint: 'Escribe la respuesta final en español.',
    politeConstraint: 'Mantén un tono cortés y respetuoso.',
    negativeConstraint: 'Respeta todas las restricciones negativas mencionadas por el usuario.',
    categories: {
      support: {
        label: 'Soporte al cliente',
        role: 'Eres un asistente de soporte cortés que responde usando solo el contexto de política proporcionado.',
        outputFormat: ['Respuesta', 'Base de la política', 'Siguiente paso', 'Necesita escalamiento'],
        constraints: [
          'Mantén un tono cortés, claro y práctico.',
          'No prometas resultados que no estén indicados en la política.',
          'Si falta el contexto de política, pídelo antes de responder.',
        ],
      },
      developer: {
        label: 'Tarea de desarrollo',
        role: 'Eres un asistente de implementación de software para desarrolladores.',
        outputFormat: ['Resumen de requisitos', 'Supuestos clave', 'Plan de implementación', 'Estructura sugerida', 'Pasos de verificación'],
        constraints: [
          'Separa los requisitos confirmados de los supuestos.',
          'Prefiere un plan pequeño y verificable.',
          'Incluye una forma concreta de verificar el resultado.',
        ],
        debugRole: 'Eres un asistente de depuración para desarrolladores.',
        debugOutputFormat: ['Resumen del problema', 'Causa raíz', 'Plan de corrección', 'Parche sugerido', 'Pasos de verificación'],
        debugConstraints: [
          'Razona a partir del código y el mensaje de error proporcionados.',
          'No reescribas partes no relacionadas del código.',
          'Incluye una forma concreta de verificar la corrección.',
        ],
      },
      summarization: {
        label: 'Resumen',
        role: 'Eres un resumidor preciso que extrae decisiones, tareas pendientes y preguntas abiertas.',
        outputFormat: ['Resumen breve', 'Decisiones', 'Tareas pendientes', 'Preguntas abiertas'],
        constraints: [
          'Usa solo información del texto fuente.',
          'Separa hechos confirmados de preguntas abiertas.',
          'Mantén el resumen breve y fácil de revisar.',
        ],
      },
      writing: {
        label: 'Redacción',
        role: 'Eres un asistente de redacción práctico que convierte ideas vagas en texto claro y útil.',
        outputFormat: ['Borrador', 'Por qué funciona', 'Variaciones opcionales'],
        constraints: [
          'Ajusta el tono al público objetivo.',
          'Evita afirmaciones vagas o exageraciones sin respaldo.',
          'Haz que el resultado esté listo para editar o usar.',
        ],
      },
      general: {
        label: 'Tarea general',
        role: 'Eres un asistente útil que convierte una tarea aproximada en una respuesta clara y reutilizable.',
        outputFormat: ['Respuesta', 'Resumen del razonamiento', 'Siguiente paso'],
        constraints: [
          'Pregunta si la tarea no está suficientemente especificada.',
          'Mantén la respuesta específica y accionable.',
          'No inventes hechos que no fueron proporcionados.',
        ],
      },
    },
    patterns: {
      'role-framing': { name: 'Definición de rol', description: 'Asigna al modelo un rol claro antes de describir la tarea.' },
      'structured-output': { name: 'Salida estructurada', description: 'Define las secciones o el formato exacto de la respuesta.' },
      'constraint-setting': { name: 'Definición de restricciones', description: 'Explica límites y prohibiciones para evitar suposiciones sin respaldo.' },
      'source-grounding': { name: 'Anclaje a fuentes', description: 'Obliga a basar la respuesta en el texto o contexto proporcionado.' },
      'safety-boundaries': { name: 'Límites de seguridad', description: 'Aclara qué no debe prometer, inventar o decidir el asistente.' },
      'verification-loop': { name: 'Ciclo de verificación', description: 'Pide supuestos, riesgos y pasos concretos de verificación.' },
      'few-shot-ready': { name: 'Preparado para ejemplos', description: 'Deja espacio para ejemplos sin depender de ellos en la primera versión.' },
    },
  },
  Arabic: {
    outputName: 'العربية',
    headings: {
      role: 'الدور: ',
      task: 'المهمة: ',
      inputVariables: 'متغيرات الإدخال:',
      instructions: 'التعليمات:',
      constraints: 'القيود:',
      outputFormat: 'تنسيق الإخراج:',
      language: 'اللغة: ',
    },
    task: (requirement) => `حوّل هذا الطلب الأولي إلى إجابة عالية الجودة: "${requirement}"`,
    instructions: [
      'حدّد هدف المستخدم قبل الإجابة.',
      'استخدم متغيرات الإدخال كمصدر للحقيقة.',
      'اتبع القيود بدقة.',
      'إذا كانت المعلومات ناقصة، اطرح سؤال توضيح واحدًا ومختصرًا.',
    ],
    missingInfoConstraint: 'إذا كانت المعلومات الضرورية ناقصة، اطرح سؤال توضيح واحدًا فقط.',
    outputLanguageConstraint: 'اكتب الإجابة النهائية بالعربية.',
    politeConstraint: 'حافظ على نبرة مهذبة ومحترمة.',
    negativeConstraint: 'التزم بكل القيود السلبية التي ذكرها المستخدم.',
    categories: {
      support: {
        label: 'دعم العملاء',
        role: 'أنت مساعد دعم عملاء مهذب يجيب فقط اعتمادًا على سياق السياسة المقدم.',
        outputFormat: ['الإجابة', 'أساس السياسة', 'الخطوة التالية', 'هل يلزم التصعيد'],
        constraints: [
          'حافظ على نبرة مهذبة وواضحة وعملية.',
          'لا تعد بنتائج غير مذكورة في السياسة المقدمة.',
          'إذا كان سياق السياسة ناقصًا، اطلبه قبل الإجابة.',
        ],
      },
      developer: {
        label: 'مهمة تطوير',
        role: 'أنت مساعد تنفيذ برمجي للمطورين.',
        outputFormat: ['ملخص المتطلبات', 'الافتراضات الرئيسية', 'خطة التنفيذ', 'البنية المقترحة', 'خطوات التحقق'],
        constraints: [
          'افصل المتطلبات المؤكدة عن الافتراضات.',
          'فضّل خطة تنفيذ صغيرة وقابلة للاختبار.',
          'ضمّن طريقة واضحة للتحقق من النتيجة.',
        ],
        debugRole: 'أنت مساعد تصحيح أخطاء للمطورين.',
        debugOutputFormat: ['ملخص المشكلة', 'السبب الجذري', 'خطة الإصلاح', 'التعديل المقترح', 'خطوات التحقق'],
        debugConstraints: [
          'استنتج بناءً على الكود ورسالة الخطأ المقدمة.',
          'لا تعيد كتابة أجزاء غير مرتبطة من الكود.',
          'ضمّن طريقة واضحة للتحقق من الإصلاح.',
        ],
      },
      summarization: {
        label: 'تلخيص',
        role: 'أنت مساعد تلخيص دقيق يستخرج القرارات والمهام والأسئلة المفتوحة.',
        outputFormat: ['ملخص موجز', 'القرارات', 'المهام', 'الأسئلة المفتوحة'],
        constraints: [
          'استخدم المعلومات الموجودة في النص المصدر فقط.',
          'افصل الحقائق المؤكدة عن الأسئلة المفتوحة.',
          'اجعل الملخص مختصرًا وسهل القراءة.',
        ],
      },
      writing: {
        label: 'كتابة',
        role: 'أنت مساعد كتابة عملي يحول النية العامة إلى نص واضح ومفيد.',
        outputFormat: ['مسودة', 'لماذا يعمل هذا', 'نسخ اختيارية'],
        constraints: [
          'طابق الجمهور المستهدف والنبرة المطلوبة.',
          'تجنب الادعاءات الغامضة والمبالغة غير المدعومة.',
          'اجعل الناتج جاهزًا للتحرير أو الاستخدام.',
        ],
      },
      general: {
        label: 'مهمة عامة',
        role: 'أنت مساعد مفيد يحول المهمة العامة إلى إجابة واضحة وقابلة لإعادة الاستخدام.',
        outputFormat: ['الإجابة', 'ملخص التفكير', 'الخطوة التالية'],
        constraints: [
          'اطرح سؤال توضيح إذا كانت المهمة غير محددة بما يكفي.',
          'اجعل الإجابة محددة وقابلة للتنفيذ.',
          'لا تخترع حقائق غير مقدمة.',
        ],
      },
    },
    patterns: {
      'role-framing': { name: 'تحديد الدور', description: 'امنح النموذج دورًا واضحًا قبل وصف المهمة.' },
      'structured-output': { name: 'إخراج منظم', description: 'حدّد الأقسام أو التنسيق المطلوب بدقة.' },
      'constraint-setting': { name: 'تحديد القيود', description: 'وضّح الحدود والمحظورات لتجنب الافتراضات غير المدعومة.' },
      'source-grounding': { name: 'الاستناد إلى المصدر', description: 'اجعل الإجابة مبنية على النص أو السياق المقدم.' },
      'safety-boundaries': { name: 'حدود الأمان', description: 'وضّح ما لا يجوز للمساعد وعده أو اختراعه أو تقريره.' },
      'verification-loop': { name: 'حلقة التحقق', description: 'اطلب الافتراضات والمخاطر وخطوات التحقق العملية.' },
      'few-shot-ready': { name: 'جاهز للأمثلة', description: 'اترك مساحة لإضافة أمثلة دون الاعتماد عليها في النسخة الأولى.' },
    },
  },
  Japanese: {
    outputName: '日本語',
    headings: {
      role: '役割：',
      task: 'タスク：',
      inputVariables: '入力変数：',
      instructions: '指示：',
      constraints: '制約：',
      outputFormat: '出力形式：',
      language: '言語：',
    },
    task: (requirement) => `この大まかな要件を、高品質でそのまま使える回答に変換してください：「${requirement}」`,
    instructions: [
      '回答前にユーザーの目的を特定する。',
      '入力変数を事実の根拠として扱う。',
      '制約を正確に守る。',
      '情報が不足している場合は、最小限の確認質問を1つだけ行う。',
    ],
    missingInfoConstraint: '必要な情報が不足している場合は、簡潔な確認質問を1つだけ行う。',
    outputLanguageConstraint: '最終回答は日本語で書く。',
    politeConstraint: '丁寧で敬意のある口調を保つ。',
    negativeConstraint: 'ユーザーが述べた否定条件をすべて守る。',
    categories: {
      support: {
        label: 'カスタマーサポート',
        role: 'あなたは、提供されたポリシー情報だけに基づいて回答する丁寧なカスタマーサポート助手です。',
        outputFormat: ['回答', 'ポリシー根拠', '次のステップ', 'エスカレーション要否'],
        constraints: [
          '丁寧で明確かつ実務的な口調にする。',
          '提供されたポリシーにない結果を約束しない。',
          'ポリシー情報が不足している場合は、先に補足を求める。',
        ],
      },
      developer: {
        label: '開発タスク',
        role: 'あなたは開発者向けのソフトウェア実装助手です。',
        outputFormat: ['要件要約', '主な仮定', '実装計画', '推奨構成', '検証手順'],
        constraints: [
          '確定した要件と仮定を分ける。',
          '小さく検証可能な実装計画を優先する。',
          '結果を検証する具体的な方法を含める。',
        ],
        debugRole: 'あなたは開発者向けのデバッグ助手です。',
        debugOutputFormat: ['問題要約', '根本原因', '修正計画', '提案パッチ', '検証手順'],
        debugConstraints: [
          '提供されたコードとエラーメッセージに基づいて推論する。',
          '無関係なコードを書き換えない。',
          '修正を検証する具体的な方法を含める。',
        ],
      },
      summarization: {
        label: '要約',
        role: 'あなたは、決定事項、アクション項目、未解決の質問を抽出する正確な要約助手です。',
        outputFormat: ['簡潔な要約', '決定事項', 'アクション項目', '未解決の質問'],
        constraints: [
          'ソーステキストの情報だけを使用する。',
          '確認済みの事実と未解決の質問を分ける。',
          '要約は簡潔で読みやすくする。',
        ],
      },
      writing: {
        label: '文章作成',
        role: 'あなたは大まかな意図を明確で使いやすい文章に変換する実用的な文章作成助手です。',
        outputFormat: ['下書き', 'この書き方が有効な理由', '任意のバリエーション'],
        constraints: [
          '対象読者とトーンに合わせる。',
          '曖昧な主張や根拠のない誇張を避ける。',
          '編集または使用しやすい出力にする。',
        ],
      },
      general: {
        label: '一般タスク',
        role: 'あなたは大まかなタスクを明確で再利用可能な回答に変換する有用な助手です。',
        outputFormat: ['回答', '推論要約', '次のステップ'],
        constraints: [
          'タスクが不明確な場合は確認質問をする。',
          '回答は具体的で実行可能にする。',
          '提供されていない事実を作らない。',
        ],
      },
    },
    patterns: {
      'role-framing': { name: '役割設定', description: 'タスクを説明する前に、モデルに明確な役割を与える。' },
      'structured-output': { name: '構造化出力', description: '回答のセクションや形式を明確に指定する。' },
      'constraint-setting': { name: '制約設定', description: '境界や禁止事項を明示し、根拠のない仮定を避ける。' },
      'source-grounding': { name: 'ソース根拠化', description: '回答を提供されたテキストや文脈に基づかせる。' },
      'safety-boundaries': { name: '安全境界', description: '助手が約束、創作、判断してはいけない内容を明確にする。' },
      'verification-loop': { name: '検証ループ', description: '仮定、リスク、検証手順を挙げさせる。' },
      'few-shot-ready': { name: '例示対応', description: '初版では必須にせず、後から例を追加できる余地を残す。' },
    },
  },
};

LANGUAGE_PROFILES.French = {
  ...LANGUAGE_PROFILES.Spanish,
  outputName: 'français',
  headings: {
    role: 'Rôle : ',
    task: 'Tâche : ',
    inputVariables: 'Variables d’entrée :',
    instructions: 'Instructions :',
    constraints: 'Contraintes :',
    outputFormat: 'Format de sortie :',
    language: 'Langue : ',
  },
  task: (requirement) => `Transforme ce besoin approximatif en réponse de haute qualité : "${requirement}"`,
  instructions: [
    'Identifie l’objectif de l’utilisateur avant de répondre.',
    'Utilise les variables d’entrée comme source de vérité.',
    'Respecte exactement les contraintes.',
    'S’il manque des informations, pose une seule question courte et nécessaire.',
  ],
  missingInfoConstraint: 'S’il manque des informations nécessaires, pose une seule question de clarification.',
  outputLanguageConstraint: 'Rédige la réponse finale en français.',
  politeConstraint: 'Garde un ton poli et respectueux.',
  negativeConstraint: 'Respecte toutes les contraintes négatives mentionnées par l’utilisateur.',
  categories: {
    support: {
      label: 'Support client',
      role: 'Tu es un assistant de support client poli qui répond uniquement à partir du contexte de politique fourni.',
      outputFormat: ['Réponse', 'Base de la politique', 'Prochaine étape', 'Escalade nécessaire'],
      constraints: [
        'Garde un ton poli, clair et pratique.',
        'Ne promets aucun résultat qui n’est pas indiqué dans la politique fournie.',
        'Si le contexte de politique manque, demande-le avant de répondre.',
      ],
    },
    developer: {
      label: 'Tâche de développement',
      role: 'Tu es un assistant d’implémentation logicielle pour développeurs.',
      outputFormat: ['Résumé des exigences', 'Hypothèses clés', 'Plan d’implémentation', 'Structure suggérée', 'Étapes de vérification'],
      constraints: [
        'Sépare les exigences confirmées des hypothèses.',
        'Privilégie un plan petit et testable.',
        'Inclue une méthode concrète pour vérifier le résultat.',
      ],
      debugRole: 'Tu es un assistant de débogage pour développeurs.',
      debugOutputFormat: ['Résumé du problème', 'Cause racine', 'Plan de correction', 'Patch suggéré', 'Étapes de vérification'],
      debugConstraints: [
        'Raisonne à partir du code et du message d’erreur fournis.',
        'Ne réécris pas les parties non liées du code.',
        'Inclue une méthode concrète pour vérifier la correction.',
      ],
    },
    summarization: {
      label: 'Résumé',
      role: 'Tu es un assistant de résumé précis qui extrait décisions, actions et questions ouvertes.',
      outputFormat: ['Résumé bref', 'Décisions', 'Actions à faire', 'Questions ouvertes'],
      constraints: [
        'Utilise uniquement les informations du texte source.',
        'Sépare les faits confirmés des questions ouvertes.',
        'Garde le résumé bref et facile à parcourir.',
      ],
    },
    writing: {
      label: 'Rédaction',
      role: 'Tu es un assistant de rédaction pratique qui transforme une intention approximative en texte clair et utile.',
      outputFormat: ['Brouillon', 'Pourquoi cela fonctionne', 'Variantes optionnelles'],
      constraints: [
        'Adapte le ton au public cible.',
        'Évite les affirmations vagues et les exagérations non justifiées.',
        'Rends le résultat prêt à modifier ou utiliser.',
      ],
    },
    general: {
      label: 'Tâche générale',
      role: 'Tu es un assistant utile qui transforme une tâche approximative en réponse claire et réutilisable.',
      outputFormat: ['Réponse', 'Résumé du raisonnement', 'Prochaine étape'],
      constraints: [
        'Pose une question si la tâche est trop vague.',
        'Garde la réponse spécifique et actionnable.',
        'N’invente pas de faits non fournis.',
      ],
    },
  },
  patterns: {
    'role-framing': { name: 'Définition du rôle', description: 'Attribue un rôle clair au modèle avant de décrire la tâche.' },
    'structured-output': { name: 'Sortie structurée', description: 'Définit les sections ou le format exact attendu.' },
    'constraint-setting': { name: 'Définition des contraintes', description: 'Clarifie les limites et interdictions pour éviter les hypothèses non fondées.' },
    'source-grounding': { name: 'Ancrage aux sources', description: 'Force la réponse à rester basée sur le texte ou le contexte fourni.' },
    'safety-boundaries': { name: 'Limites de sécurité', description: 'Clarifie ce que l’assistant ne doit pas promettre, inventer ou décider.' },
    'verification-loop': { name: 'Boucle de vérification', description: 'Demande les hypothèses, risques et étapes de vérification.' },
    'few-shot-ready': { name: 'Prêt pour exemples', description: 'Laisse de la place pour ajouter des exemples sans en dépendre au départ.' },
  },
};

LANGUAGE_PROFILES.Portuguese = {
  ...LANGUAGE_PROFILES.Spanish,
  outputName: 'português',
  headings: {
    role: 'Papel: ',
    task: 'Tarefa: ',
    inputVariables: 'Variáveis de entrada:',
    instructions: 'Instruções:',
    constraints: 'Restrições:',
    outputFormat: 'Formato de saída:',
    language: 'Idioma: ',
  },
  task: (requirement) => `Transforme este requisito inicial em uma resposta de alta qualidade: "${requirement}"`,
  instructions: [
    'Identifique o objetivo do usuário antes de responder.',
    'Use as variáveis de entrada como fonte de verdade.',
    'Siga exatamente as restrições.',
    'Se faltar informação, faça apenas uma pergunta curta e necessária.',
  ],
  missingInfoConstraint: 'Se faltar informação necessária, faça uma única pergunta de esclarecimento.',
  outputLanguageConstraint: 'Escreva a resposta final em português.',
  politeConstraint: 'Mantenha um tom educado e respeitoso.',
  negativeConstraint: 'Respeite todas as restrições negativas mencionadas pelo usuário.',
  categories: {
    support: {
      label: 'Suporte ao cliente',
      role: 'Você é um assistente de suporte educado que responde usando apenas o contexto de política fornecido.',
      outputFormat: ['Resposta', 'Base da política', 'Próximo passo', 'Precisa de escalonamento'],
      constraints: [
        'Mantenha um tom educado, claro e prático.',
        'Não prometa resultados que não estejam indicados na política fornecida.',
        'Se faltar o contexto da política, peça antes de responder.',
      ],
    },
    developer: {
      label: 'Tarefa de desenvolvimento',
      role: 'Você é um assistente de implementação de software para desenvolvedores.',
      outputFormat: ['Resumo dos requisitos', 'Suposições principais', 'Plano de implementação', 'Estrutura sugerida', 'Etapas de verificação'],
      constraints: [
        'Separe requisitos confirmados de suposições.',
        'Prefira um plano pequeno e testável.',
        'Inclua uma forma concreta de verificar o resultado.',
      ],
      debugRole: 'Você é um assistente de depuração para desenvolvedores.',
      debugOutputFormat: ['Resumo do problema', 'Causa raiz', 'Plano de correção', 'Patch sugerido', 'Etapas de verificação'],
      debugConstraints: [
        'Raciocine a partir do código e da mensagem de erro fornecidos.',
        'Não reescreva partes não relacionadas do código.',
        'Inclua uma forma concreta de verificar a correção.',
      ],
    },
    summarization: {
      label: 'Resumo',
      role: 'Você é um resumidor preciso que extrai decisões, tarefas e perguntas em aberto.',
      outputFormat: ['Resumo breve', 'Decisões', 'Tarefas', 'Perguntas em aberto'],
      constraints: [
        'Use apenas informações do texto fonte.',
        'Separe fatos confirmados de perguntas em aberto.',
        'Mantenha o resumo breve e fácil de revisar.',
      ],
    },
    writing: {
      label: 'Escrita',
      role: 'Você é um assistente de escrita prático que transforma intenção aproximada em texto claro e útil.',
      outputFormat: ['Rascunho', 'Por que funciona', 'Variações opcionais'],
      constraints: [
        'Ajuste o tom ao público-alvo.',
        'Evite afirmações vagas e exageros sem suporte.',
        'Deixe o resultado pronto para editar ou usar.',
      ],
    },
    general: {
      label: 'Tarefa geral',
      role: 'Você é um assistente útil que transforma uma tarefa aproximada em resposta clara e reutilizável.',
      outputFormat: ['Resposta', 'Resumo do raciocínio', 'Próximo passo'],
      constraints: [
        'Pergunte se a tarefa estiver pouco especificada.',
        'Mantenha a resposta específica e acionável.',
        'Não invente fatos não fornecidos.',
      ],
    },
  },
  patterns: {
    'role-framing': { name: 'Definição de papel', description: 'Dê ao modelo um papel claro antes de descrever a tarefa.' },
    'structured-output': { name: 'Saída estruturada', description: 'Defina as seções ou o formato exato esperado.' },
    'constraint-setting': { name: 'Definição de restrições', description: 'Explique limites e proibições para evitar suposições sem base.' },
    'source-grounding': { name: 'Base em fontes', description: 'Force a resposta a se apoiar no texto ou contexto fornecido.' },
    'safety-boundaries': { name: 'Limites de segurança', description: 'Esclareça o que o assistente não deve prometer, inventar ou decidir.' },
    'verification-loop': { name: 'Ciclo de verificação', description: 'Peça suposições, riscos e etapas concretas de verificação.' },
    'few-shot-ready': { name: 'Pronto para exemplos', description: 'Deixe espaço para exemplos sem depender deles na primeira versão.' },
  },
};

function cleanRequirement(requirement) {
  if (typeof requirement !== 'string' || requirement.trim().length === 0) {
    throw new Error('Please describe the task you want to turn into a prompt.');
  }

  return requirement.trim().replace(/\s+/g, ' ');
}

function keywordScore(text, keywords) {
  return keywords.reduce((score, keyword) => {
    return text.includes(keyword.toLowerCase()) ? score + 1 : score;
  }, 0);
}

function detectCategory(requirement) {
  const normalized = requirement.toLowerCase();
  const scored = CATEGORIES
    .filter((category) => category.id !== 'general')
    .map((category) => ({
      category,
      score: keywordScore(normalized, category.keywords),
    }))
    .sort((left, right) => right.score - left.score);

  return scored[0]?.score > 0 ? scored[0].category : CATEGORIES.at(-1);
}

function detectLanguage(requirement) {
  const normalized = requirement.toLowerCase();
  const scoredHints = LANGUAGE_HINTS
    .map((hint) => ({
      hint,
      score: hint.keywords.reduce((total, keyword) => {
        return normalized.includes(keyword.toLowerCase()) ? total + 1 : total;
      }, 0),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  if (scoredHints.length > 0) return scoredHints[0].hint.label;
  if (HIRAGANA_KATAKANA_PATTERN.test(requirement)) return 'Japanese';
  if (HANGUL_PATTERN.test(requirement)) return 'Korean';
  if (ARABIC_PATTERN.test(requirement)) return 'Arabic';
  if (DEVANAGARI_PATTERN.test(requirement)) return 'Hindi';
  if (CJK_PATTERN.test(requirement)) return 'Chinese';
  if (/^[\x00-\x7f\s.,!?;:'"()[\]{}<>/@#$%^&*+=_-]+$/.test(requirement)) return 'English';

  return 'the same language as the user input';
}

function getLanguageProfile(language) {
  return LANGUAGE_PROFILES[language] ?? LANGUAGE_PROFILES.English;
}

function isDebuggingRequest(requirement) {
  const normalized = requirement.toLowerCase();
  return ['bug', 'debug', '报错', '错误', '修复', '分析一段', '代码里'].some((keyword) => {
    return normalized.includes(keyword);
  });
}

function localizeCategoryForLanguage(category, requirement, language) {
  const profile = getLanguageProfile(language);

  if (!profile.categories) {
    return category;
  }

  const copy = profile.categories[category.id] ?? profile.categories.general;
  const debugRequest = category.id === 'developer' && isDebuggingRequest(requirement);

  if (debugRequest) {
    return {
      ...category,
      label: copy.label,
      role: copy.debugRole,
      outputFormat: copy.debugOutputFormat,
      constraints: copy.debugConstraints,
    };
  }

  return {
    ...category,
    label: copy.label,
    role: copy.role,
    outputFormat: copy.outputFormat,
    constraints: copy.constraints,
  };
}

function resolveCategoryForRequirement(category, requirement) {
  if (category.id !== 'developer') {
    return category;
  }

  if (isDebuggingRequest(requirement)) {
    return {
      ...category,
      role: 'You are a debugging assistant for software developers.',
      variables: ['code_snippet', 'error_message', 'expected_behavior'],
      outputFormat: ['Problem Summary', 'Root Cause', 'Fix Plan', 'Suggested Patch', 'Verification Steps'],
      constraints: [
        'Reason from the provided code and error message.',
        'Do not rewrite unrelated parts of the code.',
        'Include a concrete way to verify the fix.',
      ],
    };
  }

  return {
    ...category,
    variables: ['goal', 'requirements', 'constraints'],
  };
}

function uniqueById(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function localizePatternsForLanguage(patterns, language) {
  const profile = getLanguageProfile(language);

  if (!profile.patterns) {
    return patterns;
  }

  return patterns.map((pattern) => ({
    ...pattern,
    ...(profile.patterns[pattern.id] ?? {}),
  }));
}

function buildConstraints(category, requirement, language) {
  const profile = getLanguageProfile(language);
  const constraints = [
    ...category.constraints,
    profile.missingInfoConstraint,
    profile.outputLanguageConstraint,
  ];
  const normalized = requirement.toLowerCase();

  if (normalized.includes('礼貌') || normalized.includes('polite')) {
    constraints.push(profile.politeConstraint);
  }

  if (normalized.includes('不要') || normalized.includes('avoid') || normalized.includes('do not')) {
    constraints.push(profile.negativeConstraint);
  }

  return [...new Set(constraints)];
}

function buildTask(category, requirement) {
  return `Transform this rough requirement into a high-quality response: "${requirement}"`;
}

function renderVariables(variables) {
  return variables.map((variable) => `{{${variable}}}`).join('\n');
}

function renderList(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function buildPrompt({ requirement, category, constraints, language }) {
  const profile = getLanguageProfile(language);

  return [
    `${profile.headings.role}${category.role}`,
    '',
    `${profile.headings.task}${profile.task ? profile.task(requirement) : buildTask(category, requirement)}`,
    '',
    profile.headings.inputVariables,
    renderVariables(category.variables),
    '',
    profile.headings.instructions,
    renderList(profile.instructions),
    '',
    profile.headings.constraints,
    renderList(constraints),
    '',
    profile.headings.outputFormat,
    renderList(category.outputFormat),
    '',
    `${profile.headings.language}${profile.outputName}`,
  ].join('\n');
}

export function analyzeRequirement(requirement) {
  const cleaned = cleanRequirement(requirement);
  const language = detectLanguage(cleaned);
  const category = localizeCategoryForLanguage(resolveCategoryForRequirement(detectCategory(cleaned), cleaned), cleaned, language);
  const constraints = buildConstraints(category, cleaned, language);
  const patterns = localizePatternsForLanguage(uniqueById([...BASE_PATTERNS, ...category.patterns]), language);

  return {
    requirement: cleaned,
    category: {
      id: category.id,
      label: category.label,
    },
    language,
    constraints,
    variables: category.variables.map((name) => ({
      name,
      token: `{{${name}}}`,
    })),
    outputFormat: category.outputFormat,
    patterns,
  };
}

export function generatePrompt(requirement) {
  const analysis = analyzeRequirement(requirement);
  const category = localizeCategoryForLanguage(resolveCategoryForRequirement(
    CATEGORIES.find((item) => item.id === analysis.category.id),
    analysis.requirement
  ), analysis.requirement, analysis.language);

  return {
    input: analysis.requirement,
    analysis,
    prompt: buildPrompt({
      requirement: analysis.requirement,
      category,
      constraints: analysis.constraints,
      language: analysis.language,
    }),
    variables: analysis.variables,
    patternsUsed: analysis.patterns,
  };
}
