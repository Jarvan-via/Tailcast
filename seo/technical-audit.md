# Technical SEO Audit

Audit date: 2026-08-24

Scope: `https://autopricy.com/`, current `Tailcast/dist`, legacy-domain redirect checks, and public HTTP responses.

## Executive result

The public site is static HTML and crawlable without client JavaScript. Canonicals, metadata, structured data, robots, sitemap, TLS, and true 404s are mostly healthy. The largest growth blockers are not rendering—they are a four-URL sitemap, missing internal links from the home page to the three existing landing pages, language/search-intent mismatch, and unconfirmed Search Console index coverage.

## Verified checks

| Check | Result | Evidence / action |
|---|---|---|
| Public home status | Pass | HTTP/2 200 |
| Existing landing status | Pass | Worten, FNAC, Mirakl pages return 200 |
| Unknown public URL | Pass | Returns 404, not a soft-404 SPA fallback |
| `robots.txt` | Pass | 200, allows crawl, points to canonical sitemap |
| `sitemap.xml` | Pass but too small | 200; only home + 3 landing pages |
| Canonical | Pass | Self-referencing canonical on all four public pages |
| Meta title/description | Pass with language issue | Unique values exist; wording needs alignment with English target queries |
| OpenGraph | Partial | Home has full OG image metadata; landing pages omit some image/locale details |
| Structured data | Pass syntactically | Valid JSON-LD: Organization, SoftwareApplication, FAQPage on home; WebPage and BreadcrumbList on platform pages |
| H1 | Pass | Exactly one H1 per current page |
| SSR/SSG/crawlability | Pass | Content is present in server-delivered static HTML; JS is not required for main copy |
| Legacy redirects | Mostly pass | Domain migration script passed redirects/canonicals/noindex guards except app robots |
| App indexability | Intentional noindex | App and legal/help pages return `noindex`; app sitemap is 410 |
| App `robots.txt` | Fail | `https://app.autopricy.com/robots.txt` returned 404 although the migration check expects 200 |
| Internal links | Critical fail | Home page contains no links to `/worten-repricer/`, `/fnac-repricer/`, or `/mirakl-repricer/` |
| Broken planned pages | Expected gap | `/onbuy-repricer/` currently returns 404; Cdiscount/Darty pages do not exist |
| Compression | Pass for HTML | Homepage served with gzip when requested with compression |
| Static caching | Needs improvement | Sample HTML/images expose ETag/Last-Modified but no explicit Cache-Control/Expires headers |
| Mobile basics | Pass in code, visual run incomplete | Viewport meta, responsive breakpoints at 1020/760/430, responsive image rules and reduced-motion handling exist |
| Google verification | Present, not fully confirmed | Home includes `google-site-verification`; domain property, sitemap submission and index status require GSC access |
| Analytics | Present | Umami loads deferred from app domain and registration CTAs carry event names |

## Indexing and discovery risks

1. **Existing platform pages are orphan-like.** Their footers cross-link to each other, but the authoritative home page does not link to them. Add a crawlable platform-resource section and footer links.
2. **The sitemap is only four URLs.** That reflects the current site, but it cannot create meaningful topical coverage.
3. **Language is mismatched.** Worten and FNAC pages target English keyword phrases in titles but use Chinese H1/body and `zh-CN`. Either make the canonical commercial page English and add localized alternates, or create a rigorously managed language URL strategy. Do not label Chinese content `x-default` for an English buyer journey.
4. **No visible index result was found for `site:autopricy.com` in the live search interface.** This is a warning, not proof of zero Google indexing. Confirm with GSC URL Inspection and Pages reports.
5. **Old-domain snippets can persist.** The redirect map is mostly correct, but search results still surfaced `wortenprice.com`. Continue the 301s and request validation in GSC rather than creating duplicate pages.

## Metadata and schema recommendations

P0:

- Link all platform pages from home and a shared site footer.
- Add new pages to sitemap with accurate `lastmod` generated from the release, not manually guessed future dates.
- Add `FAQPage` only when FAQs are visible and non-promotional; never duplicate generic FAQs across all pages.
- Add `SoftwareApplication`/`Product` relationships conservatively and do not add fake ratings, reviews, price offers, customers, or supported operating systems.
- Use platform-specific OG images or a consistent 1200×630 branded fallback.
- Define an intentional language model before adding translations.

P1:

- Add breadcrumb schema to guides and feature pages.
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

Do not invent a Lighthouse score. Re-run mobile and desktop Lighthouse or Chrome DevTools traces before Phase 2 release, then record exact values here.

## Security/HTTP hygiene relevant to SEO

The sampled responses did not show explicit cache policy in the header excerpt. Before changing Nginx, verify the complete active server block and current security headers. Recommended static policy after validation:

- immutable or long-lived caching for fingerprinted assets;
- a shorter cache for HTML, robots, and sitemap;
- Brotli if supported in the deployed Nginx build, while retaining gzip;
- CSP/security headers only after testing Umami, app links, images, and structured-data delivery.

## Search Console manual checklist

- [ ] Confirm a Domain property for `autopricy.com`, not only URL-prefix verification.
- [ ] Confirm `https://autopricy.com/sitemap.xml` is submitted and last read successfully.
- [ ] Inspect the four current canonical URLs.
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
