import { NextResponse } from 'next/server';
import { getSectorNews } from '@/lib/news/service';
import { NewsError, type NewsRange } from '@/lib/news/types';

export const dynamic = 'force-dynamic';

const RANGES: NewsRange[] = ['week', 'month', 'quarter', 'year'];
const STATUS = { not_configured: 503, auth: 502, rate_limit: 503, budget: 503, upstream: 502, bad_request: 400 } as const;
const PUBLIC_MESSAGE: Record<string, string> = {
  not_configured: 'The news feed has not been configured yet.',
  auth: 'The news feed is temporarily unavailable.', // never reveal key problems to visitors
  rate_limit: 'The news feed is busy. Please try again shortly.',
  budget: 'The news feed is busy. Please try again later today.',
  upstream: 'The news feed is temporarily unavailable.',
  bad_request: 'Invalid request.',
};

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const sector = params.get('sector') ?? '';
  const range = (params.get('range') ?? 'month') as NewsRange;
  if (!RANGES.includes(range)) return NextResponse.json({ error: { code: 'bad_request', message: 'Invalid range.' } }, { status: 400 });

  try {
    const result = await getSectorNews(sector, range);
    return NextResponse.json(result, { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300' } });
  } catch (err) {
    if (err instanceof NewsError) {
      // Operators see the real cause in logs; visitors get a generic message.
      if (err.code === 'auth' || err.code === 'not_configured') console.error(`[news] ${err.code}: ${err.message}`);
      return NextResponse.json(
        { error: { code: err.code, message: PUBLIC_MESSAGE[err.code] } },
        { status: STATUS[err.code] },
      );
    }
    console.error('[news] unexpected error', err);
    return NextResponse.json({ error: { code: 'upstream', message: PUBLIC_MESSAGE.upstream } }, { status: 500 });
  }
}
