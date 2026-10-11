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

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [active]);

  return (
    <>
      <Group title="Manufacturing Sectors" sectors={MANUFACTURING} active={active?.slug} onPick={setActive} />
      <Group title="Service Sectors" sectors={SERVICES} active={active?.slug} onPick={setActive} />
      {active && (
        <>
          <div className="scrim" onClick={() => setActive(null)} />
          <aside className="panel" role="dialog" aria-modal="true" aria-label={`${active.name} news`}>
            <div className="panel-head">
              <div><span style={{ fontSize: '1.6rem' }} aria-hidden>{active.icon}</span><h2>{active.name}</h2></div>
              <button className="close" onClick={() => setActive(null)} autoFocus>Close ✕</button>
            </div>
            <div className="panel-body"><NewsFeed sector={active.slug} /></div>
          </aside>
        </>
      )}
    </>
  );
}
