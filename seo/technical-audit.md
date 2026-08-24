# Technical SEO Audit

Audit date: 2026-08-24

Scope: `https://autopricy.com/`, current `Tailcast/dist`, legacy-domain redirect checks, and public HTTP responses.

## Executive result

The public site is static HTML and crawlable without client JavaScript. Phase 2 expanded the sitemap to 11 canonical URLs, added direct home-page links to the commercial page set, moved the three original commercial pages to English, and repaired the app robots response. The main remaining measurement blockers are Search Console index coverage and field/lab Core Web Vitals.

## Verified checks

| Check | Result | Evidence / action |
|---|---|---|
| Public home status | Pass | HTTP/2 200 |
| Existing landing status | Pass | Worten, FNAC, Mirakl pages return 200 |
| Unknown public URL | Pass | Returns 404, not a soft-404 SPA fallback |
| `robots.txt` | Pass | 200, allows crawl, points to canonical sitemap |
| `sitemap.xml` | Pass | 200; home + 10 Phase 2 pages, all with release-date `lastmod` |
| Canonical | Pass | Self-referencing canonical on all 11 sitemap pages |
| Meta title/description | Pass | Unique values exist; commercial pages align with English target queries |
| OpenGraph | Partial | Home has full OG image metadata; landing pages omit some image/locale details |
| Structured data | Pass syntactically | Valid JSON-LD: Organization, SoftwareApplication, FAQPage on home; WebPage and BreadcrumbList on platform pages |
| H1 | Pass | Exactly one H1 per current page |
| SSR/SSG/crawlability | Pass | Content is present in server-delivered static HTML; JS is not required for main copy |
| Legacy redirects | Mostly pass | Domain migration script passed redirects/canonicals/noindex guards except app robots |
| App indexability | Intentional noindex | App and legal/help pages return `noindex`; app sitemap is 410 |
| App `robots.txt` | Pass | 200 with `Disallow: /`; app pages retain HTTP `noindex` |
| Internal links | Pass | Home links to platform pages, solution page and feature pages through the platform strip, resource hub and footer |
| Phase 2 pages | Pass | Ten commercial/resource pages return 200; unknown public paths still return 404 |
| Compression | Pass for HTML | Homepage served with gzip when requested with compression |
| Static caching | Needs improvement | Sample HTML/images expose ETag/Last-Modified but no explicit Cache-Control/Expires headers |
| Mobile basics | Pass in code, visual run incomplete | Viewport meta, responsive breakpoints at 1020/760/430, responsive image rules and reduced-motion handling exist |
| Google verification | Pass for public site | Verified URL-prefix property `https://autopricy.com/` is accessible; Domain property is not accessible to the current account |
| GSC sitemap | Refreshed | `sitemap.xml` resubmitted successfully on 2026-08-24; previous read showed four discovered pages and must refresh to the new 11-URL version |
| Priority URL indexing | Partial | Worten, FNAC and Mirakl indexed; Darty and OnBuy discovered/not indexed; Cdiscount unknown to Google; requests submitted for all six |
| Analytics | Present | Umami loads deferred from app domain and registration CTAs carry event names |

## Indexing and discovery risks

1. **New-page index coverage is partial.** GSC confirms Worten, FNAC and Mirakl are indexed. Darty and OnBuy are discovered but not indexed; Cdiscount was unknown to Google on 2026-08-24. All three received indexing requests, which do not prove future inclusion.
2. **The homepage remains Chinese while commercial SEO pages are English.** This is intentional for the current customer journey, but future localisation needs distinct, stable language URLs before adding hreflang alternates.
3. **Old-domain snippets can persist.** The redirect map passes, but research still surfaced `wortenprice.com`. Continue the 301s and request validation in GSC rather than creating duplicate pages.

## Metadata and schema recommendations

Completed in Phase 2:

- Linked platform pages from the home resource hub, platform strip and shared footers.
- Added every released canonical page to the sitemap with the actual release date.
- Added `FAQPage` only where matching FAQs are visible and non-promotional.
- Kept `SoftwareApplication` relationships conservative and added no fake ratings, reviews, customers or outcomes.
- Used the existing 1200×630 branded OG fallback on the commercial page set.
- Made commercial pages English while retaining the current Chinese homepage; no unsupported hreflang translations were added.

P1:

- Add breadcrumb schema to Phase 3 guides; Phase 2 feature pages already include it.
- Add an HTML sitemap/resource hub once the site exceeds roughly 15 useful pages.
- Add author/reviewer and reviewed-date signals to technical guides where real review ownership exists.

## Performance and Core Web Vitals

What was verified:

- homepage HTML is about 41 KB uncompressed and gzip is enabled;
- the above-the-fold workspace WebP is about 49 KB and has explicit dimensions plus `fetchpriority="high"`;
- most content is static and there is little execution-heavy JavaScript;
- several older PNGs in `doc-images` are 180–988 KB, although many are not used above the fold;
- no explicit long-lived cache header was found on sampled static assets;
- images in the current homepage include dimensions and lazy loading for below-the-fold screenshots.

What remains unverified:

- lab FCP/LCP/TBT/CLS/Speed Index: Chrome DevTools performance MCP was unavailable, the connected browser session timed out, and the public PageSpeed API returned quota-exhausted (429);
- field Core Web Vitals/CrUX: no API result or Search Console Core Web Vitals access was available;
- mobile visual overflow/interaction: code inspection passed, but a reliable rendered mobile capture was not completed.

Do not invent a Lighthouse score. Re-run mobile and desktop Lighthouse or Chrome DevTools traces before the next production release, then record exact values here.

## Security/HTTP hygiene relevant to SEO

The sampled responses did not show explicit cache policy in the header excerpt. Before changing Nginx, verify the complete active server block and current security headers. Recommended static policy after validation:

- immutable or long-lived caching for fingerprinted assets;
- a shorter cache for HTML, robots, and sitemap;
- Brotli if supported in the deployed Nginx build, while retaining gzip;
- CSP/security headers only after testing Umami, app links, images, and structured-data delivery.

## Search Console manual checklist

- [x] Confirm the accessible URL-prefix property for `https://autopricy.com/`; Domain-property access remains optional for subdomain-wide reporting.
- [x] Submit/refresh `https://autopricy.com/sitemap.xml`; recheck the next successful read and discovered-page count.
- [ ] Inspect the 11 current canonical URLs; six priority platform URLs are complete.
- [ ] Export Pages/Indexing reasons and Core Web Vitals.
- [ ] Export 16 months of queries/pages/countries/devices when available.
- [ ] Annotate the `wortenprice.com` → `autopricy.com` migration date.
- [ ] Add organic registration and activation events to the measurement model.

## Reproduction commands

```bash
bash scripts/check-domain-migration.sh
curl -sSIL https://autopricy.com/
curl -sS https://autopricy.com/robots.txt
curl -sS https://autopricy.com/sitemap.xml
curl -sSIL https://autopricy.com/unknown-seo-migration-check
```
