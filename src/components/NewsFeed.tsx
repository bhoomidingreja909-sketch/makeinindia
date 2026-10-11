'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Article, NewsRange, SectorNewsResult } from '@/lib/news/types';

const TABS: { id: NewsRange; label: string }[] = [
  { id: 'week', label: 'Weekly' },
  { id: 'month', label: 'Monthly' },
  { id: 'quarter', label: 'Quarterly' },
  { id: 'year', label: 'Yearly' },
];

const fmt = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' });

type State =
  | { s: 'loading' }
  | { s: 'error'; message: string }
  | { s: 'ok'; data: SectorNewsResult };

export default function NewsFeed({ sector }: { sector: string }) {
  const [range, setRange] = useState<NewsRange>('month');
  const [q, setQ] = useState('');
  const [state, setState] = useState<State>({ s: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctl = new AbortController();
    setState({ s: 'loading' });
    fetch(`/api/news?sector=${encodeURIComponent(sector)}&range=${range}`, { signal: ctl.signal })
      .then(async (r) => {
        const body = await r.json().catch(() => null);
        if (!r.ok) throw new Error(body?.error?.message ?? 'The news feed is temporarily unavailable.');
        setState({ s: 'ok', data: body as SectorNewsResult });
      })
      .catch((e: Error) => { if (e.name !== 'AbortError') setState({ s: 'error', message: e.message }); });
    return () => ctl.abort();
  }, [sector, range, attempt]);

  // Search runs over the cached articles in the browser, so it never spends API quota.
  const shown: Article[] = useMemo(() => {
    if (state.s !== 'ok') return [];
    const term = q.trim().toLowerCase();
    return term ? state.data.articles.filter((a) => `${a.title} ${a.description} ${a.source}`.toLowerCase().includes(term)) : state.data.articles;
  }, [state, q]);

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Time range">
        {TABS.map((t) => (
          <button key={t.id} role="tab" className="tab" aria-selected={range === t.id} onClick={() => setRange(t.id)}>{t.label}</button>
        ))}
      </div>
      <input className="search" type="search" placeholder="Search these headlines…" aria-label="Search headlines" value={q} onChange={(e) => setQ(e.target.value)} />

      {state.s === 'loading' && <div aria-busy="true" aria-label="Loading headlines">{[0, 1, 2].map((i) => <div key={i} className="skeleton" />)}</div>}

      {state.s === 'error' && (
        <div className="notice" role="alert">
          <b>Headlines unavailable.</b> {state.message}{' '}
          <button className="btn ghost" style={{ padding: '4px 12px', marginLeft: 8 }} onClick={() => setAttempt((n) => n + 1)}>Try again</button>
        </div>
      )}

      {state.s === 'ok' && (
        <>
          <p className="status">
            Latest headlines · last successful update {fmt.format(new Date(state.data.fetchedAt))} IST. Headlines can be delayed by the news provider.
          </p>
          {state.data.warning && <div className="notice" role="status">{state.data.warning}</div>}
          {state.data.rangeLimited && (
            <div className="notice info" role="note">The news provider only returns recent history on the current plan, so this range may show fewer stories than actually exist.</div>
          )}
          {shown.length === 0 ? (
            <div className="notice info" role="status">
              {q ? 'No headlines match your search.' : 'No relevant headlines found for this period. Try a longer range.'}
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {shown.map((a) => (
                <li key={a.id} className="news-item">
                  <div className="meta">
                    {a.kind === 'government' && <span className="badge gov">Govt release</span>}
                    <strong>{a.source}</strong>
                    <span aria-hidden>·</span>
                    <time dateTime={a.publishedAt}>{fmt.format(new Date(a.publishedAt))} IST</time>
                  </div>
                  <h3><a href={a.url} target="_blank" rel="noopener noreferrer">{a.title}</a></h3>
                  {a.description && <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: '0.93rem' }}>{a.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
