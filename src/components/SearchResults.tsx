'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { searchSite } from '@/lib/search';

export default function SearchResults() {
  const q = useSearchParams().get('q') ?? '';
  const hits = q ? searchSite(q) : [];
  return (
    <div role="status" aria-live="polite">
      {!q && <p>Type a search above.</p>}
      {q && <p className="meta">{hits.length} result{hits.length === 1 ? '' : 's'} for “{q}”</p>}
      {q && hits.length === 0 && <div className="notice info">Nothing found. Try “FDI”, “railways” or “PLI”.</div>}
      {hits.map((h) => (
        <div key={h.href + h.title} className="card" style={{ marginBottom: 12, padding: 16 }}>
          <span className="badge secondary">{h.kind}</span>
          <h3 style={{ margin: '8px 0 4px' }}><Link href={h.href}>{h.title}</Link></h3>
          <p style={{ margin: 0 }} className="meta">{h.snippet.slice(0, 180)}</p>
        </div>
      ))}
    </div>
  );
}
