import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="wrap block"><h1>Page not found</h1><p className="lede">That page does not exist (the old Opportunities page was retired).</p><Link className="btn" href="/">Back home</Link></div>
  );
}
