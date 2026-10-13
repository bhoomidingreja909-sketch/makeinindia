'use client';
import { useMemo, useState } from 'react';
import { NEWS_UPDATED } from '@/data/news';
import { formatDate, selectNews, type NewsRange } from '@/lib/news';

const TABS: { id: NewsRange; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'week', label: 'Weekly' },
  { id: 'month', label: 'Monthly' },
  { id: 'quarter', label: 'Quarterly' },
  { id: 'year', label: 'Yearly' },
];

/** sector '' = all sectors. Reads the curated list in src/data/news.ts — no network, nothing to configure. */
export default function NewsFeed({ sector }: { sector: string }) {
  const [range, setRange] = useState<NewsRange>('all');
  const [q, setQ] = useState('');
  const shown = useMemo(() => selectNews({ sector, range, q }), [sector, range, q]);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Time range">
        {TABS.map((t) => (
          <button key={t.id} role="tab" className="tab" aria-selected={range === t.id} onClick={() => setRange(t.id)}>{t.label}</button>
        ))}
      </div>
      <input className="search" type="search" placeholder="Search these articles…" aria-label="Search articles" value={q} onChange={(e) => setQ(e.target.value)} />
      <p className="status">Curated, sourced articles · list last reviewed {NEWS_UPDATED}. This is not a live feed.</p>

      {shown.length === 0 ? (
        <div className="notice info" role="status">
          {q ? 'No articles match your search.' : range === 'all' ? 'No curated articles for this sector yet.' : 'No curated articles in this period — try “All”.'}{' '}
          Official releases are at <a href="https://www.pib.gov.in" target="_blank" rel="noopener noreferrer">pib.gov.in ↗</a>.
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-live="polite">
          {shown.map((a) => (
            <li key={a.id} className="news-item">
              <div className="meta">
                {a.kind === 'government' && <span className="badge gov">Govt source</span>}
                <strong>{a.source}</strong>
                <span aria-hidden>·</span>
                <time dateTime={a.date}>{formatDate(a.date)}</time>
              </div>
              <h3><a href={a.url} target="_blank" rel="noopener noreferrer">{a.title} ↗</a></h3>
              <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '0.93rem' }}>{a.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
