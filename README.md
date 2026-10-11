# Make in India — redesigned portal (student project)

Next.js 15 (App Router, TypeScript) + Supabase. Sector news is fetched **server-side** from GNews and cached; forms are stored in Supabase.
See `PRD.md` for scope, evidence labels and data policy.

## Run locally
```bash
npm install
cp .env.example .env.local      # then fill in the values (never commit this file)
npm run dev                     # http://localhost:3000
npm test                        # unit tests (mocked provider — no API calls)
npm run lint                    # type-check
npm run check:links             # fails if nav/pages link to investindia.gov.in
npm run check:news              # ONE real call to GNews to prove your key works
npm run build && npm start      # production build
```
Without keys the site still runs: the news panel says the feed is not configured and the forms say the service is unavailable. Nothing is faked.

## 1. News API key (free)
1. Create a free account at https://gnews.io and copy the API key from the dashboard.
2. Put it in `.env.local` as `GNEWS_API_KEY=...` (server-only; never use a `NEXT_PUBLIC_` prefix).
3. Free plan (verify on gnews.io/pricing): ~100 requests/day, ~12-hour article delay, non-commercial use. Defaults here (8 h cache, 90-call daily budget) keep 27 sectors inside that.
4. **Rotate any key you have pasted in chat or committed anywhere.**

## 2. Supabase (free)
1. Create a project at https://supabase.com.
2. SQL editor → paste and run `supabase/migrations/001_init.sql` (creates tables with row-level security and **no public policies**).
3. Settings → API: copy the **Project URL** → `SUPABASE_URL`, and the **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (server-only secret).

## 3. Deploy (Vercel or Netlify)
- **Vercel:** import the GitHub repo → Framework preset *Next.js* → Settings → Environment Variables: add every name from `.env.example` → Deploy.
- **Netlify:** Add new site → Import from Git → build command `npm run build` (the Next.js runtime is detected automatically) → Site settings → Environment variables: add the same names → Deploy.
- Set `NEXT_PUBLIC_SITE_URL` to your live URL (used for sitemap/OG tags).
- Serverless note: the in-memory cache resets on cold starts; with Supabase configured, the cache and daily budget persist in the `news_cache` table.

## Content you must verify before submission
Anything labelled **Draft — verify** (startup stories, FAQ, policy sections, articles) was drafted from search snippets and general knowledge. Open the cited source, check each line, then set `verified: true` for stories in `src/data/content.ts` and update the section's `evidence`.
