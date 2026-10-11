import type { Metadata } from 'next';
import QueryForm from '@/components/QueryForm';

export const metadata: Metadata = { title: 'Contact the Investor Desk', description: 'Send a query — handled on this site.' };

export default function Contact() {
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Contact</span><h1>Ask the Investor Desk</h1><p className="lede">Your message stays on this site. We store it securely so it can be answered.</p></div></div>
      <div className="wrap block grid cols-2" style={{ alignItems: 'start' }}>
        <QueryForm mode="contact" />
        <aside className="card">
          <h2 style={{ fontSize: '1.3rem' }}>Official channels</h2>
          <p>Official contact details for the Investor Facilitation Cell and DPIIT are not reproduced here because they could not be verified from this environment. Please use the official portals:</p>
          <ul>
            <li><a href="https://dpiit.gov.in" target="_blank" rel="noopener noreferrer">DPIIT ↗</a></li>
            <li><a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">Public grievances — CPGRAMS ↗</a></li>
          </ul>
          <p className="meta">Want a faster answer? Try the <a href="/faq">FAQ assistant</a>.</p>
        </aside>
      </div>
    </>
  );
}
