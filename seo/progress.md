# SEO Project Progress

Last updated: 2026-08-24

## Phase status

| Phase | Status | Evidence / next gate |
|---|---|---|
| Phase 1 — skills, product, keyword, competitor, audit | Complete with explicit measurement blockers | Research files in this directory; no product code changed |
| Phase 2 — architecture + first 10 pages + sitemap/schema/internal links | Live | Released to `ali` on 2026-08-24; ten pages, 11-URL sitemap, home resource hub, schema, repeatable checks and browser evidence verified publicly |
| Phase 3 — five guides | Not started | Start only after landing-page product claims pass review |
| Phase 4 — 10–20 quality backlink candidates and submissions | Gated | Pages live, crawlable, reviewed, in sitemap, GSC confirmed |

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

## Blocking / manual items

1. **Google Search Console access:** confirm Domain property, sitemap submission, URL indexing, query data, migration status, CWV and manual actions.
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

1. Confirm the Search Console Domain property and submit or refresh `https://autopricy.com/sitemap.xml`.
2. Inspect the 11 canonical URLs and request indexing where appropriate.
3. Record baseline impressions, clicks, queries, countries and devices before content expansion.
4. Complete Phase 3’s five guides and link them to the relevant platform and feature pages.
5. Re-run mobile/desktop performance traces before the next release.

No backlink candidate should move to `submitted` before these steps pass.
