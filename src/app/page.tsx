import Link from 'next/link';
import { SECTORS } from '@/data/sectors';
import { STORIES, ORGANISATIONS } from '@/data/content';
import TiltCard from '@/components/TiltCard';
import EvidenceBadge from '@/components/EvidenceBadge';

export default function Home() {
  const marquee = [...SECTORS, ...SECTORS];
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="sticker">Student redesign · Digital Marketing &amp; AI</span>
          <h1>Made in India. <span className="scribble">Explained</span> in one place.</h1>
          <p className="lede">27 sectors, the rules for investing, and the startups building them — with fresh headlines and a source on every fact. No dead-ends, no redirects to other sites.</p>
          <div className="actions">
            <Link className="btn" href="/sectors">Explore sectors</Link>
            <Link className="btn ghost" href="/startups">Read startup stories</Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">{marquee.map((s, i) => <span key={i}>{s.icon} {s.name.replace(/ \(.*\)/, '')}</span>)}</div>
      </div>

      <section className="block wrap">
        <span className="eyebrow">Start here</span>
        <h2>Three ways in</h2>
        <div className="grid cols-3">
          <TiltCard href="/sectors" glyph="🏭" title="Browse 27 sectors"><p>15 manufacturing and 12 service sectors, each with the latest headlines in a click.</p></TiltCard>
          <TiltCard href="/investor-desk" glyph="🧭" title="Set up in India"><p>The registration path, the rules, and a desk you can actually write to.</p></TiltCard>
          <TiltCard href="/startups" glyph="🚀" title="Get inspired"><p>Startups building in India — every claim linked to its source.</p></TiltCard>
        </div>
      </section>

      <section className="block wrap">
        <span className="eyebrow">Policy at a glance</span>
        <h2>IPR and FDI, side by side</h2>
        <div className="policy-pair">
          <TiltCard href="/policies/ipr" glyph="🛡️" title="Intellectual Property Rights"><p>Seven objectives, five protected categories, one policy since 2016.</p></TiltCard>
          <TiltCard href="/policies/fdi" glyph="🌐" title="Foreign Direct Investment"><p>Automatic vs government route, prohibited sectors, and what to file.</p></TiltCard>
        </div>
      </section>

      <section className="block wrap">
        <span className="eyebrow">Startup stories</span>
        <h2>Builders, with receipts</h2>
        <div className="grid cols-3">
          {STORIES.slice(0, 3).map((s) => (
            <article key={s.slug} className="card">
              <EvidenceBadge kind={s.verified ? 'verified' : 'draft'} />
              <h3 style={{ marginTop: 10 }}>{s.name}</h3>
              <p>{s.headline}</p>
              <Link href={`/startups#${s.slug}`}>Read the story →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="block wrap">
        <span className="eyebrow">The ecosystem</span>
        <h2>Who does what</h2>
        <div className="grid cols-3">
          {ORGANISATIONS.map((o) => (
            <div key={o.name} className="card">
              <h3>{o.name}</h3>
              <p>{o.role}</p>
              <a href={o.url} target="_blank" rel="noopener noreferrer">Official site ↗</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
