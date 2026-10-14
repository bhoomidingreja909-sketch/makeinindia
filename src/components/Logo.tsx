/** Make in India logo. Two files so it stays legible on light and dark surfaces. Alt text is on the dark one only. */
export default function Logo({ height = 48, on = 'auto', className = '' }: { height?: number; on?: 'auto' | 'dark'; className?: string }) {
  const w = Math.round(height * (1070 / 523));
  return (
    <span className={`logo ${className}`} style={{ height }}>
      {on === 'auto' && <img className="logo-ink" src="/brand/make-in-india-logo.png" alt="Make in India" width={w} height={height} />}
      <img className={on === 'auto' ? 'logo-paper' : ''} src="/brand/make-in-india-logo-white.png" alt={on === 'auto' ? '' : 'Make in India'} width={w} height={height} />
    </span>
  );
}
