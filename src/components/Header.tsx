'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKS = [
  ['/sectors', 'Sectors'],
  ['/news', 'News'],
  ['/investor-desk', 'Investor Desk'],
  ['/policies', 'Policies'],
  ['/startups', 'Startup Stories'],
  ['/articles', 'Articles'],
  ['/faq', 'FAQ'],
  ['/contact', 'Contact'],
] as const;

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden>⚙</span> Make in India
        </Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
