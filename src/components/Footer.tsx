import Link from 'next/link';
import { ORGANISATIONS } from '@/data/content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap grid cols-3">
        <div>
          <h3>Make in India — redesigned</h3>
          <p>A student redesign project for Digital Marketing &amp; AI. Not an official government website.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link href="/sectors">Sectors &amp; news</Link></li>
            <li><Link href="/policies">Policies: IPR &amp; FDI</Link></li>
            <li><Link href="/startups">Startup stories</Link></li>
            <li><Link href="/about-data">About our data</Link></li>
          </ul>
        </div>
        <div>
          <h3>Official bodies (external)</h3>
          <ul>
            {ORGANISATIONS.slice(0, 4).map((o) => (
              <li key={o.name}><a href={o.url} target="_blank" rel="noopener noreferrer">{o.name} ↗</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap fine">
        News headlines are supplied by a third-party news API and may be delayed. Policy text is summarised for study; always confirm with the official source.
      </div>
    </footer>
  );
}
