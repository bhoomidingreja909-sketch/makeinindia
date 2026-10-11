import { SECTORS } from '@/data/sectors';
import { ARTICLES, FAQS, STORIES } from '@/data/content';
import { LEGAL } from '@/data/site';
import { score } from './text';

export interface Hit { title: string; href: string; kind: string; snippet: string }

const PAGES: Hit[] = [
  { title: 'About Make in India', href: '/about', kind: 'Page', snippet: 'Four pillars, timeline, original goals and Make in India 2.0.' },
  { title: 'Sectors', href: '/sectors', kind: 'Page', snippet: '15 manufacturing and 12 service sectors with latest headlines.' },
  { title: 'Schemes & Incentives', href: '/schemes', kind: 'Page', snippet: 'PLI schemes, other initiatives and the incentive finder.' },
  { title: 'Investor Desk', href: '/investor-desk', kind: 'Page', snippet: 'Set up a company, understand the rules, contact the desk.' },
  { title: 'States & Union Territories', href: '/states', kind: 'Page', snippet: 'Explore 28 states and 8 UTs.' },
  { title: 'Policies', href: '/policies', kind: 'Page', snippet: 'IPR and FDI policy explained section by section.' },
  { title: 'Intellectual Property Rights (IPR)', href: '/policies/ipr', kind: 'Policy', snippet: 'Objectives, types of IPR, agreements, administration.' },
  { title: 'Foreign Direct Investment (FDI)', href: '/policies/fdi', kind: 'Policy', snippet: 'Entry routes, prohibited sectors, repatriation.' },
  { title: 'Startup Stories', href: '/startups', kind: 'Page', snippet: 'Startups building in India with sources.' },
  { title: 'News dashboard', href: '/news', kind: 'Page', snippet: 'Latest sector-wise headlines.' },
  { title: 'Resources', href: '/resources', kind: 'Page', snippet: 'Policy documents, data portals, brand kit.' },
  { title: 'FAQ & assistant', href: '/faq', kind: 'Page', snippet: 'Answers to common questions.' },
  { title: 'Contact the Investor Desk', href: '/contact', kind: 'Page', snippet: 'Send a query.' },
  { title: 'Feedback', href: '/feedback', kind: 'Page', snippet: 'Tell us what to improve or report an accessibility barrier.' },
];

export function buildIndex(): Hit[] {
  return [
    ...PAGES,
    ...SECTORS.map((s) => ({ title: s.name, href: `/sectors/${s.slug}`, kind: 'Sector', snippet: s.keywords.join(', ') })),
    ...FAQS.map((f) => ({ title: f.q, href: '/faq', kind: 'FAQ', snippet: f.a })),
    ...STORIES.map((s) => ({ title: s.name, href: `/startups#${s.slug}`, kind: 'Startup story', snippet: s.headline })),
    ...ARTICLES.map((a) => ({ title: a.title, href: `/articles/${a.slug}`, kind: 'Article', snippet: a.dek })),
    ...LEGAL.map((l) => ({ title: l.title, href: `/legal/${l.slug}`, kind: 'Policy page', snippet: l.body[0] })),
  ];
}

export function searchSite(query: string, limit = 20): Hit[] {
  return buildIndex()
    .map((h) => ({ h, s: score(query, h.title, h.snippet) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.h);
}
