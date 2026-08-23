# SEO Project Progress

Last updated: 2026-08-24

## Phase status

| Phase | Status | Evidence / next gate |
|---|---|---|
| Phase 1 — skills, product, keyword, competitor, audit | Complete with explicit measurement blockers | Research files in this directory; no product code changed |
| Phase 2 — architecture + first 10 pages + sitemap/schema/internal links | Not started | Use the stable URL decision in `opportunities.md` |
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
3. **Core Web Vitals:** Chrome DevTools performance tooling was unavailable and PageSpeed public API quota was exhausted. Run mobile + desktop lab traces and export GSC field data before Phase 2 release.
4. **Mercado Libre production proof:** recheck feature flags, OAuth, seller model, site eligibility, pricing automation conflict, a real write/read-back, and Catalog eligibility before public availability claims.
5. **RDC naming:** verify that the current public operator is Rue du Commerce; do not map it to Rakuten France.
6. **Darty/ePRICE/other operator live proof:** review current active deployment/account evidence before publishing individual pages.

## Next low-risk execution batch

1. Repair the public internal-link graph and `app.autopricy.com/robots.txt` expectation/behavior.
2. Implement the English information architecture without changing the three existing canonical platform URLs.
3. Improve the three existing pages and add Darty, OnBuy, Cdiscount, multi-marketplace, and three feature pages.
4. Update sitemap and shared navigation/footer, then run status/canonical/schema/link checks.
5. Render desktop/mobile pages and complete human content review.
6. Confirm GSC and request indexing where appropriate.

No backlink candidate should move to `submitted` before these steps pass.
