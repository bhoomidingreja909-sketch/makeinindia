/**
 * Curated, sourced headlines. NOTHING here is fetched at runtime — the author edits this file.
 * Rules: use the publisher's real title, a real link, and the date ONLY if known (partial dates are fine:
 * '2023', '2025-05', '2025-05-30'). Leave `date` out when it is unknown; never guess.
 * `sectors` are sector slugs from src/data/sectors.ts. Add more items at the top.
 */
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  /** Partial ISO date, or omitted when unknown. */
  date?: string;
  summary: string;
  url: string;
  sectors: string[];
  kind: 'government' | 'media';
}

/** When the author last reviewed this list. Shown on every feed. */
export const NEWS_UPDATED = '2026-10-13';

const PLI_SECTORS = ['esdm', 'pharma-medical-devices', 'automotive', 'renewable-energy', 'textile-apparel', 'food-processing', 'aerospace-defence', 'communication-services'];

export const NEWS: NewsItem[] = [
  { id: 'inc42-55200', kind: 'media', source: 'Inc42', date: '2026-04', sectors: [],
    title: 'Centre Recognises Record 55,200 Startups In FY26',
    summary: 'DPIIT recognised a record number of startups in FY26; the total passed 2.23 lakh by 31 March 2026 (press report citing the Commerce Ministry).',
    url: 'https://inc42.com/buzz/centre-recognises-record-55200-startups-in-fy26/' },
  { id: 'bs-fdi-fy25', kind: 'media', source: 'Business Standard', date: '2025-06-08', sectors: [],
    title: 'Maharashtra, Karnataka account for 51% of FDI in India in FY25: Govt',
    summary: 'Two states accounted for about half of FDI in FY 2024-25, per a government statement reported by the paper.',
    url: 'https://www.business-standard.com/markets/news/maharashtra-karnataka-account-for-51-of-fdi-in-india-in-fy25-govt-125060800267_1.html' },
  { id: 'bs-ather-ipo', kind: 'media', source: 'Business Standard', date: '2025-04-23', sectors: ['automotive'],
    title: 'Ather Energy sets IPO price band in range of ₹304 to ₹321 per share',
    summary: 'The Hosur-based electric-scooter maker set its IPO price band; proceeds were earmarked mainly for a new factory in Maharashtra.',
    url: 'https://www.business-standard.com/amp/markets/ipo/ather-energy-sets-ipo-price-band-in-range-of-304-to-321-per-share-125042300128_1.html' },
  { id: 'bs-gujarat-fdi', kind: 'media', source: 'Business Standard', date: '2025-01-23', sectors: [],
    title: 'Gujarat received FDI equity inflow of $57.65 billion in last 10 years: Govt',
    summary: 'A government reply to Parliament, as reported, put Gujarat\'s FDI equity inflow at about US$57.65 billion over ten years.',
    url: 'https://www.business-standard.com/india-news/gujarat-received-fdi-equity-inflow-of-57-65-billion-in-last-10-years-govt-125012301464_1.html' },
  { id: 'ys-agnikul', kind: 'media', source: 'YourStory', date: '2024-05-30', sectors: ['aerospace-defence'],
    title: 'Agnikul Cosmos launches world’s first 3D-printed rocket engine',
    summary: 'The Chennai-based startup launched its Agnibaan sub-orbital demonstrator from Sriharikota using a single-piece 3D-printed engine.',
    url: 'https://yourstory.com/2024/05/agnikul-cosmos-worlds-first-3d-printed-rocket-engine-isro' },
  { id: 'bt-ideaforge', kind: 'media', source: 'Business Today', date: '2023-06-22', sectors: ['aerospace-defence'],
    title: 'ideaForge IPO: How 26/11 terror attack motivated IIT Bombay students to found India’s largest drone company',
    summary: 'Background on the drone maker\'s founding and its IPO.',
    url: 'https://www.businesstoday.in/amp/markets/ipo-corner/story/ideaforge-ipo-how-2611-terror-attack-motivated-iit-bombay-students-to-found-indias-largest-drone-company-386686-2023-06-22' },
  { id: 'pib-pli', kind: 'government', source: 'Press Information Bureau', date: '2023', sectors: PLI_SECTORS,
    title: 'Production Linked Incentive Schemes for 14 key sectors aim to enhance India’s manufacturing capabilities and exports',
    summary: 'Official PIB release on the PLI schemes: 14 sectors, a total outlay of ₹1.97 lakh crore.',
    url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1945155' },
  { id: 'dd-pli', kind: 'government', source: 'DD News', sectors: PLI_SECTORS,
    title: 'Govt unveils Rs. 1.97 lakh crore PLI schemes to boost manufacturing and exports',
    summary: 'Public-broadcaster coverage of the 14-sector PLI package.',
    url: 'https://ddnews.gov.in/en/govt-unveils-rs-1-97-lakh-crore-pli-schemes-to-boost-manufacturing-and-exports/' },
  { id: 'ob-dpiit-24', kind: 'media', source: 'Outlook Business', sectors: [],
    title: 'DPIIT Working Closely With 24 Sub-Sectors To Promote Manufacturing, Exports, Cut Imports',
    summary: 'DPIIT is working with 24 sub-sectors (a separate set from the 27 Make in India sectors).',
    url: 'https://www.outlookbusiness.com/economy-and-policy/dpiit-working-closely-with-24-sub-sectors-to-promote-manufacturing-exports-cut-imports' },
  { id: 'dsa-skyroot', kind: 'media', source: 'DealStreetAsia', sectors: ['aerospace-defence'],
    title: 'India’s Skyroot Aerospace enters unicorn club with $60m funding from GIC, others',
    summary: 'Reported funding round that valued the space-launch startup at about US$1.1 billion.',
    url: 'https://dealstreetasia.com/stories/skyroot-fundraise-481532' },
  { id: 'dsa-zetwerk', kind: 'media', source: 'DealStreetAsia', sectors: ['capital-goods'],
    title: 'India\'s Zetwerk clinches unicorn tag after $120m fundraise led by D1 Capital: report',
    summary: 'The Bengaluru manufacturing-services platform reached unicorn status (amounts differ across outlets).',
    url: 'https://dealstreetasia.com/stories/zetwerk-d1-capital-256839' },
  { id: 'inc42-zetwerk-acq', kind: 'media', source: 'Inc42', sectors: ['capital-goods', 'aerospace-defence'],
    title: 'Zetwerk Acquires Three Firms In An INR 100 Cr Deal',
    summary: 'Includes Pinaka Aerospace and SharpTanks, per the report.',
    url: 'https://inc42.com/buzz/zetwerk-acquires-three-firms-in-an-inr-100-cr-deal' },
];
