# Make in India — redesigned portal (student project)

A **fully static** website (Next.js 15, exported to plain HTML). It needs **no API keys, no database and no environment variables** to build or run.
See `PRD.md` for scope, evidence labels and the data policy.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests
npm run lint       # type-check
npm run check:links
npm run build      # writes the finished website to ./out
```

## Get a link (pick one — no keys needed)
**A. Netlify Drop (fastest, ~1 minute):** run `npm run build`, open https://app.netlify.com/drop, and drag the **`out`** folder onto the page. Netlify gives you a live link.
**B. Netlify from GitHub:** Add new site → Import from Git → pick this repo → build command `npm run build`, publish directory `out` (already set in `netlify.toml`) → Deploy.
**C. Vercel:** Add New → Project → import this repo → framework *Next.js* → Deploy (no environment variables).

## Where the content lives (edit these files, rebuild, redeploy)
| What | File |
|---|---|
| Curated news list (real, sourced items) | `src/data/news.ts` |
| Startup stories, FAQ, policies (IPR/FDI), articles | `src/data/content.ts` |
| Stats, timeline, PLI table, states, legal pages, Hindi labels | `src/data/site.ts` |
| 27 sectors and their keywords | `src/data/sectors.ts`, `src/data/sectorMeta.ts` |

**News:** add items at the top of `NEWS` in `src/data/news.ts` with the publisher's real title, the link, and the date *only if you know it*. Never guess a date or invent a headline. Update `NEWS_UPDATED`.

**Forms:** they are a demonstration — they validate your entries and store nothing. To let visitors open a pre-filled email draft, set `NEXT_PUBLIC_CONTACT_EMAIL` as a build environment variable (Netlify/Vercel → Environment variables) and redeploy. Leave it empty for demo mode.

## Logo and brand
Logo files are in `public/brand/` (dark and white PNGs). The favicon, touch icon and social-share image are `src/app/icon.png`, `apple-icon.png` and `opengraph-image.png`. The Make in India logo belongs to the Government of India (DPIIT); it is used for academic illustration only and the site says so.

## What's in the site
Home (sourced stats, pillars, sector explorer, carousel) · About (timeline) · Sectors (27, filterable, news slide-over) · Sector pages (11-part template + curated headlines) · Schemes & Incentives (PLI table, incentive finder) · Investor Desk · States & UTs · Policies (IPR / FDI with Expand All) · Startup Stories (filters) · News · Resources (+ brand kit) · Articles · FAQ (+ retrieval assistant) · Contact / Feedback (demo) · Site search · HTML sitemap · 11 policy/help pages. Accessibility: skip link, breadcrumbs, text size, dark and high-contrast themes, EN/हिं toggle, reduced-motion support.

## Content you must verify before submission
Anything labelled **Draft — verify** (startup stories, FAQ, policy sections, articles) was drafted from search snippets and general knowledge. Open the cited source, check each line, then set `verified: true` for stories in `src/data/content.ts` and update the section's `evidence`.

Sections that say **"Not added yet — needs a verified source"** (sector statistics, why invest, growth drivers, brochures, state profiles, PLI sector outlays, official contact details) are intentionally empty. Fill them from official documents; do not use unsourced numbers.
