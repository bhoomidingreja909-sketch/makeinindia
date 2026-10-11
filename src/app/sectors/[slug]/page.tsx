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

function Empty({ what }: { what: string }) {
  return <p className="empty">{what} Not added yet — this needs a verified source (for example a DPIIT / Department of Commerce sector document or data.gov.in). We do not fill it with unsourced numbers.</p>;
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSector((await params).slug);
  if (!s) notFound();
  const meta = SECTOR_META[s.slug];
  const pli = PLI.filter((p) => p.sectors.includes(s.slug));
  const stories = STORIES.filter((x) => x.sector === s.slug);
  const coordinator = s.group === 'manufacturing' ? 'DPIIT' : 'the Department of Commerce';

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: 'Overview', body: <><p>{s.name} is one of the 27 Make in India 2.0 sectors — a {s.group === 'manufacturing' ? 'manufacturing' : 'service'} sector whose action plan is coordinated by {coordinator}.</p><p className="meta">Topics we track for headlines: {s.keywords.join(' · ')}</p></> },
    { title: 'Key statistics', body: <Empty what="Sector statistics (output, exports, employment)." /> },
    { title: 'Why invest', body: <Empty what="The investment case for this sector." /> },
    { title: 'Growth drivers', body: <Empty what="Demand and policy drivers." /> },
    { title: 'Government policies & schemes', body: pli.length ? (
      <><ul className="plain">{pli.map((p) => <li key={p.name}>{p.name} PLI scheme <EvidenceBadge kind={p.evidence} /></li>)}</ul><p className="meta">Source: <a href={PLI_SOURCE.url} target="_blank" rel="noopener noreferrer">{PLI_SOURCE.name} ↗</a>. See <Link href="/schemes">all schemes</Link>.</p></>
    ) : <p>No PLI scheme in our list maps directly to this sector. See <Link href="/schemes">other initiatives</Link>.</p> },
    { title: 'Incentives & support available', body: <p>Use the <Link href="/schemes#finder">incentive finder</Link> to see matches by sector and state. State-level incentives are set by each state.</p> },
    { title: 'Investment opportunities & live projects', body: <>
      {stories.length ? <><p>Startups and companies in this sector:</p><ul className="plain">{stories.map((x) => <li key={x.slug}><Link href={`/startups#${x.slug}`}>{x.name}</Link> — {x.headline} <EvidenceBadge kind={x.verified ? 'verified' : 'draft'} /></li>)}</ul></> : <Empty what="Live projects and opportunities." />}
    </> },
    { title: 'Key contacts / nodal department', body: <><p>{meta.nodal} <EvidenceBadge kind="draft" /></p><p className="meta">Nodal bodies are AI-assisted and must be checked against the official annexure. For questions, <Link href="/contact">contact the desk</Link>.</p></> },
    { title: 'Sector brochure (PDF)', body: <Empty what="An official sector brochure." /> },
    { title: 'Sector FAQs', body: <p>General answers are on the <Link href="/faq">FAQ page</Link>; the <Link href="/faq">FAQ assistant</Link> finds the closest answer with its source.</p> },
    { title: 'Related sectors', body: <ul className="chips" style={{ listStyle: 'none', padding: 0 }}>{meta.related.map((r) => { const x = getSector(r)!; return <li key={r}><Link className="chip" href={`/sectors/${r}`} style={{ textDecoration: 'none' }}>{x.icon} {x.name.replace(/ \(.*\)/, '')}</Link></li>; })}</ul> },
  ];

  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">{s.group === 'manufacturing' ? 'Manufacturing sector' : 'Service sector'}</span>
        <h1><span aria-hidden>{s.icon}</span> {s.name}</h1>
      </div></div>
      <div className="wrap block">
        {sections.map((x, i) => (
          <section key={x.title} className="sector-sec">
            <h2><span className="n">{i + 1}</span>{x.title}</h2>
            {x.body}
          </section>
        ))}
        <section className="sector-sec" id="news">
          <h2><span className="n">★</span>Latest headlines</h2>
          <NewsFeed sector={s.slug} />
        </section>
        <p style={{ marginTop: 24 }}><Link href="/sectors">← All sectors</Link></p>
      </div>
    </>
  );
}
