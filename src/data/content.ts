/** Evidence labels shown in the UI (see PRD §0). */
export type Evidence = 'verified' | 'secondary' | 'draft';

export const EVIDENCE_TEXT: Record<Evidence, { label: string; hint: string }> = {
  verified: { label: 'Official source', hint: 'Seen on an official government page.' },
  secondary: { label: 'Press-reported', hint: 'Reported by media citing official data; confirm before relying on it.' },
  draft: { label: 'Draft — verify', hint: 'AI-assisted summary awaiting author verification against the cited source.' },
};

export interface Source { name: string; url: string; date?: string }

// ---------------------------------------------------------------- Startup stories
export interface Story {
  slug: string;
  state: string;
  name: string;
  sector: string; // sector slug
  headline: string;
  summary: string[]; // each line is a fact traceable to `sources`
  sources: Source[];
  /** Flip to true ONLY after the author has checked every line against its sources. */
  verified: boolean;
  retrieved: string;
}

export const STORIES: Story[] = [
  {
    slug: 'agnikul-cosmos', state: 'Tamil Nadu', name: 'Agnikul Cosmos', sector: 'aerospace-defence',
    headline: 'A rocket engine printed as a single piece',
    summary: [
      'Chennai-based startup founded in 2017, associated with IIT Madras.',
      'On 30 May 2024 it launched its Agnibaan sub-orbital demonstrator from Sriharikota.',
      'The rocket used what the company describes as the world\'s first single-piece 3D-printed semi-cryogenic engine, "Agnilet".',
      'It launched from "Dhanush", described as India\'s first private launch pad, set up by Agnikul at Sriharikota.',
    ],
    sources: [
      { name: 'YourStory', url: 'https://yourstory.com/2024/05/agnikul-cosmos-worlds-first-3d-printed-rocket-engine-isro', date: 'May 2024' },
      { name: 'The Tribune', url: 'https://www.tribuneindia.com/news/india/startup-launches-worlds-1st-rocket-with-3d-printed-engine-626398' },
    ],
    verified: false, retrieved: '2026-10-11',
  },
  {
    slug: 'skyroot-aerospace', state: 'Telangana', name: 'Skyroot Aerospace', sector: 'aerospace-defence',
    headline: 'India\'s first private rocket to reach space',
    summary: [
      'Hyderabad-based startup founded in 2018 by former ISRO engineers.',
      'Its Vikram-S sub-orbital rocket (mission "Prarambh") launched from Sriharikota in November 2022 and carried three customer payloads.',
      'Reported altitude: about 89.5 km.',
      'DealStreetAsia reports it became India\'s first space-technology unicorn after a ~$60 million round co-led by Sherpalo Ventures and GIC.',
    ],
    sources: [
      { name: 'TechCrunch', url: 'https://techcrunch.com/2022/11/08/skyroot-kickstart-india-launch', date: 'Nov 2022' },
      { name: 'DealStreetAsia', url: 'https://dealstreetasia.com/stories/skyroot-fundraise-481532' },
    ],
    verified: false, retrieved: '2026-10-11',
  },
  {
    slug: 'ideaforge', state: 'Maharashtra', name: 'ideaForge Technology', sector: 'aerospace-defence',
    headline: 'From an IIT Bombay campus idea to India\'s listed drone maker',
    summary: [
      'Mumbai-based drone maker founded by IIT Bombay students; Business Today links its origin to the 26/11 attacks.',
      'DRHP coverage described it as the market leader in India\'s unmanned aircraft systems, with roughly 50% market share in fiscal 2022.',
      'Licensed by the Ministry of Defence to manufacture UAVs; about 75-80% of revenue came from defence (per its CFO).',
      'One of 23 startups selected for the central government\'s Production Linked Incentive scheme for drones.',
    ],
    sources: [
      { name: 'Business Today', url: 'https://www.businesstoday.in/amp/markets/ipo-corner/story/ideaforge-ipo-how-2611-terror-attack-motivated-iit-bombay-students-to-found-indias-largest-drone-company-386686-2023-06-22', date: '22 Jun 2023' },
      { name: 'The Machine Maker', url: 'https://themachinemaker.com/news/indias-leading-drone-maker-ideaforge-files-for-ipo-poised-for-historic-listing-on-domestic-stock-exchanges/' },
    ],
    verified: false, retrieved: '2026-10-11',
  },
  {
    slug: 'zetwerk', state: 'Karnataka', name: 'Zetwerk', sector: 'capital-goods',
    headline: 'A marketplace that connects buyers with Indian manufacturers',
    summary: [
      'Bengaluru-based manufacturing-services platform founded in 2018.',
      'Connects manufacturing companies with vendors and suppliers for industrial machine components and consumer products.',
      'Entered the unicorn club with a Series E led by D1 Capital (reported at $120-150 million; figures differ by outlet).',
      'Inc42 reports it acquired three firms, including Pinaka Aerospace and SharpTanks, in a ₹100 crore deal.',
    ],
    sources: [
      { name: 'Inc42', url: 'https://inc42.com/buzz/zetwerk-acquires-three-firms-in-an-inr-100-cr-deal' },
      { name: 'DealStreetAsia', url: 'https://dealstreetasia.com/stories/zetwerk-d1-capital-256839' },
    ],
    verified: false, retrieved: '2026-10-11',
  },
  {
    slug: 'ather-energy', state: 'Tamil Nadu', name: 'Ather Energy', sector: 'automotive',
    headline: 'Electric scooters, built in Hosur, listed on the exchanges',
    summary: [
      'Operates a plant in Hosur, Tamil Nadu (installed capacity of 4,20,000 vehicles and 3,79,800 battery packs as of March 2024).',
      'IPO price band ₹304-321; bidding 28-30 April 2025; listing on 6 May 2025 (per IPO trackers).',
      'Business Standard and Gulf News report different issue sizes (₹2,626 crore vs ~₹2,980 crore) — check the prospectus.',
      'IPO proceeds were earmarked mainly for a new factory in Maharashtra.',
    ],
    sources: [
      { name: 'Business Standard', url: 'https://www.business-standard.com/amp/markets/ipo/ather-energy-sets-ipo-price-band-in-range-of-304-to-321-per-share-125042300128_1.html', date: '23 Apr 2025' },
      { name: 'Gulf News', url: 'https://gulfnews.com/business/markets/e-scooter-maker-ather-s-debut-in-focus-amid-india-ipo-revival-1.500117176' },
    ],
    verified: false, retrieved: '2026-10-11',
  },
];

// ---------------------------------------------------------------- Policies
export interface Section { id: string; title: string; evidence: Evidence; body: string[]; list?: string[] }
export interface PolicyDoc { slug: 'ipr' | 'fdi'; title: string; tagline: string; sections: Section[]; sources: Source[]; downloads: Source[] }

export const IPR: PolicyDoc = {
  slug: 'ipr', title: 'Intellectual Property Rights', tagline: 'How India protects ideas, brands and inventions.',
  sources: [{ name: 'Make in India — Intellectual Property Facts', url: 'https://www.makeinindia.com/policy/intellectual-property-facts' }],
  downloads: [{ name: 'DPIIT — IPR policy & CIPAM', url: 'https://dpiit.gov.in' }],
  sections: [
    { id: 'summary', title: 'Summary', evidence: 'verified', body: [
      'India\'s National IPR Policy was adopted on 12 May 2016. The framework is described as stable and well established from a legal, judicial and administrative point of view, and compliant with the TRIPS Agreement.',
      'The Cell for IPR Promotion and Management (CIPAM) under DPIIT acts as the single reference point for implementing the policy.'] },
    { id: 'objectives', title: 'Objectives', evidence: 'verified', body: ['The policy sets seven objectives:'],
      list: ['IPR awareness: outreach and promotion', 'Generation of IPRs', 'Legal and legislative framework', 'Administration and management', 'Commercialisation of IPRs', 'Enforcement and adjudication', 'Human capital development'] },
    { id: 'strengths', title: 'Strengths of the Indian IPR regime', evidence: 'verified', body: [
      'Per Make in India: a stable legal, judicial and administrative framework, and full compliance with the TRIPS Agreement.',
      'AUTHOR TO ADD: further strengths from the live page once reviewed in a browser (e.g. skilled workforce, enforcement mechanisms).'] },
    { id: 'types', title: 'Types of IPR in India', evidence: 'verified', body: ['Make in India lists the following protected categories:'],
      list: ['Patents', 'Designs', 'Trademarks', 'Geographical Indications (GIs)', 'Plant varieties', 'Copyright and semiconductor integrated-circuit layout designs (not in the snippet reviewed — verify)'] },
    { id: 'international', title: 'International Agreements', evidence: 'draft', body: [
      'India is generally cited as a party to TRIPS (WTO), the Paris Convention, the Patent Cooperation Treaty (PCT), the Berne Convention, the Budapest Treaty and the Madrid Protocol. Verify each against WIPO\'s member database before publishing.'] },
    { id: 'administration', title: 'IP Administration in India', evidence: 'draft', body: [
      'IP offices fall under DPIIT, Ministry of Commerce & Industry, headed by the Controller General of Patents, Designs & Trade Marks (CGPDTM). CIPAM coordinates policy implementation (verified). Office locations and structure: verify on ipindia.gov.in.'] },
    { id: 'facilities', title: 'Facilities offered by the Patents Office', evidence: 'draft', body: [
      'Typical facilities include online filing, e-registers and status search, and fee concessions or expedited examination for eligible startups and small entities. Confirm the current fee rebates and eligibility on the Patent Office website — the Make in India page references a startup scheme that was valid only until March 2020.'] },
  ],
};

export const FDI: PolicyDoc = {
  slug: 'fdi', title: 'Foreign Direct Investment', tagline: 'Where, how and how much foreign capital can come in.',
  sources: [{ name: 'Make in India — Foreign Direct Investment', url: 'https://www.makeinindia.com/policy/foreign-direct-investment' }],
  downloads: [
    { name: 'Make in India — FDI policy page', url: 'https://www.makeinindia.com/policy/foreign-direct-investment' },
    { name: 'DPIIT — Consolidated FDI Policy (check the latest edition)', url: 'https://dpiit.gov.in' },
  ],
  sections: [
    { id: 'summary', title: 'Summary', evidence: 'verified', body: [
      'Non-residents may invest in India subject to the FDI policy, except in prohibited sectors. Sectors that are not listed with a specific cap are open up to 100% under the automatic route, subject to applicable laws.',
      'The Make in India page follows the Consolidated FDI Policy 2020 as amended — always check the latest consolidated edition.'] },
    { id: 'routes', title: 'FDI Entry Routes', evidence: 'verified', body: ['There are two routes:'],
      list: ['Automatic route — no prior government approval needed.', 'Government route — prior approval from the relevant ministry/department is required.', 'Investors from countries sharing a land border with India can invest only through the government route.'] },
    { id: 'permitted', title: 'FDI Permitted Under Sectors as per FDI Policy 2020', evidence: 'draft', body: [
      'Sector-wise caps and conditions (for example defence, insurance, banking, telecom and media) are set out in the FDI Policy 2020 and have been amended since. This table must be copied from the current consolidated policy — it is intentionally not paraphrased here to avoid showing outdated limits.'] },
    { id: 'prohibited', title: 'List of Prohibited Sectors', evidence: 'verified', body: ['Sectors named on the Make in India page as closed to private/foreign investment or foreign technology collaboration include:'],
      list: ['Atomic energy', 'Railway operations (with permitted exceptions in the policy)', 'Gambling and lottery activities (including foreign technology collaboration)', 'AUTHOR TO ADD: remaining items from the full list on the live page'] },
    { id: 'procedure', title: 'Procedures for Investment Under Government Route', evidence: 'draft', body: [
      'Applications are made online to the relevant administrative ministry through DPIIT\'s Foreign Investment Facilitation Portal, which routes proposals to the concerned ministry for approval. Confirm the current portal address and steps on dpiit.gov.in.'] },
    { id: 'repatriation', title: 'Repatriation', evidence: 'draft', body: [
      'Under FEMA rules and RBI regulations, foreign investors can generally repatriate sale proceeds and dividends after applicable taxes, subject to sector conditions. Verify the current RBI/FEMA provisions before publishing.'] },
    { id: 'stakeholders', title: 'Key Stakeholders', evidence: 'draft', body: ['Organisations typically involved in the FDI process:'],
      list: ['DPIIT, Ministry of Commerce & Industry — FDI policy', 'Reserve Bank of India — FEMA reporting and regulations', 'Administrative ministries — approvals in the government route', 'Invest India — investor facilitation'] },
  ],
};

// ---------------------------------------------------------------- FAQ (grouped)
export type FaqCategory = 'General' | 'Investors & FDI' | 'Sectors' | 'Schemes' | 'Startups' | 'Technical & Portal';
export const FAQ_CATEGORIES: FaqCategory[] = ['General', 'Investors & FDI', 'Sectors', 'Schemes', 'Startups', 'Technical & Portal'];
export interface Faq { q: string; a: string; cat: FaqCategory; evidence: Evidence; source: Source }
const SI: Source = { name: 'Startup India', url: 'https://www.startupindia.gov.in' };
const VK: Source = { name: 'Vikaspedia — Make in India', url: 'https://vikaspedia.in/social-welfare/skill-development/make-in-india' };
const RS: Source = { name: 'Rajya Sabha answer, Dec 2022', url: 'https://rsdebate.nic.in/bitstream/123456789/734518/1/PQ_258_16122022_U1181_p324_p325.pdf' };
const PIB_PLI: Source = { name: 'PIB — PLI schemes', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155' };
export const FAQS: Faq[] = [
  { cat: 'General', q: 'What is Make in India?', a: 'A national programme launched on 25 September 2014 by PM Narendra Modi to promote India as an investment destination and a global hub for manufacturing, design and innovation. It rests on four pillars: New Processes, New Infrastructure, New Sectors and New Mindset.', evidence: 'secondary', source: VK },
  { cat: 'General', q: 'What were the original goals?', a: 'The original targets were manufacturing at 25% of GDP and 100 million additional manufacturing jobs. These are shown as the programme\'s original goals.', evidence: 'secondary', source: VK },
  { cat: 'General', q: 'Who implements Make in India?', a: 'DPIIT (Ministry of Commerce & Industry) and Invest India. The Investor Facilitation Cell within Invest India helps investors through pre-investment, execution and after-care.', evidence: 'draft', source: { name: 'About our data', url: '/about-data' } },
  { cat: 'General', q: 'Who can participate?', a: 'Domestic and foreign companies, startups and MSMEs can take part, subject to sector rules. Investors should check the FDI route for their sector.', evidence: 'draft', source: { name: 'Make in India — FDI', url: 'https://www.makeinindia.com/policy/foreign-direct-investment' } },
  { cat: 'Investors & FDI', q: 'Can a foreign company or individual invest in India?', a: 'Yes, subject to the FDI policy: sectors without a specific cap are open up to 100% under the automatic route; some need government approval and some are prohibited.', evidence: 'verified', source: { name: 'Make in India — FDI', url: 'https://www.makeinindia.com/policy/foreign-direct-investment' } },
  { cat: 'Investors & FDI', q: 'What is the difference between the automatic and government routes?', a: 'Under the automatic route no prior government approval is needed. Under the government route you need prior approval from the relevant ministry. Investors from land-border countries can invest only through the government route.', evidence: 'verified', source: { name: 'Make in India — FDI', url: 'https://www.makeinindia.com/policy/foreign-direct-investment' } },
  { cat: 'Investors & FDI', q: 'How do I protect my idea or brand?', a: 'Register the relevant IP: patents, designs, trademarks or GIs. CIPAM under DPIIT is the single reference point for implementing the IPR Policy adopted on 12 May 2016.', evidence: 'verified', source: { name: 'Make in India — IPR', url: 'https://www.makeinindia.com/policy/intellectual-property-facts' } },
  { cat: 'Investors & FDI', q: 'How do I register a company in India?', a: 'Companies are incorporated with the Ministry of Corporate Affairs. The integrated SPICe+ form covers name reservation, incorporation, PAN and TAN. See the Investor Desk for the step list.', evidence: 'draft', source: { name: 'MCA', url: 'https://www.mca.gov.in' } },
  { cat: 'Sectors', q: 'Which sectors does Make in India 2.0 cover?', a: '27 sectors: 15 manufacturing sectors coordinated by DPIIT and 12 service sectors coordinated by the Department of Commerce. Browse them on the Sectors page.', evidence: 'verified', source: RS },
  { cat: 'Sectors', q: 'Where do I find news for a sector?', a: 'Open a sector tile (or the News page) and use the Weekly, Monthly, Quarterly or Yearly tabs.', evidence: 'verified', source: { name: 'Sectors', url: '/sectors' } },
  { cat: 'Schemes', q: 'What is the PLI scheme?', a: 'Production Linked Incentive schemes cover 14 key sectors with a total outlay of ₹1.97 lakh crore, to strengthen manufacturing capability and exports.', evidence: 'verified', source: PIB_PLI },
  { cat: 'Schemes', q: 'How do I find incentives for my sector?', a: 'Use the Incentive finder on the Schemes page: choose a sector and, optionally, a state. States run their own schemes, so also check your state\'s industries department.', evidence: 'draft', source: { name: 'Schemes', url: '/schemes' } },
  { cat: 'Startups', q: 'What is DPIIT recognition for startups?', a: 'DPIIT recognises eligible entities as startups so they can access Startup India benefits. Apply through the Startup India portal and check current eligibility limits there.', evidence: 'draft', source: SI },
  { cat: 'Startups', q: 'Are there tax benefits or funding for startups?', a: 'Recognised startups may be eligible for certain tax benefits and funding support (such as the Fund of Funds for Startups). Conditions change — read the current notification and consult a chartered accountant.', evidence: 'draft', source: SI },
  { cat: 'Technical & Portal', q: 'How current is the news on this site?', a: 'The news pages show a short, hand-picked list of real articles with their source and date (or “Date not available”). It is reviewed by hand and is not a live feed.', evidence: 'verified', source: { name: 'About our data', url: '/about-data' } },
  { cat: 'Technical & Portal', q: 'Is this the official Make in India website?', a: 'No. It is an academic redesign project and is not affiliated with DPIIT, Invest India or the Government of India. Queries go to the project author.', evidence: 'verified', source: { name: 'Disclaimer', url: '/legal/disclaimer' } },
  { cat: 'Technical & Portal', q: 'How do I change language, text size or contrast?', a: 'Use the toolbar at the top: EN/हिं for language (navigation and key labels), A− A A+ for text size, and the theme selector for light, dark or high contrast.', evidence: 'verified', source: { name: 'Help', url: '/legal/help' } },
  { cat: 'Technical & Portal', q: 'How do I contact the investor desk?', a: 'Use the Contact page. It stays on this site and does not send you to another website. It is a demonstration form: nothing is stored.', evidence: 'verified', source: { name: 'Contact', url: '/contact' } },
];

// ---------------------------------------------------------------- Articles (listicles moved on-site)
export interface Article { slug: string; title: string; dek: string; points: { h: string; p: string }[]; evidence: Evidence; source: Source }
export const ARTICLES: Article[] = [
  { slug: 'start-a-company-in-india', title: '6 steps to set up a company in India', dek: 'The typical path from idea to a registered private limited company.', evidence: 'draft', source: { name: 'MCA — company incorporation', url: 'https://www.mca.gov.in' },
    points: [
      { h: 'Get a Digital Signature Certificate (DSC)', p: 'Directors sign incorporation documents digitally.' },
      { h: 'Obtain a Director Identification Number (DIN)', p: 'Applied for as part of the incorporation filing.' },
      { h: 'Reserve a name', p: 'Names are checked for uniqueness on the MCA portal.' },
      { h: 'File SPICe+', p: 'The integrated form covers incorporation, PAN, TAN and other registrations.' },
      { h: 'Draft the MoA and AoA', p: 'Memorandum and Articles of Association set out the company\'s objects and rules.' },
      { h: 'Receive the Certificate of Incorporation', p: 'Then open a bank account and complete GST and other registrations as needed.' },
    ] },
  { slug: 'get-dpiit-recognition', title: '5 things to know before applying for DPIIT recognition', dek: 'Prepare these before you apply on the Startup India portal.', evidence: 'draft', source: SI,
    points: [
      { h: 'Be an eligible entity type', p: 'Private limited company, registered partnership or LLP.' },
      { h: 'Keep incorporation proof ready', p: 'Certificate of incorporation or registration.' },
      { h: 'Describe your innovation', p: 'Explain what is new in your product, service or process.' },
      { h: 'Check age and turnover limits', p: 'Limits are set by the current notification — read the latest one.' },
      { h: 'Keep documents consistent', p: 'Mismatched names or dates are a common cause of delay.' },
    ] },
  { slug: 'protect-your-ip', title: '4 ways to protect your idea in India', dek: 'Match the right IP right to what you are building.', evidence: 'verified', source: { name: 'Make in India — IP facts', url: 'https://www.makeinindia.com/policy/intellectual-property-facts' },
    points: [
      { h: 'Patents', p: 'For new inventions.' },
      { h: 'Designs', p: 'For the visual appearance of a product.' },
      { h: 'Trademarks', p: 'For brand names and logos.' },
      { h: 'Geographical Indications', p: 'For products tied to a place of origin.' },
    ] },
];

// ---------------------------------------------------------------- Ecosystem organisations
export const ORGANISATIONS: { name: string; role: string; url: string }[] = [
  { name: 'DPIIT', role: 'Department for Promotion of Industry and Internal Trade — FDI policy, startup recognition.', url: 'https://dpiit.gov.in' },
  { name: 'Startup India', role: 'Government flagship for startups: recognition, schemes, mentorship.', url: 'https://www.startupindia.gov.in' },
  { name: 'CIPAM', role: 'Cell for IPR Promotion and Management under DPIIT.', url: 'https://dpiit.gov.in' },
  { name: 'Intellectual Property India', role: 'Patents, designs, trade marks and GIs offices.', url: 'https://ipindia.gov.in' },
  { name: 'Ministry of Corporate Affairs', role: 'Company incorporation and compliance.', url: 'https://www.mca.gov.in' },
  { name: 'Press Information Bureau', role: 'Official government press releases.', url: 'https://www.pib.gov.in' },
];
