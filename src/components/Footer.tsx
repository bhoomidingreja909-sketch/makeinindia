import Link from 'next/link';
import { LEGAL } from '@/data/site';
import { SECTORS } from '@/data/sectors';

// Evaluated at build time, so this is the date the site was last built/deployed.
const BUILT = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const EXTERNAL = [
  ['DPIIT', 'https://dpiit.gov.in'], ['Startup India', 'https://www.startupindia.gov.in'], ['India.gov.in', 'https://www.india.gov.in'], ['Digital India', 'https://www.digitalindia.gov.in'], ['Press Information Bureau', 'https://www.pib.gov.in'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap grid cols-3">
        <div>
          <h3>Make in India — redesigned</h3>
          <p>An academic redesign project for Digital Marketing &amp; AI. <b>Not an official Government of India website.</b> Facts are sourced from official portals and labelled by evidence level.</p>
          <p className="meta" style={{ color: 'var(--sky)' }}>Last updated: {BUILT}</p>
        </div>
        <div>
          <h3>Quick links</h3>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/sectors">Sectors</Link></li>
            <li><Link href="/schemes">Schemes &amp; incentives</Link></li>
            <li><Link href="/states">States &amp; UTs</Link></li>
            <li><Link href="/articles">Articles</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/feedback">Feedback</Link></li>
            <li><Link href="/site-map">Sitemap</Link></li>
          </ul>
        </div>
        <div>
          <h3>Related government portals (external)</h3>
          <ul>{EXTERNAL.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n} ↗</a></li>)}</ul>
        </div>
      </div>
      <div className="wrap">
        <h3 style={{ marginTop: 24 }}>Policies &amp; help</h3>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 18px' }}>
          {LEGAL.map((l) => <li key={l.slug}><Link href={`/legal/${l.slug}`}>{l.title.replace(/ Policy$/, '')}</Link></li>)}
          <li><Link href="/about-data">About our data</Link></li>
        </ul>
        <p className="fine">
          {SECTORS.length} sectors tracked. News headlines come from a third-party API and may be delayed. Policy text is summarised for study; always confirm with the official source.
        </p>
      </div>
    </footer>
  );
}
