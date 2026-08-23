# Phase 2–3 Content Plan

This is the execution backlog produced by Phase 1. Page copy must be refreshed against `product-capabilities.md` and current official marketplace documentation immediately before implementation.

## First 10 landing/resource pages

| Order | URL | Language | Role | Required marketplace-specific content |
|---:|---|---|---|---|
| 1 | `/mirakl-repricer/` | English | Improve existing | Operator-by-operator assessment, Offer identity, competitor visibility, shipping/channel variation, import confirmation |
| 2 | `/worten-repricer/` | English canonical; Chinese localization planned | Improve existing | PT/ES channel context where support is verified, total price, min/max/diff, exact SKU, submission vs confirmation |
| 3 | `/fnac-repricer/` | English canonical; French localization planned | Improve existing | XML 2.6, seller exclusion, rating threshold, item + shipping cost, batch status |
| 4 | `/darty-repricer/` | English; French later | New | Shared XML transport but Darty-specific competitor logic and account identity |
| 5 | `/onbuy-repricer/` | English | New | Product vs Listing, winning check, min/max, delayed queue confirmation, raise-after-winning boundary |
| 6 | `/cdiscount-repricer/` | English; French later | New | OAuth/SellerId, item-price rules, package + feedback, native floor-price alternative, bulk workflows |
| 7 | `/multi-marketplace-repricing/` | English | New | Supported-platform matrix, different per-platform logic, multi-shop view, explicit non-ERP boundary |
| 8 | `/features/automatic-repricing/` | English | New | End-to-end evidence chain and eligible platform list |
| 9 | `/features/min-max-price-rules/` | English | New | Boundary behavior, invalid rules, below-floor recovery caveat, examples |
| 10 | `/features/multi-store-management/` | English | New | Shop-scoped credentials, per-platform rules, filters/batch actions, no orders/ERP claims |

Each commercial page should include one H1, a direct summary, seller problem, platform mechanics, Autopricy workflow, supported features, limitations, concrete example, 3–5 non-duplicative FAQs, CTA, and internal links. Length follows evidence; there is no minimum word quota.

## First five guides

1. `/guides/mirakl-repricing/` — What Mirakl repricing actually means for a seller, including why operator capabilities differ.
2. `/guides/worten-automatic-repricing/` — How automatic repricing works on Worten from competitor Offer to platform confirmation.
3. `/guides/onbuy-winning-offer/` — How OnBuy winning checks, price boundaries, delayed updates, and non-price factors interact.
4. `/guides/fnac-darty-repricing/` — Shared integration boundary, distinct marketplace logic, total cost, and batch confirmation.
5. `/guides/cdiscount-repricing/` — Native floor pricing versus an external rule-and-feedback workflow.

## Internal-link model

```text
Home
  -> Multi-marketplace repricing
      -> Platform landing pages
          -> Marketplace guide
              -> Relevant feature page
          -> Adjacent verified platform page
      -> Feature pages
          -> Supported platform landing pages
```

Rules:

- Home links directly to every P0 platform landing page.
- Each platform page links to one platform guide and 2–3 relevant feature pages.
- Each guide links back to the platform page in the first useful section, not only the CTA.
- Feature pages link only to platforms that currently support the feature.
- Anchor text stays descriptive and varied; do not repeat exact commercial anchors site-wide mechanically.
- No page is more than three crawlable clicks from home.

## Conversion measurement

Add stable source tags and events for:

- platform-page CTA click;
- guide-to-platform click;
- registration start and completion;
- first marketplace authorization;
- first successful product/Offer sync;
- first valid min/max rule;
- first confirmed repricing result;
- trial-to-paid conversion.

Preserve the originating landing page and platform through the funnel without putting sensitive user data in analytics.

## Editorial gate

Reject copy that uses generic openings, “revolutionize,” “unlock your potential,” invented outcomes, fake customer quotes, unsupported speed, guaranteed Buy Box, or “AI” as a substitute for explaining the rule. Screenshots must come from the real product and be anonymized.
