'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FAQS, FAQ_CATEGORIES } from '@/data/content';
import EvidenceBadge from './EvidenceBadge';

export default function FaqList() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('All');
  const term = q.trim().toLowerCase();
  const list = FAQS.filter((f) => (cat === 'All' || f.cat === cat) && (!term || `${f.q} ${f.a}`.toLowerCase().includes(term)));
  return (
    <div>
      <div className="chips" role="group" aria-label="FAQ category">
        {['All', ...FAQ_CATEGORIES].map((c) => <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <input className="search" type="search" placeholder="Search questions…" aria-label="Search FAQs" value={q} onChange={(e) => setQ(e.target.value)} />
      {list.length === 0 && <div className="notice info">No questions match. Try the Contact page.</div>}
      {list.map((f) => (
        <details key={f.q} className="acc">
          <summary><span>{f.q}</span><EvidenceBadge kind={f.evidence} /></summary>
          <div className="body">
            <p>{f.a}</p>
            <p className="meta">{f.cat} · Source: {f.source.url.startsWith('/') ? <Link href={f.source.url}>{f.source.name}</Link> : <a href={f.source.url} target="_blank" rel="noopener noreferrer">{f.source.name} ↗</a>}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
