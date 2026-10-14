/** Public site address used for absolute URLs (sitemap, social-share image). Resolved at build time. */
export function siteUrl(): string {
  const e = process.env;
  const url =
    e.NEXT_PUBLIC_SITE_URL ||
    e.URL || // Netlify
    (e.VERCEL_PROJECT_PRODUCTION_URL ? `https://${e.VERCEL_PROJECT_PRODUCTION_URL}` : '') || // Vercel
    'http://localhost:3000';
  return url.replace(/\/+$/, '');
}
