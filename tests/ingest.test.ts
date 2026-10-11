import { describe, expect, it } from 'vitest';
import { crawl, extractArticle, isAllowed, parseRobots, parseSitemap, BASE } from '@/lib/ingest/investindia';
import { fetchIngested } from '@/lib/ingest/store';
import { getSectorNews, type NewsDeps } from '@/lib/news/service';
import { MemoryCache } from '@/lib/news/cache';

// ---- Test fixtures only (never shown in the UI) ----
const UA = 'TestBot/1.0 (academic)';
const html = (title: string, desc: string, date?: string) =>
  `<html><head><title>${title} | Invest India</title><meta property="og:title" content="${title}"><meta name="description" content="${desc}">${date ? `<meta property="article:published_time" content="${date}">` : ''}</head><body>x</body></html>`;
const res = (body: string, status = 200) => new Response(body, { status });

describe('robots.txt', () => {
  it('Allow: / for * permits everything (the real file Invest India serves)', () => {
    const r = parseRobots('User-agent: *\nAllow: /\n\nSitemap: https://www.investindia.gov.in/sitemap.xml', UA);
    expect(isAllowed('/blogs/anything', r)).toBe(true);
  });
  it('honours Disallow with longest-match and a specific agent group', () => {
    const r = parseRobots('User-agent: *\nDisallow: /private\nAllow: /private/open\n\nUser-agent: testbot\nDisallow: /blogs', UA);
    expect(isAllowed('/blogs/x', r)).toBe(false);
    expect(isAllowed('/news/x', r)).toBe(true);
    const star = parseRobots('User-agent: *\nDisallow: /private\nAllow: /private/open', 'Other');
    expect(isAllowed('/private/secret', star)).toBe(false);
    expect(isAllowed('/private/open/page', star)).toBe(true);
  });
});

describe('sitemap + extraction', () => {
  it('parses urlset and sitemapindex', () => {
    const a = parseSitemap('<urlset><url><loc>https://x/a</loc><lastmod>2026-10-01</lastmod></url></urlset>');
    expect(a.urls).toEqual([{ loc: 'https://x/a', lastmod: '2026-10-01' }]);
    expect(parseSitemap('<sitemapindex><sitemap><loc>https://x/s1.xml</loc></sitemap></sitemapindex>').children).toEqual(['https://x/s1.xml']);
  });
  it('extracts title (suffix stripped), excerpt and date; never invents a date', () => {
    const a = extractArticle(html('Railways &amp; Manufacturing', 'A short summary', '2026-10-05T10:00:00Z'), `${BASE}/blogs/r`)!;
    expect(a).toMatchObject({ title: 'Railways & Manufacturing', excerpt: 'A short summary', source: 'Invest India' });
    expect(extractArticle(html('No date', 'd'), `${BASE}/blogs/r`)).toBeNull();
    expect(extractArticle(html('Fallback', 'd'), `${BASE}/blogs/r`, '2026-09-01')?.published_at).toContain('2026-09-01');
    expect(extractArticle('<html></html>', `${BASE}/blogs/r`, '2026-09-01')).toBeNull();
  });
  it('truncates the excerpt (we store a snippet, not full text)', () => {
    expect(extractArticle(html('T', 'x'.repeat(1000), '2026-10-05'), `${BASE}/blogs/r`)!.excerpt.length).toBeLessThanOrEqual(220);
  });
});

describe('crawl', () => {
  const sitemap = `<urlset>${Array.from({ length: 5 }, (_, i) => `<url><loc>${BASE}/blogs/post-${i}</loc><lastmod>2026-10-0${i + 1}</lastmod></url>`).join('')}<url><loc>${BASE}/about</loc></url><url><loc>https://evil.example/blogs/x</loc></url></urlset>`;
  const make = (robots: string, robotsStatus = 200) => {
    const seen: string[] = [];
    const f = (async (u: string) => {
      seen.push(u);
      if (u.endsWith('/robots.txt')) return res(robots, robotsStatus);
      if (u.endsWith('/sitemap.xml')) return res(sitemap);
      return res(html('Post ' + u.split('-').pop(), 'desc', '2026-10-05'));
    }) as unknown as typeof fetch;
    return { f, seen };
  };
  const base = { ua: UA, delayMs: 0, sleep: async () => {} };

  it('collects only same-host article URLs, newest first, within the page cap', async () => {
    const { f, seen } = make('User-agent: *\nAllow: /');
    const rows = await crawl({ ...base, fetchImpl: f, maxPages: 3 });
    expect(rows).toHaveLength(3);
    expect(seen.some((u) => u.includes('evil.example') || u.endsWith('/about'))).toBe(false);
    expect(seen.filter((u) => u.includes('/blogs/')).length).toBe(3);
    expect(seen.find((u) => u.includes('/blogs/'))).toContain('post-4'); // newest lastmod first
  });
  it('does not fetch disallowed paths', async () => {
    const { f, seen } = make('User-agent: *\nDisallow: /blogs');
    expect(await crawl({ ...base, fetchImpl: f })).toEqual([]);
    expect(seen.some((u) => u.includes('/blogs/'))).toBe(false);
  });
  it('fails closed when robots.txt is unavailable (5xx/403), but treats 404 as no restrictions', async () => {
    await expect(crawl({ ...base, fetchImpl: make('', 503).f })).rejects.toThrow(/robots/);
    await expect(crawl({ ...base, fetchImpl: make('', 403).f })).rejects.toThrow(/robots/);
    expect((await crawl({ ...base, fetchImpl: make('', 404).f })).length).toBeGreaterThan(0);
  });
  it('skips already-stored URLs and pages with no usable title/date', async () => {
    const { f } = make('User-agent: *\nAllow: /');
    const rows = await crawl({ ...base, fetchImpl: f, skip: new Set([`${BASE}/blogs/post-4`]) });
    expect(rows.find((r) => r.url.endsWith('post-4'))).toBeUndefined();
  });
  it('sends an identifying User-Agent', async () => {
    const heads: string[] = [];
    const f = (async (u: string, init?: RequestInit) => { heads.push(String((init?.headers as Record<string, string>)['User-Agent'])); return u.endsWith('robots.txt') ? res('') : res('<urlset></urlset>'); }) as unknown as typeof fetch;
    await crawl({ ...base, fetchImpl: f });
    expect(heads.every((h) => h === UA)).toBe(true);
  });
});

describe('news service with ingested articles', () => {
  const NOW = new Date('2026-10-11T12:00:00Z');
  const rows = [{ url: 'https://www.investindia.gov.in/blogs/rail', title: 'Indian Railways manufacturing expands', excerpt: 'coaches', source: 'Invest India', published_at: '2026-10-08T00:00:00Z' }];
  const supa = (async () => new Response(JSON.stringify(rows), { status: 200 })) as unknown as typeof fetch;
  const cfg = { url: 'https://p.supabase.co', key: 'sb_secret_x' };
  const deps = (o: Partial<NewsDeps>): NewsDeps => ({ cache: new MemoryCache(), fetchImpl: supa, apiKey: undefined, pibUrl: undefined, supabase: cfg, ttlMs: 3_600_000, dailyBudget: 90, historyDays: 30, now: () => NOW, ...o });

  it('works with no news API key at all, crediting Invest India', async () => {
    const r = await getSectorNews('railways', 'month', deps({}));
    expect(r.articles).toHaveLength(1);
    expect(r.articles[0]).toMatchObject({ source: 'Invest India', kind: 'government' });
  });
  it('still says not_configured when no source exists', async () => {
    await expect(getSectorNews('railways', 'month', deps({ supabase: null }))).rejects.toMatchObject({ code: 'not_configured' });
  });
  it('keeps serving ingested articles when the news API is rate-limited', async () => {
    const f = (async (u: string) => (String(u).includes('gnews.io') ? new Response('{}', { status: 429 }) : new Response(JSON.stringify(rows), { status: 200 }))) as unknown as typeof fetch;
    const r = await getSectorNews('railways', 'month', deps({ apiKey: 'k', fetchImpl: f }));
    expect(r.articles).toHaveLength(1);
  });
  it('fetchIngested returns [] on failure instead of throwing', async () => {
    expect(await fetchIngested(cfg, (async () => { throw new Error('down'); }) as unknown as typeof fetch)).toEqual([]);
    expect(await fetchIngested(null)).toEqual([]);
  });
});
