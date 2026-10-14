import type { Metadata } from 'next';
import QueryForm from '@/components/QueryForm';

export const metadata: Metadata = { title: 'Feedback', description: 'Tell us what to improve or report an accessibility barrier.' };

export default function Feedback() {
  return (
    <>
      <div className="page-head"><div className="wrap"><h1>Help us improve</h1><p className="lede">Report a mistake, a missing source or an accessibility barrier.</p></div></div>
      <div className="wrap block"><QueryForm mode="contact" defaultCategory="feedback" /></div>
    </>
  );
}
