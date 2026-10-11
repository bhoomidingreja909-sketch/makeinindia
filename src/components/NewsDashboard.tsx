'use client';
import { useState } from 'react';
import { MANUFACTURING, SERVICES } from '@/data/sectors';
import NewsFeed from './NewsFeed';

export default function NewsDashboard({ initial = 'aerospace-defence' }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  const Chips = ({ label, items }: { label: string; items: typeof MANUFACTURING }) => (
    <>
      <h3>{label}</h3>
      <div className="chips">
        {items.map((s) => (
          <button key={s.slug} className="chip" aria-pressed={slug === s.slug} onClick={() => setSlug(s.slug)}>{s.icon} {s.name.replace(/ \(.*\)| &.*/, '')}</button>
        ))}
      </div>
    </>
  );
  return (
    <div>
      <Chips label="Manufacturing" items={MANUFACTURING} />
      <Chips label="Services" items={SERVICES} />
      <div className="card" style={{ marginTop: 8 }}><NewsFeed key={slug} sector={slug} /></div>
    </div>
  );
}
