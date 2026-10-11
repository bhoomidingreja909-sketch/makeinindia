import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'Make in India — Sectors, Policy & Startup Stories', template: '%s · Make in India (redesign)' },
  description: 'A redesigned Make in India portal: sector-wise headlines, IPR and FDI policy explained, and startup success stories with cited sources.',
  openGraph: { type: 'website', title: 'Make in India — redesigned', description: 'Sector news, policies and startup stories in one place.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
