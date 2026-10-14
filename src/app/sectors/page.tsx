import type { Metadata } from 'next';
import SectorExplorer from '@/components/SectorExplorer';

export const metadata: Metadata = { title: 'Sectors', description: '15 manufacturing and 12 service sectors with the latest sector headlines.' };

export default function Sectors() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <h1>27 sectors. Pick one.</h1>
        <p className="lede">Select a sector to see its curated news.</p>
      </div></div>
      <div className="wrap block"><SectorExplorer /></div>
    </>
  );
}
