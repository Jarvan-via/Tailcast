# Google Search Console Baseline

Captured: 2026-08-24

Property: URL-prefix `https://autopricy.com/`

The currently logged-in account can access the verified URL-prefix property. The Domain property `sc-domain:autopricy.com` is not accessible to this account, so this file reports only the canonical HTTPS site covered by the URL-prefix property.

## Search performance — trailing 3 months

| Metric | Value |
|---|---:|
| Clicks | 7 |
| Impressions | 129 |
| CTR | 5.4% |
| Average position | 15.6 |

### Visible queries

Search Console reported nine query rows; eight named rows were visible in the captured table.

| Query | Clicks | Impressions |
|---|---:|---:|
| `worten repricing` | 0 | 35 |
| `repricer fnac` | 0 | 8 |
| `fnac repricing` | 0 | 7 |
| `repricing mirakl` | 0 | 3 |
| `worten repricer` | 0 | 2 |
| `fnac repricing tool` | 0 | 2 |
| `repricing fnac` | 0 | 1 |
| `worten repricing tool` | 0 | 1 |

This is early but useful validation: Google is already testing Autopricy for the exact vertical commercial terms targeted by the first landing pages.

### Pages

| Page | Clicks | Impressions |
|---|---:|---:|
| `https://autopricy.com/` | 4 | 37 |
| `https://autopricy.com/mirakl-repricer/` | 3 | 20 |
| `https://autopricy.com/worten-repricer/` | 0 | 56 |
| `https://autopricy.com/fnac-repricer/` | 0 | 34 |

### Countries / regions

| Country / region | Clicks | Impressions |
|---|---:|---:|
| Japan | 2 | 22 |
| Hong Kong | 1 | 8 |
| Maldives | 1 | 3 |
| Singapore | 1 | 1 |
| Portugal | 1 | 1 |
| Mexico | 1 | 1 |
| United States | 0 | 28 |
| United Kingdom | 0 | 23 |
| Netherlands | 0 | 19 |
| France | 0 | 9 |

### Devices

The device table displayed desktop `6 clicks / 126 impressions` and mobile `3 clicks / 3 impressions`. Those click rows sum to nine while the report header shows seven total clicks. Keep the header total as the baseline KPI and treat the device split as a GSC reporting discrepancy until the next export confirms it.

## Sitemap

- Existing sitemap: `https://autopricy.com/sitemap.xml`
- Previous state before refresh: submitted 2026-07-16, last read 2026-08-19, status success, four discovered pages.
- Action on 2026-08-24: resubmitted successfully after the production sitemap expanded to 11 canonical URLs.
- Expected lag: the discovered-page count will remain four until Google rereads the refreshed sitemap.

## Priority URL inspections

| URL | GSC state on 2026-08-24 | Action |
|---|---|---|
| `/worten-repricer/` | Indexed | Re-indexing requested successfully |
| `/fnac-repricer/` | Indexed | Re-indexing requested; UI shows request is already queued |
| `/mirakl-repricer/` | Indexed | Re-indexing requested; UI shows request is already queued |
| `/darty-repricer/` | Discovered, currently not indexed | Indexing requested successfully |
| `/onbuy-repricer/` | Discovered, currently not indexed | Indexing requested successfully |
| `/cdiscount-repricer/` | URL unknown to Google | Indexing requested successfully |

An indexing request is not proof of indexing. Recheck the three non-indexed URLs and the sitemap discovered-page count after Google has had time to crawl them.

## Next GSC checks

1. Recheck sitemap last-read date and discovered URLs in 3–7 days.
2. Reinspect Darty, OnBuy and Cdiscount; preserve the exact exclusion reason if unchanged.
3. Inspect the remaining five sitemap URLs: multi-marketplace plus the three feature pages and homepage if a fresh crawl is needed.
4. Export Core Web Vitals and Page Indexing once Google has enough data for the new URL set.
5. Create or grant access to the Domain property only if subdomain-wide reporting is needed; the URL-prefix property is sufficient for the public SEO site.
