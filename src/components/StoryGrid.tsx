'use client';
import { useMemo, useState } from 'react';
import { STORIES } from '@/data/content';
import { SECTORS, getSector } from '@/data/sectors';
import EvidenceBadge from './EvidenceBadge';

export default function StoryGrid() {
  const [sector, setSector] = useState('');
  const [state, setState] = useState('');
  const states = useMemo(() => [...new Set(STORIES.map((s) => s.state))].sort(), []);
  const sectors = useMemo(() => SECTORS.filter((s) => STORIES.some((x) => x.sector === s.slug)), []);
  const list = STORIES.filter((s) => (!sector || s.sector === sector) && (!state || s.state === state));
  return (
    <div>
      <div className="filters">
        <label>Sector <select value={sector} onChange={(e) => setSector(e.target.value)}><option value="">All sectors</option>{sectors.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}</select></label>
        <label>State <select value={state} onChange={(e) => setState(e.target.value)}><option value="">All states</option>{states.map((s) => <option key={s}>{s}</option>)}</select></label>
        <span className="meta" role="status">{list.length} of {STORIES.length} stories</span>
      </div>
      <div className="grid cols-2">
        {list.map((s) => {
          const sec = getSector(s.sector);
          return (
            <article key={s.slug} id={s.slug} className="card">
              <div className="meta" style={{ marginBottom: 8 }}>
                <EvidenceBadge kind={s.verified ? 'verified' : 'draft'} />
                {sec && <span>{sec.name}</span>}<span>· {s.state}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>{s.name}</h2>
              <p><em>{s.headline}</em></p>
              <ul className="plain">{s.summary.map((l) => <li key={l}>{l}</li>)}</ul>
              <p className="meta">Sources:{' '}{s.sources.map((src) => <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer">{src.name}{src.date ? ` (${src.date})` : ''} ↗</a>)}</p>
              <p className="meta">Retrieved {s.retrieved}</p>
            </article>
          );
        })}
      </div>
      {list.length === 0 && <div className="notice info">No stories match these filters yet.</div>}
    </div>
  );
}
