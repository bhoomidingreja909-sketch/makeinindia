import type { Metadata } from 'next';
import { STORIES } from '@/data/content';
import { getSector } from '@/data/sectors';
import EvidenceBadge from '@/components/EvidenceBadge';
import QueryForm from '@/components/QueryForm';

export const metadata: Metadata = { title: 'Startup stories', description: 'Startups building in India, each story linked to its sources.' };

export default function Startups() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">Startup stories</span>
        <h1>Built in India. Sourced line by line.</h1>
        <p className="lede">Every line below comes from the linked sources. Stories marked <b>Draft — verify</b> are candidates still being checked by the author; they are shown so you can see the format, not as confirmed facts.</p>
      </div></div>
      <div className="wrap block grid cols-2">
        {STORIES.map((s) => {
          const sec = getSector(s.sector);
          return (
            <article key={s.slug} id={s.slug} className="card">
              <div className="meta" style={{ marginBottom: 8 }}>
                <EvidenceBadge kind={s.verified ? 'verified' : 'draft'} />
                {sec && <span>{sec.icon} {sec.name}</span>}
              </div>
              <h2 style={{ fontSize: '1.5rem' }}>{s.name}</h2>
              <p><em>{s.headline}</em></p>
              <ul className="plain">{s.summary.map((l) => <li key={l}>{l}</li>)}</ul>
              <p className="meta">Sources:{' '}
                {s.sources.map((src) => (
                  <a key={src.url} href={src.url} target="_blank" rel="noopener noreferrer">{src.name}{src.date ? ` (${src.date})` : ''} ↗</a>
                ))}
              </p>
              <p className="meta">Retrieved {s.retrieved}</p>
            </article>
          );
        })}
      </div>
      <section className="wrap block">
        <span className="eyebrow">Your turn</span>
        <h2>Building something in India?</h2>
        <p className="lede">Tell us about it. Submissions are stored securely and reviewed — nothing is published automatically.</p>
        <QueryForm mode="apply" />
      </section>
    </>
  );
}
