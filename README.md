# Make in India — redesigned portal (student project)

Next.js 15 (App Router, TypeScript) + Supabase. Sector news comes from a polite **daily crawl** of Invest India blog/news pages stored in Supabase (an optional GNews key can add more); forms are stored in Supabase.
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
Without Supabase set up the site still runs: the news panel says the feed is not configured and the forms say the service is unavailable. Nothing is faked.

## 1. (Optional) GNews key — not needed
The site no longer needs a news API key. Skip this section unless you later want extra headlines from GNews.

### Optional: GNews key (free)
1. Create a free account at https://gnews.io and copy the API key from the dashboard.
2. Put it in `.env.local` as `GNEWS_API_KEY=...` (server-only; never use a `NEXT_PUBLIC_` prefix).
3. Free plan (verify on gnews.io/pricing): ~100 requests/day, ~12-hour article delay, non-commercial use. Defaults here (8 h cache, 90-call daily budget) keep 27 sectors inside that.
4. **Rotate any key you have pasted in chat or committed anywhere.**

## 2. Supabase (free)
1. Create a project at https://supabase.com.
2. SQL editor → paste and run `supabase/migrations/20261011000000_init.sql` (creates tables with row-level security and **no public policies**).
3. Project Settings → API Keys: copy the **Project URL** → `SUPABASE_URL`, and the **secret key** (`sb_secret_…`) → `SUPABASE_SECRET_KEY` (server-only; a legacy `service_role` key in `SUPABASE_SERVICE_ROLE_KEY` also works). The publishable/anon key is **not** used: the forms write from the server, and the tables deliberately have no public policies.
4. Alternative to pasting SQL: `supabase login`, `supabase link --project-ref <ref>`, `supabase db push` applies `supabase/migrations/`.

## 2b. Daily Invest India articles (optional, no API key needed)
Invest India's `robots.txt` allows crawling (`User-agent: *`, `Allow: /`; checked by the author). `npm run ingest` crawls its sitemap politely and stores only **title + short excerpt + date + link** in Supabase; the news feeds then show them, credited to Invest India, next to any GNews/PIB items.
1. Run the second migration: `supabase/migrations/20261012000000_ingested_articles.sql` (SQL editor or `supabase db push`).
2. Test on your machine first: `npm run ingest -- --dry` (crawls and prints, writes nothing), then `npm run ingest`.
3. Make it daily: GitHub repo → Settings → Secrets and variables → Actions → add `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `INGEST_CONTACT`. The workflow `.github/workflows/ingest.yml` runs every day at 08:00 IST (you can also run it by hand from the Actions tab).
Safety rules built in: obeys robots.txt (stops if it cannot read it), identifies itself, waits 1.5 s between requests, fetches at most 30 pages a run, skips pages already stored, never invents a date, and never stores full article text. Please also read Invest India's Terms of Use. If a page's content only appears after JavaScript runs, the log says "no title/date found"; send me that output and I will adapt the extractor.

## 3. Deploy (Vercel or Netlify)
- **Vercel:** import the GitHub repo → Framework preset *Next.js* → Settings → Environment Variables: add every name from `.env.example` → Deploy.
- **Netlify:** Add new site → Import from Git → build command `npm run build` (the Next.js runtime is detected automatically) → Site settings → Environment variables: add the same names → Deploy.
- Set `NEXT_PUBLIC_SITE_URL` to your live URL (used for sitemap/OG tags).
- Serverless note: the in-memory cache resets on cold starts; with Supabase configured, the cache and daily budget persist in the `news_cache` table.

## What's in the site
Home (sourced stats, pillars, sector explorer, carousel) · About (timeline) · Sectors (27, filterable, news slide-over) · Sector pages (11-part template + live headlines) · Schemes & Incentives (PLI table, incentive finder) · Investor Desk · States & UTs · Policies (IPR / FDI with Expand All) · Startup Stories (filters) · News dashboard · Resources (+ brand kit) · Articles · FAQ (+ retrieval assistant) · Contact / Feedback (→ Supabase) · Site search · HTML sitemap · 11 policy/help pages. Accessibility: skip link, breadcrumbs, text size, dark and high-contrast themes, EN/हिं toggle, reduced-motion support.

## Content you must verify before submission
Anything labelled **Draft — verify** (startup stories, FAQ, policy sections, articles) was drafted from search snippets and general knowledge. Open the cited source, check each line, then set `verified: true` for stories in `src/data/content.ts` and update the section's `evidence`.

Sections that say **"Not added yet — needs a verified source"** (sector statistics, why invest, growth drivers, brochures, state profiles, PLI sector outlays, official contact details) are intentionally empty. Fill them from official documents; do not use unsourced numbers.
