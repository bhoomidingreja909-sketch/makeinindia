'use client';
import Link from 'next/link';
import { useRef } from 'react';

/** Cursor-interactive card: tilts toward the pointer. Disabled for reduced motion via CSS. */
export default function TiltCard({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-2px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <Link ref={ref} href={href} className="card tilt" onPointerMove={move} onPointerLeave={reset} onBlur={reset}>
      <h3>{title}</h3>
      {children}
      <span className="go">Open →</span>
    </Link>
  );
}
