export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'zh-CN', label: '简体中文', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'pt', label: 'Português', dir: 'ltr' },
  { code: 'ja', label: '日本語', dir: 'ltr' },
];

const STRINGS = {
  en: {
    meta: {
      title: 'Prompt Lab',
      description: 'Offline prompt engineering playground that turns rough requirements into structured prompts.',
    },
    hero: {
      eyebrow: 'No API key required',
      title: 'Turn rough requirements into structured prompts.',
      copy: 'Prompt Lab is an offline prompt builder for drafting reusable AI prompts from plain-language task descriptions.',
    },
    form: {
      language: 'Language',
      label: 'Describe the prompt you need',
      placeholder: 'Write a prompt for a support bot that answers refund policy questions politely and avoids unsupported promises.',
    },
    actions: {
      generate: 'Generate Prompt',
      copy: 'Copy Output',
      saveDraft: 'Save Draft',
      loadDraft: 'Load Draft',
      exportDraft: 'Export JSON',
      importDraft: 'Import JSON',
      clearDraft: 'Clear Draft',
    },
    status: {
      ready: 'Runs locally in your browser. No model call, no API key, no tracking.',
      generated: 'Prompt generated locally. No API call was made.',
      copied: 'Generated prompt copied.',
      empty: 'Please describe the task you want to turn into a prompt.',
      draftSaved: 'Draft saved in this browser.',
      draftLoaded: 'Draft loaded.',
      draftMissing: 'No saved draft found in this browser.',
      draftExported: 'Draft exported as JSON.',
      draftImported: 'Draft imported.',
      draftCleared: 'Saved draft cleared.',
      draftInvalid: 'That file is not a valid Prompt Lab draft.',
    },
    result: {
      categoryLabel: 'Category',
      categoryWaiting: 'Waiting for input',
      languageLabel: 'Language',
      languageAuto: 'Auto',
      initial: 'Describe a task and generate a structured prompt.',
    },
    details: {
      variables: 'Detected Variables',
      patterns: 'Patterns Used',
      quality: 'Prompt Quality Checklist',
      examples: 'Try Examples',
    },
    quality: {
      waiting: 'Generate a prompt to see quality checks.',
      pass: 'Pass',
      review: 'Review',
    },
    examples: [
      'Write a prompt for a support bot that answers refund policy questions politely and avoids unsupported promises.',
      'Summarize meeting notes, extract decisions and action items, and output in Chinese.',
      'Create a prompt that helps AI debug a React bug and propose a safe fix plan.',
      'Create a launch campaign prompt for a new productivity app with audience segments and channel ideas.',
      'Build a research brief prompt that compares competitors and summarizes evidence from sources.',
      'Write a data analysis prompt for a CSV dataset that explains trends and caveats.',
      'Draft a legal review prompt for contract clauses that flags risks without giving legal advice.',
      'Create a tutor prompt that teaches SQL joins with practice exercises and feedback.',
      'Write a product management prompt for prioritizing roadmap features from customer feedback.',
    ],
  },
  'zh-CN': {
    meta: {
      title: 'Prompt Lab',
      description: '一个离线提示词工程工具，把粗略需求转换成结构化提示词。',
    },
    hero: {
      eyebrow: '无需 API Key',
      title: '把粗略需求转换成结构化提示词。',
      copy: 'Prompt Lab 是一个离线提示词生成器，可以用自然语言需求起草可复用的 AI 提示词。',
    },
    form: {
      language: '语言',
      label: '描述你需要的提示词',
      placeholder: '帮我写一个客服机器人提示词，用来礼貌回答退款政策问题，并避免没有依据的承诺。',
    },
    actions: {
      generate: '生成提示词',
      copy: '复制结果',
      saveDraft: '保存草稿',
      loadDraft: '载入草稿',
      exportDraft: '导出 JSON',
      importDraft: '导入 JSON',
      clearDraft: '清除草稿',
    },
    status: {
      ready: '在浏览器本地运行。不调用模型，不需要 API key，也不做追踪。',
      generated: '已在本地生成提示词。没有发起 API 调用。',
      copied: '已复制生成的提示词。',
      empty: '请描述你想转换成提示词的任务。',
      draftSaved: '草稿已保存在当前浏览器。',
      draftLoaded: '已载入草稿。',
      draftMissing: '当前浏览器没有已保存的草稿。',
      draftExported: '草稿已导出为 JSON。',
      draftImported: '已导入草稿。',
      draftCleared: '已清除保存的草稿。',
      draftInvalid: '这个文件不是有效的 Prompt Lab 草稿。',
    },
    result: {
      categoryLabel: '类别',
      categoryWaiting: '等待输入',
      languageLabel: '语言',
      languageAuto: '自动',
      initial: '描述一个任务，然后生成结构化提示词。',
    },
    details: {
      variables: '检测到的变量',
      patterns: '使用的模式',
      quality: '提示词质量检查',
      examples: '示例',
    },
    quality: {
      waiting: '生成提示词后查看质量检查。',
      pass: '通过',
      review: '待检查',
    },
    examples: [
      '帮我写一个客服机器人提示词，用来礼貌回答退款政策问题，并避免没有依据的承诺。',
      '帮我总结会议记录，提取决定和待办事项，用中文输出。',
      '创建一个提示词，让 AI 分析 React bug 并给出安全的修复方案。',
      '帮我写一个新品发布 marketing campaign prompt，要包含受众、渠道和指标。',
      '创建一个竞品研究 brief prompt，要求总结证据、对比差异并标出信息缺口。',
      '写一个 CSV 数据分析 prompt，用来解释趋势、关键指标和数据限制。',
      '起草一个合同条款 legal review prompt，标记风险但不要给出法律意见。',
      '创建一个 tutor prompt，用练习和反馈教会初学者 SQL join。',
      '写一个产品管理 prompt，根据用户反馈给 roadmap 功能排优先级。',
    ],
  },
  hi: {
    meta: {
      title: 'Prompt Lab',
      description: 'एक ऑफलाइन प्रॉम्प्ट इंजीनियरिंग टूल जो सामान्य जरूरतों को संरचित प्रॉम्प्ट में बदलता है।',
    },
    hero: {
      eyebrow: 'API key की जरूरत नहीं',
      title: 'सामान्य जरूरतों को संरचित प्रॉम्प्ट में बदलें।',
      copy: 'Prompt Lab एक ऑफलाइन प्रॉम्प्ट बिल्डर है जो plain-language task descriptions से reusable AI prompts बनाता है।',
    },
    form: {
      language: 'भाषा',
      label: 'जिस प्रॉम्प्ट की जरूरत है उसे वर्णन करें',
      placeholder: 'एक support bot के लिए prompt लिखें जो refund policy questions का polite जवाब दे और unsupported promises से बचे।',
    },
    actions: {
      generate: 'प्रॉम्प्ट बनाएं',
      copy: 'आउटपुट कॉपी करें',
      saveDraft: 'ड्राफ्ट सेव करें',
      loadDraft: 'ड्राफ्ट लोड करें',
      exportDraft: 'JSON निर्यात करें',
      importDraft: 'JSON आयात करें',
      clearDraft: 'ड्राफ्ट हटाएं',
    },
    status: {
      ready: 'आपके browser में locally चलता है। कोई model call, API key या tracking नहीं।',
      generated: 'प्रॉम्प्ट locally generate हुआ। कोई API call नहीं हुई।',
      copied: 'Generated prompt copy हो गया।',
      empty: 'जिस task को prompt में बदलना है उसका वर्णन करें।',
      draftSaved: 'ड्राफ्ट इस ब्राउज़र में सेव हो गया।',
      draftLoaded: 'ड्राफ्ट लोड हो गया।',
      draftMissing: 'इस ब्राउज़र में कोई सेव किया हुआ ड्राफ्ट नहीं मिला।',
      draftExported: 'ड्राफ्ट JSON के रूप में निर्यात हो गया।',
      draftImported: 'ड्राफ्ट आयात हो गया।',
      draftCleared: 'सेव किया हुआ ड्राफ्ट हटा दिया गया।',
      draftInvalid: 'यह फ़ाइल वैध Prompt Lab ड्राफ्ट नहीं है।',
    },
    result: {
      categoryLabel: 'श्रेणी',
      categoryWaiting: 'input की प्रतीक्षा',
      languageLabel: 'भाषा',
      languageAuto: 'Auto',
      initial: 'एक task लिखें और structured prompt generate करें।',
    },
    details: {
      variables: 'Detected Variables',
      patterns: 'Patterns Used',
      quality: 'प्रॉम्प्ट गुणवत्ता चेकलिस्ट',
      examples: 'Examples',
    },
    quality: {
      waiting: 'प्रॉम्प्ट बनाएं ताकि गुणवत्ता जांच दिखे।',
      pass: 'पास',
      review: 'समीक्षा करें',
    },
    examples: [
      'एक support bot के लिए prompt लिखें जो refund policy questions का polite जवाब दे और unsupported promises से बचे।',
      'Meeting notes summarize करें, decisions और action items निकालें, और Hindi में output दें।',
      'AI को React bug debug करने और safe fix plan देने में मदद करने वाला prompt बनाएं।',
    ],
  },
  es: {
    meta: {
      title: 'Prompt Lab',
      description: 'Un laboratorio offline que convierte requisitos imprecisos en prompts estructurados.',
    },
    hero: {
      eyebrow: 'No requiere API key',
      title: 'Convierte requisitos imprecisos en prompts estructurados.',
      copy: 'Prompt Lab es un generador offline para crear prompts reutilizables a partir de descripciones simples.',
    },
    form: {
      language: 'Idioma',
      label: 'Describe el prompt que necesitas',
      placeholder: 'Escribe un prompt para un bot de soporte que responda preguntas sobre reembolsos con cortesía y evite promesas sin respaldo.',
    },
    actions: {
      generate: 'Generar prompt',
      copy: 'Copiar resultado',
      saveDraft: 'Guardar borrador',
      loadDraft: 'Cargar borrador',
      exportDraft: 'Exportar JSON',
      importDraft: 'Importar JSON',
      clearDraft: 'Borrar borrador',
    },
    status: {
      ready: 'Se ejecuta localmente en tu navegador. Sin llamadas a modelos, sin API key y sin tracking.',
      generated: 'Prompt generado localmente. No se hizo ninguna llamada a API.',
      copied: 'Prompt generado copiado.',
      empty: 'Describe la tarea que quieres convertir en prompt.',
      draftSaved: 'Borrador guardado en este navegador.',
      draftLoaded: 'Borrador cargado.',
      draftMissing: 'No se encontró ningún borrador guardado en este navegador.',
      draftExported: 'Borrador exportado como JSON.',
      draftImported: 'Borrador importado.',
      draftCleared: 'Borrador guardado eliminado.',
      draftInvalid: 'Este archivo no es un borrador válido de Prompt Lab.',
    },
    result: {
      categoryLabel: 'Categoría',
      categoryWaiting: 'Esperando entrada',
      languageLabel: 'Idioma',
      languageAuto: 'Auto',
      initial: 'Describe una tarea para generar un prompt estructurado.',
    },
    details: {
      variables: 'Variables detectadas',
      patterns: 'Patrones usados',
      quality: 'Lista de calidad del prompt',
      examples: 'Ejemplos',
    },
    quality: {
      waiting: 'Genera un prompt para ver las comprobaciones de calidad.',
      pass: 'Aprobado',
      review: 'Revisar',
    },
    examples: [
      'Escribe un prompt para un bot de soporte que responda preguntas sobre reembolsos con cortesía y evite promesas sin respaldo.',
      'Resume notas de reunión, extrae decisiones y tareas, y responde en español.',
      'Crea un prompt que ayude a la IA a depurar un bug de React y proponer un plan de arreglo seguro.',
    ],
  },
  ar: {
    meta: {
      title: 'Prompt Lab',
      description: 'أداة هندسة تعليمات تعمل دون اتصال لتحويل المتطلبات العامة إلى تعليمات منظمة.',
    },
    hero: {
      eyebrow: 'لا يحتاج إلى مفتاح API',
      title: 'حوّل المتطلبات العامة إلى تعليمات منظمة.',
      copy: 'Prompt Lab أداة محلية لصياغة تعليمات قابلة لإعادة الاستخدام من وصف بسيط للمهمة.',
    },
    form: {
      language: 'اللغة',
      label: 'صف التعليمة التي تحتاجها',
      placeholder: 'اكتب تعليمة لروبوت دعم يجيب عن أسئلة سياسة الاسترداد بلطف ويتجنب الوعود غير المدعومة.',
    },
    actions: {
      generate: 'إنشاء التعليمة',
      copy: 'نسخ الناتج',
      saveDraft: 'حفظ المسودة',
      loadDraft: 'تحميل المسودة',
      exportDraft: 'تصدير JSON',
      importDraft: 'استيراد JSON',
      clearDraft: 'مسح المسودة',
    },
    status: {
      ready: 'يعمل محليًا في المتصفح. لا توجد مكالمة نموذج، ولا مفتاح API، ولا تتبع.',
      generated: 'تم إنشاء التعليمة محليًا. لم يتم إجراء أي مكالمة API.',
      copied: 'تم نسخ التعليمة الناتجة.',
      empty: 'صف المهمة التي تريد تحويلها إلى تعليمة.',
      draftSaved: 'تم حفظ المسودة في هذا المتصفح.',
      draftLoaded: 'تم تحميل المسودة.',
      draftMissing: 'لم يتم العثور على مسودة محفوظة في هذا المتصفح.',
      draftExported: 'تم تصدير المسودة كملف JSON.',
      draftImported: 'تم استيراد المسودة.',
      draftCleared: 'تم مسح المسودة المحفوظة.',
      draftInvalid: 'هذا الملف ليس مسودة Prompt Lab صالحة.',
    },
    result: {
      categoryLabel: 'الفئة',
      categoryWaiting: 'بانتظار الإدخال',
      languageLabel: 'اللغة',
      languageAuto: 'تلقائي',
      initial: 'صف مهمة لإنشاء تعليمة منظمة.',
    },
    details: {
      variables: 'المتغيرات المكتشفة',
      patterns: 'الأنماط المستخدمة',
      quality: 'قائمة فحص جودة التعليمة',
      examples: 'أمثلة',
    },
    quality: {
      waiting: 'أنشئ تعليمة لعرض فحوصات الجودة.',
      pass: 'ناجح',
      review: 'مراجعة',
    },
    examples: [
      'اكتب تعليمة لروبوت دعم يجيب عن أسئلة سياسة الاسترداد بلطف ويتجنب الوعود غير المدعومة.',
      'لخص ملاحظات اجتماع واستخرج القرارات والمهام واكتب بالعربية.',
      'أنشئ تعليمة تساعد الذكاء الاصطناعي على تحليل خطأ React واقتراح خطة إصلاح آمنة.',
    ],
  },
  fr: {
    meta: {
      title: 'Prompt Lab',
      description: 'Un outil hors ligne qui transforme des besoins bruts en prompts structurés.',
    },
    hero: {
      eyebrow: 'Aucune clé API requise',
      title: 'Transformez des besoins bruts en prompts structurés.',
      copy: 'Prompt Lab est un générateur hors ligne pour rédiger des prompts IA réutilisables à partir de descriptions simples.',
    },
    form: {
      language: 'Langue',
      label: 'Décrivez le prompt dont vous avez besoin',
      placeholder: 'Rédige un prompt pour un bot support qui répond poliment aux questions de remboursement et évite les promesses non justifiées.',
    },
    actions: {
      generate: 'Générer le prompt',
      copy: 'Copier le résultat',
      saveDraft: 'Enregistrer le brouillon',
      loadDraft: 'Charger le brouillon',
      exportDraft: 'Exporter JSON',
      importDraft: 'Importer JSON',
      clearDraft: 'Effacer le brouillon',
    },
    status: {
      ready: 'Fonctionne localement dans votre navigateur. Aucun appel de modèle, aucune clé API, aucun suivi.',
      generated: 'Prompt généré localement. Aucun appel API effectué.',
      copied: 'Prompt généré copié.',
      empty: 'Décrivez la tâche à convertir en prompt.',
      draftSaved: 'Brouillon enregistré dans ce navigateur.',
      draftLoaded: 'Brouillon chargé.',
      draftMissing: 'Aucun brouillon enregistré trouvé dans ce navigateur.',
      draftExported: 'Brouillon exporté en JSON.',
      draftImported: 'Brouillon importé.',
      draftCleared: 'Brouillon enregistré effacé.',
      draftInvalid: 'Ce fichier n’est pas un brouillon Prompt Lab valide.',
    },
    result: {
      categoryLabel: 'Catégorie',
      categoryWaiting: 'En attente de saisie',
      languageLabel: 'Langue',
      languageAuto: 'Auto',
      initial: 'Décrivez une tâche pour générer un prompt structuré.',
    },
    details: {
      variables: 'Variables détectées',
      patterns: 'Patterns utilisés',
      quality: 'Liste de contrôle qualité du prompt',
      examples: 'Exemples',
    },
    quality: {
      waiting: 'Générez un prompt pour voir les contrôles qualité.',
      pass: 'Validé',
      review: 'À revoir',
    },
    examples: [
      'Rédige un prompt pour un bot support qui répond poliment aux questions de remboursement et évite les promesses non justifiées.',
      'Résume des notes de réunion, extrais les décisions et actions, et réponds en français.',
      'Crée un prompt qui aide une IA à analyser un bug React et proposer un plan de correction sûr.',
    ],
  },
  pt: {
    meta: {
      title: 'Prompt Lab',
      description: 'Uma ferramenta offline que transforma requisitos simples em prompts estruturados.',
    },
    hero: {
      eyebrow: 'Não precisa de API key',
      title: 'Transforme requisitos simples em prompts estruturados.',
      copy: 'Prompt Lab é um gerador offline para criar prompts reutilizáveis a partir de descrições em linguagem natural.',
    },
    form: {
      language: 'Idioma',
      label: 'Descreva o prompt que você precisa',
      placeholder: 'Escreva um prompt para um bot de suporte responder perguntas sobre reembolso com educação e evitar promessas sem base.',
    },
    actions: {
      generate: 'Gerar prompt',
      copy: 'Copiar resultado',
      saveDraft: 'Salvar rascunho',
      loadDraft: 'Carregar rascunho',
      exportDraft: 'Exportar JSON',
      importDraft: 'Importar JSON',
      clearDraft: 'Limpar rascunho',
    },
    status: {
      ready: 'Roda localmente no navegador. Sem chamada de modelo, sem API key e sem rastreamento.',
      generated: 'Prompt gerado localmente. Nenhuma chamada de API foi feita.',
      copied: 'Prompt gerado copiado.',
      empty: 'Descreva a tarefa que você quer transformar em prompt.',
      draftSaved: 'Rascunho salvo neste navegador.',
      draftLoaded: 'Rascunho carregado.',
      draftMissing: 'Nenhum rascunho salvo foi encontrado neste navegador.',
      draftExported: 'Rascunho exportado como JSON.',
      draftImported: 'Rascunho importado.',
      draftCleared: 'Rascunho salvo removido.',
      draftInvalid: 'Este arquivo não é um rascunho válido do Prompt Lab.',
    },
    result: {
      categoryLabel: 'Categoria',
      categoryWaiting: 'Aguardando entrada',
      languageLabel: 'Idioma',
      languageAuto: 'Auto',
      initial: 'Descreva uma tarefa para gerar um prompt estruturado.',
    },
    details: {
      variables: 'Variáveis detectadas',
      patterns: 'Padrões usados',
      quality: 'Lista de qualidade do prompt',
      examples: 'Exemplos',
    },
    quality: {
      waiting: 'Gere um prompt para ver as verificações de qualidade.',
      pass: 'Aprovado',
      review: 'Revisar',
    },
    examples: [
      'Escreva um prompt para um bot de suporte responder perguntas sobre reembolso com educação e evitar promessas sem base.',
      'Resuma notas de reunião, extraia decisões e tarefas, e responda em português.',
      'Crie um prompt que ajude a IA a depurar um bug React e propor um plano seguro de correção.',
    ],
  },
  ja: {
    meta: {
      title: 'Prompt Lab',
      description: '曖昧な要件を構造化されたプロンプトに変換するオフラインツールです。',
    },
    hero: {
      eyebrow: 'API key 不要',
      title: '曖昧な要件を構造化プロンプトに変換します。',
      copy: 'Prompt Lab は、自然言語のタスク説明から再利用可能な AI プロンプトを作るオフラインツールです。',
    },
    form: {
      language: '言語',
      label: '必要なプロンプトを説明してください',
      placeholder: '返金ポリシーの質問に丁寧に答え、根拠のない約束を避けるサポートボット用プロンプトを書いてください。',
    },
    actions: {
      generate: 'プロンプトを生成',
      copy: '結果をコピー',
      saveDraft: '下書きを保存',
      loadDraft: '下書きを読み込む',
      exportDraft: 'JSON をエクスポート',
      importDraft: 'JSON をインポート',
      clearDraft: '下書きをクリア',
    },
    status: {
      ready: 'ブラウザ内でローカル実行します。モデル呼び出し、API key、トラッキングはありません。',
      generated: 'プロンプトをローカルで生成しました。API 呼び出しは行っていません。',
      copied: '生成されたプロンプトをコピーしました。',
      empty: 'プロンプトに変換したいタスクを説明してください。',
      draftSaved: '下書きをこのブラウザに保存しました。',
      draftLoaded: '下書きを読み込みました。',
      draftMissing: 'このブラウザに保存済みの下書きはありません。',
      draftExported: '下書きを JSON としてエクスポートしました。',
      draftImported: '下書きをインポートしました。',
      draftCleared: '保存済みの下書きをクリアしました。',
      draftInvalid: 'このファイルは有効な Prompt Lab 下書きではありません。',
    },
    result: {
      categoryLabel: 'カテゴリ',
      categoryWaiting: '入力待ち',
      languageLabel: '言語',
      languageAuto: '自動',
      initial: 'タスクを説明すると、構造化プロンプトを生成します。',
    },
    details: {
      variables: '検出された変数',
      patterns: '使用したパターン',
      quality: 'プロンプト品質チェックリスト',
      examples: '例',
    },
    quality: {
      waiting: 'プロンプトを生成すると品質チェックが表示されます。',
      pass: '合格',
      review: '確認',
    },
    examples: [
      '返金ポリシーの質問に丁寧に答え、根拠のない約束を避けるサポートボット用プロンプトを書いてください。',
      '会議メモを要約し、決定事項とアクション項目を抽出し、日本語で出力してください。',
      'AI が React のバグを分析し、安全な修正計画を提案するためのプロンプトを作ってください。',
    ],
  },
};

function getValue(languageCode, key) {
  return key.split('.').reduce((value, part) => value?.[part], STRINGS[languageCode]);
}

export function getLanguage(code) {
  return SUPPORTED_LANGUAGES.find((language) => language.code === code) ?? SUPPORTED_LANGUAGES[0];
}

export function getInitialLanguage(preferredLanguages = [], storedLanguage = undefined) {
  if (SUPPORTED_LANGUAGES.some((language) => language.code === storedLanguage)) {
    return storedLanguage;
  }

  for (const preferred of preferredLanguages) {
    const exact = SUPPORTED_LANGUAGES.find((language) => language.code.toLowerCase() === String(preferred).toLowerCase());
    if (exact) return exact.code;

    const base = String(preferred).split('-')[0].toLowerCase();
    const baseMatch = SUPPORTED_LANGUAGES.find((language) => language.code.split('-')[0].toLowerCase() === base);
    if (baseMatch) return baseMatch.code;
  }

  return DEFAULT_LANGUAGE;
}

export function translate(languageCode, key) {
  const language = getLanguage(languageCode).code;
  return getValue(language, key) ?? getValue(DEFAULT_LANGUAGE, key) ?? key;
}
