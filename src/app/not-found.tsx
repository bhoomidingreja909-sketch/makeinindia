import Link from 'next/link';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="wrap block" style={{ textAlign: 'center', padding: '72px 0' }}>
      <Logo height={90} />
      <h1 style={{ marginTop: 24 }}>Page not found</h1>
      <p className="lede" style={{ margin: '0 auto 24px' }}>This page does not exist. The former Opportunities page has been retired.</p>
      <Link className="btn" href="/">Back to home</Link>
    </div>
  );
}
