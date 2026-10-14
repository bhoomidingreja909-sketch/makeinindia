import type { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES } from '@/data/content';
import EvidenceBadge from '@/components/EvidenceBadge';

export const metadata: Metadata = { title: 'Articles', description: 'Short, practical listicles for founders and investors.' };

export default function Articles() {
  return (
    <>
      <div className="page-head"><div className="wrap"><h1>Short reads for founders</h1><p className="lede">Practical lists, hosted here — they no longer send you to another site.</p></div></div>
      <div className="wrap block grid cols-3">
        {ARTICLES.map((a) => (
          <article key={a.slug} className="card">
            <EvidenceBadge kind={a.evidence} />
            <h3 style={{ marginTop: 10 }}>{a.title}</h3>
            <p>{a.dek}</p>
            <Link href={`/articles/${a.slug}`}>Read →</Link>
          </article>
        ))}
      </div>
    </>
  );
}
