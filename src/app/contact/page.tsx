import type { Metadata } from 'next';
import QueryForm from '@/components/QueryForm';

export const metadata: Metadata = { title: 'Contact the Investor Desk', description: 'Send a query — handled on this site.' };

export default function Contact() {
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Contact</span><h1>Ask the Investor Desk</h1><p className="lede">Your message stays on this site. We store it securely so it can be answered.</p></div></div>
      <div className="wrap block"><QueryForm mode="contact" /></div>
    </>
  );
}
