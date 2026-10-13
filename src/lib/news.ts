import { NEWS, type NewsItem } from '@/data/news';

export type NewsRange = 'all' | 'week' | 'month' | 'quarter' | 'year';
export const RANGE_DAYS: Record<Exclude<NewsRange, 'all'>, number> = { week: 7, month: 30, quarter: 90, year: 365 };

/** Partial ISO dates ('2023', '2025-05', '2025-05-30') parse as UTC; empty/invalid means "undated". */
export function dateMs(d?: string): number | null {
  if (!d) return null;
  const t = Date.parse(d);
  return Number.isNaN(t) ? null : t;
}

export interface Query { sector?: string; range?: NewsRange; q?: string; now?: Date; items?: NewsItem[] }

/**
 * Pure selection over the curated list: sector filter, period filter, text search, newest first.
 * Undated items are only shown under "All" — we never guess a date to make them fit a period.
 */
export function selectNews({ sector = '', range = 'all', q = '', now = new Date(), items = NEWS }: Query): NewsItem[] {
  const term = q.trim().toLowerCase();
  const cutoff = range === 'all' ? null : now.getTime() - RANGE_DAYS[range] * 86_400_000;
  return items
    .filter((i) => !sector || i.sectors.includes(sector))
    .filter((i) => {
      if (cutoff === null) return true;
      const t = dateMs(i.date);
      return t !== null && t >= cutoff && t <= now.getTime();
    })
    .filter((i) => !term || `${i.title} ${i.summary} ${i.source}`.toLowerCase().includes(term))
    .sort((a, b) => (dateMs(b.date) ?? -Infinity) - (dateMs(a.date) ?? -Infinity));
}

/** Show the precision we actually have: '2023' stays '2023'. */
export function formatDate(d?: string): string {
  if (!d) return 'Date not available';
  const t = dateMs(d);
  if (t === null) return 'Date not available';
  const dt = new Date(t);
  if (/^\d{4}$/.test(d)) return d;
  if (/^\d{4}-\d{2}$/.test(d)) return dt.toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
