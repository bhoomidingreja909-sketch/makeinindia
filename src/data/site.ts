import type { Evidence, Source } from './content';

export const SITE = {
  name: 'Make in India (academic redesign)',
  banner: 'Academic redesign project. Not an official Government of India website.',
  owner: 'Bhoomi, TY BBA — Digital Marketing & AI project',
};

// ---------------------------------------------------------------- Key statistics (every number has a source + year)
export interface Stat { id: string; value: number; prefix?: string; suffix?: string; decimals?: number; label: string; note: string; year: string; evidence: Evidence; source: Source }
export const STATS: Stat[] = [
  { id: 'launch', value: 2014, label: 'Launch year', note: 'Launched 25 September 2014', year: '2014', evidence: 'secondary',
    source: { name: 'Vikaspedia — Make in India', url: 'https://vikaspedia.in/social-welfare/skill-development/make-in-india' } },
  { id: 'sectors', value: 27, label: 'Sectors (Make in India 2.0)', note: '15 manufacturing (DPIIT) + 12 services (Dept. of Commerce)', year: '2022', evidence: 'verified',
    source: { name: 'Rajya Sabha answer, 16 Dec 2022', url: 'https://rsdebate.nic.in/bitstream/123456789/734518/1/PQ_258_16122022_U1181_p324_p325.pdf' } },
  { id: 'pli-sectors', value: 14, label: 'PLI scheme sectors', note: 'Production Linked Incentive schemes', year: '2023', evidence: 'verified',
    source: { name: 'PIB — PLI schemes for 14 key sectors', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155' } },
  { id: 'pli-outlay', value: 1.97, prefix: '₹', suffix: ' lakh crore', decimals: 2, label: 'PLI outlay', note: 'Total outlay across the 14 sectors', year: '2023', evidence: 'verified',
    source: { name: 'PIB — PLI schemes for 14 key sectors', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155' } },
  { id: 'fdi', value: 81.04, prefix: 'US$ ', suffix: ' bn', decimals: 2, label: 'Total FDI inflow', note: 'FY 2024-25, incl. equity, reinvested earnings and other capital (equity alone ≈ US$ 50 bn)', year: 'FY 2024-25', evidence: 'secondary',
    source: { name: 'Business Standard — FDI inflows', url: 'https://www.business-standard.com/topic/fdi-inflows' } },
];

export const PILLARS: { id: string; title: string; text: string; glyph: string }[] = [
  { id: 'processes', title: 'New Processes', glyph: '🧩', text: 'Treat ease of doing business as the single most important factor in promoting entrepreneurship.' },
  { id: 'infrastructure', title: 'New Infrastructure', glyph: '🛣️', text: 'Industrial corridors and smart cities, with modern communication and integrated logistics.' },
  { id: 'sectors', title: 'New Sectors', glyph: '🌱', text: 'FDI opened up in sectors such as defence production, insurance, medical devices, construction and railway infrastructure.' },
  { id: 'mindset', title: 'New Mindset', glyph: '🤝', text: 'Government as a facilitator and partner to industry rather than a regulator.' },
];
export const PILLARS_SOURCE: Source = { name: 'Vikaspedia — Make in India', url: 'https://vikaspedia.in/social-welfare/skill-development/make-in-india' };

export const ORIGINAL_GOALS = ['Manufacturing at 25% of GDP', '100 million additional manufacturing jobs'];

export const TIMELINE: { year: string; title: string; text: string; evidence: Evidence }[] = [
  { year: '2014', title: 'Launch', text: 'Launched on 25 September 2014 by PM Narendra Modi to make India a global hub for manufacturing, design and innovation.', evidence: 'secondary' },
  { year: '2016', title: 'Make in India Week', text: 'A large flagship event; presentations from it were hosted on the original site.', evidence: 'draft' },
  { year: 'Reform era', title: 'Ease of Doing Business reforms', text: 'Digital licensing and single-window systems to cut compliance friction.', evidence: 'draft' },
  { year: 'Atmanirbhar', title: 'Atmanirbhar Bharat & Vocal for Local', text: 'Self-reliance and local-product campaigns sit alongside Make in India.', evidence: 'draft' },
  { year: '2020', title: 'PLI schemes begin', text: 'Production Linked Incentive schemes start in 2020 and now cover 14 sectors with a ₹1.97 lakh crore outlay.', evidence: 'verified' },
  { year: 'Today', title: 'Make in India 2.0', text: 'Focus on 27 sectors: 15 manufacturing sectors coordinated by DPIIT and 12 service sectors by the Department of Commerce.', evidence: 'verified' },
];

// ---------------------------------------------------------------- Schemes & incentives
export interface Pli { name: string; sectors: string[]; evidence: Evidence }
export const PLI: Pli[] = [
  { name: 'Mobile manufacturing & specified electronic components', sectors: ['esdm'], evidence: 'verified' },
  { name: 'Pharmaceuticals', sectors: ['pharma-medical-devices'], evidence: 'verified' },
  { name: 'Medical devices', sectors: ['pharma-medical-devices'], evidence: 'verified' },
  { name: 'Automobiles & auto components', sectors: ['automotive'], evidence: 'verified' },
  { name: 'Advanced Chemistry Cell (ACC) batteries', sectors: ['automotive', 'renewable-energy'], evidence: 'verified' },
  { name: 'Drones & drone components', sectors: ['aerospace-defence'], evidence: 'verified' },
  { name: 'High-efficiency solar PV modules', sectors: ['renewable-energy'], evidence: 'verified' },
  { name: 'Telecom & networking products', sectors: ['esdm', 'communication-services'], evidence: 'verified' },
  { name: 'White goods (air conditioners & LEDs)', sectors: ['esdm'], evidence: 'verified' },
  { name: 'Textiles (man-made fibre & technical textiles)', sectors: ['textile-apparel'], evidence: 'verified' },
  { name: 'Food products', sectors: ['food-processing'], evidence: 'verified' },
  { name: 'Specialty steel', sectors: [], evidence: 'verified' },
  { name: 'IT hardware', sectors: ['esdm', 'it-ites'], evidence: 'draft' },
  { name: 'Key starting materials, drug intermediates & APIs', sectors: ['pharma-medical-devices', 'chemicals-petrochemicals'], evidence: 'draft' },
];
export const PLI_SOURCE: Source = { name: 'PIB — PLI schemes for 14 key sectors', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155' };

export interface Initiative { name: string; text: string; evidence: Evidence }
export const INITIATIVES: Initiative[] = [
  { name: 'Phased Manufacturing Programme', text: 'Raises domestic value addition step by step in a product category.', evidence: 'draft' },
  { name: 'Quality Control Orders (QCOs)', text: 'Mandatory quality standards for products sold in India.', evidence: 'draft' },
  { name: 'Public procurement preference', text: 'Preference for domestically manufactured goods in government buying.', evidence: 'draft' },
  { name: 'National Infrastructure Pipeline', text: 'A pipeline of infrastructure projects across sectors.', evidence: 'draft' },
  { name: 'National Monetisation Pipeline', text: 'Monetises existing public assets to fund new infrastructure.', evidence: 'draft' },
  { name: 'India Industrial Land Bank', text: 'A database of industrial land and parks across states.', evidence: 'draft' },
  { name: 'Startup India', text: 'Recognition, funding support and mentorship for startups.', evidence: 'draft' },
  { name: 'One District One Product (ODOP)', text: 'Promotes a signature product for each district.', evidence: 'draft' },
];

export function findIncentives(sectorSlug: string, state?: string) {
  const pli = PLI.filter((p) => p.sectors.includes(sectorSlug));
  return {
    pli,
    general: INITIATIVES,
    stateNote: state ? `Check ${state}'s industrial policy and its industries department for state-level incentives.` : 'Pick a state to see where to look for state-level incentives.',
  };
}

// ---------------------------------------------------------------- States & UTs
export const STATES = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
export const UTS = ['Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu', 'Delhi (NCT)', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'];

/** Only facts we have a press source for. Everything else shows "profile to be added". */
export const STATE_FACTS: Record<string, { text: string; source: Source }[]> = {
  Maharashtra: [
    { text: 'Attracted about US$ 19.6 bn of FDI in FY 2024-25 (31% of the national total, as reported).', source: { name: 'Business Standard', url: 'https://www.business-standard.com/markets/news/maharashtra-karnataka-account-for-51-of-fdi-in-india-in-fy25-govt-125060800267_1.html' } },
    { text: 'Over 38,660 DPIIT-recognised startups as of 31 March 2026 — the most of any state (as reported).', source: { name: 'Inc42', url: 'https://inc42.com/buzz/centre-recognises-record-55200-startups-in-fy26/' } },
  ],
  Karnataka: [
    { text: 'Maharashtra and Karnataka together accounted for about 51% of FDI in FY 2024-25 (as reported).', source: { name: 'Business Standard', url: 'https://www.business-standard.com/markets/news/maharashtra-karnataka-account-for-51-of-fdi-in-india-in-fy25-govt-125060800267_1.html' } },
    { text: 'About 22,600 DPIIT-recognised startups as of 31 March 2026 (as reported).', source: { name: 'Inc42', url: 'https://inc42.com/buzz/centre-recognises-record-55200-startups-in-fy26/' } },
  ],
  Gujarat: [
    { text: 'Received about US$ 57.65 bn of FDI equity inflow over the last ten years, per a government reply reported in January 2025.', source: { name: 'Business Standard', url: 'https://www.business-standard.com/india-news/gujarat-received-fdi-equity-inflow-of-57-65-billion-in-last-10-years-govt-125012301464_1.html' } },
  ],
  'Uttar Pradesh': [
    { text: 'About 21,960 DPIIT-recognised startups as of 31 March 2026 (as reported).', source: { name: 'Inc42', url: 'https://inc42.com/buzz/centre-recognises-record-55200-startups-in-fy26/' } },
  ],
};

// ---------------------------------------------------------------- Resources
export interface Resource { title: string; type: 'Web page' | 'Portal'; url: string; group: 'Policy' | 'Data & press' | 'Startup' }
export const RESOURCES: Resource[] = [
  { title: 'Make in India — Foreign Direct Investment', type: 'Web page', url: 'https://www.makeinindia.com/policy/foreign-direct-investment', group: 'Policy' },
  { title: 'Make in India — Intellectual Property Facts', type: 'Web page', url: 'https://www.makeinindia.com/policy/intellectual-property-facts', group: 'Policy' },
  { title: 'Make in India — Sectors', type: 'Web page', url: 'https://www.makeinindia.com/sectors', group: 'Policy' },
  { title: 'PIB — PLI schemes for 14 key sectors', type: 'Web page', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155', group: 'Data & press' },
  { title: 'Rajya Sabha answer — Make in India 2.0 sectors (Dec 2022)', type: 'Web page', url: 'https://rsdebate.nic.in/bitstream/123456789/734518/1/PQ_258_16122022_U1181_p324_p325.pdf', group: 'Data & press' },
  { title: 'Press Information Bureau', type: 'Portal', url: 'https://www.pib.gov.in', group: 'Data & press' },
  { title: 'Open Government Data Platform (data.gov.in)', type: 'Portal', url: 'https://www.data.gov.in', group: 'Data & press' },
  { title: 'Startup India', type: 'Portal', url: 'https://www.startupindia.gov.in', group: 'Startup' },
  { title: 'Ministry of Corporate Affairs', type: 'Portal', url: 'https://www.mca.gov.in', group: 'Startup' },
];

export const PALETTE = [
  { name: 'Signal Red', hex: '#BA1200', use: 'Buttons, links, key accents (white text on top)' },
  { name: 'Deep Navy', hex: '#031927', use: 'Header, hero, body text' },
  { name: 'Sky', hex: '#9DD1F1', use: 'Highlights, marquee, links on dark' },
  { name: 'Steel', hex: '#508AA8', use: 'Borders and large decoration only (3.7:1 on white)' },
  { name: 'Mist', hex: '#C8E0F4', use: 'Section backgrounds' },
];

// ---------------------------------------------------------------- Legal / compliance pages
export interface LegalPage { slug: string; title: string; body: string[] }
export const LEGAL: LegalPage[] = [
  { slug: 'terms', title: 'Terms & Conditions', body: [
    'This website is an academic project created for a Digital Marketing & AI course. It is not an official Government of India website and is not affiliated with DPIIT, Invest India or the Make in India programme.',
    'Content is provided for study and demonstration. You use it at your own risk and should confirm anything important with the cited official source.',
    'Do not submit confidential, financial or sensitive personal information through the forms on this site.' ] },
  { slug: 'privacy', title: 'Privacy Policy', body: [
    'What we collect: only what you type into the Contact, Feedback or Startup forms (name, email, optional phone/organisation, message) and your consent.',
    'How it is stored: in a private database accessible only to the project team via server-side code. It is not shown publicly and not sold or shared.',
    'Browser storage: your language, theme and text-size choices are saved in your browser (localStorage). No tracking cookies are set by this site.',
    'Retention: submissions are kept only for the duration of the course assessment and then deleted. To request earlier deletion, use the Contact page.',
    'This site does not currently use analytics. If that changes, this page will be updated first.' ] },
  { slug: 'copyright', title: 'Copyright Policy', body: [
    'Original text, layout and code on this site are the author’s academic work. Facts and figures belong to their cited sources.',
    'Headlines and links are provided by a news API and belong to their publishers; we show headlines and short descriptions only and always link to the original article.',
    'We do not use the National Emblem or any government logo.' ] },
  { slug: 'hyperlinking', title: 'Hyperlinking Policy', body: [
    'External links open in a new tab and are marked with ↗. We are not responsible for the content or availability of linked sites.',
    'The presence of a link is not an endorsement. Links to government portals are provided so you can verify information at the source.',
    'Form submissions and articles stay on this site and do not redirect you elsewhere.' ] },
  { slug: 'content-moderation', title: 'Content Contribution, Moderation & Approval Policy', body: [
    'Anything you submit is private and is never published automatically.',
    'A startup story is published only after the author checks every line against at least one primary source (government or company) or two independent reputable sources, and records the retrieval date.',
    'AI-assisted text is labelled “Draft — verify” until a human has verified it.' ] },
  { slug: 'content-archival', title: 'Content Archival Policy', body: [
    'News headlines are cached for several hours and replaced by newer results; this site does not keep a permanent news archive.',
    'Startup stories and articles keep their retrieval dates. Outdated items are marked or removed rather than silently edited.' ] },
  { slug: 'accessibility', title: 'Accessibility Statement', body: [
    'We aim for conformance with WCAG 2.1 level AA and follow the spirit of the Guidelines for Indian Government Websites (GIGW 3.0), although this academic site is not GIGW-certified.',
    'Features: skip-to-content link, keyboard-operable menus and panels, visible focus, adjustable text size, dark and high-contrast themes, reduced-motion support, and responsive layouts.',
    'Known limitations: sector icons are emoji; Hindi is available for navigation and key labels only; page content is English. Automated and screen-reader testing results will be added here once done.',
    'Report a barrier through the Feedback page.' ] },
  { slug: 'screen-reader', title: 'Screen Reader Access', body: [
    'The site uses semantic headings, landmarks, labelled forms and live regions for loading and error messages so it can be used with screen readers such as NVDA, JAWS and VoiceOver.',
    'Testing status: not yet formally tested with these tools. Please report issues through the Feedback page.' ] },
  { slug: 'disclaimer', title: 'Disclaimer', body: [
    'This is an academic redesign project. It is not an official Government of India website, and nothing here is legal, financial or investment advice.',
    'Facts are labelled by evidence level. Items marked “Draft — verify” have not been verified and must not be relied upon.',
    'The Contact form is a demonstration. Queries go to the project author, not to DPIIT, Invest India or any ministry.' ] },
  { slug: 'help', title: 'Help', body: [
    'Browse sectors from the Sectors page and open a tile to see its latest headlines. Use the Weekly/Monthly/Quarterly/Yearly tabs to change the period.',
    'Use the toolbar at the top to switch language, theme (light, dark, high contrast) and text size, or to search the site.',
    'Policies has two boxes — IPR and FDI. Open one and use “Expand All” to read every section.',
    'The Incentive finder on the Schemes page lists matching schemes for a sector and state.',
    'Stuck? Ask the FAQ assistant, or use the Contact page.' ] },
  { slug: 'website-information', title: 'Website Information', body: [
    'Owner: Bhoomi, TY BBA student (academic project for Digital Marketing & AI).',
    'Built with Next.js and Supabase and hosted on a commercial platform (Vercel or Netlify) — not on NIC infrastructure.',
    'Content sources: official government pages (PIB, DPIIT, Parliament answers, Make in India), and press reports where labelled.',
    'Last updated date is shown in the footer (set when the site is built).' ] },
];

// ---------------------------------------------------------------- Hindi / English UI strings
export const HI: Record<string, string> = {
  'nav.about': 'परिचय', 'nav.sectors': 'क्षेत्र', 'nav.schemes': 'योजनाएँ', 'nav.invest': 'निवेशक डेस्क', 'nav.policies': 'नीतियाँ',
  'nav.stories': 'स्टार्टअप कहानियाँ', 'nav.news': 'समाचार', 'nav.resources': 'संसाधन', 'nav.contact': 'संपर्क',
  'banner': 'शैक्षणिक पुनर्रचना परियोजना। यह भारत सरकार की आधिकारिक वेबसाइट नहीं है।',
  'skip': 'मुख्य सामग्री पर जाएँ', 'search': 'खोजें', 'search.ph': 'साइट में खोजें…', 'menu': 'मेनू', 'close': 'बंद करें',
  'theme.light': 'सामान्य', 'theme.dark': 'डार्क', 'theme.contrast': 'उच्च कंट्रास्ट',
  'hero.h1a': 'भारत में निर्मित।', 'hero.h1b': 'एक ही स्थान पर', 'hero.h1c': 'समझिए।',
  'hero.lede': '27 क्षेत्र, निवेश के नियम, और उन्हें बनाने वाले स्टार्टअप — ताज़ा सुर्खियों और हर तथ्य के स्रोत के साथ।',
  'cta.sectors': 'क्षेत्र देखें', 'cta.invest': 'भारत में निवेश करें', 'cta.stories': 'स्टार्टअप कहानियाँ पढ़ें', 'cta.contact': 'निवेशक डेस्क से संपर्क करें',
  'lang.note': 'नोट: हिंदी अभी केवल नेविगेशन और मुख्य लेबल के लिए उपलब्ध है; पृष्ठ की सामग्री अंग्रेज़ी में है।',
  'footer.explore': 'देखें', 'footer.legal': 'नीतियाँ और सहायता', 'footer.updated': 'अंतिम अद्यतन',
};
