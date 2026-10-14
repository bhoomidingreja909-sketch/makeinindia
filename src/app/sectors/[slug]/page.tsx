import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SECTORS, getSector } from '@/data/sectors';
import { SECTOR_META } from '@/data/sectorMeta';
import { PLI, PLI_SOURCE } from '@/data/site';
import NewsFeed from '@/components/NewsFeed';
import EvidenceBadge from '@/components/EvidenceBadge';
import { STORIES } from '@/data/content';

export const dynamicParams = false;
export const generateStaticParams = () => SECTORS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSector((await params).slug);
  return s ? { title: s.name, description: `Latest headlines, schemes and nodal department for ${s.name} in India.` } : {};
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSector((await params).slug);
  if (!s) notFound();
  const meta = SECTOR_META[s.slug];
  const pli = PLI.filter((p) => p.sectors.includes(s.slug));
  const stories = STORIES.filter((x) => x.sector === s.slug);
  const coordinator = s.group === 'manufacturing' ? 'DPIIT' : 'the Department of Commerce';

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: 'Overview', body: <><p>{s.name} is one of the 27 Make in India 2.0 sectors — a {s.group === 'manufacturing' ? 'manufacturing' : 'service'} sector whose action plan is coordinated by {coordinator}.</p><p className="meta">Topics tracked: {s.keywords.join(' · ')}</p></> },
    { title: 'Government policies & schemes', body: pli.length ? (
      <><ul className="plain">{pli.map((p) => <li key={p.name}>{p.name} PLI scheme <EvidenceBadge kind={p.evidence} /></li>)}</ul><p className="meta">Source: <a href={PLI_SOURCE.url} target="_blank" rel="noopener noreferrer">{PLI_SOURCE.name} ↗</a> · <Link href="/schemes#finder">Incentive finder</Link></p></>
    ) : <p>No PLI scheme in our list maps directly to this sector. See <Link href="/schemes">other initiatives</Link> or use the <Link href="/schemes#finder">incentive finder</Link>.</p> },
    ...(stories.length ? [{ title: 'Companies and startups', body: <ul className="plain">{stories.map((x) => <li key={x.slug}><Link href={`/startups#${x.slug}`}>{x.name}</Link> — {x.headline} <EvidenceBadge kind={x.verified ? 'verified' : 'draft'} /></li>)}</ul> }] : []),
    { title: 'Nodal department', body: <><p>{meta.nodal} <EvidenceBadge kind="draft" /></p><p className="meta">Verify against the official annexure. Questions? <Link href="/contact">Contact the desk</Link>.</p></> },
    { title: 'Related sectors', body: <ul className="chips" style={{ listStyle: 'none', padding: 0, margin: 0 }}>{meta.related.map((r) => { const x = getSector(r)!; return <li key={r}><Link className="chip" href={`/sectors/${r}`} style={{ textDecoration: 'none' }}>{x.name.replace(/ \(.*\)/, '')}</Link></li>; })}</ul> },
  ];
  const pendingItems = ['Key statistics', 'Why invest', 'Growth drivers', ...(stories.length ? [] : ['Live projects']), 'Sector brochure'];

  return (
    <>
      <div className="page-head"><div className="wrap">
        <h1>{s.name}</h1>
        <p className="lede">{s.group === 'manufacturing' ? 'Manufacturing sector' : 'Service sector'} · coordinated by {coordinator}</p>
      </div></div>
      <div className="wrap block">
        {sections.map((x, i) => (
          <section key={x.title} className="sector-sec">
            <h2><span className="n">{i + 1}</span>{x.title}</h2>
            {x.body}
          </section>
        ))}
        <section className="sector-sec" id="news">
          <h2><span className="n">{sections.length + 1}</span>Curated news</h2>
          <NewsFeed sector={s.slug} />
        </section>
        <div className="pending" role="note">
          <strong>Not yet available</strong> — each needs a verified official source and is not filled with unsourced figures:
          <ul>{pendingItems.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <p style={{ marginTop: 24 }}><Link href="/sectors">← All sectors</Link></p>
      </div>
    </>
  );
}
