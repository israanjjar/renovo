const ALIASES: Record<string, string[]> = {
  'CI/CD': ['ci cd', 'ci/cd', 'cicd', 'continuous integration continuous delivery'],
  'MVP': ['mvp', 'minimum viable product'],
  'ROI': ['roi', 'return on investment'],
  'API': ['api', 'application programming interface'],
  'DevOps': ['devops', 'dev ops'],
  'SLA': ['sla', 'service level agreement'],
  'WIP limit': ['wip limit', 'work in progress limit'],
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[^\w\s'/\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function detectWords(text: string, words: string[]): string[] {
  const normalized = normalize(text);
  const detected: string[] = [];

  for (const word of words) {
    if (word === 'FREE') continue;

    const lowerWord = normalize(word);
    const aliases = ALIASES[word] ?? [lowerWord];

    for (const alias of aliases) {
      if (alias.includes(' ') || alias.includes('/') || alias.includes('-')) {
        // Multi-word or special chars: substring match
        if (normalized.includes(alias)) {
          detected.push(word);
          break;
        }
      } else {
        // Single word: word boundary match
        const regex = new RegExp(`\\b${alias}\\b`, 'i');
        if (regex.test(normalized)) {
          detected.push(word);
          break;
        }
      }
    }
  }

  return detected;
}
