import { describe, expect, it } from 'vitest';
import { searchSite } from '@/lib/search';
import { answerFaq } from '@/lib/faqAssist';
import { findIncentives, PLI, STATES, UTS } from '@/data/site';
import { SECTORS } from '@/data/sectors';
import { SECTOR_META } from '@/data/sectorMeta';
import { FAQS, STORIES } from '@/data/content';

describe('site search', () => {
  it('finds sectors, policies and FAQs', () => {
    expect(searchSite('railways')[0].href).toBe('/sectors/railways');
    expect(searchSite('FDI').some((h) => h.href === '/policies/fdi')).toBe(true);
    expect(searchSite('PLI').some((h) => h.kind === 'FAQ')).toBe(true);
  });
  it('returns nothing for gibberish', () => {
    expect(searchSite('zzzqqqxxx')).toEqual([]);
  });
});

describe('FAQ assistant (retrieval only)', () => {
  it('returns existing answers with sources', () => {
    const r = answerFaq('what is the PLI scheme');
    expect(r[0].q).toMatch(/PLI/);
    expect(r[0].source.url).toBeTruthy();
  });
  it('declines to answer unrelated questions instead of inventing one', () => {
    expect(answerFaq('best pizza recipe in Mumbai')).toEqual([]);
  });
});

describe('incentive finder', () => {
  it('maps sectors to PLI schemes and always returns general initiatives', () => {
    const r = findIncentives('esdm', 'Karnataka');
    expect(r.pli.length).toBeGreaterThan(0);
    expect(r.general.length).toBeGreaterThan(0);
    expect(r.stateNote).toContain('Karnataka');
  });
  it('returns no PLI for a sector without one, rather than guessing', () => {
    expect(findIncentives('legal-services').pli).toEqual([]);
  });
});

describe('data integrity', () => {
  it('has 14 PLI sectors, 28 states and 8 UTs', () => {
    expect(PLI).toHaveLength(14);
    expect(STATES).toHaveLength(28);
    expect(UTS).toHaveLength(8);
  });
  it('every sector has metadata whose related slugs exist', () => {
    const slugs = new Set(SECTORS.map((s) => s.slug));
    for (const s of SECTORS) {
      const m = SECTOR_META[s.slug];
      expect(m, s.slug).toBeTruthy();
      for (const r of m.related) expect(slugs.has(r), `${s.slug} -> ${r}`).toBe(true);
    }
  });
  it('every FAQ and story carries a source URL; no story is marked verified yet', () => {
    for (const f of FAQS) expect(f.source.url).toBeTruthy();
    for (const s of STORIES) { expect(s.sources.length).toBeGreaterThan(0); expect(s.verified).toBe(false); }
  });
});
