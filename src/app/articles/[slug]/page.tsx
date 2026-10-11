import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ARTICLES } from '@/data/content';
import EvidenceBadge from '@/components/EvidenceBadge';

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.dek } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <>
      <div className="page-head"><div className="wrap"><EvidenceBadge kind={a.evidence} /><h1 style={{ marginTop: 12 }}>{a.title}</h1><p className="lede">{a.dek}</p></div></div>
      <div className="wrap block" style={{ maxWidth: 760 }}>
        <ol className="steps">{a.points.map((p) => <li key={p.h}><b>{p.h}</b>{p.p}</li>)}</ol>
        <p className="meta">Reference: <a href={a.source.url} target="_blank" rel="noopener noreferrer">{a.source.name} ↗</a>. Confirm details with the official source.</p>
        <p><Link href="/articles">← All articles</Link></p>
      </div>
    </>
  );
}
