const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'of', 'to', 'in', 'for', 'and', 'or', 'on', 'what', 'how', 'do', 'i', 'can', 'my', 'me', 'it', 'be', 'does', 'with', 'this', 'that', 'who', 'where', 'which']);

export function tokens(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9ऀ-ॿ\s]/g, ' ').split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w));
}

/** Simple, explainable relevance: title hits count 3x, body hits 1x, whole-phrase bonus. */
export function score(query: string, title: string, body: string): number {
  const q = tokens(query);
  if (!q.length) return 0;
  const t = new Set(tokens(title));
  const b = new Set(tokens(body));
  let n = 0;
  for (const w of q) {
    if (t.has(w)) n += 3;
    else if ([...t].some((x) => x.startsWith(w) || w.startsWith(x))) n += 1.5;
    if (b.has(w)) n += 1;
  }
  if (title.toLowerCase().includes(query.trim().toLowerCase())) n += 4;
  return n;
}
