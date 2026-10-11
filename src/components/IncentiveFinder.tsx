'use client';
import { useState } from 'react';
import { SECTORS } from '@/data/sectors';
import { STATES, UTS, findIncentives, PLI_SOURCE } from '@/data/site';
import EvidenceBadge from './EvidenceBadge';

export default function IncentiveFinder() {
  const [sector, setSector] = useState('');
  const [state, setState] = useState('');
  const r = sector ? findIncentives(sector, state || undefined) : null;
  const name = SECTORS.find((s) => s.slug === sector)?.name;
  return (
    <div>
      <div className="finder">
        <label>Sector
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            <option value="">Choose a sector…</option>
            {SECTORS.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </label>
        <label>State / UT (optional)
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Any</option>
            {[...STATES, ...UTS].map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <p className="meta">Investment size is not used yet: eligibility thresholds differ by scheme and must be verified before they are encoded.</p>
      <div role="status" aria-live="polite">
        {r && (
          <div className="card">
            <h3>Matches for {name}</h3>
            {r.pli.length ? (
              <>
                <p><strong>PLI schemes</strong> (<a href={PLI_SOURCE.url} target="_blank" rel="noopener noreferrer">{PLI_SOURCE.name} ↗</a>)</p>
                <ul className="plain">{r.pli.map((p) => <li key={p.name}>{p.name} <EvidenceBadge kind={p.evidence} /></li>)}</ul>
              </>
            ) : <p className="empty">No PLI scheme in our list maps to this sector. That does not mean no support exists — see the general initiatives below.</p>}
            <p><strong>General initiatives to explore</strong></p>
            <ul className="plain">{r.general.map((g) => <li key={g.name}><b>{g.name}</b> — {g.text}</li>)}</ul>
            <p className="notice info">{r.stateNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}
