/**
 * Polite daily ingestion of Invest India blog/news pages.
 * Rules: honour robots.txt (fail closed), identify ourselves, 1.5 s between requests,
 * a hard page cap per run, and keep ONLY title + short excerpt + date + link (always credited, never full text).
 */
export const BASE = 'https://www.investindia.gov.in';
export const SOURCE_NAME = 'Invest India';
// Path fragments seen on Invest India article URLs. Adjust here if the sitemap shows different sections.
export const ARTICLE_PATH = /\/(team-india-blogs|blogs|news)\//i;

export interface Ingested { url: string; title: string; excerpt: string; source: string; published_at: string }

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// ---- robots.txt -------------------------------------------------------------
export interface Rules { allow: string[]; disallow: string[] }

export function parseRobots(txt: string, ua: string): Rules {
  const groups: { agents: string[]; allow: string[]; disallow: string[] }[] = [];
  let cur: (typeof groups)[number] | null = null;
  let lastWasAgent = false;
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const k = m[1].toLowerCase(), v = m[2].trim();
    if (k === 'user-agent') {
      if (!cur || !lastWasAgent) { cur = { agents: [], allow: [], disallow: [] }; groups.push(cur); }
      cur.agents.push(v.toLowerCase());
      lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (!cur) continue;
      if (k === 'allow' && v) cur.allow.push(v);
      if (k === 'disallow' && v) cur.disallow.push(v);
    }
  }
  const mine = ua.toLowerCase();
  const specific = groups.filter((g) => g.agents.some((a) => a !== '*' && mine.includes(a)));
  const chosen = specific.length ? specific : groups.filter((g) => g.agents.includes('*'));
  return { allow: chosen.flatMap((g) => g.allow), disallow: chosen.flatMap((g) => g.disallow) };
}

/** Longest matching rule wins; ties go to Allow. No rules means allowed. */
export function isAllowed(path: string, rules: Rules): boolean {
  const hit = (p: string) => (p.endsWith('$') ? path === p.slice(0, -1) : path.startsWith(p.replace(/\*.*$/, '')) );
  const a = Math.max(-1, ...rules.allow.filter(hit).map((p) => p.length));
  const d = Math.max(-1, ...rules.disallow.filter(hit).map((p) => p.length));
  return d < 0 || a >= d;
}

// ---- sitemap -----------------------------------------------------------------
export function parseSitemap(xml: string): { urls: { loc: string; lastmod?: string }[]; children: string[] } {
  const urls: { loc: string; lastmod?: string }[] = [];
  const children: string[] = [];
  for (const m of xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/gi)) {
    const loc = m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/i)?.[1];
    if (loc) children.push(decode(loc));
  }
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const loc = m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/i)?.[1];
    const lastmod = m[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i)?.[1];
    if (loc) urls.push({ loc: decode(loc), lastmod });
  }
  return { urls, children };
}

// ---- article extraction --------------------------------------------------------
function meta(html: string, key: string): string | undefined {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, 'i');
  const tag = html.match(re)?.[0];
  return tag?.match(/content=["']([^"']*)["']/i)?.[1];
}

export function extractArticle(html: string, url: string, lastmod?: string): Ingested | null {
  let title = meta(html, 'og:title') ?? html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!title) return null;
  title = decode(title).replace(/\s*[|\-–]\s*Invest India\s*$/i, '').trim();
  const desc = decode(meta(html, 'og:description') ?? meta(html, 'description') ?? '');
  const dateRaw = meta(html, 'article:published_time') ?? html.match(/<time[^>]+datetime=["']([^"']+)["']/i)?.[1] ?? lastmod;
  const t = dateRaw ? Date.parse(dateRaw) : NaN;
  if (!title || Number.isNaN(t)) return null; // never invent a date
  return { url, title, excerpt: desc.slice(0, 220), source: SOURCE_NAME, published_at: new Date(t).toISOString() };
}

// ---- orchestration ---------------------------------------------------------------
export interface RunOpts {
  fetchImpl?: typeof fetch;
  ua: string;
  maxPages?: number;
  delayMs?: number;
  skip?: Set<string>;
  sleep?: (ms: number) => Promise<void>;
  log?: (m: string) => void;
}

export async function crawl(opts: RunOpts): Promise<Ingested[]> {
  const f = opts.fetchImpl ?? fetch;
  const log = opts.log ?? (() => {});
  const sleep = opts.sleep ?? ((ms: number) => new Promise((r) => setTimeout(r, ms)));
  const get = async (u: string) => f(u, { headers: { 'User-Agent': opts.ua, Accept: 'text/html,application/xml' }, signal: AbortSignal.timeout(15_000), redirect: 'follow' });

  const rr = await get(`${BASE}/robots.txt`);
  if (rr.status >= 500 || rr.status === 401 || rr.status === 403) throw new Error(`robots.txt unavailable (HTTP ${rr.status}); not crawling.`);
  const rules = rr.ok ? parseRobots(await rr.text(), opts.ua) : { allow: [], disallow: [] }; // 404 = no restrictions
  const ok = (u: string) => { try { return isAllowed(new URL(u).pathname, rules); } catch { return false; } };

  const root = await get(`${BASE}/sitemap.xml`);
  if (!root.ok) throw new Error(`sitemap.xml unavailable (HTTP ${root.status}).`);
  const first = parseSitemap(await root.text());
  let entries = [...first.urls];
  for (const child of first.children.filter(ok).slice(0, 6)) {
    await sleep(opts.delayMs ?? 1500);
    const r = await get(child);
    if (r.ok) entries.push(...parseSitemap(await r.text()).urls);
  }

  const candidates = entries
    .filter((e) => e.loc.startsWith(BASE) && ARTICLE_PATH.test(new URL(e.loc).pathname) && ok(e.loc) && !opts.skip?.has(e.loc))
    .sort((a, b) => Date.parse(b.lastmod ?? '') - Date.parse(a.lastmod ?? '') || 0)
    .slice(0, opts.maxPages ?? 30);
  log(`${entries.length} sitemap urls, ${candidates.length} new article candidates`);

  const out: Ingested[] = [];
  for (const c of candidates) {
    await sleep(opts.delayMs ?? 1500);
    try {
      const r = await get(c.loc);
      if (!r.ok) { log(`skip ${c.loc}: HTTP ${r.status}`); continue; }
      const a = extractArticle(await r.text(), c.loc, c.lastmod);
      if (a) out.push(a); else log(`skip ${c.loc}: no title/date found (page may be JavaScript-rendered)`);
    } catch (e) { log(`skip ${c.loc}: ${(e as Error).message}`); }
  }
  return out;
}
