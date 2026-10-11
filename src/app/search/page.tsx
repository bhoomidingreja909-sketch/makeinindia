import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';

export const metadata: Metadata = { title: 'Search', robots: { index: false } };

export default function SearchPage() {
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Search</span><h1>Search this site</h1><p className="lede">Searches pages, sectors, FAQs, stories and articles on this site.</p></div></div>
      <div className="wrap block" style={{ maxWidth: 820 }}><Suspense fallback={<p>Loading…</p>}><SearchResults /></Suspense></div>
    </>
  );
}
