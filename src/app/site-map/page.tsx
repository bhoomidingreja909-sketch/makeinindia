import type { Metadata } from 'next';
import Link from 'next/link';
import { SECTORS } from '@/data/sectors';
import { ARTICLES } from '@/data/content';
import { LEGAL } from '@/data/site';

export const metadata: Metadata = { title: 'Sitemap', description: 'Every page on this site.' };

export default function SiteMapPage() {
  const main: [string, string][] = [['/', 'Home'], ['/about', 'About'], ['/sectors', 'Sectors'], ['/schemes', 'Schemes & Incentives'], ['/investor-desk', 'Investor Desk'], ['/states', 'States & UTs'], ['/policies', 'Policies'], ['/policies/ipr', 'IPR'], ['/policies/fdi', 'FDI'], ['/startups', 'Startup Stories'], ['/news', 'News'], ['/resources', 'Resources'], ['/articles', 'Articles'], ['/faq', 'FAQ'], ['/contact', 'Contact'], ['/feedback', 'Feedback'], ['/search', 'Search'], ['/about-data', 'About our data']];
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Sitemap</span><h1>All pages</h1></div></div>
      <div className="wrap block grid cols-3">
        <div><h2>Main</h2><ul>{main.map(([h, t]) => <li key={h}><Link href={h}>{t}</Link></li>)}</ul></div>
        <div><h2>Sectors</h2><ul>{SECTORS.map((s) => <li key={s.slug}><Link href={`/sectors/${s.slug}`}>{s.name}</Link></li>)}</ul></div>
        <div><h2>Articles &amp; policies</h2><ul>{ARTICLES.map((a) => <li key={a.slug}><Link href={`/articles/${a.slug}`}>{a.title}</Link></li>)}{LEGAL.map((l) => <li key={l.slug}><Link href={`/legal/${l.slug}`}>{l.title}</Link></li>)}</ul></div>
      </div>
    </>
  );
}
