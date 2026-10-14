import type { Metadata } from 'next';
import Link from 'next/link';
import Pillars from '@/components/Pillars';
import Timeline from '@/components/Timeline';
import EvidenceBadge from '@/components/EvidenceBadge';
import { ORIGINAL_GOALS, PILLARS_SOURCE } from '@/data/site';

export const metadata: Metadata = { title: 'About', description: 'What Make in India is, its four pillars, timeline and institutions.' };

export default function About() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <h1>What is Make in India?</h1>
        <p className="lede">A national programme launched on 25 September 2014 to facilitate investment, foster innovation, build best-in-class infrastructure and make India a hub for manufacturing, design and innovation. It also promotes entrepreneurship, not manufacturing alone.</p>
      </div></div>

      <section className="wrap block">
        <h2>Original goals</h2>
        <ul className="plain">{ORIGINAL_GOALS.map((g) => <li key={g}>{g}</li>)}</ul>
        <p className="meta"><EvidenceBadge kind="secondary" /> Presented as the programme&apos;s <em>original</em> goals. Source: <a href={PILLARS_SOURCE.url} target="_blank" rel="noopener noreferrer">{PILLARS_SOURCE.name} ↗</a></p>
      </section>

      <section className="wrap block">
        <h2>Four pillars</h2>
        <Pillars />
      </section>

      <section className="wrap block">
        <h2>Timeline</h2>
        <Timeline />
      </section>

      <section className="wrap block">
        <h2>Make in India 2.0 — 27 sectors</h2>
        <p>Parliamentary answers describe 27 sectors: <strong>15 manufacturing sectors</strong> whose action plans are coordinated by DPIIT and <strong>12 service sectors</strong> coordinated by the Department of Commerce. <Link href="/sectors">Browse them all →</Link></p>
        <h2 style={{ marginTop: 32 }}>Who runs it</h2>
        <p>DPIIT (Ministry of Commerce &amp; Industry) and Invest India implement the programme, together with other ministries and state governments. The Investor Facilitation Cell within Invest India helps investors through pre-investment, execution and after-care.</p>
        <h2 style={{ marginTop: 32 }}>About the logo</h2>
        <p>The logo is a lion built from gears, symbolising strength and manufacturing. It is the property of the Government of India (DPIIT) and is shown here only for this academic redesign, without implying affiliation. Downloadable files and usage rules are in the <Link href="/resources#brand">brand kit</Link>.</p>
      </section>
    </>
  );
}
