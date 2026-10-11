import type { Article } from './types';
import type { Sector } from '@/data/sectors';

const TRACKING = /^(utm_|fbclid|gclid|ref$|ocid)/i;

export function canonicalUrl(raw: string): string {
  try {
    const u = new URL(raw);
    for (const k of [...u.searchParams.keys()]) if (TRACKING.test(k)) u.searchParams.delete(k);
    u.hash = '';
    return (u.hostname.replace(/^www\./, '') + u.pathname.replace(/\/+$/, '') + u.search).toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s[-–|]\s[^-–|]{2,40}$/, '') // trailing " - Source Name"
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function jaccard(a: string, b: string): number {
  const A = new Set(a.split(' ').filter((w) => w.length > 2));
  const B = new Set(b.split(' ').filter((w) => w.length > 2));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}

/** Newest-first de-duplication by URL, exact title, and near-duplicate title. */
export function dedupe(articles: Article[], threshold = 0.8): Article[] {
  const sorted = [...articles].sort((x, y) => Date.parse(y.publishedAt) - Date.parse(x.publishedAt));
  const urls = new Set<string>();
  const kept: { a: Article; t: string }[] = [];
  for (const a of sorted) {
    const u = canonicalUrl(a.url);
    const t = normalizeTitle(a.title);
    if (urls.has(u)) continue;
    if (kept.some((k) => k.t === t || jaccard(k.t, t) >= threshold)) continue;
    urls.add(u);
    kept.push({ a, t });
  }
  return kept.map((k) => k.a);
}

/** Keep only stories that mention a sector keyword and none of its exclusions. */
export function isRelevant(a: Article, sector: Sector): boolean {
  const text = `${a.title} ${a.description}`.toLowerCase();
  if (sector.exclude?.some((x) => text.includes(x.toLowerCase()))) return false;
  // A keyword matches when every significant word of the phrase appears.
  return sector.keywords.some((kw) =>
    kw
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2 && w !== 'india')
      .every((w) => text.includes(w)),
  );
}
