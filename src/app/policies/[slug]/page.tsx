import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { IPR, FDI } from '@/data/content';
import Accordion from '@/components/Accordion';

const DOCS = { ipr: IPR, fdi: FDI } as const;
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(DOCS).map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = DOCS[(await params).slug as keyof typeof DOCS];
  return d ? { title: d.title, description: d.tagline } : {};
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = DOCS[(await params).slug as keyof typeof DOCS];
  if (!d) notFound();
  return (
    <>
      <div className="page-head"><div className="wrap">
        <h1>{d.title}</h1>
        <p className="lede">{d.tagline}</p>
      </div></div>
      <div className="wrap block">
        <div className="notice info">
          Sections marked <b>Official source</b> were seen on the cited Make in India page. Sections marked <b>Draft — verify</b> are AI-assisted summaries and must be checked against the source before you rely on them.
        </div>
        <Accordion sections={d.sections} />
        <h2 style={{ marginTop: 40 }}>Sources &amp; downloads</h2>
        <ul>
          {[...d.sources, ...d.downloads].map((s) => <li key={s.url + s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a></li>)}
        </ul>
        <p><Link href="/policies">← All policies</Link></p>
      </div>
    </>
  );
}
