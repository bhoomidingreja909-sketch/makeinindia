# PRD — Make in India: Redesigned Portal (v0.1 DRAFT for approval)

**Author:** Bhoomi (TY BBA) · **Subject:** Digital Marketing & AI · **Status:** APPROVED · v1.0 build complete (content-brief analysis integrated)
**Stack (approved):** Next.js (App Router, TypeScript) + Supabase (Postgres) · server-side news route

---

## 0. How to read this document (evidence labels)

Every claim below carries one label. Nothing unlabelled should be treated as fact.

| Label | Meaning |
|---|---|
| **[V]** Verified | Seen in a search result from an official/government page (URL given). |
| **[S]** Secondary | Reported by a news/aggregator source citing the government. Must be re-checked against PIB/DPIIT before it appears on the live site. |
| **[U]** User-provided | From Bhoomi's own research/notes. Not independently verified. |
| **[AI]** AI analysis | Recommendation or reasoning by Claude. Opinion, not data. |
| **[TBV]** To be verified | Needed for the build; could not be checked from this environment. |

**Limitation disclosure.** From this build environment every `.gov.in` host, `makeinindia.com`, `gnews.io`, `newsapi.org` and news sites returned **HTTP 403 on the proxy tunnel (CONNECT)** or failed DNS, for both shell and fetch tools. Only the web *search* tool works, and it returns snippets, not full pages. So: **no page of makeinindia.com was read in full by me**, and the "analysis" in §2 is limited to what search snippets and Bhoomi's notes show. The live-site audit (§2.3) must be completed from Bhoomi's browser. Nothing in this PRD was scraped or bypassed.

---

## 1. Problem statement

The current Make in India website (makeinindia.com):
1. **Sends users off-site.** Blog articles and the query/contact form redirect to Invest India (investindia.gov.in), breaking navigation and trust. **[U]**
2. **Is stale.** Latest content dates from 2024. **[U]** (Search metadata also flags some pages as very old, e.g. IPR page references a startup scheme "valid until March 2020". **[V]** makeinindia.com/policy/intellectual-property-facts)
3. **Is visually bland** and does not convey India's manufacturing progress. **[U]**
4. **Hides process information** (e.g. how to register/set up a company). **[U]**
5. **Has no sector-wise live news and no startup success showcase.** **[U]**

**Opportunity [AI]:** a formal-but-modern, self-contained portal that keeps users on one site, shows fresh sector news with clear sourcing, inspires entrepreneurs through verified success stories, and turns every query into a tracked lead.

## 2. Analysis of the current site

### 2.1 Verified from official pages (via search)
- Manufacturing sectors listed on makeinindia.com/sectors **[V]** — 15: Aerospace & Defence; Automotive & Auto Components; Pharmaceuticals & Medical Devices; Bio-Technology; Capital Goods; Textile & Apparels; Chemicals & Petrochemicals; ESDM; Leather & Footwear; Food Processing; Gems & Jewellery; Shipping; Railways; Construction; New & Renewable Energy.
- Services sectors: the page confirms IT & ITeS, Tourism & Hospitality, Transport & Logistics, Accounting & Finance and further services **[V]**; Bhoomi's list of 12 (adds Medical Value Travel, Audio Visual, Legal, Communication, Construction & Related Engineering, Environmental, Financial, Education) **[U]** → **[TBV]** exact names/order.
- FDI page (makeinindia.com/policy/foreign-direct-investment) describes automatic vs government route, sector caps per FDI Policy 2020, prohibited sectors, and land-border-country restriction **[V]**. Content is tied to the 2020 policy → **may be outdated [TBV against current Consolidated FDI Policy]**.
- IPR page: IPR Policy adopted 12 May 2016; seven objectives; CIPAM under DPIIT as single reference point **[V]**.
- About page refers to a 25-sector framework **[V]**; the 15+12 = 27 split matches the "expanded to 27" figure reported in secondary sources **[S]**.

### 2.2 Problems to solve (from §1 + above)
Backlink leakage · stale news · no startup page · cluttered Investor Desk · Opportunities page of low value · Policies not equal-weighted / hard to scan · FAQ thin · no visible company-registration procedure.

### 2.3 Audit tasks Bhoomi must complete in a browser (needed for marks — "analysed thoroughly")
Screenshot and log: every nav item and where it links (internal vs investindia.gov.in); homepage sections; date of newest news/blog item; contact form behaviour; mobile view; PageSpeed Insights score (free, pagespeed.web.dev) for baseline vs. our site. These become the "before" evidence in the report. I will provide a fill-in table (`docs/audit-template.md`) once approved.

### 2.4 Analysis of the current site — from the author's Content Brief (PDF, 6 pp.)
The author supplied a content brief compiled from official sources (PIB, Rajya Sabha/Lok Sabha answers, PMINDIA, DPIIT) and snippets of makeinindia.com. It describes what the *current* site contains. I cross-checked its headline claims by search; results below.

**What the current site contains (per brief):** header with language switch, text-size, high-contrast and search; nav of Home / About / Sectors / Schemes & Incentives / Invest in India / Resources / Success Stories / News & Media / Contact; home with hero, key stats, four pillars, sector explorer, schemes, success stories, news; About (rationale, pillars, timeline, Make in India 2.0); 27 sector pages with an 11-part template; Schemes (PLI, other initiatives, state incentives, incentive finder); Invest in India (FDI, EoDB, IPR, states, Investor Facilitation Cell); Resources; Success Stories; News; Contact & query form; FAQs; and 12+ GIGW compliance pages.

**Claims checked:**
| Claim in brief | Result |
|---|---|
| 27 sectors = 15 manufacturing (DPIIT) + 12 services (Dept. of Commerce) | **Verified** — Rajya Sabha answer 16 Dec 2022 and Lok Sabha answers |
| PLI: 14 sectors, ₹1.97 lakh crore | **Verified** — PIB release (PRID 1945155). Sector-wise outlays **not** verified → left blank |
| Launch 25 Sep 2014; four pillars | **Secondary** — Vikaspedia, Drishti IAS |
| Brief's own manufacturing list (includes Mining, Oil & Gas) | **Conflicts** with makeinindia.com/sectors snippet (the 15 used in this build). Brief itself says "[verify]". Build keeps the makeinindia.com list |
| FDI inflow figure | **Secondary** — FY2024-25 total US$ 81.04 bn (incl. reinvested earnings & other capital; equity ≈ US$ 50 bn), press-reported |

**Gaps in the current site this redesign closes** (author's research + brief): off-site redirects; stale news; no sector-wise live news; no startup showcase; process not explained; cluttered Investor Desk; Opportunities page. **Added from the brief's own list:** filterable sector grid; 11-part sector template; PLI table + incentive finder; states/UT explorer; resources; animated sourced stats; scroll timeline; FAQ assistant; dark mode; Hindi/English toggle; compliance pages; breadcrumbs; text-size & high-contrast controls.

**Deliberate deviations from the brief (and why):**
1. **No Invest India links** in nav/footer/forms — the author's explicit goal (brief lists them in the footer).
2. **No "Content owned by DPIIT" line, no National Emblem, no visitor counter** — would imply official status / invent data. A persistent banner states "Academic redesign project. Not an official Government of India website."
3. **No invented content** for sector statistics, "why invest", growth drivers, brochures, state profiles, PLI outlays or contact details: these sections render an explicit "not added yet — needs a verified source" state.
4. **FAQ assistant is retrieval-only** (returns existing sourced answers; declines unrelated questions), not a generative chatbot — it cannot hallucinate. A generative upgrade would need an LLM API key and guardrails.
5. **Incentive finder omits "investment size"** until scheme eligibility thresholds are verified.
6. **Hindi covers navigation and key labels only**; content stays English (a banner says so) pending a reviewed translation.
7. **Tile map instead of a boundary map** for 28 states + 8 UTs (no verified geometry); marks states with cited facts.

---

## 3. Goals and success metrics

| Goal | Metric (target) | Measured by |
|---|---|---|
| Remove external leakage | **0** outbound links to investindia.gov.in in nav/forms/blog | Link-check script in CI |
| Fresh content | Every sector shows ≥ 1 article ≤ 7 days old (when provider returns any); "last updated" always visible | Automated test + UI |
| Lead capture | 100 % of form submits stored in Supabase with confirmation | Integration test |
| Performance | Lighthouse ≥ 90 Performance / ≥ 95 Accessibility / ≥ 95 SEO on key pages | Lighthouse report (baseline vs. new) |
| Trust | 100 % of stats and stories carry a source link + date | Content checklist |

Targets are **[AI]** proposals; baseline from the existing site is **[TBV]** (§2.3).

## 4. Users
1. **Prospective investor/foreign company** – wants policy, FDI route, contact.
2. **Entrepreneur/startup founder** – wants inspiration, registration steps, schemes.
3. **Student/researcher/journalist** – wants sector facts and news.

## 5. Scope

### In scope
1. **Redesign** – formal, slightly quirky visual language (see §8).
2. **Sectors** – 15 manufacturing + 12 services as interactive icon tiles; click → slide-over panel with news tabs **Weekly / Monthly / Quarterly / Yearly**.
3. **Live sector news dashboard** (§7).
4. **Investor Desk** – decluttered: 3 clear paths (Set up a business, Policies, Contact the desk) + registration procedure steps.
5. **Remove Opportunities page** (301 redirect to Investor Desk).
6. **Policies** – IPR and FDI as two equal-size interactive cards (hover/cursor tilt). Each opens a page with an **Expand All** accordion in the exact order given:
   - *IPR:* Summary · Objectives · Strengths of the Indian IPR regime · Types of IPR in India · International Agreements · IP Administration in India · Facilities offered by the Patents Office
   - *FDI:* Summary · FDI Entry Routes · FDI Permitted Under Sectors as per FDI Policy 2020 · List of Prohibited Sectors · Procedures for Investment under Government Route · Repatriation · Key Stakeholders · Download Links
7. **Startup Success Stories** page (own page; filter by sector/state/year; every card cites sources).
8. **Articles/Listicles** moved from Invest India dependency to Startup India–themed content hosted on our site (rewritten summaries + link to the original official source; no copying of full text — copyright).
9. **FAQ** – Startup-focused Q&A (sourced from Startup India's public FAQs, summarised with attribution) + searchable.
10. **Contact / Query form → Supabase**, no redirects.
11. **Organisations** (DPIIT, Invest India, CIPAM, IP India, etc.) shown in a designed "Ecosystem" section with outbound links clearly marked as external.

### Out of scope
User accounts, payments, multi-language (stretch goal), live chat, scraping of any site that disallows it.

## 6. Information architecture
`/` Home · `/sectors` · `/sectors/[slug]` (+ news panel) · `/news` (all-sector dashboard) · `/investor-desk` · `/policies` · `/policies/ipr` · `/policies/fdi` · `/startups` · `/startups/[slug]` · `/articles` · `/faq` · `/contact` · `/about-data` (sources & methodology page — shows evidence labels to users and examiners)

---

## 7. Live sector news dashboard

### 7.1 Why it needs a server
Browser calls would expose the key and hit CORS/rate limits. Solution: Next.js Route Handler `GET /api/news?sector=<slug>&range=<week|month|quarter|year>&q=<text>`. **No separate backend, DB-scheduled job or extra service is required for v1**; caching uses an in-memory/`unstable_cache` layer plus a Supabase `news_cache` table so cache survives serverless cold starts (Supabase is already needed for forms).

### 7.2 Provider options (verify before choosing)
| Source | Cost | Key? | Notes |
|---|---|---|---|
| **PIB RSS** (official) | Free | No | A general PIB feed is listed by a third-party aggregator: `https://www.pib.gov.in/RssMain.aspx?ModId=6&Lang=2&Regid=3&reg=48` **[S]**; ministry/sector filtering parameters **[TBV]**. Primary source for *verified government* announcements. Respect robots/terms; polite rate. |
| **data.gov.in OGD API** | Free; registration → key from "My Account" **[S]** | Yes (`api-key` query param) | For statistics datasets (e.g. sector/export/FDI tables), not news. Endpoint pattern `api.data.gov.in/resource/<id>?format=json&api-key=…` **[S]**; confirm on the official OGD docs **[TBV]**. |
| **GNews** | Free tier reported as 100 req/day, ~10 articles/request, **12-hour delay**, 30-day history, **non-commercial / development use only**; paid Essential ≈ €49.99/mo for 1,000 req/day, real-time **[S]** | Yes | Fits the 27-sector plan; verify limits at gnews.io/pricing **[TBV]**. |
| NewsAPI.org | Free "Developer" plan is dev-only, delayed | Yes | Fallback option; same caveats. **[TBV]** |

**Recommendation [AI]:** hybrid — **PIB RSS as the verified/official stream** + **GNews for business-press coverage**, each article tagged with its source type ("Government release" vs "News media"). For the college demo, the free GNews tier is acceptable *only if the deployment is a non-commercial academic demo* — confirm in GNews' terms **[TBV]**; if "localhost only" applies, demo from `localhost` or upgrade.

**Account you need:** a free GNews account at gnews.io → copy the API key from the dashboard. (You do **not** need to pay for development.) Optional free: data.gov.in registration.

### 7.3 Query design & quota maths [AI]
- Each sector has a config entry: `slug, name, group, keywords[], excludeKeywords[], icon`. Query = `(kw1 OR "kw2" …) AND India`, language `en`, country `in`. Exclusions remove homonyms (e.g. "Railways" cricket/job-ad spam).
- 27 sectors × on-demand fetch only when a user opens the sector. Cache TTL **8 h** ⇒ worst case 27 × 3 = **81 requests/day** < 100 free limit. Weekly/Monthly/Quarterly/Yearly tabs **filter the cached result set by date** (not extra calls); free-tier history is limited to ~30 days, so Quarterly/Yearly tabs show a "history limited by plan" notice and fall back to PIB archive/official reports where available — never fabricated.
- **De-duplication:** normalise title (lower-case, strip punctuation/source suffix), drop duplicates by URL and by Jaccard-similarity ≥ 0.8 on titles.
- **Sort:** `publishedAt` desc. **Fields:** headline, source name, date-time (IST), 1–2 line description, link to original. Missing fields → graceful placeholders; articles without URL are dropped.
- **Labelling:** page says "Latest headlines · updated <time>" — **never "real-time"** because the provider has a publication delay.
- **Errors:** 401/403 (bad key) → admin-visible log + user-friendly "News temporarily unavailable"; 429 → serve stale cache with "showing cached results"; network failure → same; empty → empty state.
- **Security:** key read as `process.env.GNEWS_API_KEY` server-side only; `.env*` in `.gitignore`; `.env.example` has placeholders; no `NEXT_PUBLIC_` prefix on secrets; `run_secret_scanning` check before every push.

> ⚠️ **The key pasted in chat is compromised — rotate it in the GNews dashboard before use.**

---

## 8. Design language (UPDATED — author-specified palette)
Palette chosen by the author: **#BA1200** (red, accent/CTA) · **#031927** (deep navy, header/hero/text) · **#9DD1F1** (sky) · **#508AA8** (steel) · **#C8E0F4** (mist). `#F6FAFD` is a derived near-white tint of mist used as the page background. Saffron/green from v0.1 were removed.

Contrast rules (computed, WCAG AA): red on near-white ≈ 6.6:1 → fine for text and buttons; steel on near-white ≈ 3.7:1 → large text/decoration only; red *text* on navy ≈ 2.7:1 → not allowed, so on dark surfaces red is used only as a button/underline fill with white text.

Formal-but-quirky: serif display headings, navy hero with a steel ring, hand-drawn wavy/scribble underlines, tilted "sticker" badges, sector emoji icons that wiggle on hover, a scrolling sector marquee, cursor-tilt policy cards. Accessible: skip link, visible focus, keyboard-operable slide-over (Esc closes), `prefers-reduced-motion` respected, responsive from 360 px (verified: no horizontal overflow at 375 px).

## 9. Data model (Supabase)
```
contact_queries(id uuid pk, name, email, phone null, organisation null, category enum, message, consent bool, created_at, status default 'new')
startup_applications(id, founder_name, email, startup_name, sector_slug, stage, pitch text, created_at)
faq_items(id, question, answer, category, source_url, source_date, sort_order)
startup_stories(id, slug, name, sector_slug, state, founded_year, summary, source_urls jsonb, published_at, verified_by, verified_at)
news_cache(key text pk, payload jsonb, fetched_at timestamptz, status)
```
- **RLS on all tables.** Public: `SELECT` on `faq_items`, `startup_stories`. Inserts to `contact_queries`/`startup_applications` only via server route using the service-role key (server-only env var) with zod validation, honeypot field + rate limit (e.g. 5/hour/IP) to stop spam. Personal data minimised; privacy notice + consent checkbox (DPDP Act 2023 awareness **[AI]**).

## 10. Content & verification policy (answers your points 3.4–3.7)
- **Allowed sources:** pib.gov.in, data.gov.in, dpiit.gov.in, startupindia.gov.in, investindia.gov.in, makeinindia.com, ipindia.gov.in, ministry sites; for stories also company press releases/funding announcements and reputable business press (e.g. Inc42, Economic Times, Mint, Business Standard).
- **Every fact card** shows: source name, URL, **publication date**, and label (*Government* / *Company announcement* / *Press*).
- **Startup stories rule:** a story is published only if ≥ 2 independent sources exist, or 1 government/company primary source; all stored in `source_urls`; `verified_by`/`verified_at` filled by a human (Bhoomi) — **I will not invent stories, funding figures, or citations.** If I can't verify, the row stays `draft` and is flagged in the report.
- **Candidate headline stat (not yet publishable):** "2.23 lakh+ DPIIT-recognised startups as of 31 Mar 2026; 55,200+ added in FY26; 23.36 lakh direct jobs; Maharashtra 38,660 / Karnataka 22,600 / UP 21,960" **[S]** from news (Inc42) citing the Commerce Ministry → **[TBV] against the PIB release before use.**
- **AI-generated content** (summaries, FAQ rewrites, suggested copy) is labelled "AI-assisted summary" in the UI and reviewed by Bhoomi. Facts are never AI-generated.
- **Copyright:** summaries + attribution + link; no full-article copying; logos only if permitted.
- **Blocked sources:** if a site blocks automated access, we do not bypass it. We flag it as missing, use the RSS/API route, or Bhoomi supplies the text manually (documented in `docs/data-register.md`).

## 11. Access register — what is blocked, why, what's needed
| Host | Status from build environment | Why | Authorised alternative / need |
|---|---|---|---|
| makeinindia.com | Blocked (403 CONNECT / DNS) | Sandbox network allow-list | Search snippets (done); Bhoomi browser audit; or add host to allow-list |
| investindia.gov.in, startupindia.gov.in, dpiit.gov.in, ipindia.gov.in | Blocked | same | same + official PDFs downloaded by Bhoomi |
| data.gov.in (API) | Blocked | same | Free registration → API key; runs at deploy/dev time on Bhoomi's machine |
| pib.gov.in (RSS) | Blocked | same | No key; works from Bhoomi's machine/deployment |
| gnews.io / newsapi.org | Blocked | same | Free account + key; **cannot be live-tested here** |
| News sites (Inc42, ET, Mint) | Blocked | same | Cite links; no scraping |

**Consequence:** I can build and unit/integration-test everything here using **mocked provider responses (clearly labelled test fixtures, never shown in production UI)**. The first *live* test must be run on Bhoomi's machine with her key: `npm run check:news` (a script I'll add) makes one real call and prints OK/FAIL.

## 12. Digital-marketing & AI components (for the subject rubric) [AI]
- **SEO:** semantic HTML, unique titles/meta, OpenGraph, `sitemap.xml`, `robots.txt`, JSON-LD (`Organization`, `FAQPage`, `NewsArticle` pointers), clean URLs, internal linking replacing external leaks.
- **Analytics & funnel:** privacy-friendly analytics (e.g. Plausible/Umami or GA4) with events: sector_open, news_click, policy_expand_all, form_submit; funnel Visit → Sector → Investor Desk → Form.
- **Content marketing:** startup stories + articles as shareable cards; newsletter signup (stretch).
- **AI use (transparent):** (a) keyword-expansion for sector queries; (b) AI-assisted short summaries of official text, labelled; (c) optional FAQ semantic search (stretch). AI never supplies facts.
- **Before/after report:** PageSpeed + accessibility + link-leak count + content freshness.

## 13. Implementation plan & files (to be created on approval)
```
package.json, next.config.ts, tsconfig.json, .env.example, .gitignore (.env*), README.md
src/app/(layout/pages): layout.tsx, page.tsx, sectors/, news/, investor-desk/, policies/{ipr,fdi}/, startups/, articles/, faq/, contact/, about-data/
src/app/api/news/route.ts          # server-only fetch + cache + dedupe
src/app/api/contact/route.ts       # validation → Supabase
src/lib/news/{providers/gnews.ts, providers/pib.ts, dedupe.ts, cache.ts, sectors.ts}
src/lib/supabase/{server.ts}       # service-role, server only
src/components/{SectorGrid, NewsPanel, PolicyCard, Accordion, StoryCard, SourceBadge}.tsx
supabase/migrations/001_init.sql   # tables + RLS
scripts/{check-news.ts, check-links.ts}
tests/ (vitest): dedupe, sector query builder, route error cases (401/429/empty), form validation
docs/{data-register.md, audit-template.md}
```
Milestones: M1 scaffold+design system → M2 sectors+news API (mocked) → M3 policies+investor desk → M4 stories+FAQ+forms+Supabase → M5 SEO/analytics/tests → M6 report assets.

**Run commands (after build):** `npm install` · copy `.env.example` → `.env.local` and fill `GNEWS_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` · `npm run dev` (http://localhost:3000) · `npm test` · `npm run check:news`. Production: set the same variables in Vercel → Project → Settings → Environment Variables.

## 14. Risks
| Risk | Mitigation |
|---|---|
| Free news tier delay / non-commercial limit | Label "latest headlines", PIB RSS as official stream, academic-demo only or upgrade |
| Gov feeds change format/ block bots | Parser tolerant; fall back to stale cache; flag missing |
| Unverified stats slip in | Evidence labels + `verified_at` gate + `/about-data` page |
| Leaked key | Rotate; server-only env; secret scan |
| Policy content outdated (FDI 2020) | Compare to current Consolidated FDI Policy; show "last reviewed" date |

## 15. Decisions needed from Bhoomi to approve
1. Confirm the 12 service-sector names/order (§2.1).
2. Create a free **GNews** account + (optional) **data.gov.in** account; rotate the leaked key.
3. Is the deployment a non-commercial academic demo? (affects free-tier eligibility)
4. Provide 5–10 startup names you want featured (or let me propose candidates, which you must verify before they go live).
5. ~~Colour direction~~ — resolved: author palette applied (§8).
6. Approve this PRD → I start M1.

## Sources consulted (search snippets only; pages not fully readable here)
- makeinindia.com/sectors, /policy/foreign-direct-investment, /policy/intellectual-property-facts, /about
- investindia.gov.in/blogs/fdi-make-india-transforming-manufacturing-landscape
- Inc42, "Centre Recognises Record 55,200 Startups In FY26" (secondary)
- Feeder directory entry for PIB RSS (secondary); third-party OGD API catalogues (secondary)
- GNews pricing summaries from third-party comparison sites (secondary — verify on gnews.io)
