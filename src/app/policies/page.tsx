import type { Metadata } from 'next';
import TiltCard from '@/components/TiltCard';

export const metadata: Metadata = { title: 'Policies', description: 'India\'s IPR and FDI policy explained section by section.' };

export default function Policies() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">Policies</span>
        <h1>Two pillars: protect it, fund it.</h1>
        <p className="lede">Choose a policy to see it laid out section by section, with an Expand All control.</p>
      </div></div>
      <div className="wrap block policy-pair">
        <TiltCard href="/policies/ipr" glyph="🛡️" title="Intellectual Property Rights"><p>Summary, objectives, types of IPR, international agreements and how IP is administered.</p></TiltCard>
        <TiltCard href="/policies/fdi" glyph="🌐" title="Foreign Direct Investment"><p>Entry routes, permitted and prohibited sectors, government-route procedure, repatriation.</p></TiltCard>
      </div>
    </>
  );
}
