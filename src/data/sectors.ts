export type SectorGroup = 'manufacturing' | 'services';

export interface Sector {
  slug: string;
  name: string;
  group: SectorGroup;
  /** Short monogram shown in tiles (a formal replacement for emoji). */
  icon: string;
  /** Phrases used to query and to relevance-check articles. */
  keywords: string[];
  /** Terms that signal an irrelevant story (homonyms, job ads, etc.). */
  exclude?: string[];
}

// Names follow makeinindia.com/sectors (manufacturing list verified via search
// snippet; the 12 services names were confirmed by the project author).
export const SECTORS: Sector[] = [
  { slug: 'aerospace-defence', name: 'Aerospace and Defence', group: 'manufacturing', icon: 'AD',
    keywords: ['aerospace India', 'defence manufacturing', 'defence production', 'Indian Air Force aircraft', 'drone manufacturing India'] },
  { slug: 'automotive', name: 'Automotive and Auto Components', group: 'manufacturing', icon: 'AU',
    keywords: ['automobile industry India', 'auto components', 'electric vehicle India', 'EV manufacturing', 'two-wheeler sales'] },
  { slug: 'pharma-medical-devices', name: 'Pharmaceuticals and Medical Devices', group: 'manufacturing', icon: 'PM',
    keywords: ['pharmaceutical India', 'medical devices India', 'drug manufacturing', 'pharma exports', 'CDSCO approval'] },
  { slug: 'biotechnology', name: 'Bio-Technology', group: 'manufacturing', icon: 'BT',
    keywords: ['biotechnology India', 'biotech startup India', 'BIRAC', 'biomanufacturing', 'vaccine manufacturing India'] },
  { slug: 'capital-goods', name: 'Capital Goods', group: 'manufacturing', icon: 'CG',
    keywords: ['capital goods India', 'heavy machinery', 'machine tools India', 'industrial machinery', 'engineering goods'] },
  { slug: 'textile-apparel', name: 'Textile and Apparels', group: 'manufacturing', icon: 'TA',
    keywords: ['textile industry India', 'apparel exports', 'garment manufacturing', 'PM MITRA textile parks', 'cotton yarn'] },
  { slug: 'chemicals-petrochemicals', name: 'Chemicals and Petro chemicals', group: 'manufacturing', icon: 'CP',
    keywords: ['chemicals industry India', 'petrochemicals India', 'specialty chemicals', 'PCPIR', 'chemical exports'] },
  { slug: 'esdm', name: 'Electronics System Design and Manufacturing (ESDM)', group: 'manufacturing', icon: 'ESDM',
    keywords: ['electronics manufacturing India', 'semiconductor India', 'ESDM', 'PLI electronics', 'mobile phone exports India'] },
  { slug: 'leather-footwear', name: 'Leather & Footwear', group: 'manufacturing', icon: 'LF',
    keywords: ['leather industry India', 'footwear manufacturing', 'footwear exports India', 'leather exports'] },
  { slug: 'food-processing', name: 'Food Processing', group: 'manufacturing', icon: 'FP',
    keywords: ['food processing India', 'PLI food processing', 'mega food park', 'processed food exports', 'agri-processing'] },
  { slug: 'gems-jewellery', name: 'Gems and Jewellery', group: 'manufacturing', icon: 'GJ',
    keywords: ['gems and jewellery exports', 'diamond industry India', 'jewellery manufacturing', 'GJEPC', 'hallmarking India'] },
  { slug: 'shipping', name: 'Shipping', group: 'manufacturing', icon: 'SH',
    keywords: ['shipbuilding India', 'ports India', 'Sagarmala', 'maritime India', 'shipping ministry'], exclude: ['shipping charges', 'free shipping'] },
  { slug: 'railways', name: 'Railways', group: 'manufacturing', icon: 'RL',
    keywords: ['Indian Railways manufacturing', 'Vande Bharat', 'rolling stock', 'railway infrastructure India', 'metro coaches'],
    exclude: ['recruitment', 'vacancy', 'ticket booking', 'IRCTC refund'] },
  { slug: 'construction', name: 'Construction', group: 'manufacturing', icon: 'CN',
    keywords: ['construction industry India', 'infrastructure projects India', 'cement demand India', 'housing sector India', 'NHAI projects'] },
  { slug: 'renewable-energy', name: 'New and Renewable Energy', group: 'manufacturing', icon: 'RE',
    keywords: ['renewable energy India', 'solar manufacturing India', 'green hydrogen India', 'wind energy India', 'MNRE'] },

  { slug: 'it-ites', name: 'Information Technology & Information Technology enabled Services (IT & ITeS)', group: 'services', icon: 'IT',
    keywords: ['IT services India', 'IT exports India', 'Nasscom', 'global capability centres India', 'software exports'] },
  { slug: 'tourism-hospitality', name: 'Tourism and Hospitality Services', group: 'services', icon: 'TH',
    keywords: ['tourism India', 'hospitality industry India', 'hotel industry India', 'foreign tourist arrivals India', 'Ministry of Tourism'] },
  { slug: 'medical-value-travel', name: 'Medical Value Travel', group: 'services', icon: 'MV',
    keywords: ['medical tourism India', 'medical value travel', 'Heal in India', 'international patients India'] },
  { slug: 'transport-logistics', name: 'Transport and Logistics Services', group: 'services', icon: 'TL',
    keywords: ['logistics India', 'National Logistics Policy', 'freight India', 'supply chain India', 'PM Gati Shakti'] },
  { slug: 'accounting-finance', name: 'Accounting and Finance Services', group: 'services', icon: 'AF',
    keywords: ['accounting services India', 'chartered accountants ICAI', 'audit firms India', 'GST compliance', 'GIFT City finance'] },
  { slug: 'audio-visual', name: 'Audio Visual Services', group: 'services', icon: 'AV',
    keywords: ['animation VFX India', 'film industry India', 'OTT India', 'AVGC sector', 'media and entertainment India'] },
  { slug: 'legal-services', name: 'Legal Services', group: 'services', icon: 'LG',
    keywords: ['legal services India', 'foreign law firms India', 'Bar Council of India', 'legal tech India', 'arbitration India'] },
  { slug: 'communication-services', name: 'Communication Services', group: 'services', icon: 'CS',
    keywords: ['telecom India', '5G rollout India', 'DoT telecom', 'broadband India', 'satellite communication India'] },
  { slug: 'construction-engineering', name: 'Construction and Related Engineering Services', group: 'services', icon: 'CE',
    keywords: ['engineering services India', 'construction engineering', 'EPC contracts India', 'infrastructure consultancy', 'engineering exports India'] },
  { slug: 'environmental-services', name: 'Environmental Services', group: 'services', icon: 'ES',
    keywords: ['environmental services India', 'waste management India', 'recycling India', 'water treatment India', 'carbon market India'] },
  { slug: 'financial-services', name: 'Financial Services', group: 'services', icon: 'FS',
    keywords: ['banking sector India', 'fintech India', 'RBI', 'insurance sector India', 'SEBI'] },
  { slug: 'education-services', name: 'Education Services', group: 'services', icon: 'ED',
    keywords: ['higher education India', 'edtech India', 'foreign university campus India', 'NEP 2020', 'skill development India'] },
];

export const SECTOR_BY_SLUG = new Map(SECTORS.map((s) => [s.slug, s]));

export function getSector(slug: string): Sector | undefined {
  return SECTOR_BY_SLUG.get(slug);
}

export const MANUFACTURING = SECTORS.filter((s) => s.group === 'manufacturing');
export const SERVICES = SECTORS.filter((s) => s.group === 'services');
