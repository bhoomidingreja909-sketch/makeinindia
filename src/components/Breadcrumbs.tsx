'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SECTOR_BY_SLUG } from '@/data/sectors';
import { ARTICLES } from '@/data/content';
import { LEGAL } from '@/data/site';

const LABELS: Record<string, string> = {
  about: 'About', sectors: 'Sectors', schemes: 'Schemes & Incentives', 'investor-desk': 'Investor Desk', policies: 'Policies', ipr: 'IPR', fdi: 'FDI',
  startups: 'Startup Stories', news: 'News', resources: 'Resources', contact: 'Contact', faq: 'FAQ', articles: 'Articles', states: 'States & UTs',
  'about-data': 'About our data', search: 'Search', feedback: 'Feedback', 'site-map': 'Sitemap', legal: 'Policies & help',
};

function label(seg: string, parent: string): string {
  if (parent === 'sectors') return SECTOR_BY_SLUG.get(seg)?.name ?? seg;
  if (parent === 'articles') return ARTICLES.find((a) => a.slug === seg)?.title ?? seg;
  if (parent === 'legal') return LEGAL.find((l) => l.slug === seg)?.title ?? seg;
  return LABELS[seg] ?? seg;
}

export default function Breadcrumbs() {
  const path = usePathname();
  if (path === '/') return null;
  const segs = path.split('/').filter(Boolean);
  return (
    <nav className="crumbs wrap" aria-label="Breadcrumb">
      <ol>
        <li><Link href="/">Home</Link></li>
        {segs.map((seg, i) => {
          const href = '/' + segs.slice(0, i + 1).join('/');
          const text = label(seg, segs[i - 1] ?? '');
          const last = i === segs.length - 1;
          return <li key={href}>{last || seg === 'legal' ? <span aria-current={last ? 'page' : undefined}>{text}</span> : <Link href={href}>{text}</Link>}</li>;
        })}
      </ol>
    </nav>
  );
}
