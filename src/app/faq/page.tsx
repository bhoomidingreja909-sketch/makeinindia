import type { Metadata } from 'next';
import FaqList from '@/components/FaqList';
import FaqAssistant from '@/components/FaqAssistant';
import { FAQS } from '@/data/content';

export const metadata: Metadata = { title: 'FAQ', description: 'Answers to common investor and startup questions, with sources.' };

export default function Faq() {
  // Only answers backed by an official source are exposed as structured data.
  const ld = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.filter((f) => f.evidence === 'verified').map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <div className="page-head"><div className="wrap"><h1>Questions people ask</h1><p className="lede">Grouped by topic. Each answer shows whether it is backed by an official page or is still a draft to verify.</p></div></div>
      <div className="wrap block" style={{ maxWidth: 860 }}>
        <FaqAssistant />
        <FaqList />
      </div>
    </>
  );
}
