'use client';
import { useState } from 'react';
import { PILLARS } from '@/data/site';

export default function Pillars() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="pillars">
      {PILLARS.map((p, i) => (
        <button key={p.id} className="pillar" aria-expanded={open === p.id} onClick={() => setOpen(open === p.id ? null : p.id)}>
          <span className="pnum" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
          <span className="go" style={{ color: 'var(--link)', fontWeight: 700, fontSize: '0.85rem' }}>{open === p.id ? 'Hide' : 'Read'}</span>
        </button>
      ))}
    </div>
  );
}
