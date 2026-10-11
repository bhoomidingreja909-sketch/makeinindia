import type { Metadata } from 'next';
import SectorExplorer from '@/components/SectorExplorer';

export const metadata: Metadata = { title: 'Sectors', description: '15 manufacturing and 12 service sectors with the latest sector headlines.' };

export default function Sectors() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">Sectors</span>
        <h1>27 sectors. Pick one.</h1>
        <p className="lede">Select a tile to open its headlines — switch between weekly, monthly, quarterly and yearly views.</p>
      </div></div>
      <div className="wrap block"><SectorExplorer /></div>
    </>
  );
}
