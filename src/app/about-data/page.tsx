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
        <h2 style={{ marginTop: 32 }}>News headlines</h2>
        <ul>
          <li>Fetched on the server from a news API (GNews) using a secret key that never reaches your browser.</li>
          <li>Cached for several hours to respect usage limits. The last successful update time is shown on every feed.</li>
          <li>The provider can delay articles (the free plan by roughly 12 hours), so this is <b>not</b> a real-time feed.</li>
          <li>Stories are filtered by sector keywords and de-duplicated. Each headline links to the publisher&apos;s original article.</li>
          <li>Where configured, official Press Information Bureau releases are mixed in and tagged &ldquo;Govt release&rdquo;.</li>
          <li>Once a day, a polite crawler (which obeys robots.txt) collects the title, a short excerpt, the date and the link of Invest India blog/news pages. They are shown credited to Invest India and always link back to the original; full text is never copied.</li>
        </ul>
        <h2 style={{ marginTop: 32 }}>Startup stories</h2>
        <p>Every line is traceable to a linked source with a retrieval date. A story is marked verified only after the author has checked each line.</p>
        <h2 style={{ marginTop: 32 }}>Privacy</h2>
        <p>Form entries are stored in a private database, used only to respond to you, and are not shown publicly.</p>
      </div>
    </>
  );
}
