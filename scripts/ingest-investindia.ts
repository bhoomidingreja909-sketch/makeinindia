/**
 * Daily job: crawl Invest India blog/news pages politely and store title + excerpt + link in Supabase.
 *   npm run ingest            (needs SUPABASE_URL and SUPABASE_SECRET_KEY)
 *   npm run ingest -- --dry   (crawl and print, write nothing)
 */
import { crawl } from '../src/lib/ingest/investindia';
import { knownUrls, saveIngested } from '../src/lib/ingest/store';
import { supabaseConfig } from '../src/lib/supabase';

const dry = process.argv.includes('--dry');
const cfg = supabaseConfig();
if (!dry && !cfg) { console.error('FAIL: set SUPABASE_URL and SUPABASE_SECRET_KEY (or use --dry).'); process.exit(1); }

const contact = process.env.INGEST_CONTACT || process.env.NEXT_PUBLIC_SITE_URL || 'college project';
const ua = `MakeInIndiaStudentProject/1.0 (academic; contact: ${contact})`;
async function main() {
  const skip = cfg && !dry ? await knownUrls(cfg) : new Set<string>();
  const rows = await crawl({ ua, skip, log: (m) => console.log(m), maxPages: Number(process.env.INGEST_MAX_PAGES) || 30 });
  console.log(`Extracted ${rows.length} article(s).`);
  for (const r of rows.slice(0, 5)) console.log(` - ${r.published_at.slice(0, 10)}  ${r.title}`);
  if (!dry && cfg) { await saveIngested(cfg, rows); console.log('Saved to Supabase.'); }
}

main().catch((e) => {
  console.error('FAIL:', (e as Error).message);
  process.exit(1);
});
