import type { Metadata } from 'next';
import Link from 'next/link';
import { RESOURCES, PALETTE } from '@/data/site';
import { ARTICLES, ORGANISATIONS } from '@/data/content';

export const metadata: Metadata = { title: 'Resources', description: 'Policy documents, official portals, articles and the design brand kit.' };

export default function Resources() {
  const groups = ['Policy', 'Data & press', 'Startup'] as const;
  return (
    <>
      <div className="page-head"><div className="wrap"><h1>Documents and data</h1><p className="lede">Official sources first.</p></div></div>
      <div className="wrap block">
        {groups.map((g) => (
          <section key={g} style={{ marginBottom: 32 }}>
            <h2>{g}</h2>
            <ul>{RESOURCES.filter((r) => r.group === g).map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title} ↗</a> <span className="badge secondary">{r.type}</span></li>)}</ul>
          </section>
        ))}
        <section style={{ marginBottom: 32 }}>
          <h2>Articles</h2>
          <ul>{ARTICLES.map((a) => <li key={a.slug}><Link href={`/articles/${a.slug}`}>{a.title}</Link></li>)}</ul>
        </section>
        <section style={{ marginBottom: 32 }}>
          <h2>Sector brochures, presentations, infographics &amp; videos</h2>
          <p className="empty">None bundled yet. Official brochures and presentations (such as Make in India Week 2016) should be added as files with a title, type and size, only after checking their licence. We do not publish mock documents as if they were official.</p>
        </section>
        <section style={{ marginBottom: 32 }}>
          <h2>Organisations</h2>
          <ul>{ORGANISATIONS.map((o) => <li key={o.name}><a href={o.url} target="_blank" rel="noopener noreferrer">{o.name} ↗</a> — {o.role}</li>)}</ul>
        </section>
        <section id="brand">
          <h2>Brand kit</h2>
          <p>The Make in India logo is the property of the Government of India (DPIIT). It is shown here only to illustrate this academic redesign and implies no affiliation. Keep clear space equal to the height of the lion&apos;s head, do not stretch or recolour it, and use at least 120 px width on screen.</p>
          <div className="brand-kit">
            <div className="brand-tile"><div className="stage light"><img src="/brand/make-in-india-logo.png" alt="Make in India logo, dark version" width={300} height={147} /></div><div className="cap">Dark logo, for light backgrounds · <a href="/brand/make-in-india-logo.png" download>PNG</a></div></div>
            <div className="brand-tile"><div className="stage navy"><img src="/brand/make-in-india-logo-white.png" alt="Make in India logo, white version" width={300} height={147} /></div><div className="cap">White logo, for dark backgrounds · <a href="/brand/make-in-india-logo-white.png" download>PNG</a></div></div>
          </div>
          <h3 style={{ marginTop: 28 }}>Colour palette</h3>
          <div className="swatches">{PALETTE.map((c) => <div key={c.hex} className="swatch"><i style={{ background: c.hex }} /><div><b>{c.name}</b><br />{c.hex}<br /><span className="meta">{c.use}</span></div></div>)}</div>
        </section>
      </div>
    </>
  );
}
