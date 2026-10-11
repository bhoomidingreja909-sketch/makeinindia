import { fetchGNews } from './gnews';
import { fetchPib } from './pib';
import { dedupe, isRelevant } from './dedupe';
import { getCache } from './cache';
import { fetchIngested } from '../ingest/store';
import { supabaseConfig } from '../supabase';
import {
  NewsError,
  RANGE_DAYS,
  type Article,
  type CacheStore,
  type NewsRange,
  type SectorNewsResult,
} from './types';
import { getSector } from '@/data/sectors';

export interface NewsDeps {
  cache: CacheStore;
  fetchImpl: typeof fetch;
  apiKey: string | undefined;
  pibUrl: string | undefined;
  /** When set, articles collected by the daily Invest India job are included. */
  supabase?: ReturnType<typeof supabaseConfig>;
  ttlMs: number;
  dailyBudget: number;
  historyDays: number;
  now: () => Date;
}

export function defaultDeps(): NewsDeps {
  const num = (v: string | undefined, d: number) => (v && Number(v) > 0 ? Number(v) : d);
  return {
    cache: getCache(),
    fetchImpl: fetch,
    apiKey: process.env.GNEWS_API_KEY,
    pibUrl: process.env.PIB_RSS_URL || undefined,
    supabase: supabaseConfig(),
    ttlMs: num(process.env.NEWS_CACHE_TTL_HOURS, 8) * 3_600_000,
    dailyBudget: num(process.env.NEWS_DAILY_BUDGET, 90),
    historyDays: num(process.env.NEWS_HISTORY_DAYS, 30),
    now: () => new Date(),
  };
}

// Collapse concurrent refreshes of the same sector into one provider call.
const inflight = new Map<string, Promise<{ articles: Article[]; fetchedAt: string }>>();

async function refresh(slug: string, deps: NewsDeps) {
  const sector = getSector(slug)!;
  const hasMedia = Boolean(deps.apiKey);
  if (!hasMedia && !deps.pibUrl && !deps.supabase) throw new NewsError('not_configured', 'No news source is configured (GNEWS_API_KEY, PIB_RSS_URL or Supabase).');

  let mediaError: NewsError | undefined;
  let media: Article[] = [];
  if (hasMedia) {
    const day = deps.now().toISOString().slice(0, 10);
    const used = await deps.cache.incr(`budget:${day}`);
    if (used > deps.dailyBudget) mediaError = new NewsError('budget', 'Daily news request budget reached.');
    else {
      try { media = await fetchGNews(sector, deps.apiKey, deps.fetchImpl); }
      catch (e) { if (e instanceof NewsError) mediaError = e; else throw e; }
    }
  }
  // Official/collected sources never throw; they return [] on failure.
  const [gov, ingested] = await Promise.all([fetchPib(deps.pibUrl, deps.fetchImpl), fetchIngested(deps.supabase ?? null, deps.fetchImpl)]);
  const others = [...gov, ...ingested].filter((a) => isRelevant(a, sector));

  // If the paid/limited source failed and nothing else answered, surface the error so the caller can fall back to stale cache.
  if (mediaError && others.length === 0) throw mediaError;

  const articles = dedupe([...media.filter((a) => isRelevant(a, sector)), ...others]);
  const entry = { articles, fetchedAt: deps.now().toISOString() };
  await deps.cache.set(`sector:${slug}`, entry);
  return entry;
}

export function filterByRange(articles: Article[], range: NewsRange, now: Date): Article[] {
  const cutoff = now.getTime() - RANGE_DAYS[range] * 86_400_000;
  return articles.filter((a) => Date.parse(a.publishedAt) >= cutoff);
}

export async function getSectorNews(slug: string, range: NewsRange, deps: NewsDeps = defaultDeps()): Promise<SectorNewsResult> {
  if (!getSector(slug)) throw new NewsError('bad_request', 'Unknown sector.');
  const key = `sector:${slug}`;
  const cached = await deps.cache.get(key);
  const fresh = cached && deps.now().getTime() - Date.parse(cached.fetchedAt) < deps.ttlMs;

  let entry = cached;
  let stale = false;
  let warning: string | undefined;

  if (!fresh) {
    try {
      let p = inflight.get(key);
      if (!p) {
        p = refresh(slug, deps).finally(() => inflight.delete(key));
        inflight.set(key, p);
      }
      entry = await p;
    } catch (err) {
      if (!(err instanceof NewsError)) throw err;
      if (!cached) throw err; // nothing to fall back to
      stale = true;
      warning =
        err.code === 'rate_limit' || err.code === 'budget'
          ? 'Showing saved headlines — the news provider limit was reached. We will retry automatically.'
          : 'Showing saved headlines — the news provider is temporarily unavailable.';
    }
  }

  return {
    sector: slug,
    articles: filterByRange(entry!.articles, range, deps.now()),
    fetchedAt: entry!.fetchedAt,
    stale,
    warning,
    rangeLimited: RANGE_DAYS[range] > deps.historyDays,
    range,
  };
}
