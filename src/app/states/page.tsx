import type { Metadata } from 'next';
import StateExplorer from '@/components/StateExplorer';

export const metadata: Metadata = { title: 'States & Union Territories', description: 'Explore all 28 states and 8 Union Territories.' };

export default function States() {
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Invest in India</span><h1>28 states. 8 Union Territories.</h1><p className="lede">Select one to see the cited facts we have. No figure is shown without a source.</p></div></div>
      <div className="wrap block"><StateExplorer /></div>
    </>
  );
}
