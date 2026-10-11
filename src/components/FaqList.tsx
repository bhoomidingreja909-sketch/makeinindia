'use client';
import { useState } from 'react';
import { FAQS } from '@/data/content';
import EvidenceBadge from './EvidenceBadge';

export default function FaqList() {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const list = term ? FAQS.filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(term)) : FAQS;
  return (
    <div>
      <input className="search" type="search" placeholder="Search questions…" aria-label="Search FAQs" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length === 0 && <div className="notice info">No questions match. Try the Contact page.</div>}
      {list.map((f) => (
        <details key={f.q} className="acc">
          <summary><span>{f.q}</span><EvidenceBadge kind={f.evidence} /></summary>
          <div className="body">
            <p>{f.a}</p>
            <p className="meta">Source: {f.source.url.startsWith('/') ? <a href={f.source.url}>{f.source.name}</a> : <a href={f.source.url} target="_blank" rel="noopener noreferrer">{f.source.name} ↗</a>}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
