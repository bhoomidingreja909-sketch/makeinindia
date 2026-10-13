import type { Metadata } from 'next';
import NewsDashboard from '@/components/NewsDashboard';

export const metadata: Metadata = { title: 'Sector news', description: 'Latest sector-wise headlines for Make in India sectors.' };

export default function News() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">News dashboard</span>
        <h1>Latest headlines, by sector</h1>
        <p className="lede">These are curated, sourced articles with links to the original. The list is reviewed by hand and is <em>not</em> a live feed.</p>
      </div></div>
      <div className="wrap block"><NewsDashboard /></div>
    </>
  );
}
