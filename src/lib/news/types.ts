export type NewsRange = 'week' | 'month' | 'quarter' | 'year';

export const RANGE_DAYS: Record<NewsRange, number> = { week: 7, month: 30, quarter: 90, year: 365 };

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  /** ISO-8601 UTC. */
  publishedAt: string;
  kind: 'media' | 'government';
}

export type NewsErrorCode = 'not_configured' | 'auth' | 'rate_limit' | 'budget' | 'upstream' | 'bad_request';

export class NewsError extends Error {
  constructor(public code: NewsErrorCode, message: string) {
    super(message);
    this.name = 'NewsError';
  }
}

export interface SectorNewsResult {
  sector: string;
  articles: Article[];
  /** When the provider was last queried successfully. */
  fetchedAt: string;
  /** True when served from an expired cache entry because a refresh failed. */
  stale: boolean;
  warning?: string;
  /** Provider history is shorter than the requested range. */
  rangeLimited: boolean;
  range: NewsRange;
}

export interface CacheEntry {
  articles: Article[];
  fetchedAt: string;
  /** Used only by daily-budget counters. */
  count?: number;
}

export interface CacheStore {
  get(key: string): Promise<CacheEntry | null>;
  set(key: string, entry: CacheEntry): Promise<void>;
  /** Atomically-enough increment of a counter; returns the new value. */
  incr(key: string): Promise<number>;
}
