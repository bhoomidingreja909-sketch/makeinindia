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
          <li>Once a day, a polite crawler collects the title, a short excerpt, the date and the link of Invest India blog and news pages. It obeys the site&apos;s robots.txt, identifies itself, waits between requests and limits how many pages it fetches.</li>
          <li>Only the headline and a short excerpt are stored; full text is never copied. Every item is credited to its source and links to the original.</li>
          <li>Articles are filtered by sector keywords and de-duplicated. Because collection happens once a day, this is <b>not</b> a real-time feed; the last successful update time is shown on every view.</li>
          <li>Invest India publishes blogs and features rather than breaking news, so some sectors may show few or no articles. We do not fill gaps with made-up items.</li>
          <li>Where configured, official Press Information Bureau releases can also be mixed in and tagged &ldquo;Govt release&rdquo;.</li>
        </ul>
        <h2 style={{ marginTop: 32 }}>Startup stories</h2>
        <p>Every line is traceable to a linked source with a retrieval date. A story is marked verified only after the author has checked each line.</p>
        <h2 style={{ marginTop: 32 }}>Privacy</h2>
        <p>Form entries are stored in a private database, used only to respond to you, and are not shown publicly.</p>
      </div>
    </>
  );
}
