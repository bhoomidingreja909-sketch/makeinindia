import type { CacheEntry, CacheStore } from './types';

/** Per-process cache. Fine for local dev and a single server; lost on serverless cold starts. */
export class MemoryCache implements CacheStore {
  private map = new Map<string, CacheEntry>();
  private counters = new Map<string, number>();
  async get(key: string) {
    return this.map.get(key) ?? null;
  }
  async set(key: string, entry: CacheEntry) {
    this.map.set(key, entry);
  }
  async incr(key: string) {
    const n = (this.counters.get(key) ?? 0) + 1;
    this.counters.set(key, n);
    return n;
  }
}

/** Survives cold starts by persisting to the Supabase `news_cache` table (service role, server only). */
export class SupabaseCache implements CacheStore {
  constructor(private url: string, private serviceKey: string) {}

  private headers() {
    return { apikey: this.serviceKey, Authorization: `Bearer ${this.serviceKey}`, 'Content-Type': 'application/json' };
  }

  async get(key: string): Promise<CacheEntry | null> {
    try {
      const res = await fetch(`${this.url}/rest/v1/news_cache?key=eq.${encodeURIComponent(key)}&select=payload,fetched_at`, {
        headers: this.headers(),
        cache: 'no-store',
        signal: AbortSignal.timeout(5_000),
      });
      if (!res.ok) return null;
      const rows = (await res.json()) as { payload: { articles: CacheEntry['articles']; count?: number }; fetched_at: string }[];
      return rows[0] ? { articles: rows[0].payload.articles ?? [], count: rows[0].payload.count, fetchedAt: rows[0].fetched_at } : null;
    } catch {
      return null;
    }
  }

  async set(key: string, entry: CacheEntry) {
    try {
      await fetch(`${this.url}/rest/v1/news_cache`, {
        method: 'POST',
        headers: { ...this.headers(), Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({ key, payload: { articles: entry.articles, count: entry.count }, fetched_at: entry.fetchedAt, status: 'ok' }),
        signal: AbortSignal.timeout(5_000),
      });
    } catch {
      /* cache write failures must never break the feed */
    }
  }

  // Best-effort daily call budget: read-modify-write, so concurrent cold starts may undercount slightly.
  async incr(key: string) {
    const n = ((await this.get(key))?.count ?? 0) + 1;
    await this.set(key, { articles: [], count: n, fetchedAt: new Date().toISOString() });
    return n;
  }
}

let shared: CacheStore | undefined;
export function getCache(): CacheStore {
  if (shared) return shared;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  shared = url && key ? new SupabaseCache(url, key) : new MemoryCache();
  return shared;
}
