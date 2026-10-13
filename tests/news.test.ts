import { describe, expect, it } from 'vitest';
import { selectNews, formatDate, dateMs } from '@/lib/news';
import { NEWS, type NewsItem } from '@/data/news';
import { SECTOR_BY_SLUG } from '@/data/sectors';

// ---- Test fixtures only (never shown in the UI) ----
const NOW = new Date('2026-10-13T00:00:00Z');
const item = (o: Partial<NewsItem>): NewsItem => ({ id: o.id ?? 'x', title: 'T', source: 'S', summary: '', url: 'https://a.test', sectors: [], kind: 'media', ...o });
const FIX = [
  item({ id: 'new', title: 'Recent railway order', date: '2026-10-10', sectors: ['railways'] }),
  item({ id: 'old', title: 'Old railway story', date: '2025-01-01', sectors: ['railways'] }),
  item({ id: 'undated', title: 'Undated railway story', sectors: ['railways'] }),
  item({ id: 'ship', title: 'Port expansion', date: '2026-09-20', sectors: ['shipping'] }),
];

describe('selectNews', () => {
  it('filters by sector and sorts newest first, undated last', () => {
    expect(selectNews({ sector: 'railways', items: FIX, now: NOW }).map((i) => i.id)).toEqual(['new', 'old', 'undated']);
  });
  it('period tabs only include dated items inside the window', () => {
    expect(selectNews({ sector: 'railways', range: 'week', items: FIX, now: NOW }).map((i) => i.id)).toEqual(['new']);
    expect(selectNews({ range: 'month', items: FIX, now: NOW }).map((i) => i.id)).toEqual(['new', 'ship']);
    expect(selectNews({ range: 'year', items: FIX, now: NOW }).map((i) => i.id)).toEqual(['new', 'ship']);
  });
  it('never places an undated item in a period tab (no guessed dates)', () => {
    for (const r of ['week', 'month', 'quarter', 'year'] as const) expect(selectNews({ range: r, items: FIX, now: NOW }).some((i) => i.id === 'undated')).toBe(false);
  });
  it('searches title, summary and source; empty sector means all', () => {
    expect(selectNews({ q: 'port', items: FIX, now: NOW }).map((i) => i.id)).toEqual(['ship']);
    expect(selectNews({ items: FIX, now: NOW })).toHaveLength(4);
  });
  it('shows an empty list instead of throwing for an unknown sector', () => {
    expect(selectNews({ sector: 'nope', items: FIX, now: NOW })).toEqual([]);
  });
});

describe('dates', () => {
  it('keeps the precision we actually have', () => {
    expect(formatDate('2023')).toBe('2023');
    expect(formatDate('2025-05')).toMatch(/May 2025/);
    expect(formatDate('2024-05-30')).toMatch(/30 May 2024/);
    expect(formatDate(undefined)).toBe('Date not available');
    expect(dateMs('garbage')).toBeNull();
  });
});

describe('curated data integrity', () => {
  it('every item has an https link, a real title and valid sector slugs', () => {
    const ids = new Set<string>();
    for (const n of NEWS) {
      expect(n.url.startsWith('https://'), n.id).toBe(true);
      expect(n.title.length, n.id).toBeGreaterThan(10);
      expect(ids.has(n.id), `dup ${n.id}`).toBe(false); ids.add(n.id);
      for (const s of n.sectors) expect(SECTOR_BY_SLUG.has(s), `${n.id} -> ${s}`).toBe(true);
      if (n.date) expect(dateMs(n.date), `${n.id} date`).not.toBeNull();
    }
  });
});
