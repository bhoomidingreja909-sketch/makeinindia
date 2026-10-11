import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SECTORS, getSector } from '@/data/sectors';
import NewsFeed from '@/components/NewsFeed';

export const dynamicParams = false;
export const generateStaticParams = () => SECTORS.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSector((await params).slug);
  return s ? { title: s.name, description: `Latest headlines for ${s.name} in India.` } : {};
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSector((await params).slug);
  if (!s) notFound();
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">{s.group === 'manufacturing' ? 'Manufacturing sector' : 'Service sector'}</span>
        <h1><span aria-hidden>{s.icon}</span> {s.name}</h1>
        <p className="lede">Topics tracked: {s.keywords.join(' · ')}</p>
      </div></div>
      <div className="wrap block">
        <NewsFeed sector={s.slug} />
        <p style={{ marginTop: 24 }}><Link href="/sectors">← All sectors</Link></p>
      </div>
    </>
  );
}
