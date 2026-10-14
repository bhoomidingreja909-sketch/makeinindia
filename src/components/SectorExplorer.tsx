'use client';
import { useEffect, useState } from 'react';
import { MANUFACTURING, SERVICES, type Sector } from '@/data/sectors';
import NewsFeed from './NewsFeed';

function Group({ title, sectors, active, onPick }: { title: string; sectors: Sector[]; active?: string; onPick: (s: Sector) => void }) {
  return (
    <section aria-labelledby={`g-${title}`} style={{ marginBottom: 40 }}>
      <h2 id={`g-${title}`}>{title} <span className="num" style={{ fontSize: '1rem' }}>({sectors.length})</span></h2>
      <div className="tile-grid">
        {sectors.map((s) => (
          <button key={s.slug} className="tile" aria-pressed={active === s.slug} onClick={() => onPick(s)}>
            <span className="ico" aria-hidden>{s.icon}</span>
            <span className="name">{s.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function SectorExplorer() {
  const [active, setActive] = useState<Sector | null>(null);
  const [group, setGroup] = useState<'all' | 'manufacturing' | 'services'>('all');
  const [q, setQ] = useState('');
  const hit = (s: Sector) => s.name.toLowerCase().includes(q.trim().toLowerCase());
  const man = MANUFACTURING.filter(hit);
  const srv = SERVICES.filter(hit);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter sectors">
        {(['all', 'manufacturing', 'services'] as const).map((g) => (
          <button key={g} className="chip" aria-pressed={group === g} onClick={() => setGroup(g)}>{g === 'all' ? 'All 27' : g === 'manufacturing' ? 'Manufacturing (15)' : 'Services (12)'}</button>
        ))}
        <input className="search" style={{ width: 260, margin: 0 }} type="search" placeholder="Filter by name…" aria-label="Filter sectors by name" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {group !== 'services' && man.length > 0 && <Group title="Manufacturing Sectors" sectors={man} active={active?.slug} onPick={setActive} />}
      {group !== 'manufacturing' && srv.length > 0 && <Group title="Service Sectors" sectors={srv} active={active?.slug} onPick={setActive} />}
      {man.length + srv.length === 0 && <div className="notice info">No sector matches “{q}”.</div>}
      {active && (
        <>
          <div className="scrim" onClick={() => setActive(null)} />
          <aside className="panel" role="dialog" aria-modal="true" aria-label={`${active.name} news`}>
            <div className="panel-head">
              <div><h2>{active.name}</h2></div>
              <button className="close" onClick={() => setActive(null)} autoFocus>Close ✕</button>
            </div>
            <div className="panel-body"><NewsFeed sector={active.slug} /><p style={{ marginTop: 20 }}><a href={`/sectors/${active.slug}`}>Open the full {active.name} page →</a></p></div>
          </aside>
        </>
      )}
    </>
  );
}
