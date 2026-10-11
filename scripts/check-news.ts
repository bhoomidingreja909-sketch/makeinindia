/**
 * One real provider call to confirm your key works.   Usage: npm run check:news
 * Reads GNEWS_API_KEY from .env.local (loaded by the npm script) or the environment.
 */
import { fetchGNews } from '../src/lib/news/gnews';
import { getSector } from '../src/data/sectors';

async function main() {
  const key = process.env.GNEWS_API_KEY;
  if (!key) {
    console.error('FAIL: GNEWS_API_KEY is not set. Copy .env.example to .env.local and fill it in.');
    process.exit(1);
  }
  const items = await fetchGNews(getSector('railways')!, key);
  console.log(`OK: provider reachable, ${items.length} article(s). Newest: ${items[0]?.title ?? '(none)'}`);
}

main().catch((e) => {
  console.error('FAIL:', (e as Error).message);
  process.exit(1);
});
