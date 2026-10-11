import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Providers from '@/components/Providers';

const site = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: 'Make in India — Sectors, Policy & Startup Stories', template: '%s · Make in India (redesign)' },
  description: 'An academic redesign of Make in India: sector-wise headlines, schemes, IPR and FDI policy explained, and startup stories with cited sources.',
  openGraph: { type: 'website', title: 'Make in India — redesigned', description: 'Sector news, schemes, policies and startup stories in one place.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>
        <Providers>
          <a className="skip" href="#main">Skip to main content</a>
          <Header />
          <Breadcrumbs />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
