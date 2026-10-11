import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LEGAL } from '@/data/site';

export const dynamicParams = false;
export const generateStaticParams = () => LEGAL.map((l) => ({ slug: l.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = LEGAL.find((l) => l.slug === slug);
  return p ? { title: p.title, description: p.body[0].slice(0, 150) } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = LEGAL.find((l) => l.slug === slug);
  if (!p) notFound();
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Policies &amp; help</span><h1>{p.title}</h1></div></div>
      <div className="wrap block" style={{ maxWidth: 760 }}>
        {p.body.map((t) => <p key={t}>{t}</p>)}
        <p className="meta">Questions? <Link href="/contact">Contact</Link> · <Link href="/feedback">Feedback</Link></p>
      </div>
    </>
  );
}
