import { NewsError, type Article } from './types';
import type { Sector } from '@/data/sectors';

const ENDPOINT = 'https://gnews.io/api/v4/search';
const MAX_Q = 200; // GNews query length limit (verify on gnews.io/docs)

/** ("kw1" OR "kw2" ...) NOT x — trimmed to the provider's query length limit. */
export function buildQuery(sector: Sector): string {
  const nots = (sector.exclude ?? []).map((x) => ` NOT "${x}"`).join('');
  const parts: string[] = [];
  for (const kw of sector.keywords) {
    const next = `(${[...parts, `"${kw}"`].join(' OR ')})${nots}`;
    if (next.length > MAX_Q) break;
    parts.push(`"${kw}"`);
  }
  if (!parts.length) throw new NewsError('bad_request', `No keywords fit the query limit for ${sector.slug}`);
  return `(${parts.join(' OR ')})${nots}`;
}

interface GNewsArticle {
  title?: string;
  description?: string;
  url?: string;
  publishedAt?: string;
  source?: { name?: string };
}

/** Map provider output, dropping rows without a title, link or valid date. */
export function mapGNews(rows: GNewsArticle[]): Article[] {
  const out: Article[] = [];
  for (const r of rows) {
    if (!r?.title || !r.url || !r.publishedAt || Number.isNaN(Date.parse(r.publishedAt))) continue;
    out.push({
      id: r.url,
      title: r.title.trim(),
      description: (r.description ?? '').trim(),
      url: r.url,
      source: r.source?.name?.trim() || 'Unknown source',
      publishedAt: new Date(r.publishedAt).toISOString(),
      kind: 'media',
    });
  }
  return out;
}

export async function fetchGNews(
  sector: Sector,
  apiKey: string | undefined,
  fetchImpl: typeof fetch = fetch,
): Promise<Article[]> {
  if (!apiKey) throw new NewsError('not_configured', 'GNEWS_API_KEY is not set on the server.');
  const url = new URL(ENDPOINT);
  url.searchParams.set('q', buildQuery(sector));
  url.searchParams.set('lang', 'en');
  url.searchParams.set('country', 'in');
  url.searchParams.set('max', '10');
  url.searchParams.set('sortby', 'publishedAt');
  url.searchParams.set('apikey', apiKey);

  let res: Response;
  try {
    res = await fetchImpl(url, { signal: AbortSignal.timeout(10_000), cache: 'no-store' });
  } catch {
    throw new NewsError('upstream', 'The news provider could not be reached.');
  }
  if (res.status === 401 || res.status === 403)
    throw new NewsError('auth', 'The news API key is invalid, expired or over its plan limit.');
  if (res.status === 429) throw new NewsError('rate_limit', 'The news provider rate limit was reached.');
  if (!res.ok) throw new NewsError('upstream', `The news provider returned HTTP ${res.status}.`);

  const body = (await res.json().catch(() => null)) as { articles?: GNewsArticle[] } | null;
  if (!body || !Array.isArray(body.articles)) throw new NewsError('upstream', 'Unexpected response from the news provider.');
  return mapGNews(body.articles);
}
