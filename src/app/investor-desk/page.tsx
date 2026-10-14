import type { Metadata } from 'next';
import Link from 'next/link';
import EvidenceBadge from '@/components/EvidenceBadge';

export const metadata: Metadata = { title: 'Investor Desk', description: 'How to set up and invest in India: three clear paths and the company registration steps.' };

const STEPS = [
  ['Get a Digital Signature Certificate (DSC)', 'Directors sign electronically filed documents with a DSC.'],
  ['Director Identification Number (DIN)', 'Applied for within the incorporation filing for first-time directors.'],
  ['Reserve the company name', 'Submit proposed names on the MCA portal for availability checks.'],
  ['File SPICe+ (integrated incorporation form)', 'One filing covers incorporation, PAN, TAN and other registrations.'],
  ['Prepare MoA and AoA', 'The Memorandum and Articles of Association define the company\'s objects and internal rules.'],
  ['Certificate of Incorporation, then compliance', 'After incorporation: bank account, GST and sector licences as applicable.'],
];

export default function InvestorDesk() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <h1>Want to build or invest in India?</h1>
        <p className="lede">Three paths. Pick the one that matches where you are.</p>
      </div></div>

      <section className="wrap block">
        <div className="grid cols-3">
          <div className="card"><h3>1 · Understand the rules</h3><p>Check the FDI route and prohibited sectors, and how your IP is protected.</p><Link className="btn" href="/policies">See policies</Link></div>
          <div className="card"><h3>2 · Set up your company</h3><p>The registration path, step by step (below).</p><a className="btn" href="#register">See the steps</a></div>
          <div className="card"><h3>3 · Talk to the desk</h3><p>Use the contact form — it stays on this site and never redirects you elsewhere.</p><Link className="btn" href="/contact">Contact the desk</Link></div>
        </div>
      </section>

      <section className="wrap block">
        <h2>Support from first idea to after-care</h2>
        <p>The Investor Facilitation Cell, within Invest India, helps investors through three phases:</p>
        <div className="grid cols-3">
          <div className="card"><h3>Pre-investment</h3><p>Understand sectors, policies and incentives.</p></div>
          <div className="card"><h3>Execution</h3><p>Approvals, registrations and setting up.</p></div>
          <div className="card"><h3>After-care</h3><p>Support once you are operating.</p></div>
        </div>
        <p className="meta" style={{ marginTop: 12 }}>Explore <Link href="/states">states &amp; UTs</Link> and the <Link href="/schemes">incentive finder</Link> to plan where to invest.</p>
      </section>

      <section id="register" className="wrap block">
        <h2>Six steps to a registered company</h2>
        <p className="notice">
          <EvidenceBadge kind="draft" /> This is an AI-assisted outline of the usual private-limited route. Forms and fees change — confirm each step on the{' '}
          <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer">Ministry of Corporate Affairs ↗</a> portal before acting.
        </p>
        <ol className="steps">{STEPS.map(([h, p]) => <li key={h}><b>{h}</b>{p}</li>)}</ol>
      </section>
    </>
  );
}
