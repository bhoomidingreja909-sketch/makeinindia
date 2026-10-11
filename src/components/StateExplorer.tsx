'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STATES, UTS, STATE_FACTS } from '@/data/site';
import EvidenceBadge from './EvidenceBadge';

export default function StateExplorer() {
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const match = (n: string) => n.toLowerCase().includes(q.trim().toLowerCase());
  const grid = (title: string, list: string[]) => (
    <section style={{ marginBottom: 28 }}>
      <h2>{title} <span className="num">({list.length})</span></h2>
      <div className="state-grid">
        {list.filter(match).map((n) => (
          <button key={n} className={`state${STATE_FACTS[n] ? ' has-data' : ''}`} aria-pressed={sel === n} onClick={() => setSel(n)}>{n}</button>
        ))}
      </div>
    </section>
  );
  const facts = sel ? STATE_FACTS[sel] : undefined;
  return (
    <div>
      <input className="search" type="search" placeholder="Filter states and UTs…" aria-label="Filter states" value={q} onChange={(e) => setQ(e.target.value)} />
      {sel && (
        <div className="card" style={{ marginBottom: 24 }} role="region" aria-live="polite" aria-label={`${sel} profile`}>
          <h2 style={{ fontSize: '1.4rem' }}>{sel}</h2>
          {facts ? (
            <ul className="plain">
              {facts.map((f) => (
                <li key={f.text}>{f.text} <EvidenceBadge kind="secondary" /> <a href={f.source.url} target="_blank" rel="noopener noreferrer">{f.source.name} ↗</a></li>
              ))}
            </ul>
          ) : (
            <p className="empty">Investment profile to be added. Source it from the state industries department or data.gov.in, then add it to <code>STATE_FACTS</code> with a citation. We show no figures we cannot cite.</p>
          )}
          <p className="meta">Looking for incentives? <Link href="/schemes">Open the incentive finder</Link> · Questions? <Link href="/contact">Contact the desk</Link></p>
        </div>
      )}
      {grid('States', STATES)}
      {grid('Union Territories', UTS)}
      <p className="meta">● marks states with a cited, press-reported fact. A clickable boundary map needs verified geometry; this tile map covers all 28 states and 8 UTs.</p>
    </div>
  );
}
