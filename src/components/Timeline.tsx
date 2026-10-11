'use client';
import { useEffect, useRef } from 'react';
import { TIMELINE } from '@/data/site';
import EvidenceBadge from './EvidenceBadge';

/** Scroll-reveal timeline. Items are visible by default if IntersectionObserver or motion is unavailable. */
export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const items = Array.from(root.current?.querySelectorAll('.tl-item') ?? []);
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((i) => i.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);
  return (
    <div className="timeline" ref={root}>
      {TIMELINE.map((t) => (
        <div key={t.title} className="tl-item">
          <span className="tl-year">{t.year}</span>
          <h3 style={{ margin: '2px 0 6px' }}>{t.title}</h3>
          <p style={{ marginBottom: 8 }}>{t.text}</p>
          <EvidenceBadge kind={t.evidence} />
        </div>
      ))}
    </div>
  );
}
