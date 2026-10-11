'use client';
import { useState } from 'react';
import EvidenceBadge from './EvidenceBadge';
import type { Section } from '@/data/content';

export default function Accordion({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const all = open.size === sections.length;
  const toggle = (id: string, isOpen: boolean) =>
    setOpen((prev) => { const n = new Set(prev); if (isOpen) n.add(id); else n.delete(id); return n; });
  return (
    <div>
      <div className="acc-controls">
        <button className="btn ghost" onClick={() => setOpen(all ? new Set() : new Set(sections.map((s) => s.id)))}>
          {all ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      {sections.map((s, i) => (
        <details key={s.id} id={s.id} className="acc" open={open.has(s.id)} onToggle={(e) => toggle(s.id, (e.currentTarget as HTMLDetailsElement).open)}>
          <summary><span><span className="num">{String(i + 1).padStart(2, '0')}</span>{s.title}</span><EvidenceBadge kind={s.evidence} /></summary>
          <div className="body">
            {s.body.map((p) => <p key={p}>{p}</p>)}
            {s.list && <ul className="plain">{s.list.map((l) => <li key={l}>{l}</li>)}</ul>}
          </div>
        </details>
      ))}
    </div>
  );
}
