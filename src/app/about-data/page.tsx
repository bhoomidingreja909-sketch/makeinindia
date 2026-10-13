import type { Metadata } from 'next';
import EvidenceBadge from '@/components/EvidenceBadge';

export const metadata: Metadata = { title: 'About our data', description: 'Where every fact on this site comes from, and how to read the labels.' };

export default function AboutData() {
  return (
    <>
      <div className="page-head"><div className="wrap"><span className="eyebrow">Transparency</span><h1>About our data</h1><p className="lede">This is a student project. We separate what is verified from what is AI-assisted analysis.</p></div></div>
      <div className="wrap block" style={{ maxWidth: 820 }}>
        <h2>How to read the labels</h2>
        <table className="t">
          <tbody>
            <tr><td><EvidenceBadge kind="verified" /></td><td>Seen on an official government page and cited next to the text.</td></tr>
            <tr><td><EvidenceBadge kind="secondary" /></td><td>Reported by the press citing official data — confirm with the official release.</td></tr>
            <tr><td><EvidenceBadge kind="draft" /></td><td>AI-assisted summary awaiting the author&apos;s check against its source. Do not rely on it as fact.</td></tr>
          </tbody>
        </table>
        <h2 style={{ marginTop: 32 }}>News articles</h2>
        <ul>
          <li>The news pages show a short, hand-picked list of real articles. Each item shows the publisher&apos;s title, the source, the date (or &ldquo;Date not available&rdquo; if we do not know it) and a link to the original.</li>
          <li>Nothing is fetched while you browse and no news service or key is used. The list is updated by editing one file, and the review date is shown on every feed.</li>
          <li>Because the list is small, some sectors have few or no items. We do not fill gaps with made-up stories.</li>
          <li>Articles without a known date appear only under &ldquo;All&rdquo;, never in the Weekly/Monthly/Quarterly/Yearly tabs.</li>
        </ul>
        <h2 style={{ marginTop: 32 }}>Startup stories</h2>
        <p>Every line is traceable to a linked source with a retrieval date. A story is marked verified only after the author has checked each line.</p>
        <h2 style={{ marginTop: 32 }}>Privacy</h2>
        <p>This website has no database and stores nothing you type. The forms only check your entries in your browser.</p>
      </div>
    </>
  );
}
