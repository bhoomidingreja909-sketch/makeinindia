import type { Metadata } from 'next';
import Link from 'next/link';
import { PLI, INITIATIVES, PLI_SOURCE } from '@/data/site';
import { getSector } from '@/data/sectors';
import EvidenceBadge from '@/components/EvidenceBadge';
import IncentiveFinder from '@/components/IncentiveFinder';

export const metadata: Metadata = { title: 'Schemes & Incentives', description: 'PLI schemes for 14 sectors, other initiatives, and an incentive finder.' };

export default function Schemes() {
  return (
    <>
      <div className="page-head"><div className="wrap">
        <span className="eyebrow">Schemes &amp; incentives</span>
        <h1>Support for people who build</h1>
        <p className="lede">Production Linked Incentive (PLI) schemes cover 14 key sectors with a total outlay of ₹1.97 lakh crore. <a href={PLI_SOURCE.url} target="_blank" rel="noopener noreferrer">PIB ↗</a></p>
      </div></div>

      <section className="wrap block" id="finder">
        <span className="eyebrow">Incentive finder</span>
        <h2>Which schemes match you?</h2>
        <IncentiveFinder />
      </section>

      <section className="wrap block">
        <h2>PLI schemes — 14 sectors</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="t">
            <thead><tr><th>#</th><th>PLI sector</th><th>Make in India sector(s)</th><th>Outlay</th><th>Evidence</th></tr></thead>
            <tbody>
              {PLI.map((p, i) => (
                <tr key={p.name}>
                  <td>{i + 1}</td><td>{p.name}</td>
                  <td>{p.sectors.length ? p.sectors.map((s) => getSector(s)?.name.replace(/ \(.*\)/, '')).join(', ') : '—'}</td>
                  <td className="meta">To add from the DPIIT PLI list</td>
                  <td><EvidenceBadge kind={p.evidence} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="notice info">The total outlay (₹1.97 lakh crore) and the sector count (14) are confirmed by PIB. Sector-wise outlays and nodal ministries are not shown because we could not verify them from an official table — add them from the DPIIT list rather than from memory. Rows marked Draft are sector names still to be confirmed.</p>
      </section>

      <section className="wrap block">
        <h2>Other initiatives</h2>
        <div className="grid cols-3">
          {INITIATIVES.map((i) => (
            <div key={i.name} className="card"><EvidenceBadge kind={i.evidence} /><h3 style={{ marginTop: 10 }}>{i.name}</h3><p>{i.text}</p></div>
          ))}
        </div>
        <h2 style={{ marginTop: 40 }}>State incentives</h2>
        <p>States run their own incentive schemes, so we do not duplicate them. Pick your state in the <Link href="/states">States &amp; UTs explorer</Link> or the incentive finder, then check its industries department.</p>
      </section>
    </>
  );
}
