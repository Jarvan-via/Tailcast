# Product Capability Evidence Matrix

Checked: 2026-08-24

Evidence sources: current `worten-admin`, `worten-crontab`, `wortener`, `worten-ai-context`, and live `autopricy.com` content. A code path proves implementation scope; it does not by itself prove current production enablement or every marketplace account's eligibility.

| Platform / family | Current evidence | Safe SEO claim | Do not claim yet | SEO readiness |
|---|---|---|---|---|
| Worten | Dedicated Product/Offer sync, current-market reads, min/max/diff repricing, channel-aware writes, platform confirmation tracking, batch operations, and a live landing page | Automatic repricing within configured boundaries; competitive-offer monitoring; multi-shop Offer operations; submission/confirmation status tracking | Guaranteed Buy Box, real-time updates, or universal availability across every Worten site | Ready; strongest product proof |
| FNAC | XML 2.6 Offer sync and update, marketplace-specific competitor selection, min/max rules, batch-status confirmation, dedicated UI and live landing page | FNAC marketplace repricing with price boundaries, available competitor-offer comparison, Offer updates, and status tracking | “All Fnac countries,” guaranteed Buy Box, or JSON/Mirakl-generic behavior | Ready after English/French page localization |
| Darty | Shared FNAC/Darty XML 2.6 infrastructure with distinct Darty shop type and competitor selection, Offer update and batch status | Darty marketplace repricing with price boundaries and Darty-specific competitor handling | Copying FNAC ranking logic, claiming every shared-shop configuration works, or using the ChannelEngine limitation as Autopricy’s limitation | Ready for a specific page, subject to final production evidence review |
| OnBuy | Dedicated Product and Listing sync, repricing rules/history, winning checks, price decrease and winning-price raise exploration, delayed confirmation, locks and quota handling | OnBuy repricing, min/max controls, winning-offer checks, protected price changes, Listing operations, and status/history | Instant updates, guaranteed Buy Box, or unsupported OnBuy sites | Ready; high competition, high intent |
| Cdiscount / Octopia | OAuth2/SellerId integration, Product/Offer sync, packages and feedback, rule import, automated repricing, read-back/status records | Cdiscount repricing, item-price rules, min/max protection, package/feedback tracking, bulk Offer workflows | Guaranteed featured offer, instant feedback, or using unreliable shipping competition as a universal input | Ready; current home page already shows product evidence |
| Mirakl-derived operators | Shared Product/Offer model and repricing paths for selected operators including Worten, RDC, ePRICE, Carrefour, MediaMarkt, PCComponentes, Leroy Merlin, and Pixplace, with operator/channel differences | Repricing for selected Mirakl-powered marketplace operators, after operator assessment; competitor data and channel support vary | “Works with every Mirakl marketplace,” one generic algorithm, or full Mirakl ERP/operations suite | Ready as a family/assessment page; individual pages only for verified operators |
| RDC / Rue du Commerce | Explicit `Rdc` shop type and active Mirakl repricing path; live home-page mention | Rue du Commerce repricing subject to current operator configuration; min/max and Offer workflow | Treating RDC as Rakuten France | Ready after final naming/config verification |
| ePRICE | Explicit `Eprice` shop type and active Mirakl repricing path; live home-page mention | ePRICE marketplace repricing for verified stores/channels | All ePRICE regions or generic Mirakl parity | P1 after live-account proof review |
| Fyndiq | Article sync/create/update, price, quantity, shipping-time and batch operations; current matrix describes Article maintenance rather than a competitive repricing engine | Fyndiq listing and Article price/inventory management | “Fyndiq repricer,” Buy Box automation, or competitor-driven repricing | Not ready for repricer landing page; feature page only |
| Mercado Libre Global Selling | OAuth, bounded item sync, rules, repricing runner, price read-back, Catalog eligibility/search/create code, and feature flags; real Catalog write and production enablement remain conditional | A limited/early-access Global Selling workflow only after current flags, OAuth, seller model, item/site eligibility, and live read-back are verified | Broad public availability, universal Catalog follow-selling, fulfillment support, or successful real Catalog writes | Hold landing page until production enablement is reverified; guide may explain the official model without a product-availability CTA |
| Rakuten France | No independent ShopType or dedicated implementation found | None | Any “Rakuten France repricer” support claim | Blocked—requires implementation and live evidence |
| Allegro | No independent ShopType or dedicated implementation found | None | Any Allegro repricing or listing support claim | Blocked—remove from current SEO claims where present |
| Catch | Legacy enum/code remains, but the product decision is that Catch is offline | None | Current support, new binding, new tasks, or landing pages | Excluded |
| Fruugo | Collection/export-oriented code, no current self-serve repricing evidence | Collection/export only when specifically documented | Full repricing platform support | Excluded from repricer pages |

## Required pre-publication evidence per platform page

1. Current authorization/binding path exists and is user-accessible.
2. Product/Offer/Listing data source and identity key are explicit.
3. Competitive-price input and shipping semantics are described accurately.
4. Minimum/maximum protections and decision logic match current code.
5. Submission and confirmation semantics are not collapsed into “success.”
6. At least one current production or platform read-back confirms the advertised workflow is available.
7. Unsupported features are omitted rather than described as “coming soon” unless there is an approved launch plan.
