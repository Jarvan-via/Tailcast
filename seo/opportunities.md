# SEO Opportunity Map

Checked: 2026-08-24

## URL decision

Keep the existing flat, intent-led pattern:

```text
/{platform}-repricer/
/multi-marketplace-repricing/
/guides/{topic}/
/features/{feature}/
```

Why:

- three live canonical pages already use `/{platform}-repricer/`;
- the exact commercial phrase is visible and readable;
- changing them to `/repricing/{platform}` would create avoidable migration and redirect work;
- flat platform pages are easy to link from the home page and guides;
- `/guides/` and `/features/` prevent platform pages, education, and product capabilities from becoming one undifferentiated directory.

Do not create a URL for an unsupported platform. Do not create separate pages for trivial variants such as `/worten-repricing-software/` and `/worten-automatic-repricing/`; they belong on one canonical platform page.

## P0 — build or materially improve now

| # | URL | Primary intent | Product gate | Why now | Target cluster |
|---:|---|---|---|---|---|
| 1 | `/mirakl-repricer/` | Commercial | Existing page; selected operators only | Highest whitespace and very high seller fit | Mirakl repricer, Mirakl repricing software |
| 2 | `/worten-repricer/` | Commercial | Mature workflow | Existing page needs English search-intent alignment and deeper specificity | Worten repricer, Worten automatic repricing |
| 3 | `/fnac-repricer/` | Commercial | XML 2.6 workflow | Existing page needs English/French intent handling and platform details | FNAC repricer, FNAC repricing software |
| 4 | `/darty-repricer/` | Commercial | Darty-specific behavior verified in code | Sparse exact competition and strong buyer fit | Darty repricer, Darty repricing software |
| 5 | `/onbuy-repricer/` | Commercial | Dedicated current workflow | High intent; current URL is 404 | OnBuy repricer, OnBuy repricing software |
| 6 | `/cdiscount-repricer/` | Commercial | Formal repricing capability | High intent and home-page product evidence; current URL is 404 | Cdiscount repricer, Cdiscount repricing software |
| 7 | `/multi-marketplace-repricing/` | Commercial | Only verified supported platforms | Defines Autopricy without ERP positioning | multi marketplace repricing software Europe |
| 8 | `/guides/worten-automatic-repricing/` | How-to | Mature workflow | Low-competition seller question and strongest proof base | how to automatically change prices on Worten |
| 9 | `/guides/onbuy-winning-offer/` | How-to | Winning checks and confirmation | High-intent educational bridge to the OnBuy page | how to win Buy Box on OnBuy |
| 10 | `/guides/mirakl-repricing/` | Explainer | Selected-operator caveat | Current SERP confuses connectors, sync, ERP, and repricing | what is Mirakl repricing |

## P1 — valuable after the first 10

| # | Proposed URL | Page type | Rationale / condition |
|---:|---|---|---|
| 11 | `/guides/fnac-marketplace-repricing/` | Guide | Explain competition, rating threshold, total cost and XML batch confirmation |
| 12 | `/guides/fnac-vs-darty-repricing/` | Guide | Unique, evidence-led comparison; avoid claiming identical behavior |
| 13 | `/guides/cdiscount-repricing/` | Guide | Contrast native floor price with package/feedback and multi-shop workflows |
| 14 | `/guides/mirakl-price-channels/` | Guide | Explain channel-specific prices, shipping zones, operator variance |
| 15 | `/guides/marketplace-repricing-min-max-price/` | Guide | Cross-platform rule safety linked from all landing pages |
| 16 | `/features/automatic-repricing/` | Feature | Canonical feature definition and supported-platform matrix |
| 17 | `/features/competitor-price-monitoring/` | Feature | Clarify platform-provided data vs generic scraping |
| 18 | `/features/min-max-price-rules/` | Feature | High trust/safety feature with concrete UI evidence |
| 19 | `/features/multi-store-management/` | Feature | Commercially valuable without ERP scope creep |
| 20 | `/features/repricing-history/` | Feature | Differentiate submission, confirmation, failure and audit history |
| 21 | `/rue-du-commerce-repricer/` | Platform landing | Publish only after RDC naming and live operator config are reverified |
| 22 | `/eprice-repricer/` | Platform landing | Publish after a current live-account read/write check |
| 23 | `/pccomponentes-repricer/` | Platform landing | Product support exists; validate public-market demand and current live workflow |
| 24 | `/leroy-merlin-repricer/` | Platform landing | Strong operator-specific regional pricing story; confirm live availability |
| 25 | `/mediamarkt-repricer/` | Platform landing | Validate current channel/operator deployment before publication |
| 26 | `/carrefour-repricer/` | Platform landing | Validate current operator and country scope before publication |
| 27 | `/pixplace-repricer/` | Platform landing | Validate market naming and channel semantics first |
| 28 | `/guides/best-onbuy-repricer/` | Comparison | Only after a fair, evidence-based comparison rubric and hands-on proof |
| 29 | `/guides/best-worten-repricer/` | Comparison | Low-competition query, but avoid self-awarded winner language |
| 30 | `/guides/best-mirakl-repricer/` | Decision guide | Compare seller repricing, price sync, and full operations suites by use case |

## P2 — later, conditional, or excluded

| Opportunity | Status | Condition |
|---|---|---|
| Mercado Libre repricer landing | Blocked | Public production flag, OAuth, qualifying seller, supported site, real repricing write/read-back, and differentiation from the official free tool |
| Mercado Libre Price to Win guide | Conditional | Can publish as an official-model guide with no broad Autopricy availability claim |
| Fyndiq repricer landing | Blocked | Requires a real competitive repricing engine; current Article price management is insufficient |
| Fyndiq listing/price management | Valid later | Position as listing and batch Article operations, not repricing |
| Rakuten France repricer | Blocked | No independent implementation evidence |
| Allegro repricer | Blocked | No independent implementation evidence |
| Catch repricer | Excluded | Product is offline |
| Generic “best repricing software” | Defer | Very competitive and Amazon-dominated; build platform authority first |
| Programmatic marketplace templates | Defer | Only after at least 10 operator pages can each support substantial marketplace-specific content |

## Programmatic SEO decision

Do not start programmatic SEO now. A template may supply shared components—CTA, pricing boundaries, status explanation, support matrix—but each platform page must independently cover:

- authorization model;
- Product/Offer/Listing object and exact identity;
- available competitor data;
- whether price includes shipping;
- platform-specific Buy Box/winning terminology;
- update API and async/sync confirmation;
- rate limits or delay behavior;
- rule limitations and unsupported features;
- a platform-specific example and FAQ.

If those sections cannot be written from verified evidence, the page should not exist.
