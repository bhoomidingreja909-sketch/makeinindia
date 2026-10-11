import type { MetadataRoute } from 'next';
import { SECTORS } from '@/data/sectors';
import { ARTICLES } from '@/data/content';
import { LEGAL } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const paths = ['', '/about', '/schemes', '/states', '/resources', '/feedback', '/site-map', '/sectors', '/news', '/investor-desk', '/policies', '/policies/ipr', '/policies/fdi', '/startups', '/articles', '/faq', '/contact', '/about-data',
    ...SECTORS.map((s) => `/sectors/${s.slug}`), ...ARTICLES.map((a) => `/articles/${a.slug}`), ...LEGAL.map((l) => `/legal/${l.slug}`)];
  return paths.map((p) => ({ url: base + p }));
}
