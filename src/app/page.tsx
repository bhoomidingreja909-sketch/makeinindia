import Link from 'next/link';
import { STORIES } from '@/data/content';
import { PLI } from '@/data/site';
import TiltCard from '@/components/TiltCard';
import EvidenceBadge from '@/components/EvidenceBadge';
import StatsStrip from '@/components/StatsStrip';
import Pillars from '@/components/Pillars';
import SectorExplorer from '@/components/SectorExplorer';
import Carousel from '@/components/Carousel';
import Logo from '@/components/Logo';
import { T } from '@/components/Prefs';

function Head({ title, href, link }: { title: string; href?: string; link?: string }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {href && <Link href={href}>{link} →</Link>}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1><T id="hero.h1" en="India’s manufacturing and investment story, in one place" /></h1>
            <p className="lede"><T id="hero.lede" en="27 sectors, the rules for investing, and the startups building them — with a source on every fact." /></p>
            <div className="actions">
              <Link className="btn" href="/sectors"><T id="cta.sectors" en="Explore Sectors" /></Link>
              <Link className="btn ghost" href="/investor-desk"><T id="cta.invest" en="Invest in India" /></Link>
            </div>
          </div>
          <div className="hero-logo" aria-hidden><Logo height={230} on="dark" /></div>
        </div>
      </section>

      <section className="block wrap" aria-labelledby="stats-h">
        <div className="sec-head"><h2 id="stats-h">Key statistics</h2><span className="meta">Every figure shows its source and year</span></div>
        <StatsStrip />
      </section>

      <section className="block wrap">
        <Head title="Four pillars" href="/about" link="About the programme" />
        <Pillars />
      </section>

      <section className="block wrap" id="sector-explorer">
        <Head title="Sectors" href="/news" link="All sector news" />
        <SectorExplorer />
      </section>

      <section className="block wrap">
        <Head title="Policy and incentives" />
        <div className="grid cols-3">
          <TiltCard href="/policies/ipr" title="Intellectual Property Rights"><p>Seven objectives, five protected categories, one policy since 2016.</p></TiltCard>
          <TiltCard href="/policies/fdi" title="Foreign Direct Investment"><p>Automatic and government routes, prohibited sectors, procedure.</p></TiltCard>
          <TiltCard href="/schemes" title="Schemes & Incentives"><p>PLI covers {PLI.length} sectors with a ₹1.97 lakh crore outlay. Find schemes by sector and state.</p></TiltCard>
        </div>
      </section>

      <section className="block wrap">
        <Head title="Startup stories" href="/startups" link="All stories" />
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
        <div className="cta-band">
          <div>
            <h2>Questions about investing or setting up in India?</h2>
            <p>Ask the FAQ assistant, or contact the Investor Desk.</p>
          </div>
          <div className="actions" style={{ marginTop: 0 }}>
            <Link className="btn" href="/contact"><T id="cta.contact" en="Contact the Investor Desk" /></Link>
            <Link className="btn ghost" href="/faq">FAQ assistant</Link>
          </div>
        </div>
      </section>
    </>
  );
}
