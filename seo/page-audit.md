# Phase 2 Page Audit

Audit date: 2026-08-24

## Editorial task card

- Target reader: working cross-border marketplace seller evaluating repricing software.
- Page types: platform landing, solution landing, and product feature.
- Main intent: commercial evaluation with enough technical detail to qualify fit.
- Tone: direct, operational, restrained, and low-hype.
- Required: marketplace mechanics, workflow, limitations, example, FAQ, CTA, and related internal links.
- Avoided: guaranteed winning Offer, invented speed, fake results, generic AI claims, unsupported marketplaces, and ERP positioning.
- Output: static, server-readable HTML in `dist/`.

## Page-level intent and claim guard

| URL | Main keyword | Unique operational focus | Claim guard |
|---|---|---|---|
| `/mirakl-repricer/` | Mirakl repricer | Operator variability, Offer identity, channel assessment | Selected operators only |
| `/worten-repricer/` | Worten repricer | Offer/channel identity, bounded target, submission vs confirmation | No Buy Box or real-time guarantee |
| `/fnac-repricer/` | FNAC repricer | XML 2.6, seller comparison, delivery context, batch status | Not generic Mirakl JSON; not identical to Darty |
| `/darty-repricer/` | Darty repricer | Darty shop identity and competitor handling over shared XML transport | Current account capability assessed first |
| `/onbuy-repricer/` | OnBuy repricing software | Product vs Listing, winning check, decrease/raise, quota and delay | No instant update or winning guarantee |
| `/cdiscount-repricer/` | Cdiscount repricer | OAuth/SellerId, rule import, package feedback, read-back | Avoid conflicting with native automation |
| `/multi-marketplace-repricing/` | multi-marketplace repricing software | Shared workspace with marketplace-specific adapters | Explicit non-ERP boundary; Fyndiq not a repricer |
| `/features/automatic-repricing/` | automatic marketplace repricing | Eligibility-to-confirmation evidence chain | API acceptance is not storefront proof |
| `/features/min-max-price-rules/` | minimum and maximum price rules | Validation, exact Offer identity, protection event | Seller owns the commercial floor calculation |
| `/features/multi-store-management/` | multi-store marketplace repricing | Shop-scoped credentials, filters, bulk tasks and history | Shared view never means shared authority |

## Fact-check ledger

| Claim area | Risk | Evidence | Action |
|---|---:|---|---|
| Current platform capability | High | `product-capabilities.md` plus current marketplace code | Kept only verified scope; conditional platforms excluded |
| Mirakl operator differences | Medium | Official Mirakl Offer API documentation and current adapters | Kept with selected-operator caveat |
| FNAC ranking and XML workflow | Medium | Official ranking page plus current XML 2.6 implementation | Kept; submission and batch status separated |
| OnBuy Product/Listing and delay | Medium | Official API documentation, seller terms and current implementation | Kept with quota, delay and no-guarantee wording |
| Cdiscount native floor price | High | Official Cdiscount seller guidance | Cited and positioned as an alternative, not ignored |
| Example prices | Medium | Explicitly illustrative | Labelled as examples; no performance result implied |

## Deterministic audit

- 11 sitemap URLs resolve to local static files: pass.
- One H1 per page: pass.
- Unique canonical, title and description: pass.
- Platform-page titles: 35–70 characters: pass.
- Meta descriptions: 100–160 characters: pass.
- JSON-LD parses and visible FAQ count equals schema FAQ count: pass.
- Root-relative internal links resolve locally: pass.
- Unsupported repricer claims for Rakuten France, Allegro, Catch and Mercado Libre: absent.
- Banned filler phrases: absent.
- Page body length: 541–630 English words before shared HTML attributes/scripts.
- Mobile browser check at 390 px: all ten SEO pages have `body.scrollWidth === viewport width`.
- OnBuy reference page: desktop 1440 px and mobile 390 px full-page screenshots reviewed; no console errors or warnings.

## Humanization pass

- Voice target: practical product documentation for marketplace operators; direct, technical, no invented first person.
- Revised patterns: generic benefit claims, repeated “AI” framing, uniform platform copy, absolute availability, and instant-success language.
- Preserved: capability limits, exact product objects, platform terms, source URLs, CTA destinations, metadata, and examples marked as illustrative.
- Remaining risk: native platform fields and policies can change; recheck official sources before material page revisions.

