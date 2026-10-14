'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SITE } from '@/data/site';
import Logo from './Logo';
import { T, useT, usePrefs, type Theme } from './Prefs';

const LINKS = [
  ['/about', 'nav.about', 'About'],
  ['/sectors', 'nav.sectors', 'Sectors'],
  ['/schemes', 'nav.schemes', 'Schemes & Incentives'],
  ['/investor-desk', 'nav.invest', 'Investor Desk'],
  ['/policies', 'nav.policies', 'Policies'],
  ['/startups', 'nav.stories', 'Startup Stories'],
  ['/news', 'nav.news', 'News'],
  ['/resources', 'nav.resources', 'Resources'],
  ['/contact', 'nav.contact', 'Contact'],
] as const;

export default function Header() {
  const path = usePathname();
  const router = useRouter();
  const t = useT();
  const { lang, setLang, theme, setTheme, size, setSize } = usePrefs();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const step = (d: number) => setSize(Math.min(150, Math.max(85, size + d)));

  return (
    <>
      <div className="util">
        <div className="wrap">
          <span className="disclaimer" role="note"><T id="banner" en={SITE.banner} /></span>
          <div className="tools">
            <form role="search" onSubmit={(e) => { e.preventDefault(); if (q.trim()) router.push(`/search/?q=${encodeURIComponent(q.trim())}`); }}>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search.ph', 'Search the site…')} aria-label={t('search', 'Search')} />
              <button type="submit"><T id="search" en="Search" /></button>
            </form>
            <div className="grp" role="group" aria-label="Text size">
              <button onClick={() => step(-10)} aria-label="Decrease text size" disabled={size <= 85}>A−</button>
              <button onClick={() => setSize(100)} aria-label="Reset text size">A</button>
              <button onClick={() => step(10)} aria-label="Increase text size" disabled={size >= 150}>A+</button>
            </div>
            <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} aria-label="Theme">
              <option value="light">{t('theme.light', 'Light')}</option>
              <option value="dark">{t('theme.dark', 'Dark')}</option>
              <option value="contrast">{t('theme.contrast', 'High contrast')}</option>
            </select>
            <div className="grp" role="group" aria-label="Language">
              <button aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">EN</button>
              <button aria-pressed={lang === 'hi'} onClick={() => setLang('hi')} lang="hi">हिं</button>
            </div>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Make in India — home"><Logo height={62} /></Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="nav" onClick={() => setOpen((o) => !o)}>
            {open ? <T id="close" en="Close" /> : <T id="menu" en="Menu" />}
          </button>
          <nav id="nav" className={`nav${open ? ' open' : ''}`} aria-label="Main">
            {LINKS.map(([href, id, en]) => (
              <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined} onClick={() => setOpen(false)}>
                <T id={id} en={en} />
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {lang === 'hi' && <div className="wrap notice info" style={{ marginTop: 12 }} role="status"><T id="lang.note" en="" /></div>}
    </>
  );
}
