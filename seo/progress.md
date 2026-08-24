# SEO Project Progress

Last updated: 2026-08-24

## Phase status

| Phase | Status | Evidence / next gate |
|---|---|---|
| Phase 1 — skills, product, keyword, competitor, audit | Complete with explicit measurement blockers | Research files in this directory; no product code changed |
| Phase 2 — architecture + first 10 pages + sitemap/schema/internal links | Live | Released to `ali` on 2026-08-24; ten pages, 11-URL sitemap, home resource hub, schema, repeatable checks and browser evidence verified publicly |
| Phase 3 — five guides | Not started | Start only after landing-page product claims pass review |
| Phase 4 — 10–20 quality backlink candidates and submissions | Gated | Pages live, crawlable and in sitemap; wait for refreshed sitemap/index coverage and guide review |

## Completed on 2026-08-24

- Read the full `flaqai/backlink_skills` README and all six skill entrypoints.
- Installed `submit-product-directories-v2-quality` and `writer` into the Codex skill directory.
- Explicitly rejected V1 Batch for this project; no 743-site list traversal or submission was performed.
- Reviewed Autopricy’s product/domain and marketplace matrix plus current admin, cron, frontend and marketing-site code.
- Corrected the support narrative: Catch offline; Fyndiq not a competitive repricer; no independent Rakuten/Allegro implementation; Mercado Libre conditional.
- Queried the live search landscape for 38 platform, commercial, how-to, and problem keywords.
- Built a Business Value Score that does not rely on fabricated search volume.
- Analyzed direct repricers, adjacent suites, official platform alternatives, page patterns, and content gaps.
- Audited live robots, sitemap, canonical, status codes, redirects, metadata, JSON-LD, static rendering, internal links, asset size/caching, analytics, and GSC verification marker.
- Initialized the backlink database schema without adding unqualified candidates.
- Opened the verified Search Console URL-prefix property for `https://autopricy.com/` and captured the trailing-three-month baseline: 7 clicks, 129 impressions, 5.4% CTR and average position 15.6.
- Resubmitted the 11-URL sitemap successfully; its previous crawl still showed four discovered pages.
- Inspected and requested re-indexing for the six priority platform URLs. Worten, FNAC and Mirakl are indexed; Darty and OnBuy are discovered but not indexed; Cdiscount was not yet known to Google.

## Blocking / manual items

1. **Google Search Console scope:** the verified URL-prefix property is accessible and now documented in `gsc-baseline.md`; the Domain property is not accessible to the current account. CWV, full Page Indexing export and manual-action review remain.
2. **Exact Google SERP capture:** raw Google returned a safeguard page and the connected browser timed out. Current competitor observations are live-search evidence, not exact frozen Google rank positions.
3. **Core Web Vitals:** Chrome DevTools performance tooling was unavailable and PageSpeed public API quota was exhausted. Run mobile + desktop lab traces and export GSC field data before the next production release.
4. **Mercado Libre production proof:** recheck feature flags, OAuth, seller model, site eligibility, pricing automation conflict, a real write/read-back, and Catalog eligibility before public availability claims.
5. **RDC naming:** verify that the current public operator is Rue du Commerce; do not map it to Rakuten France.
6. **Darty/ePRICE/other operator live proof:** review current active deployment/account evidence before publishing individual pages.

## Phase 2 production release — 2026-08-24

- Kept the existing flat canonical URL pattern and converted the three existing marketplace pages to English commercial-intent pages.
- Added Darty, OnBuy, Cdiscount, multi-marketplace, automatic repricing, min/max rules and multi-store pages.
- Added direct home-page links and a nine-card resource hub; no published page is orphaned.
- Expanded the sitemap from 4 to 11 canonical URLs with release-date `lastmod` values.
- Added visible FAQ plus matching FAQPage JSON-LD, WebPage and BreadcrumbList data to every SEO page.
- Added `scripts/build-seo-pages.mjs` and `scripts/check-seo-pages.mjs` so the page set and deterministic audit are reproducible.
- Browser-checked the homepage and all ten pages at 390 px; checked OnBuy at 1440 px and 390 px with full-page screenshots and zero console errors.
- Deployed an app-domain `robots.txt` that disallows crawling; the migration check now passes with HTTP 200.
- Pushed `50d3371 feat(seo): launch marketplace landing pages` and deployed its `dist` to `ali:/home/homepage/autopricy/dist`.
- Kept the previous production tree at `/home/homepage/autopricy/dist.backup-20260824-ksdhq9` for rollback.
- Public verification: all 11 canonical sitemap URLs return 200, an unknown path returns 404, public homepage/sitemap hashes match local artifacts, and the complete domain-migration script passes.

## Next low-risk execution batch

1. Recheck the refreshed sitemap and the Darty, OnBuy and Cdiscount indexing states in 3–7 days.
2. Inspect the remaining five canonical URLs and export Page Indexing/CWV data when available.
3. Complete Phase 3’s five guides and link them to the relevant platform and feature pages.
4. Re-run mobile/desktop performance traces before the next release.

No backlink candidate should move to `submitted` before these steps pass.
