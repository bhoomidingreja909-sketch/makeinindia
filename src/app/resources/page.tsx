import type { Metadata } from 'next';
import Link from 'next/link';
import { RESOURCES, PALETTE } from '@/data/site';
import { ARTICLES } from '@/data/content';

export const metadata: Metadata = { title: 'Resources', description: 'Policy documents, official portals, articles and the design brand kit.' };

export default function Resources() {
  const groups = ['Policy', 'Data & press', 'Startup'] as const;
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Resources</span><h1>Documents, data and tools</h1><p className="lede">Official sources first. Each link is labelled with its type.</p></div></div>
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
        <section>
          <h2>Design brand kit</h2>
          <p>The palette used across this redesign. Contrast ratios were checked against WCAG AA.</p>
          <div className="swatches">{PALETTE.map((c) => <div key={c.hex} className="swatch"><i style={{ background: c.hex }} /><div><b>{c.name}</b><br />{c.hex}<br /><span className="meta">{c.use}</span></div></div>)}</div>
        </section>
      </div>
    </>
  );
}
