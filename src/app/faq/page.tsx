import type { Metadata } from 'next';
import FaqList from '@/components/FaqList';
import { FAQS } from '@/data/content';

export const metadata: Metadata = { title: 'FAQ', description: 'Answers to common startup and investor questions.' };

export default function Faq() {
  // Only answers backed by an official source are exposed as structured data.
  const ld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.filter((f) => f.evidence === 'verified').map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <div className="page-head"><div className="wrap"><span className="eyebrow">FAQ</span><h1>Questions founders ask</h1><p className="lede">Each answer shows whether it is backed by an official page or still a draft to verify.</p></div></div>
      <div className="wrap block" style={{ maxWidth: 820 }}><FaqList /></div>
    </>
  );
}
