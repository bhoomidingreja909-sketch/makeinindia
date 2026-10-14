import Link from 'next/link';
import Logo from './Logo';

// Evaluated at build time, so this is the date the site was last built/deployed.
const BUILT = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
const EXTERNAL = [
  ['DPIIT', 'https://dpiit.gov.in'], ['Startup India', 'https://www.startupindia.gov.in'], ['India.gov.in', 'https://www.india.gov.in'], ['Press Information Bureau', 'https://www.pib.gov.in'],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Logo height={56} on="dark" />
          <p style={{ marginTop: 14 }}>Academic redesign project for Digital Marketing &amp; AI. <b>Not an official Government of India website.</b></p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/sectors">Sectors</Link></li>
            <li><Link href="/schemes">Schemes &amp; incentives</Link></li>
            <li><Link href="/states">States &amp; UTs</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3>Official portals</h3>
          <ul>{EXTERNAL.map(([n, u]) => <li key={n}><a href={u} target="_blank" rel="noopener noreferrer">{n} ↗</a></li>)}</ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <ul>
          <li><Link href="/legal/terms">Terms</Link></li>
          <li><Link href="/legal/privacy">Privacy</Link></li>
          <li><Link href="/legal/accessibility">Accessibility</Link></li>
          <li><Link href="/legal/disclaimer">Disclaimer</Link></li>
          <li><Link href="/legal/help">Help</Link></li>
          <li><Link href="/feedback">Feedback</Link></li>
          <li><Link href="/site-map">Sitemap</Link></li>
          <li><Link href="/about-data">About our data</Link></li>
        </ul>
        <span>Last updated: {BUILT}</span>
      </div>
    </footer>
  );
}
