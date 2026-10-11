'use client';
import { useRef } from 'react';

export default function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: 'smooth' });
  return (
    <div role="region" aria-label={label}>
      <div className="car-ctl">
        <button className="btn ghost" onClick={() => go(-1)} aria-label="Previous">←</button>
        <button className="btn ghost" onClick={() => go(1)} aria-label="Next">→</button>
      </div>
      <div className="carousel" ref={ref} tabIndex={0}>{children}</div>
    </div>
  );
}
