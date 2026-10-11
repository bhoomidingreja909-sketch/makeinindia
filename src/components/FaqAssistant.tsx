'use client';
import { useState } from 'react';
import Link from 'next/link';
import { answerFaq } from '@/lib/faqAssist';
import type { Faq } from '@/data/content';
import EvidenceBadge from './EvidenceBadge';

export default function FaqAssistant() {
  const [q, setQ] = useState('');
  const [res, setRes] = useState<Faq[] | null>(null);
  return (
    <div className="assistant">
      <h2 style={{ fontSize: '1.3rem' }}>🤖 Ask the FAQ assistant</h2>
      <p className="meta">It finds the closest existing answer and shows its source. It does not generate new facts.</p>
      <form onSubmit={(e) => { e.preventDefault(); setRes(answerFaq(q)); }} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input className="search" style={{ flex: '1 1 260px', margin: 0 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. What is the PLI scheme?" aria-label="Your question" />
        <button className="btn">Ask</button>
      </form>
      <div role="status" aria-live="polite">
        {res && res.length > 0 && res.map((f) => (
          <div key={f.q} className="answer">
            <strong>{f.q}</strong>
            <p style={{ margin: '6px 0' }}>{f.a}</p>
            <p className="meta"><EvidenceBadge kind={f.evidence} /> Source: {f.source.url.startsWith('/') ? <Link href={f.source.url}>{f.source.name}</Link> : <a href={f.source.url} target="_blank" rel="noopener noreferrer">{f.source.name} ↗</a>}</p>
          </div>
        ))}
        {res && res.length === 0 && <div className="answer">I couldn’t find a matching answer. Try different words, or <Link href="/contact">contact the desk</Link>.</div>}
      </div>
    </div>
  );
}
