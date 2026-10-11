import type { Article } from './types';

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  if (!m) return '';
  return m[1]
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** Parse an RSS 2.0 document into government-release articles. */
export function parseRss(xml: string, sourceName = 'Press Information Bureau'): Article[] {
  const items = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const out: Article[] = [];
  for (const item of items) {
    const title = tag(item, 'title');
    const link = tag(item, 'link');
    const date = Date.parse(tag(item, 'pubDate'));
    if (!title || !link || Number.isNaN(date)) continue;
    out.push({
      id: link,
      title,
      description: tag(item, 'description').slice(0, 280),
      url: link,
      source: sourceName,
      publishedAt: new Date(date).toISOString(),
      kind: 'government',
    });
  }
  return out;
}

/** Optional official stream. Returns [] on any failure — it must never break the feed. */
export async function fetchPib(feedUrl: string | undefined, fetchImpl: typeof fetch = fetch): Promise<Article[]> {
  if (!feedUrl) return [];
  try {
    const res = await fetchImpl(feedUrl, { signal: AbortSignal.timeout(8_000), cache: 'no-store' });
    if (!res.ok) return [];
    return parseRss(await res.text());
  } catch {
    return [];
  }
}
