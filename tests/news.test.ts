import { describe, expect, it } from 'vitest';
import { buildQuery, mapGNews, fetchGNews } from '@/lib/news/gnews';
import { dedupe, isRelevant, canonicalUrl } from '@/lib/news/dedupe';
import { parseRss } from '@/lib/news/pib';
import { getSectorNews, type NewsDeps } from '@/lib/news/service';
import { MemoryCache } from '@/lib/news/cache';
import { NewsError, type Article } from '@/lib/news/types';
import { SECTORS, MANUFACTURING, SERVICES, getSector } from '@/data/sectors';

// ---- Test fixtures only (never shown in the UI) ----
const art = (over: Partial<Article>): Article => ({
  id: over.url ?? 'x', title: 'T', description: '', url: 'https://a.test/1', source: 'S',
  publishedAt: '2026-10-10T10:00:00Z', kind: 'media', ...over,
});
const NOW = new Date('2026-10-11T12:00:00Z');
const gnewsBody = (rows: unknown[]) => new Response(JSON.stringify({ articles: rows }), { status: 200 });
const deps = (over: Partial<NewsDeps> & { fetchImpl: typeof fetch }): NewsDeps => ({
  cache: new MemoryCache(), apiKey: 'test-key', pibUrl: undefined, ttlMs: 8 * 3_600_000,
  dailyBudget: 90, historyDays: 30, now: () => NOW, ...over,
});

describe('sector config', () => {
  it('has 15 manufacturing + 12 services with unique slugs', () => {
    expect(MANUFACTURING).toHaveLength(15);
    expect(SERVICES).toHaveLength(12);
    expect(new Set(SECTORS.map((s) => s.slug)).size).toBe(27);
  });
  it('every sector query fits the provider length limit', () => {
    for (const s of SECTORS) expect(buildQuery(s).length).toBeLessThanOrEqual(200);
  });
});

describe('gnews mapping', () => {
  it('drops rows missing title, url or a valid date', () => {
    const out = mapGNews([
      { title: 'ok', url: 'https://a.test/1', publishedAt: '2026-10-10T10:00:00Z', source: { name: 'ET' } },
      { title: '', url: 'https://a.test/2', publishedAt: '2026-10-10T10:00:00Z' },
      { title: 'no url', publishedAt: '2026-10-10T10:00:00Z' },
      { title: 'bad date', url: 'https://a.test/3', publishedAt: 'nope' },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0].source).toBe('ET');
  });
  it('fills a missing source and description', () => {
    const [a] = mapGNews([{ title: 't', url: 'https://a.test', publishedAt: '2026-10-10T10:00:00Z' }]);
    expect(a.source).toBe('Unknown source');
    expect(a.description).toBe('');
  });
});

describe('provider errors', () => {
  const sector = getSector('railways')!;
  it.each([[401, 'auth'], [403, 'auth'], [429, 'rate_limit'], [500, 'upstream']])('HTTP %i -> %s', async (status, code) => {
    const f = (async () => new Response('{}', { status })) as typeof fetch;
    await expect(fetchGNews(sector, 'k', f)).rejects.toMatchObject({ code });
  });
  it('missing key -> not_configured', async () => {
    await expect(fetchGNews(sector, undefined, fetch)).rejects.toMatchObject({ code: 'not_configured' });
  });
  it('network failure -> upstream', async () => {
    const f = (async () => { throw new Error('down'); }) as typeof fetch;
    await expect(fetchGNews(sector, 'k', f)).rejects.toMatchObject({ code: 'upstream' });
  });
  it('never puts the key anywhere but the provider URL', async () => {
    let seen = '';
    const f = (async (u: URL) => { seen = u.toString(); return gnewsBody([]); }) as unknown as typeof fetch;
    await fetchGNews(sector, 'SECRET123', f);
    expect(seen).toContain('apikey=SECRET123');
  });
});

describe('dedupe + relevance', () => {
  it('removes same-URL (tracking params) and near-duplicate titles, newest first', () => {
    const out = dedupe([
      art({ url: 'https://a.test/x?utm_source=tw', title: 'Vande Bharat sleeper train begins trials', publishedAt: '2026-10-09T00:00:00Z' }),
      art({ url: 'https://www.a.test/x', title: 'Vande Bharat sleeper train begins trials', publishedAt: '2026-10-10T00:00:00Z' }),
      art({ url: 'https://b.test/y', title: 'Vande Bharat sleeper train begins trials - Mint', publishedAt: '2026-10-08T00:00:00Z' }),
      art({ url: 'https://c.test/z', title: 'Steel exports rise', publishedAt: '2026-10-07T00:00:00Z' }),
    ]);
    expect(out.map((a) => a.url)).toEqual(['https://www.a.test/x', 'https://c.test/z']);
  });
  it('canonicalises URLs', () => {
    expect(canonicalUrl('https://www.A.test/p/?utm_medium=x#h')).toBe('a.test/p');
  });
  it('filters irrelevant stories', () => {
    const s = getSector('railways')!;
    expect(isRelevant(art({ title: 'Indian Railways manufacturing push for new coaches' }), s)).toBe(true);
    expect(isRelevant(art({ title: 'Railways recruitment 2026 vacancy notice' }), s)).toBe(false);
    expect(isRelevant(art({ title: 'Cricket final tonight' }), s)).toBe(false);
  });
});

describe('PIB RSS', () => {
  it('parses items and skips malformed ones', () => {
    const xml = `<rss><channel>
      <item><title><![CDATA[Cabinet approves scheme]]></title><link>https://pib.test/1</link><pubDate>Fri, 10 Oct 2026 08:00:00 GMT</pubDate><description>desc &amp; more</description></item>
      <item><title>no link</title><pubDate>Fri, 10 Oct 2026 08:00:00 GMT</pubDate></item></channel></rss>`;
    const out = parseRss(xml);
    expect(out).toHaveLength(1);
    expect(out[0]).toMatchObject({ kind: 'government', title: 'Cabinet approves scheme', description: 'desc & more' });
  });
});

describe('getSectorNews service', () => {
  const rows = [
    { title: 'Indian Railways manufacturing: new coach factory', url: 'https://a.test/1', publishedAt: '2026-10-10T10:00:00Z', source: { name: 'ET' } },
    { title: 'Indian Railways manufacturing: new coach factory - Mint', url: 'https://b.test/2', publishedAt: '2026-10-09T10:00:00Z', source: { name: 'Mint' } },
    { title: 'Rolling stock order placed', url: 'https://c.test/3', publishedAt: '2026-05-01T10:00:00Z', source: { name: 'BS' } },
  ];

  it('fetches once, caches, filters by range and sorts newest first', async () => {
    let calls = 0;
    const d = deps({ fetchImpl: (async () => { calls++; return gnewsBody(rows); }) as typeof fetch });
    const week = await getSectorNews('railways', 'week', d);
    expect(week.articles).toHaveLength(1);
    const year = await getSectorNews('railways', 'year', d);
    expect(year.articles.map((a) => a.url)).toEqual(['https://a.test/1', 'https://c.test/3']);
    expect(calls).toBe(1); // second call served from cache
    expect(year.rangeLimited).toBe(true); // 365d > 30d plan history
    expect(week.rangeLimited).toBe(false);
  });

  it('serves stale cache with a warning when the provider rate-limits', async () => {
    const cache = new MemoryCache();
    await cache.set('sector:railways', { articles: [art({ url: 'https://old.test/1', publishedAt: '2026-10-09T00:00:00Z' })], fetchedAt: '2026-10-01T00:00:00Z' });
    const d = deps({ cache, fetchImpl: (async () => new Response('{}', { status: 429 })) as typeof fetch });
    const r = await getSectorNews('railways', 'month', d);
    expect(r.stale).toBe(true);
    expect(r.warning).toMatch(/saved headlines/);
    expect(r.fetchedAt).toBe('2026-10-01T00:00:00Z'); // last *successful* update, not now
  });

  it('throws when the provider fails and there is no cache', async () => {
    const d = deps({ fetchImpl: (async () => new Response('{}', { status: 401 })) as typeof fetch });
    await expect(getSectorNews('railways', 'week', d)).rejects.toBeInstanceOf(NewsError);
  });

  it('enforces the daily call budget', async () => {
    const d = deps({ dailyBudget: 1, fetchImpl: (async () => gnewsBody(rows)) as typeof fetch });
    await getSectorNews('railways', 'week', d);
    await expect(getSectorNews('shipping', 'week', d)).rejects.toMatchObject({ code: 'budget' });
  });

  it('collapses concurrent requests into one provider call', async () => {
    let calls = 0;
    const d = deps({ fetchImpl: (async () => { calls++; await new Promise((r) => setTimeout(r, 20)); return gnewsBody(rows); }) as typeof fetch });
    await Promise.all([getSectorNews('railways', 'week', d), getSectorNews('railways', 'month', d)]);
    expect(calls).toBe(1);
  });

  it('rejects unknown sectors without calling the provider', async () => {
    const d = deps({ fetchImpl: (async () => { throw new Error('should not be called'); }) as typeof fetch });
    await expect(getSectorNews('nope', 'week', d)).rejects.toMatchObject({ code: 'bad_request' });
  });
});
