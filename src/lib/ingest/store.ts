import { supabaseConfig, supabaseHeaders } from '../supabase';
import type { Article } from '../news/types';
import type { Ingested } from './investindia';

type Cfg = NonNullable<ReturnType<typeof supabaseConfig>>;

export async function saveIngested(cfg: Cfg, rows: Ingested[], fetchImpl: typeof fetch = fetch): Promise<void> {
  if (!rows.length) return;
  const res = await fetchImpl(`${cfg.url}/rest/v1/ingested_articles?on_conflict=url`, {
    method: 'POST',
    headers: { ...supabaseHeaders(cfg.key), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows.map((r) => ({ ...r, fetched_at: new Date().toISOString() }))),
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`Supabase save failed: HTTP ${res.status} ${await res.text().catch(() => '')}`);
}

export async function knownUrls(cfg: Cfg, fetchImpl: typeof fetch = fetch): Promise<Set<string>> {
  const res = await fetchImpl(`${cfg.url}/rest/v1/ingested_articles?select=url&limit=5000`, { headers: supabaseHeaders(cfg.key), signal: AbortSignal.timeout(15_000) });
  if (!res.ok) return new Set();
  return new Set(((await res.json()) as { url: string }[]).map((r) => r.url));
}

/** Read side used by the news service. Never throws — it must not break the feed. */
export async function fetchIngested(cfg: Cfg | null, fetchImpl: typeof fetch = fetch): Promise<Article[]> {
  if (!cfg) return [];
  try {
    const res = await fetchImpl(`${cfg.url}/rest/v1/ingested_articles?select=url,title,excerpt,source,published_at&order=published_at.desc&limit=300`, {
      headers: supabaseHeaders(cfg.key), cache: 'no-store', signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as Ingested[];
    return rows.map((r) => ({ id: r.url, title: r.title, description: r.excerpt ?? '', url: r.url, source: r.source || 'Invest India', publishedAt: r.published_at, kind: 'government' as const }));
  } catch {
    return [];
  }
}
