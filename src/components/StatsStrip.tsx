'use client';
import { useEffect, useRef, useState } from 'react';
import { STATS, type Stat } from '@/data/site';
import EvidenceBadge from './EvidenceBadge';

function useCount(target: number, decimals: number, animate = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(target); // server render and no-JS show the real number
  useEffect(() => {
    const el = ref.current;
    if (!animate || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    setV(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        setV(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return { ref, text: v.toFixed(decimals) };
}

function Card({ s }: { s: Stat }) {
  const { ref, text } = useCount(s.value, s.decimals ?? 0, s.id !== 'launch');
  return (
    <div className="stat" ref={ref}>
      <div className="big" aria-label={`${s.prefix ?? ''}${s.value}${s.suffix ?? ''}`}>{s.prefix}{text}{s.suffix}</div>
      <strong>{s.label}</strong>
      <p style={{ margin: '6px 0' }} className="meta">{s.note}</p>
      <p className="src">
        <EvidenceBadge kind={s.evidence} /> <br />
        Source: <a href={s.source.url} target="_blank" rel="noopener noreferrer">{s.source.name} ↗</a> · {s.year}
      </p>
    </div>
  );
}

export default function StatsStrip() {
  return <div className="stats">{STATS.map((s) => <Card key={s.id} s={s} />)}</div>;
}
