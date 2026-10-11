/**
 * One real provider call to confirm your key works.   Usage: npm run check:news
 * Reads GNEWS_API_KEY from the environment (e.g. `node --env-file=.env.local`).
 */
import { fetchGNews } from '../src/lib/news/gnews';
import { getSector } from '../src/data/sectors';

const key = process.env.GNEWS_API_KEY;
if (!key) {
  console.error('FAIL: GNEWS_API_KEY is not set. Copy .env.example to .env.local and run: node --env-file=.env.local node_modules/.bin/tsx scripts/check-news.ts');
  process.exit(1);
}
try {
  const items = await fetchGNews(getSector('railways')!, key);
  console.log(`OK: provider reachable, ${items.length} article(s). Newest: ${items[0]?.title ?? '(none)'}`);
} catch (e) {
  console.error('FAIL:', (e as Error).message);
  process.exit(1);
}
