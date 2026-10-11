import type { Metadata } from 'next';
import NewsDashboard from '@/components/NewsDashboard';

export const metadata: Metadata = { title: 'Sector news', description: 'Latest sector-wise headlines for Make in India sectors.' };

export default function News() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">News dashboard</span>
        <h1>Latest headlines, by sector</h1>
        <p className="lede">Articles are collected once a day from public pages and credited to their source. They are <em>not</em> live, so each view shows when it last updated.</p>
      </div></div>
      <div className="wrap block"><NewsDashboard /></div>
    </>
  );
}
