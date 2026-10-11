import Link from 'next/link';
import { SECTORS } from '@/data/sectors';
import { STORIES, ORGANISATIONS } from '@/data/content';
import { PLI } from '@/data/site';
import TiltCard from '@/components/TiltCard';
import EvidenceBadge from '@/components/EvidenceBadge';
import StatsStrip from '@/components/StatsStrip';
import Pillars from '@/components/Pillars';
import SectorExplorer from '@/components/SectorExplorer';
import Carousel from '@/components/Carousel';
import { T } from '@/components/Prefs';

export default function Home() {
  const marquee = [...SECTORS, ...SECTORS];
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="sticker">Student redesign · Digital Marketing &amp; AI</span>
          <h1><T id="hero.h1a" en="Made in India." /> <span className="scribble"><T id="hero.h1b" en="Explained" /></span> <T id="hero.h1c" en="in one place." /></h1>
          <p className="lede"><T id="hero.lede" en="27 sectors, the rules for investing, and the startups building them — with fresh headlines and a source on every fact." /></p>
          <div className="actions">
            <Link className="btn" href="/sectors"><T id="cta.sectors" en="Explore Sectors" /></Link>
            <Link className="btn ghost" href="/investor-desk"><T id="cta.invest" en="Invest in India" /></Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">{marquee.map((s, i) => <span key={i}>{s.icon} {s.name.replace(/ \(.*\)/, '')}</span>)}</div>
      </div>

      <section className="block wrap" aria-labelledby="stats-h">
        <span className="eyebrow">By the numbers</span>
        <h2 id="stats-h">Key statistics — each with its source and year</h2>
        <StatsStrip />
      </section>

      <section className="block wrap">
        <span className="eyebrow">The idea</span>
        <h2>Four pillars</h2>
        <Pillars />
        <p><Link href="/about">Read the full story and timeline →</Link></p>
      </section>

      <section className="block wrap" id="sector-explorer">
        <span className="eyebrow">Sector explorer</span>
        <h2>Filter, click, read the latest</h2>
        <SectorExplorer />
      </section>

      <section className="block wrap">
        <span className="eyebrow">Schemes highlight</span>
        <h2>Production Linked Incentive: {PLI.length} sectors, ₹1.97 lakh crore</h2>
        <p className="lede">See which schemes match your sector and state with the incentive finder.</p>
        <div className="actions"><Link className="btn" href="/schemes#finder">Find incentives</Link><Link className="btn ghost" href="/schemes">All schemes</Link></div>
      </section>

      <section className="block wrap">
        <span className="eyebrow">Invest in India</span>
        <h2>Why India, and how to get support</h2>
        <div className="policy-pair">
          <TiltCard href="/policies/ipr" glyph="🛡️" title="Intellectual Property Rights"><p>Seven objectives, five protected categories, one policy since 2016.</p></TiltCard>
          <TiltCard href="/policies/fdi" glyph="🌐" title="Foreign Direct Investment"><p>Automatic vs government route, prohibited sectors, and what to file.</p></TiltCard>
        </div>
        <p style={{ marginTop: 16 }}>The Investor Facilitation Cell helps investors through pre-investment, execution and after-care. <Link href="/investor-desk">Open the Investor Desk →</Link></p>
      </section>

      <section className="block wrap">
        <span className="eyebrow">Startup stories</span>
        <h2>Builders, with receipts</h2>
        <Carousel label="Startup stories">
          {STORIES.map((s) => (
            <article key={s.slug} className="card">
              <EvidenceBadge kind={s.verified ? 'verified' : 'draft'} />
              <h3 style={{ marginTop: 10 }}>{s.name}</h3>
              <p>{s.headline}</p>
              <Link href={`/startups#${s.slug}`}>Read the story →</Link>
            </article>
          ))}
        </Carousel>
      </section>

      <section className="block wrap">
        <span className="eyebrow">Latest news</span>
        <h2>Headlines by sector</h2>
        <p className="lede">Sector-wise headlines from a news API, cached and de-duplicated, with the last update time shown. Not real-time.</p>
        <div className="actions"><Link className="btn" href="/news">Open the news dashboard</Link></div>
      </section>

      <section className="block wrap">
        <span className="eyebrow">The ecosystem</span>
        <h2>Who does what</h2>
        <div className="grid cols-3">
          {ORGANISATIONS.map((o) => (
            <div key={o.name} className="card">
              <h3>{o.name}</h3><p>{o.role}</p>
              <a href={o.url} target="_blank" rel="noopener noreferrer">Official site ↗</a>
            </div>
          ))}
        </div>
      </section>

      <section className="block wrap">
        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Have a question for an expert?</h2>
          <p>Ask the FAQ assistant, or send a query to the desk.</p>
          <div className="actions" style={{ justifyContent: 'center' }}>
            <Link className="btn" href="/contact"><T id="cta.contact" en="Contact the Investor Desk" /></Link>
            <Link className="btn ghost" href="/faq">Ask the FAQ assistant</Link>
          </div>
        </div>
      </section>
    </>
  );
}
