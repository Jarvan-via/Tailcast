# SEO Project Progress

Last updated: 2026-10-04

## Phase status

| Phase | Status | Evidence / next gate |
|---|---|---|
| Phase 5 — Chinese-seller pivot: zh landing pages, CTR metadata, legacy redirects | Built 2026-10-04; deploy + nginx reload pending | See "Phase 5" below |
| Phase 1 — skills, product, keyword, competitor, audit | Complete with explicit measurement blockers | Research files in this directory; no product code changed |
| Phase 2 — architecture + first 10 pages + sitemap/schema/internal links | Live | Released to `ali` on 2026-08-24; ten pages, 11-URL sitemap, home resource hub, schema, repeatable checks and browser evidence verified publicly |
| Phase 3 — five guides | Live | Five evidence-bound guides, Article/FAQ schema, citations and two-way internal links; deployed and publicly verified on `ali` |
| Phase 4 — 10–20 quality directory candidates and submissions | Pass A started; stalled since 2026-08-25 (approval window expired 2026-09-25) | First 10 sites inspected: 7 passed, Product Hunt routed to a separate launch workflow, and 2 AI-directory mismatches skipped; no forms or submissions |

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

## Phase 3 production release — 2026-08-24

- Published five marketplace-specific guides for Mirakl, Worten, OnBuy, FNAC/Darty and Cdiscount; each contains roughly 750–830 rendered words and cited primary sources.
- Added Article, BreadcrumbList and visible/matching FAQPage structured data, stable canonicals, English hreflang, guide-to-platform links and platform-to-guide links.
- Extended the sitemap from 11 to 16 canonical URLs and expanded deterministic checks for Article schema, source sections and guide heading depth.
- Browser-checked desktop and 390 px mobile layouts; inspected all five guides with zero console errors or warnings.
- Pushed `2bb48d1 feat(seo): publish marketplace repricing guides` to `origin/main` and deployed the static tree to `ali:/home/homepage/autopricy/dist`.
- Preserved the previous live tree at `/home/homepage/autopricy/dist.backup-20260824-phase3-2bb48d1` for rollback.
- Public verification: all 16 sitemap URLs return 200, an unknown URL returns 404, the public sitemap SHA-256 matches the built artifact, and the complete domain-migration check passes.

## Next low-risk execution batch

1. Recheck the refreshed sitemap and the Darty, OnBuy and Cdiscount indexing states in 3–7 days.
2. Inspect the remaining five canonical URLs and export Page Indexing/CWV data when available.
3. Resubmit the 16-URL sitemap and request discovery for Phase 3’s five guides in Search Console.
4. Re-run mobile/desktop performance traces before the next release.

No backlink candidate should move to `submitted` before these steps pass.

## Phase 4 Pass A — 2026-08-25

- Applied the SPD V2 Quality gate to a pilot batch of ten sites; did not traverse a bulk source list.
- Prioritized ecommerce and governed B2B software discovery surfaces over generic startup or AI directories.
- Passed eCommerce Tech, Capterra, G2, SourceForge, Software Advice, GetApp and SaaSHub for later per-site form review.
- Routed Product Hunt out of the directory workflow because it is a coordinated public launch and community publication.
- Skipped SellerTrove and EcomAI because Autopricy is not positioned as an AI product and their current audience/platform framing is a weak fit.
- Saved per-site evidence, quality dimensions, duplicate-search notes and idempotency keys under `seo/backlinks/`.
- Search Console sitemap resubmission remains pending because the authenticated page repeatedly timed out under browser control; no blind submission was attempted.

## Phase 5 — Chinese-seller pivot — 2026-10-04

Decision (project owner, 2026-10-04): paying customers are Chinese cross-border sellers. Evidence: Chinese homepage, CNY pricing, +86 support, ICP filing; GSC clicks came from Japan, Hong Kong and Singapore (typical Chinese VPN exits) while US/UK/NL impressions produced no clicks.

Built in this change set:

- Ten Chinese pages under `/zh/` (`scripts/zh-pages.mjs`): Worten, FNAC, Darty, OnBuy, Cdiscount, Mirakl, multi-marketplace hub, automatic repricing, min/max protection, multi-store bulk repricing. Pages carry real product screenshots where one matches the platform, the ¥168/店铺/月 plan, phone support, Chinese FAQ and FAQPage schema. Claims stay inside `product-capabilities.md`; the checker rejects 保证拿到购物车 / 实时调价 and unsupported-platform repricing wording.
- English pages and their `/zh/` counterparts declare reciprocal `hreflang` (`en`, `zh-CN`, `x-default` → English) and show a visible language switch, so Chinese searchers landing on English pages can move to Chinese copy. The checker verifies reciprocity.
- English titles/descriptions rewritten for CTR (both "Repricer" and "Repricing Software", free trial, unlimited SKUs); short breadcrumb names; five guide titles sharpened. Baseline: `/worten-repricer/` had 56 impressions and 0 clicks.
- Homepage: keyword-bearing title/description/H1, `WebSite` entity (fixes the dangling `#website` reference on every landing page and gives Google a site name), Organization/Software `alternateName`; resource grid, platform strip and footer link the Chinese pages; English pages keep a footer column.
- Legacy `wortenprice.com` Chinese keyword URLs now 301 to dedicated Chinese pages instead of homepage fragments (see `docs/seo-url-migration-map.md`).
- Sitemap: 26 URLs, `lastmod` 2026-10-04. IndexNow key file `dist/438db09e85513490b9d62c07118a1572.txt` and `scripts/submit-urls.mjs` (IndexNow + optional Baidu push; dry run by default).

Follow-up batch (same day):

- Five Chinese guides under `/zh/guides/` (`scripts/zh-guides.mjs`), each the hreflang alternate of its English guide and citing the same marketplace sources; titles target Chinese seller queries (Worten 购物车规则, OnBuy 怎么抢购物车, Cdiscount 平台底价 vs 自动调价…). Chinese platform pages now link their guide first.
- Guide hubs `/guides/` and `/zh/guides/` (CollectionPage + ItemList); guide breadcrumbs link the hub; landing-page nav, footers and the homepage link the hubs.
- Per-platform Open Graph covers in `dist/og/` (14 JPEGs, ~50 KB each) rendered by `scripts/build-og-images.mjs` from `scripts/og.mjs`; every landing page and guide now uses its platform cover. Re-run the renderer only when cover copy changes (needs Playwright + Chromium).
- `detail.png` (192 KB) replaced by `detail.webp` (48 KB) on the homepage and the Chinese min/max page; the PNG stays for any external references.
- Checker: 33 URLs, hub-aware guide rules, Chinese source heading, og:image file must exist; the Chinese claim guard ignores negated questions (能保证…吗 / 不能保证).

Manual steps after deploy (in order):

1. Deploy `dist/` and reload Nginx with the four updated `deploy/nginx/*wortenprice*.conf` files; run `bash scripts/check-domain-migration.sh`.
2. Google Search Console: resubmit the sitemap; request indexing for the `/zh/` landing pages, `/zh/guides/` and the two hubs.
3. 百度搜索资源平台: add `https://autopricy.com`, verify (HTML meta tag or file), submit the sitemap, then `BAIDU_PUSH_TOKEN=… node scripts/submit-urls.mjs --send --only=/zh/`.
4. Bing Webmaster Tools: import from GSC or verify, submit the sitemap, then `node scripts/submit-urls.mjs --send` (IndexNow).
5. Recheck in 7–14 days: `/zh/` index state (Google + Baidu `site:autopricy.com/zh/`), CTR on the rewritten English titles, Umami `seo_zh_*` register events.

Not done (needs owner input or content outside this repo):

- Move the help center from `app.autopricy.com/help.html` (noindex) to indexable Chinese tutorials on the main domain.
- Chinese distribution/backlinks: AMZ123-style seller navigation sites, 知乎, 公众号, 雨果网; marketplace partner directories (Octopia/Cdiscount, Mirakl, OnBuy); Chrome Web Store listing for the collection extension.
- Chinese how-to tutorials that need product screenshots or account steps (e.g. Worten API 授权教程), ideally merged with the help-center migration.

## Handoff tasks 1–5 — 2026-10-04

- Read `seo/codex-handoff.md` from commit `5044f96`; fast-forwarded local `main` to `origin/main` (`6bf699a`). Retained the handoff document in this change set.
- Task 1: rebuilt 33 URLs and passed `SEO checks passed with 0 warning(s)`; deployed to `ali:/home/homepage/autopricy/dist` without `--delete`. Backup: `/home/homepage/autopricy/dist.backup-20261004-phase5-6bf699a`. All 33 public URLs and the IndexNow key, OG image and detail screenshot returned 200. Public sitemap matched local SHA-256 `03b279a93640490d3700a38b715be0c6cd3ff1a40e3d10918a75987419a7e80f`.
- Rollback to the pre-release tree: `ssh ali 'sudo mv /home/homepage/autopricy/dist /home/homepage/autopricy/dist.failed-20261004-phase5 && sudo cp -a /home/homepage/autopricy/dist.backup-20261004-phase5-6bf699a /home/homepage/autopricy/dist'`. The failed tree remains available, and repository-external files are preserved in the backup.
- Task 2: changed only the four exact-path redirects in each of the four live legacy HTTP/HTTPS configs; backed up each to `<original>.backup-20261004-phase5`; `sudo nginx -t` passed before reload. All four public www redirects passed 301 → correct Chinese URL → 200, including apex homepage migration.
- Full domain check exposed two existing blockers: expired `vip.wortenprice.com` TLS certificate and missing `app.autopricy.com/robots.txt`. No TLS bypass or `SKIP_APEX` used. Follow-up repair is recorded below.
- Task 3: pending an authenticated GSC session; no new sitemap/index requests claimed.
- Task 4: IndexNow dry run listed 33 URLs, then the live submission returned HTTP 202. This confirms receipt, not indexing. Bing login/import and sitemap submission remain manual.
- Task 5: pending Baidu verification meta and account verification; no token supplied or stored, no Baidu API push performed.
- Local raw verification artifacts are under ignored `output/seo-20261004/`; public URLs, status, hashes and rollback paths are preserved here.

## Handoff task 6 — public Chinese help center — 2026-10-04

- Read the active app root `/home/homepage/wortener-autopricy/dist/help.html` (SHA-256 `e27a006cd39c3ef6b5760aa9c9978ee16639001ca60cd1baf49fc90bfb686b8e`); the application help file was not modified.
- Added 11 task-specific tutorials plus `/zh/help/`, using `scripts/zh-help.mjs` and the existing Chinese guide template: authorization, binding, Offer sync, rule export/import, schedule, batch follow-selling, OnBuy Product/Listing, Cdiscount API/Product/Offer, batch actions, invoices and collection extension.
- Retained platform-specific fields and asynchronous-result boundaries. Excluded obsolete Catch availability and the source FAQ’s unsupported instantaneous/guaranteed-result wording. The capability matrix constrains all new copy.
- Reused only three reviewed screenshots: blank rule-import form, schedule form and an export toolbar explicitly identified as local sample data in the source. Converted them to WebP at quality 82 with Chinese alt and intrinsic dimensions. No seller credentials or customer data were present. Remaining authorization, shop/product/order-list screenshots were not republished pending individual data review.
- Linked the hub from homepage footer, all ten Chinese platform/feature pages, and Chinese guide footers. Added `seo_zh_help_*` registration-click events; these measure intent, not completed registrations.
- Checker now validates 45 sitemap URLs, unique title/description, Help Article/CollectionPage schema, visible/schema FAQ consistency, corresponding platform/feature links and image targets. Rebuild and checks passed with 0 warnings.
- Browser checked all 12 new pages at 1440 × 900 and 390 × 900: one H1, no horizontal overflow, no missing completed images; representative screenshots were visually reviewed.
- Backed up the 33-URL release to `/home/homepage/autopricy/dist.backup-20261004-before-help`; deployed without `--delete`. All 45 public sitemap URLs return 200; public/local sitemap SHA-256 `6eec3c4e59adfd8d69109436db5fa968bf928ed886ba3892aea94c0e728f73f0` matches. Full app help remains `noindex,follow`.
- Re-submitted the new 45-URL set to IndexNow: see subsequent receipt record. Google/Bing/Baidu sitemap discovery can lag and must be confirmed separately.
- Repaired the app robots file at its actual current root from `deploy/app-autopricy-robots.txt`: HTTP 200 with `Disallow: /`. The separate legacy vip TLS issue is still pending CDN administration.

## Handoff task 7 — channel materials — 2026-10-04

- Saved verified official partner routes and unresolved eligibility requirements in `seo/backlinks/partner-programs.md` for Mirakl, Octopia/Cdiscount, OnBuy/OnCommerce and Worten. No partner application, email, registration or directory submission was sent. Software directory authorization remains expired; per-site approval is still required.
- Created three reviewed Chinese article drafts and an approximately 200-character directory introduction in `seo/content-drafts/`; attached source URLs and an editorial/claim record. These are draft artifacts, not published channel posts.
- Discovered that Chrome task 7.3 was already partly satisfied: official store listing `pngledhnbhabccffpipmjmocglimgbcp` is public as “调价先锋采集器”. Verified through the store itself, added its link to homepage/tutorial and product master data. No developer payment or duplicate listing attempted.
- Follow-up IndexNow submission after Help release: all 45 URLs received HTTP 200. Receipt is not proof of search indexing.

## Handoff tasks 8–9 — 2026-10-04

- Task 8.1: added one asset-only location to the public `autopricy.com` server, backed up `/etc/nginx/conf.d/autopricy-https.conf` to `.backup-20261004-static-cache`, tested nginx successfully and reloaded. Verified 30-day Cache-Control on CSS, JPEG and WebP, with no long cache on HTML/robots/sitemap. Synced the public rule to `deploy/nginx/autopricy-seo-guards.conf`.
- Added content-hashed CSS query versions in the page generators to avoid stale styles after later releases; rebuilt, passed all 45-page checks with 0 warnings, and deployed.
- Task 8.2: completed six serial public Lighthouse runs (three pages × mobile/desktop); exact LCP/CLS/TBT/FCP and scores are in `seo/technical-audit.md`. They are local lab observations; field INP/CWV remain unverified. Mobile TBT is high and one CPU warning is documented.
- Task 8.3: owner explicitly chose to retain `yuanyongvia@gmail.com`; no replacement mailbox was guessed.
- Task 9: created and verified active thread heartbeat `tailcast-seo-7-14`, scheduled for Sunday 10:00 Asia/Shanghai with two occurrences (2026-10-11 and 2026-10-18). It requests genuine GSC/Baidu/Umami data, stops at login/verification requirements, and avoids repeated unchanged-blocker notifications. Future measurements have not happened yet.
- Legacy vip HTTPS remains the complete migration check blocker: origin certificate also expired on 2026-09-26; public DNS is an Aliyun CDN CNAME. Renewal/replacement of the CDN-delivered certificate needs the owner’s CDN administration. No insecure curl mode or removal of checks was used.

## Delivery and remaining manual gates — 2026-10-04

- Code/artifacts and channel research were committed on linear `main` (9494de5, 49f1f81, 9bb74bf, 4f08738); production deploy was performed separately and verified.
- Complete migration script after app robots repair: five failures, all expired TLS on `https://vip.wortenprice.com/` and its help/privacy/terms/unknown checks. Public legacy Chinese redirects, apex, canonicals, unknown public 404, app noindex and app robots all pass.
- Manual gates from the handoff: renew/configure the legacy vip CDN certificate (and its expired origin certificate); Bing login/import and sitemap submission; Baidu site verification meta, verification completion, sitemap and token via `BAIDU_PUSH_TOKEN`; renewed per-site software-directory authorization and company review/publication of drafts. No token, password or verification code is in the repository.
- Public content deployment, GSC requests, search-engine receipt, indexing and completed registrations remain distinct outcomes. See `seo/gsc-baseline.md` for actual observed GSC statuses.

## Handoff task 3 follow-up — observed GSC results — 2026-10-04

- Accessed the owner's existing verified Chrome GSC session; successfully re-submitted `sitemap.xml` after the 45-URL deployment. GSC last-read remains 2026-09-25 with 16 discovered URLs; the updated submission date is 2026-10-04. Discovery/indexing of all 45 is not confirmed.
- Both Chinese Worten and FNAC inspected as unknown to Google / not indexed, then each displayed “已请求编入索引” and confirmation of entry into the priority crawl queue.
- Cdiscount inspection stalled while retrieving Google index data. Browser rebinding, inspection reload and property-overview reload produced blank content; browser control also returned `noWindowsAvailable`. No Cdiscount indexing request was sent, and the next six priority URLs plus subsequent Help/features/guide requests remain pending. Task 3's first-nine-request acceptance is not met. Exact statuses and baseline metrics are in `seo/gsc-baseline.md`.
- Bing showed its public Sign In page; Baidu showed its login flow. Did not enter credentials, solve verification, import sites or submit their sitemaps. Resume after owner completes login and Baidu site-verification setup.
- Final local page checks: 45 pages, 0 warnings. English contact remains `yuanyongvia@gmail.com` per owner response.

## VIP certificate renewal and direct origin — 2026-10-04

- Owner authorized renewing `vip.wortenprice.com` and explicitly removing its CDN route. Backed up the certificate, private key, Nginx configuration, old acme state and root crontab under `/root/certificate-backups/vip-wortenprice-20261004T154144Z` with restricted permissions; no key material was copied into Git.
- Existing AliDNS credentials could not manage `wortenprice.com` (`Forbidden.RAM`); DNS-01 did not issue a certificate. Repaired HTTP-01 challenge locations in the actual `/etc/nginx/conf.d/vip-wortenprice-migration.conf`, including an explicit port-80 VIP server, and confirmed the public probe returned its exact contents with HTTP 200. `nginx -t` passed before reload.
- Renewed the existing ECC certificate using the configured webroot, installed full chain and matching key at `/etc/nginx/cert/vip.wortenprice.com.pem` and `.key`, and reloaded after successful Nginx validation. Validity: 2026-10-04 14:46:18 UTC through 2027-01-02 14:46:17 UTC; issuer Let's Encrypt YE2. Public-key fingerprints matched.
- Preserved the existing root acme cron and stored `nginx -t && systemctl reload nginx` as the installation/reload command for future renewals. Acme schedules the next renewal for 2026-12-02. Removed the failed duplicate DNS-01 state and unused temporary API helper.
- Used the owner's existing authenticated Aliyun console to pause the VIP CDN CNAME and enable the already-existing A record `123.57.231.102`, TTL 600, at 23:48:55 Asia/Shanghai. Both authoritative name servers, Google DNS and Cloudflare DNS returned the direct A record. The inactive CNAME was retained for review; no other domain record changed.
- Strict TLS checks against the explicit origin and ordinary DNS from `ali` passed. A fresh local direct connection also returned Nginx HTTP 301 to `https://app.autopricy.com/`; the full Help redirect chain returned 200. The local HTTPS proxy still cached the old CDN certificate, so verification also used a direct connection without that proxy; certificate verification was never disabled.
- Expanded the migration check to HTTP VIP redirects and HTTPS login/register. Remote complete migration check: all 36 checks passed, no skipped apex and no insecure TLS option. Local complete migration check also passed all 36 checks, with `NO_PROXY` scoped only to VIP to avoid the stale local HTTPS proxy cache; all TLS checks remained enabled.
- After the ten-minute DNS cache window, selected only VIP in the CDN console and attempted Stop. No completion/Offline confirmation was available: Chrome showed concurrent Claude debugging, pages/windows changed during control, and the CDN content became blank. Stop status remains unconfirmed; DNS already bypasses CDN. Asked the owner to pause the other browser controller or stop only VIP in the console. This is browser contention, not a request for new authorization.
