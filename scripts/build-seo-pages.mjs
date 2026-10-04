import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildGuides, guideUrls } from './build-guide-pages.mjs';
import { ogImage } from './og.mjs';
import { platformCssHref } from './assets.mjs';
import { zhPages } from './zh-pages.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = resolve(projectRoot, 'dist');
const site = 'https://autopricy.com';
const app = 'https://app.autopricy.com';

const pages = [
  {
    slug: 'mirakl-repricer', theme: 'theme-multi', code: 'M.', codeNote: 'SELECTED<br>OPERATORS',
    title: 'Mirakl Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'Mirakl Repricer',
    description: 'Repricing software for selected Mirakl marketplaces such as Worten: operator-aware rules, min/max price protection and status tracking. 7-day free trial.',
    eyebrow: 'Mirakl repricer / selected operators',
    h1: 'Mirakl repricing that respects each marketplace operator',
    intro: 'Autopricy automates eligible Offer price changes on selected Mirakl-powered marketplaces. It keeps operator data, channel rules, minimum and maximum prices, submission, and confirmation separate—because a Mirakl connector is not one universal repricing algorithm.',
    signalTitle: 'Operator-aware control loop', signalStatus: 'Assessed per channel',
    signals: [['Offer input', 'Operator-provided data', 'Verify first'], ['Price boundary', 'Minimum / maximum', 'Hard limits'], ['Channel action', 'Eligible price update', 'Rule-based'], ['Platform result', 'Submitted / confirmed', 'Tracked']],
    problemKicker: 'Why Mirakl repricing varies', problemTitle: 'The platform is shared; the marketplace rules are not',
    problemCopy: 'Mirakl gives operators a marketplace foundation, but each operator decides which Offer fields, competitor signals, channels, limits, and update workflows are available.',
    pains: [
      ['01 / OPERATOR', 'Capabilities differ by marketplace', 'A field or action available on one operator cannot be assumed to exist on another. Autopricy checks the target marketplace before enabling automation.'],
      ['02 / IDENTITY', 'Offers need exact identity', 'Updates stay tied to the actual shop, SKU, product and channel identity. Autopricy does not infer an Offer from position, price, or an approximate product match.'],
      ['03 / STATE', 'An accepted request may still be pending', 'Submission, operator processing, confirmation and failure remain separate operational states.']
    ],
    mechanicsTitle: 'How an assessed Mirakl repricing workflow works',
    mechanics: [
      ['Market input', 'Use only Offer and competitor data that the selected operator actually exposes.'],
      ['Decision', 'Evaluate the configured rule inside the Offer’s minimum and maximum price boundaries.'],
      ['Submission', 'Send an eligible update through the operator-specific API and channel context.'],
      ['Verification', 'Keep the result pending until the platform response or later read-back supports confirmation.']
    ],
    noteTitle: 'Selected operators, not “every Mirakl marketplace”',
    note: 'Autopricy supports repricing workflows for selected Mirakl-derived operators. Before onboarding, we review the operator, country, authorization model, Offer data, competitor visibility, update method and confirmation behavior. Unsupported fields are not filled with generic assumptions.',
    workflowTitle: 'Validate one operator before scaling',
    workflow: [['Name the operator', 'Share the marketplace, country, stores, SKU volume and current price process.'], ['Confirm API scope', 'Check authorization, Offer fields, competitor visibility, channels and limits.'], ['Audit a controlled sample', 'Verify exact identifiers, current prices, boundaries and available market signals.'], ['Enable and observe', 'Start with bounded rules and expand only after platform results are visible.']],
    exampleTitle: 'A boundary-first Mirakl example',
    example: '<strong>Example rule:</strong> an Offer has a minimum of €24.00 and a maximum of €32.00. If the assessed operator exposes a comparable competing Offer at €26.50, the rule may target €26.49. If the operator does not expose the required signal—or the update cannot be confirmed—the workflow should not pretend that the price is live.',
    exampleLabel: 'Illustrative rule, not a performance claim',
    sources: [['Mirakl Offer API documentation', 'https://developer.mirakl.com/content/product/mmp/rest/operator/openapi3/offers']],
    faq: [
      ['Does Autopricy support every Mirakl marketplace?', 'No. Support is assessed per operator because data, channels, rate limits and permitted actions differ.'],
      ['Is Mirakl repricing the same as price synchronisation?', 'No. Price synchronisation copies a value. Repricing also needs a market signal, decision rule, boundaries, submission and result verification.'],
      ['Can Autopricy price below the configured minimum?', 'Eligible calculations are constrained by the configured minimum and maximum price. Invalid or missing boundaries should stop automation.'],
      ['Does the lowest price guarantee the winning Offer?', 'No. Price may matter, but availability, delivery, seller performance and operator rules can also influence placement.']
    ],
    related: [['Mirakl repricing guide', '/guides/mirakl-repricing/'], ['Worten marketplace', '/worten-repricer/'], ['Automatic repricing', '/features/automatic-repricing/']]
  },
  {
    slug: 'worten-repricer', theme: 'theme-worten', code: 'W.', codeNote: 'OFFER<br>REPRICING',
    title: 'Worten Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'Worten Repricer',
    description: 'Automatically reprice Worten offers against competitors without dropping below your minimum price. Unlimited SKUs, multi-store, 7-day free trial.',
    eyebrow: 'Worten repricer / marketplace sellers',
    h1: 'Worten repricing with clear price boundaries and results',
    intro: 'Autopricy monitors available Worten Offer signals, applies seller-defined pricing rules, and submits eligible updates without crossing the configured minimum or maximum. The workflow records whether a change was calculated, submitted, confirmed, protected or failed.',
    signalTitle: 'Worten Offer workflow', signalStatus: 'Rule-driven',
    signals: [['Offer sync', 'Shop and channel identity', 'Exact records'], ['Competition', 'Available comparable Offers', 'Observed'], ['Decision', 'Min / max / difference', 'Protected'], ['Result', 'Submission and confirmation', 'Separate']],
    problemKicker: 'Worten repricing problems', problemTitle: 'The hard part is operating the full price loop',
    problemCopy: 'A price change is useful only when the correct Offer was selected, the rule was valid, the marketplace accepted the update, and the resulting state can be checked.',
    pains: [
      ['01 / SIGNAL', 'Comparable Offers can change', 'Autopricy uses the available marketplace data for the exact product and shop context instead of relying on a stale spreadsheet.'],
      ['02 / MARGIN', 'A competitive price still needs a floor', 'Minimum and maximum prices constrain every eligible decision, including price decreases and later recovery.'],
      ['03 / CONFIRMATION', 'Submitted is not the same as live', 'The operations view distinguishes a request from a platform-confirmed result and exposes errors that need attention.']
    ],
    mechanicsTitle: 'How Worten automatic repricing works in Autopricy',
    mechanics: [['Identify', 'Match the real shop Offer by its marketplace identity, SKU and product context.'], ['Observe', 'Read the current Offer and available comparable market prices for the relevant channel.'], ['Decide', 'Apply the configured difference and direction inside minimum and maximum boundaries.'], ['Verify', 'Track submission and subsequent platform status rather than treating HTTP acceptance as final proof.']],
    noteTitle: 'Price is one input, not a Buy Box guarantee',
    note: 'Autopricy helps an Offer respond to available price competition. It does not guarantee marketplace placement. Stock, delivery, seller performance, channel rules and other operator signals may affect the winning Offer.',
    workflowTitle: 'Start with a controlled Worten scope',
    workflow: [['Connect the store', 'Use the marketplace authorization details required for the current store and channel.'], ['Audit Offer data', 'Check product identity, current price, available competition and sync status.'], ['Set safe rules', 'Add minimum, maximum and price-difference logic to eligible Offers.'], ['Review results', 'Observe protected, submitted, confirmed and failed states before expanding.']],
    exampleTitle: 'A protected Worten rule', exampleLabel: 'Illustrative rule, not a guarantee',
    example: '<strong>Example:</strong> a Worten Offer has a €38.00 minimum and €46.00 maximum. When a comparable available Offer changes, Autopricy can calculate a target using the configured difference. A €37.90 target would be blocked by the floor; a submitted €41.49 update remains pending until the platform result is observable.',
    faq: [['Can a Worten repricer go below my minimum price?', 'Autopricy constrains eligible calculations to the configured minimum and maximum. Missing or invalid boundaries should stop automation.'], ['Does Autopricy need my marketplace password?', 'Store connection uses the platform authorization information required by the integration, not a request for your seller-backoffice password.'], ['Does repricing guarantee the winning Offer?', 'No. Pricing can improve competitiveness, but marketplace placement can also depend on availability, delivery, seller performance and platform rules.'], ['How quickly do price changes appear?', 'Timing depends on platform processing, API limits and store configuration. Autopricy keeps submission and confirmation separate instead of promising unrestricted real-time updates.']],
    related: [['Worten automatic repricing guide', '/guides/worten-automatic-repricing/'], ['Minimum and maximum rules', '/features/min-max-price-rules/'], ['Multi-store operations', '/features/multi-store-management/']]
  },
  {
    slug: 'fnac-repricer', theme: 'theme-fnac', code: 'F.', codeNote: 'XML 2.6<br>OFFERS',
    title: 'FNAC Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'FNAC Repricer',
    description: 'Automatically reprice FNAC marketplace offers against competing sellers, inside your min/max price range. XML batch tracking, 7-day free trial.',
    eyebrow: 'FNAC repricer / Offer operations', h1: 'FNAC repricing built around Offer data and batch confirmation',
    intro: 'Autopricy manages eligible FNAC Offer repricing through the marketplace’s XML workflow. It compares available seller Offers, applies minimum and maximum prices, submits updates in batches, and keeps batch processing separate from confirmed results.',
    signalTitle: 'FNAC XML Offer loop', signalStatus: 'Batch-aware',
    signals: [['Input', 'Offer and seller context', 'XML sync'], ['Comparison', 'Item plus delivery context', 'Available data'], ['Update', 'Bounded Offer price', 'Batch request'], ['Result', 'Batch status', 'Tracked']],
    problemKicker: 'FNAC marketplace details', problemTitle: 'Seller comparison and batch state need explicit handling',
    problemCopy: 'FNAC repricing is not a generic JSON price update. The integration has marketplace-specific Offer parsing, competitor selection, XML submission and batch-status checks.',
    pains: [['01 / SELLER', 'Do not compete with the same seller identity', 'The comparison must exclude the current shop correctly before a competing Offer can influence a price decision.'], ['02 / TOTAL COST', 'Item price alone may be incomplete', 'Available delivery cost and marketplace data need to be interpreted consistently when comparing Offers.'], ['03 / BATCH', 'A batch ID is not a confirmed price', 'Autopricy retains the processing state until the marketplace batch response supports a final result.']],
    mechanicsTitle: 'What the FNAC repricing workflow checks',
    mechanics: [['Offer input', 'Synchronise the exact FNAC Offer, SKU, seller identity and available competing sellers.'], ['Eligibility', 'Require valid boundaries and usable marketplace data before computing a target.'], ['XML update', 'Submit eligible Offer changes through the FNAC XML 2.6 workflow.'], ['Batch status', 'Poll and record the batch result; do not mark the new price confirmed at submission time.']],
    noteTitle: 'FNAC and Darty share transport, not every business rule',
    note: 'The integrations share an XML 2.6 boundary, but the marketplace type, seller identity and competitor-selection behaviour remain explicit. Autopricy does not copy one platform’s result into the other.',
    workflowTitle: 'Introduce FNAC repricing in a small scope',
    workflow: [['Connect the FNAC store', 'Confirm marketplace account identity and the current authorization details.'], ['Review seller Offers', 'Check exact SKU, price, delivery data, seller identity and competitors.'], ['Apply boundaries', 'Set minimum, maximum and pricing difference only on eligible Offers.'], ['Track the batch', 'Review processing, confirmation and failures before adding more products.']],
    exampleTitle: 'An FNAC batch-status example', exampleLabel: 'Illustrative workflow',
    example: '<strong>Example:</strong> a target price is calculated inside a €21.00–€27.00 range and added to an XML update batch. Autopricy records the batch as submitted first. The Offer is not labelled confirmed until the batch-status response supports that conclusion.',
    sources: [['FNAC marketplace ranking criteria', 'https://www.fnac.com/referencement-criteres-classement-marketplace']],
    faq: [['Is FNAC repricing the same as Darty repricing?', 'They share parts of the XML integration, but account identity and competitor logic remain marketplace-specific.'], ['Can Autopricy compare delivery costs?', 'The workflow can use the delivery data available in the FNAC Offer response. It does not invent missing shipping values.'], ['Does a successful XML submission mean the price is live?', 'No. The batch must still be processed. Autopricy keeps submission and later batch status separate.'], ['Can FNAC repricing guarantee placement?', 'No. Price is only one factor in marketplace ranking and seller eligibility.']],
    related: [['FNAC and Darty guide', '/guides/fnac-darty-repricing/'], ['Darty repricing', '/darty-repricer/'], ['Minimum and maximum rules', '/features/min-max-price-rules/']]
  },
  {
    slug: 'darty-repricer', theme: 'theme-darty', code: 'D.', codeNote: 'DARTY<br>OFFERS',
    title: 'Darty Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'Darty Repricer',
    description: 'Darty repricing software that follows competing offers within your minimum and maximum prices, with XML batch tracking. Unlimited SKUs, 7-day free trial.',
    eyebrow: 'Darty repricer / marketplace sellers', h1: 'Darty repricing with marketplace-specific competitor handling',
    intro: 'Autopricy supports bounded Darty Offer repricing through the FNAC/Darty XML 2.6 integration boundary, while preserving Darty’s own shop identity and competitor logic. Price requests, batch processing and confirmed outcomes remain distinct.',
    signalTitle: 'Darty Offer control', signalStatus: 'Darty-specific',
    signals: [['Store', 'Darty account identity', 'Explicit'], ['Market input', 'Eligible competing Offers', 'Filtered'], ['Update', 'XML Offer batch', 'Bounded'], ['Status', 'Batch processing result', 'Visible']],
    problemKicker: 'Darty repricing details', problemTitle: 'Shared XML does not make FNAC and Darty interchangeable',
    problemCopy: 'The transport format can be shared while seller identity, shop type and competitor choice still require marketplace-specific logic.',
    pains: [['01 / ACCOUNT', 'The correct Darty shop must own the action', 'Autopricy keeps shop credentials and Offer identity scoped to the Darty account.'], ['02 / COMPETITION', 'Competitor selection is platform-specific', 'The repricer uses Darty-specific handling instead of inheriting another marketplace’s seller comparison blindly.'], ['03 / PROCESSING', 'Batch processing takes time', 'Submission, waiting, marketplace confirmation and failure are shown as different stages.']],
    mechanicsTitle: 'How Darty repricing is controlled',
    mechanics: [['Synchronise', 'Read the Darty Offer and retain its exact shop, SKU and marketplace identity.'], ['Compare', 'Evaluate only the competing Offers that meet the Darty workflow’s current criteria.'], ['Constrain', 'Keep the target between the seller-defined minimum and maximum.'], ['Confirm', 'Submit through XML and track the later batch status before reporting a final result.']],
    noteTitle: 'No guaranteed winning Offer', note: 'Autopricy controls eligible price actions; it does not control every Darty ranking signal. Availability, delivery, seller quality and marketplace policy can affect placement alongside price.',
    workflowTitle: 'Validate one Darty store first',
    workflow: [['Confirm the account', 'Check the Darty shop identity and authorization path.'], ['Inspect Offer data', 'Review exact SKU, current price, available competition and status.'], ['Set the safe range', 'Add minimum, maximum and difference rules to a controlled product set.'], ['Watch batch results', 'Expand only after processing and confirmation behave as expected.']],
    exampleTitle: 'A Darty update should remain pending', exampleLabel: 'Illustrative workflow',
    example: '<strong>Example:</strong> Autopricy calculates €54.90 inside a €50.00–€62.00 range and submits the Offer in an XML batch. The operation remains “submitted” or “processing” until the Darty batch status provides a final result.',
    faq: [['Does Autopricy treat Darty exactly like FNAC?', 'No. The XML boundary is shared, but the marketplace type, store identity and competitor handling remain explicit.'], ['Will Darty repricing always choose the lowest price?', 'No. The configured rule and boundaries determine eligible targets; continuous price cutting is not the objective.'], ['Can a submitted Darty price still fail?', 'Yes. A marketplace batch can remain pending or return an error after submission, so confirmation is tracked separately.'], ['Is Darty repricing available for every account configuration?', 'The account and current API capability are reviewed before activation.']],
    related: [['FNAC and Darty guide', '/guides/fnac-darty-repricing/'], ['FNAC repricing', '/fnac-repricer/'], ['Automatic repricing', '/features/automatic-repricing/']]
  },
  {
    slug: 'onbuy-repricer', theme: 'theme-onbuy', code: 'O.', codeNote: 'PRODUCTS<br>LISTINGS',
    title: 'OnBuy Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'OnBuy Repricer',
    description: 'Compete for the OnBuy winning offer without a race to the bottom: lower to compete, raise after winning, never below your floor. 7-day free trial.',
    eyebrow: 'OnBuy repricer / winning checks', h1: 'OnBuy repricing that knows when to compete—and when to stop',
    intro: 'Autopricy connects OnBuy Product and Listing data to bounded repricing rules. It can evaluate the current winning state, lower an eligible price when competition requires it, and explore a controlled increase after winning without crossing the configured maximum.',
    signalTitle: 'OnBuy winning loop', signalStatus: 'Quota-aware',
    signals: [['Catalogue', 'Product and Listing', 'Separated'], ['Position', 'Winning status check', 'Observed'], ['Action', 'Decrease or bounded raise', 'Protected'], ['Result', 'Queued and confirmed state', 'History']],
    problemKicker: 'OnBuy repricing challenges', problemTitle: 'Winning checks change what the next safe action should be',
    problemCopy: 'A useful OnBuy repricer should not lower every price on every cycle. It needs Product and Listing identity, winning-state checks, boundaries, rate awareness and delayed confirmation.',
    pains: [['01 / OBJECT', 'Product and Listing are not the same record', 'Autopricy keeps catalogue context and the sellable Listing separate so price actions target the correct entity.'], ['02 / WINNING', 'Winning can change the direction', 'A losing Listing may need a bounded decrease; a winning Listing may support a cautious increase if the configured strategy allows it.'], ['03 / DELAY', 'Marketplace display can lag behind submission', 'Autopricy records queued work and later status rather than promising an instant storefront change.']],
    mechanicsTitle: 'How OnBuy repricing decisions are bounded',
    mechanics: [['Synchronise', 'Read Product and Listing records and retain exact account and listing identity.'], ['Check', 'Use the available winning state and competition context for the current Listing.'], ['Decide', 'Apply the configured decrease or raise strategy inside minimum and maximum values.'], ['Confirm', 'Respect locks, quotas and processing delays; keep status history for later review.']],
    noteTitle: 'Winning Offer is not controlled by price alone', note: 'Autopricy responds to the OnBuy signals available to the integration. Stock, delivery, seller performance and marketplace rules can still affect which Offer wins.',
    workflowTitle: 'Roll out OnBuy repricing safely',
    workflow: [['Connect the seller account', 'Confirm the current OnBuy authorization and supported account context.'], ['Sync Products and Listings', 'Check identifiers, current price, availability and winning state.'], ['Set both boundaries', 'Configure minimum, maximum, decrease and optional raise behaviour.'], ['Observe delayed results', 'Review queue, locks, quota handling and later marketplace confirmation.']],
    exampleTitle: 'A controlled raise after winning', exampleLabel: 'Illustrative strategy',
    example: '<strong>Example:</strong> a Listing is winning at £31.20 with a £28.00 floor and £34.00 ceiling. A configured strategy may test £31.40. If the Listing stops winning, the next eligible decision can move back inside the safe range; it cannot exceed the ceiling or assume an immediate storefront update.',
    sources: [['OnBuy API documentation', 'https://docs.api.onbuy.com/'], ['OnBuy seller terms', 'https://cdn.onbuy.com/static/pdf/seller-terms/Seller%20Terms%20v3.0.0.pdf']],
    faq: [['Can Autopricy raise an OnBuy price after winning?', 'A configured strategy can explore a bounded increase when the available winning state supports it. The maximum price remains a hard limit.'], ['Does OnBuy repricing update instantly?', 'Not necessarily. Marketplace queues and display processing can introduce delay, so Autopricy separates submission from later confirmation.'], ['Does the lowest price guarantee the winning Offer?', 'No. Price is important, but availability, delivery, seller performance and OnBuy rules can also matter.'], ['How does Autopricy avoid conflicting OnBuy actions?', 'The workflow uses locks, quota-aware scheduling and stored status history to prevent overlapping work where possible.']],
    related: [['OnBuy Winning Offer guide', '/guides/onbuy-winning-offer/'], ['Minimum and maximum rules', '/features/min-max-price-rules/'], ['Multi-store operations', '/features/multi-store-management/']]
  },
  {
    slug: 'cdiscount-repricer', theme: 'theme-cdiscount', code: 'C.', codeNote: 'OCTOPIA<br>OFFERS',
    title: 'Cdiscount Repricer & Repricing Software – Free Trial | Autopricy', crumb: 'Cdiscount Repricer',
    description: 'Cdiscount repricing software for multi-store sellers: bulk price rules, min/max protection, package feedback and read-back. 7-day free trial.',
    eyebrow: 'Cdiscount repricer / Octopia workflow', h1: 'Cdiscount repricing with rules, package feedback and read-back',
    intro: 'Autopricy connects a Cdiscount seller through the current OAuth and SellerId workflow, synchronises Product and Offer data, applies bounded item-price rules, and records package feedback and later read-back. It complements the marketplace’s native tools when a seller needs multi-store control and a visible operations history.',
    signalTitle: 'Cdiscount execution chain', signalStatus: 'Feedback-aware',
    signals: [['Connection', 'OAuth and SellerId', 'Store-scoped'], ['Rule', 'Item price boundaries', 'Validated'], ['Package', 'Offer update feedback', 'Recorded'], ['Read-back', 'Later marketplace state', 'Checked']],
    problemKicker: 'Cdiscount price operations', problemTitle: 'A rule needs package feedback and a later marketplace state',
    problemCopy: 'Cdiscount already offers native floor-price functionality. External repricing earns its place by coordinating multiple stores, explicit rules, bulk operations and verifiable execution history.',
    pains: [['01 / SCOPE', 'Credentials and SellerId must stay aligned', 'Autopricy scopes authorisation and actions to the actual Cdiscount seller account.'], ['02 / FEEDBACK', 'Package acceptance is an intermediate state', 'Feedback can report processing or errors; it should not be reduced to a generic success message.'], ['03 / CONTROL', 'Native and external automation can conflict', 'The current store strategy must be reviewed so two pricing systems do not issue competing actions.']],
    mechanicsTitle: 'How Cdiscount repricing is verified',
    mechanics: [['Connect', 'Use the current OAuth and SellerId path for the seller account.'], ['Import rules', 'Associate exact items with valid minimum, maximum and repricing settings.'], ['Submit package', 'Send eligible Offer updates and retain package and item-level feedback.'], ['Read back', 'Compare the later marketplace state with the requested target before calling it confirmed.']],
    noteTitle: 'External repricing should not fight native automation', note: 'Cdiscount’s own price-floor mechanism may already operate on an Offer. Before enabling Autopricy, confirm which system owns the price decision and avoid overlapping automation.',
    workflowTitle: 'Introduce Cdiscount repricing with one owner',
    workflow: [['Authorise the store', 'Confirm OAuth, SellerId and the current store context.'], ['Review existing automation', 'Identify native price-floor settings or other tools that may already change prices.'], ['Import bounded rules', 'Validate item identity, minimum, maximum and eligible products.'], ['Track package and read-back', 'Review feedback, errors and later marketplace state before scaling.']],
    exampleTitle: 'Package feedback is not the final price', exampleLabel: 'Illustrative workflow',
    example: '<strong>Example:</strong> a €19.80 target is inside a €18.50–€24.00 range and enters an Offer package. Autopricy records package and item feedback first, then checks the later marketplace value. A processed package alone is not described as a guaranteed winning Offer.',
    sources: [['Cdiscount seller guidance on native floor pricing', 'https://marketplace.cdiscount.com/en/bien-preparer-les-temps-forts-commerciaux/']],
    faq: [['How is Autopricy different from Cdiscount native repricing?', 'Autopricy focuses on explicit multi-store rules, bulk operations, package feedback and shared execution history. The appropriate owner depends on the seller’s current setup.'], ['Can native and external repricing run together?', 'Overlapping tools can issue conflicting actions. Review the current store automation and choose a clear owner before activation.'], ['Does package success prove the storefront price?', 'Not by itself. Package feedback and a later marketplace read-back are separate pieces of evidence.'], ['Does Autopricy guarantee the featured Offer?', 'No. Price can affect competition, but marketplace placement can also depend on stock, delivery, seller performance and platform rules.']],
    related: [['Cdiscount repricing guide', '/guides/cdiscount-repricing/'], ['Multi-store operations', '/features/multi-store-management/'], ['Automatic repricing', '/features/automatic-repricing/']]
  },
  {
    slug: 'multi-marketplace-repricing', theme: 'theme-multi', code: '∞', codeNote: 'STORES<br>CHANNELS',
    title: 'Multi-Marketplace Repricing Software for Europe | Autopricy', crumb: 'Multi-marketplace repricing',
    description: 'One repricing workspace for Worten, FNAC, Darty, OnBuy, Cdiscount and selected Mirakl marketplaces. Min/max protection, unlimited SKUs, 7-day free trial.',
    eyebrow: 'Multi-marketplace repricing / Europe', h1: 'One repricing workspace, marketplace-specific execution',
    intro: 'Autopricy gives cross-border sellers one place to manage pricing rules and execution history across supported European marketplaces. The workspace is shared; authorisation, data, competition, submission and confirmation remain platform-specific.',
    signalTitle: 'Shared control, distinct adapters', signalStatus: 'No ERP scope',
    signals: [['Stores', 'Scoped credentials', 'Separated'], ['Rules', 'Per Offer and platform', 'Bounded'], ['Actions', 'Marketplace adapters', 'Specific'], ['History', 'Common operational view', 'Auditable']],
    problemKicker: 'Cross-border pricing operations', problemTitle: 'Centralised control should not erase marketplace differences',
    problemCopy: 'A seller needs one operational view without pretending that every marketplace exposes the same Buy Box, competitor data, rate limit or update method.',
    pains: [['01 / CONTEXT', 'Each store keeps its own authority', 'Credentials, identifiers, channels and actions stay scoped to the connected shop.'], ['02 / RULES', 'A common UI can hold different logic', 'Teams can use familiar minimum, maximum and status concepts while the adapter handles marketplace-specific details.'], ['03 / EVIDENCE', 'One history, honest states', 'The shared view keeps calculated, protected, submitted, processing, confirmed and failed states distinct.']],
    mechanicsTitle: 'Current repricing scope',
    support: [['Worten', 'Mature Offer repricing and confirmation workflow.', '/worten-repricer/'], ['FNAC', 'XML Offer updates, seller comparison and batch status.', '/fnac-repricer/'], ['Darty', 'Darty-specific competitor handling through the XML workflow.', '/darty-repricer/'], ['OnBuy', 'Product/Listing sync, winning checks and bounded raise/decrease.', '/onbuy-repricer/'], ['Cdiscount', 'OAuth, rules, packages, feedback and read-back.', '/cdiscount-repricer/'], ['Selected Mirakl operators', 'Assessed per operator; no universal compatibility claim.', '/mirakl-repricer/']],
    noteTitle: 'Autopricy is not an ERP', note: 'The core scope is repricing, competitive Offer monitoring, bounded price automation and multi-store operations, with adjacent collection or listing workflows where verified. It is not positioned as order, warehouse, procurement, finance or logistics management software.',
    workflowTitle: 'Add marketplaces without losing control',
    workflow: [['Map current stores', 'List each operator, account, country, SKU volume and current pricing owner.'], ['Validate adapters', 'Confirm available data, limits, identity and update semantics per marketplace.'], ['Apply store-safe rules', 'Configure boundaries and strategies without sharing credentials or state across shops.'], ['Review one history', 'Use the common view to find protected, pending, confirmed and failed actions.']],
    exampleTitle: 'A shared dashboard does not mean shared logic', exampleLabel: 'Operational example',
    example: '<strong>Example:</strong> a team may use the same minimum/maximum workflow for Worten, FNAC and OnBuy. Underneath, Worten uses its Offer/channel path, FNAC submits XML batches, and OnBuy checks Product/Listing and winning state. The shared interface reduces switching; it does not flatten those differences.',
    faq: [['Which marketplaces currently have repricing pages?', 'This release covers Worten, FNAC, Darty, OnBuy, Cdiscount and selected Mirakl-powered operators. Each page states its own limitations.'], ['Is Fyndiq included as a competitive repricer?', 'No. Current Fyndiq capability is positioned around Article and listing price or inventory operations, not a competitor-driven repricing engine.'], ['Can one rule be copied to every marketplace?', 'The UI concepts can be familiar, but eligibility, market inputs and action semantics must be validated per platform.'], ['Does Autopricy manage orders or warehouses?', 'No. Autopricy is not positioned as an ERP for orders, warehousing, procurement, finance or logistics.']],
    related: [['Automatic repricing', '/features/automatic-repricing/'], ['Price boundaries', '/features/min-max-price-rules/'], ['Multi-store management', '/features/multi-store-management/']]
  },
  {
    slug: 'features/automatic-repricing', theme: 'theme-multi', code: 'A.', codeNote: 'OBSERVE<br>VERIFY',
    title: 'Automatic Repricing Software for EU Marketplaces | Autopricy', crumb: 'Automatic repricing',
    description: 'Automatic repricing for European marketplaces: track competitor offers, reprice within min/max rules and see every confirmed change. 7-day free trial.',
    eyebrow: 'Feature / automatic repricing', h1: 'Automatic repricing is a control loop, not a price-change button',
    intro: 'Autopricy connects market inputs to explicit seller rules, price boundaries, marketplace submission and result tracking. Automation is enabled only where the platform and store provide the data and actions required for a safe loop.',
    signalTitle: 'Repricing evidence chain', signalStatus: 'End to end',
    signals: [['Eligible', 'Store, Offer and rule', 'Checked'], ['Observe', 'Available market input', 'Current'], ['Act', 'Bounded target', 'Submitted'], ['Verify', 'Platform result', 'Persisted']],
    problemKicker: 'Automatic repricing controls', problemTitle: 'Each stage can succeed or fail independently',
    problemCopy: 'A scheduled job or accepted API request proves only that stage. Reliable automation preserves the whole chain so operators can see where a price stopped.',
    pains: [['01 / ELIGIBILITY', 'Not every Offer should run', 'The store, product identity, rule, boundaries and platform capability need to be valid first.'], ['02 / DECISION', 'The target needs an explainable reason', 'A price action comes from available market data and explicit logic—not an unsupported guess.'], ['03 / RESULT', 'HTTP acceptance is not storefront proof', 'Submission, marketplace processing, read-back and persistence remain distinct.']],
    mechanicsTitle: 'The six stages of a trustworthy repricing run',
    mechanics: [['Eligibility', 'Confirm shop authority, exact Offer identity, valid rule and supported platform workflow.'], ['Market input', 'Read the current Offer and only the competitor or winning data the platform exposes.'], ['Decision', 'Calculate a target inside minimum and maximum boundaries.'], ['Scheduling', 'Use locks and platform-aware pacing to avoid conflicting or excessive work.'], ['Submission', 'Send the action through the marketplace-specific adapter.'], ['Result', 'Record platform feedback or read-back and preserve the final status in history.']],
    noteTitle: 'Automatic does not mean uncontrolled', note: 'Autopricy’s core price decisions use explicit rules and seller-set boundaries. The system should stop or expose an exception when a required input is missing, a lock is held, a platform rejects the request or confirmation is unavailable.',
    workflowTitle: 'Move from observation to automation',
    workflow: [['Connect and synchronise', 'Verify exact store and Offer records before creating rules.'], ['Configure boundaries', 'Set minimum, maximum and marketplace-appropriate strategy.'], ['Run a limited scope', 'Observe calculated, protected and submitted states on a small product set.'], ['Expand after confirmation', 'Scale only when later platform results and history match expectations.']],
    exampleTitle: 'Where an automated run should stop', exampleLabel: 'Control example',
    example: '<strong>Example:</strong> the scheduler starts and finds a valid Offer, but the competitor input is unavailable. The correct result is not a guessed target. The run should skip or record a clear state, leaving the last confirmed marketplace price unchanged.',
    faq: [['Which marketplaces support automatic repricing?', 'Current public scope includes Worten, FNAC, Darty, OnBuy, Cdiscount and selected Mirakl-powered operators, with different capabilities per platform.'], ['Does Autopricy use generative AI to choose prices?', 'Core repricing decisions use explicit rules and boundaries, not a generative model choosing prices autonomously.'], ['What happens when marketplace data is missing?', 'The workflow should skip or expose an exception rather than invent a competitor price or mark an unverified action successful.'], ['Can I begin with only a few products?', 'Yes. A limited scope is the preferred way to validate identity, rules, submission and confirmation before scaling.']],
    related: [['Price boundaries', '/features/min-max-price-rules/'], ['Multi-store management', '/features/multi-store-management/'], ['Marketplace coverage', '/multi-marketplace-repricing/']]
  },
  {
    slug: 'features/min-max-price-rules', theme: 'theme-safety', code: '±', codeNote: 'PRICE<br>BOUNDARIES',
    title: 'Min & Max Price Rules: Repricing Without Losing Margin | Autopricy', crumb: 'Min & max price rules',
    description: 'Set a hard minimum and maximum price for every offer so automatic repricing never goes below your floor. Validation, protection logs, 7-day free trial.',
    eyebrow: 'Feature / price safety', h1: 'Minimum and maximum prices are hard operating boundaries',
    intro: 'Autopricy evaluates eligible repricing actions inside seller-defined minimum and maximum values. The boundaries are attached to the real Offer and visible in operations, so a competitive target cannot silently become an unprofitable price.',
    signalTitle: 'Offer price guardrail', signalStatus: 'Seller-defined',
    signals: [['Floor', 'Minimum allowed price', 'Hard stop'], ['Ceiling', 'Maximum allowed price', 'Hard stop'], ['Target', 'Rule calculation', 'Validated'], ['History', 'Protected decision', 'Visible']],
    problemKicker: 'Repricing safety', problemTitle: 'A floor is useful only when validation and execution agree',
    problemCopy: 'Price safety depends on correct Offer identity, valid numeric boundaries, the calculation path, and the submitted value—not only a form field in the interface.',
    pains: [['01 / VALIDITY', 'Invalid ranges must not run', 'A missing value, non-numeric input or minimum above maximum should block activation.'], ['02 / IDENTITY', 'Boundaries belong to a specific Offer', 'Autopricy keeps the rule tied to the correct store and SKU rather than guessing from EAN or list position.'], ['03 / VISIBILITY', 'Protection should be an observable result', 'When a computed target crosses a boundary, operations should show that the guardrail stopped or changed the action.']],
    mechanicsTitle: 'How price boundaries affect a decision',
    mechanics: [['Validate', 'Require numeric values and a minimum that does not exceed the maximum.'], ['Calculate', 'Run the marketplace-specific rule using the available market input.'], ['Constrain', 'Block or clamp a target that would leave the approved range, according to the configured workflow.'], ['Record', 'Persist the reason, target and resulting action so the operator can audit the decision.']],
    noteTitle: 'Your floor must reflect your business costs', note: 'Autopricy enforces the values you configure; it does not calculate your true margin automatically. Sellers remain responsible for fees, tax, shipping, promotions, currency and other costs when setting a safe minimum.',
    workflowTitle: 'Set boundaries before enabling automation',
    workflow: [['Calculate the commercial floor', 'Include the costs and margin requirements relevant to the store and product.'], ['Set a realistic ceiling', 'Define how far a winning Offer may recover without leaving the intended range.'], ['Validate on real Offers', 'Check store, SKU, currency and current price before activation.'], ['Review protection events', 'Use history to find products repeatedly hitting the floor or ceiling.']],
    exampleTitle: 'A target below the floor should not be sent', exampleLabel: 'Illustrative calculation',
    example: '<strong>Example:</strong> an Offer has a €20.00 minimum and €28.00 maximum. A competition rule calculates €19.75. The safe outcome is a protected decision—not a €19.75 submission. Whether the workflow holds at €20.00 or skips the action is made explicit in the applicable rule.',
    faq: [['Does Autopricy calculate my minimum price?', 'No. The seller sets the business boundary. Autopricy validates and enforces it in eligible repricing workflows.'], ['What happens if minimum price is above maximum price?', 'The rule is invalid and should not be activated until the range is corrected.'], ['Can different Offers have different boundaries?', 'Yes. Boundaries are associated with the real store Offer so products can use different commercial limits.'], ['Will a winning Offer always rise to the maximum?', 'No. A raise depends on the platform capability and configured strategy; the maximum is a ceiling, not an automatic target.']],
    related: [['Automatic repricing', '/features/automatic-repricing/'], ['Multi-store management', '/features/multi-store-management/'], ['OnBuy repricing', '/onbuy-repricer/']]
  },
  {
    slug: 'features/multi-store-management', theme: 'theme-multi', code: 'N.', codeNote: 'SHOP-SCOPED<br>OPERATIONS',
    title: 'Multi-Store Repricing: Manage Many Marketplace Shops | Autopricy', crumb: 'Multi-store management',
    description: 'Reprice many marketplace stores from one workspace: shop-scoped credentials, filters, bulk rule edits and per-store history. 7-day free trial.',
    eyebrow: 'Feature / multi-store operations', h1: 'Manage many marketplace stores without mixing their authority',
    intro: 'Autopricy brings supported stores into one operational workspace while keeping credentials, identifiers, rules, tasks and results scoped to the correct shop. Teams can filter and act in bulk without turning a shared view into shared authority.',
    signalTitle: 'Shop-scoped workspace', signalStatus: 'Separated by design',
    signals: [['Credentials', 'Per marketplace store', 'Isolated'], ['Offers', 'Exact shop identity', 'Scoped'], ['Bulk work', 'Filtered selection', 'Controlled'], ['History', 'Store and task context', 'Traceable']],
    problemKicker: 'Multi-store repricing', problemTitle: 'Scale creates identity risk before it creates convenience',
    problemCopy: 'When stores share a dashboard, every read and write still needs the correct platform, account, shop, SKU and rule context.',
    pains: [['01 / AUTHORITY', 'A credential must not cross stores', 'Autopricy associates marketplace access with the actual shop and uses that context for eligible operations.'], ['02 / SELECTION', 'Bulk actions need an explicit scope', 'Filters, selected rows and task records make it clear which stores and Offers are included.'], ['03 / OPERATIONS', 'Results need store-level evidence', 'A global success count is not enough; operators need the relevant shop, item and platform status.']],
    mechanicsTitle: 'What stays scoped in a multi-store workflow',
    mechanics: [['Connection', 'Marketplace authorization and seller identity remain attached to one shop record.'], ['Data', 'Products, Offers, Listings and Articles retain their platform and shop context.'], ['Rules', 'Minimum, maximum and repricing settings apply to the selected eligible records.'], ['Tasks', 'Bulk execution and status history identify the originating store and operation.']],
    noteTitle: 'Multi-store pricing is not ERP expansion', note: 'Autopricy centralises repricing and adjacent Offer operations where verified. It does not claim to replace order management, warehouse, procurement, finance or logistics systems.',
    workflowTitle: 'Add stores with an auditable boundary',
    workflow: [['Create the shop record', 'Choose the correct platform and store identity before adding authorization.'], ['Synchronise a bounded scope', 'Confirm exact products and Offer identities without relying on approximate matches.'], ['Filter before bulk action', 'Use shop, platform, SKU, status and rule conditions to define the target set.'], ['Review task-level results', 'Check per-store progress and failures instead of relying only on a global completion message.']],
    exampleTitle: 'One filter should define one clear target set', exampleLabel: 'Operational example',
    example: '<strong>Example:</strong> an operator filters OnBuy Store A for active Listings without minimum prices. A bulk rule action should target only those visible records, create a traceable task and leave Store B and every other platform untouched.',
    faq: [['Can one account manage stores on different marketplaces?', 'The workspace can present supported stores together, while each shop keeps its own authorization, data and platform adapter.'], ['Can I apply rules in bulk?', 'Supported workflows can use filters and selected records for batch operations. The target scope should be explicit before execution.'], ['Does multi-store management include orders and warehouses?', 'No. Autopricy is focused on repricing and adjacent Offer operations, not full ERP functions.'], ['How are failures investigated?', 'Task and item context should preserve the shop, operation and platform result so failures can be reviewed without guessing.']],
    related: [['Marketplace coverage', '/multi-marketplace-repricing/'], ['Automatic repricing', '/features/automatic-repricing/'], ['Price boundaries', '/features/min-max-price-rules/']]
  }
];

const updated = '2026-10-04';
const umami = `<script>if(location.hostname.includes('autopricy.com')){const s=document.createElement('script');s.defer=true;s.src='${app}/umami.js';s.dataset.websiteId='20f3ddd5-3c5b-4b32-91ca-6db0ff7ade94';document.head.appendChild(s);}</script>`;

const locales = {
  en: {
    lang: 'en', ogLocale: 'en_US', siteName: 'Autopricy', switchLabel: 'English',
    brandHome: 'Autopricy home', logoAlt: 'Autopricy logo', brand: 'Autopricy', brandSmall: 'Marketplace repricing',
    navAria: 'Primary navigation',
    nav: [['Marketplaces', '/multi-marketplace-repricing/'], ['Automatic repricing', '/features/automatic-repricing/'], ['Price safety', '/features/min-max-price-rules/'], ['Guides', '/guides/']],
    home: 'Home', breadcrumbHome: 'Autopricy',
    trial: 'Start free trial', trialHero: 'Start 7-day free trial', seeWorkflow: 'See the workflow',
    mechanicsKicker: 'Marketplace mechanics', workflowKicker: 'Workflow',
    relatedKicker: 'Related resources', relatedTitle: 'Continue with the relevant workflow', relatedLabel: 'Autopricy resource',
    faqKicker: 'FAQ', faqTitle: (page) => `${page.h1}: common questions`,
    reference: 'Reference', supportMore: 'View platform details',
    pricing: () => '',
    cta: (page, source) => `<div><h2>Test the workflow on a real store</h2><p>Start with one supported store, a controlled product scope, explicit boundaries and visible platform results.</p><a class="contact-email" href="mailto:yuanyongvia@gmail.com">yuanyongvia@gmail.com</a></div><div class="hero-actions"><a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register_footer">Start free trial</a><a class="btn btn-secondary" href="mailto:yuanyongvia@gmail.com?subject=${encodeURIComponent(page.h1)}">Ask about fit</a></div>`,
    footer: `<span>© 2026 Autopricy · Beijing Qingshi Technology Co., Ltd.</span><nav class="footer-links" aria-label="Footer navigation"><a href="/multi-marketplace-repricing/">Marketplaces</a><a href="/worten-repricer/">Worten</a><a href="/fnac-repricer/">FNAC</a><a href="/darty-repricer/">Darty</a><a href="/onbuy-repricer/">OnBuy</a><a href="/cdiscount-repricer/">Cdiscount</a><a href="/guides/">Guides</a><a href="${app}/privacy.html">Privacy</a></nav>`
  },
  zh: {
    lang: 'zh-CN', ogLocale: 'zh_CN', siteName: '调价先锋 Autopricy', switchLabel: '中文',
    brandHome: '调价先锋 Autopricy 首页', logoAlt: '调价先锋 Autopricy 标志', brand: '调价先锋', brandSmall: 'Autopricy',
    navAria: '主导航',
    nav: [['支持平台', '/zh/multi-marketplace-repricing/'], ['自动调价', '/zh/features/automatic-repricing/'], ['最低价保护', '/zh/features/min-max-price-rules/'], ['调价教程', '/zh/guides/']],
    home: '首页', breadcrumbHome: '调价先锋',
    trial: '免费试用', trialHero: '免费试用 7 天', seeWorkflow: '查看接入步骤',
    mechanicsKicker: '平台机制', workflowKicker: '接入步骤',
    relatedKicker: '相关页面', relatedTitle: '继续了解', relatedLabel: '调价先锋',
    faqKicker: '常见问题', faqTitle: (page) => `${page.crumb}常见问题`,
    reference: '参考资料', supportMore: '查看平台详情',
    pricing: (source) => `<section class="section section-muted"><div class="container"><div class="price-box"><div><p class="section-kicker">价格方案</p><h2>自动调价标准版 <strong>¥168</strong><span> / 店铺 / 月</span></h2><p>商品数量不限 · 注册自动开通 7 天免费试用 · 无需提交申请或等待审核</p></div><a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register_pricing">免费注册试用</a></div></div></section>`,
    cta: (page, source) => `<div><h2>先用一个店铺试跑</h2><p>注册后自动开通 7 天免费试用。首次接入时，客服可以协助确认授权信息、同步商品并完成基础规则配置。</p><a class="contact-email" href="tel:+8617720284880">客服电话 177 2028 4880</a></div><div class="hero-actions"><a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register_footer">免费注册试用</a><a class="btn btn-secondary" href="${app}/">已有账号，登录</a></div>`,
    footer: `<span>© 2026 调价先锋 Autopricy · 北京轻石科技有限公司 · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">京ICP备2026039016号</a></span><nav class="footer-links" aria-label="页脚导航"><a href="/">首页</a><a href="/zh/multi-marketplace-repricing/">支持平台</a><a href="/zh/worten-repricer/">Worten</a><a href="/zh/fnac-repricer/">FNAC</a><a href="/zh/darty-repricer/">Darty</a><a href="/zh/onbuy-repricer/">OnBuy</a><a href="/zh/cdiscount-repricer/">Cdiscount</a><a href="/zh/guides/">调价教程</a><a href="/zh/help/">帮助中心</a><a href="${app}/privacy.html">隐私政策</a></nav>`
  }
};

const allPages = [
  ...pages.map((page) => ({ ...page, locale: 'en' })),
  ...zhPages.map((page) => ({ ...page, locale: 'zh' }))
];
const bySlug = new Map(allPages.map((page) => [page.slug, page]));

// English page `x/` and Chinese page `zh/x/` are translations of each other.
function counterpart(page) {
  return page.locale === 'zh' ? bySlug.get(page.slug.slice(3)) : bySlug.get(`zh/${page.slug}`);
}

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function renderCards(items) {
  return items.map(([index, title, text]) => `<article class="card"><span class="card-index">${esc(index)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('\n');
}

function renderMechanics(page, L) {
  if (page.support) {
    return `<ul class="support-list">${page.support.map(([name, text, href]) => `<li><a href="${href}"><strong>${esc(name)}</strong></a><span>${esc(text)}</span><em class="availability">${esc(L.supportMore)}</em></li>`).join('')}</ul>`;
  }
  return `<table class="mechanics"><tbody>${page.mechanics.map(([name, text]) => `<tr><th scope="row">${esc(name)}</th><td>${esc(text)}</td></tr>`).join('')}</tbody></table>`;
}

function renderSources(sources = [], L) {
  if (!sources.length) return '';
  return `<p class="source-note">${esc(L.reference)}: ${sources.map(([label, href]) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`).join(' · ')}</p>`;
}

function renderShot(shot) {
  if (!shot) return '';
  return `<section class="section"><div class="container"><figure class="shot-figure" style="max-width: ${Math.min(shot.width, 960, Math.round((760 * shot.width) / shot.height))}px"><img src="${shot.src}" alt="${esc(shot.alt)}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async"><figcaption>${esc(shot.caption)}</figcaption></figure></div></section>`;
}

function renderPage(page) {
  const L = locales[page.locale];
  const url = `${site}/${page.slug}/`;
  const source = page.slug.replaceAll('/', '_');
  const crumb = page.crumb ?? page.h1;
  const alt = counterpart(page);
  const altL = alt && locales[alt.locale];
  const enUrl = page.locale === 'en' ? url : alt ? `${site}/${alt.slug}/` : url;
  const alternates = [[L.lang, url], ...(alt ? [[altL.lang, `${site}/${alt.slug}/`]] : []), ['x-default', enUrl]];
  const og = ogImage(page.slug, L.lang);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: page.title,
        description: page.description, inLanguage: L.lang,
        isPartOf: { '@id': `${site}/#website` }, about: { '@id': `${site}/#software` }
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: L.breadcrumbHome, item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: crumb, item: url }
        ]
      },
      {
        '@type': 'FAQPage', mainEntity: page.faq.map(([question, answer]) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${L.lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
${page.keywords ? `  <meta name="keywords" content="${esc(page.keywords)}">\n` : ''}  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">
${alternates.map(([lang, href]) => `  <link rel="alternate" hreflang="${lang}" href="${href}">`).join('\n')}
  <link rel="icon" href="${site}/logo.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${platformCssHref}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="${esc(L.siteName)}">
  <meta property="og:locale" content="${L.ogLocale}">
  <meta property="og:image" content="${og.url}">
  <meta property="og:image:width" content="${og.width}">
  <meta property="og:image:height" content="${og.height}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="${page.theme}">
  <header class="site-header">
    <div class="container nav">
      <a class="brand" href="/" aria-label="${esc(L.brandHome)}"><img src="/logo.svg" alt="${esc(L.logoAlt)}" width="32" height="32"><span>${esc(L.brand)}<small>${esc(L.brandSmall)}</small></span></a>
      <nav class="nav-links" aria-label="${esc(L.navAria)}">
${L.nav.map(([label, href]) => `        <a href="${href}">${esc(label)}</a>`).join('\n')}
${alt ? `        <a class="lang-switch" href="/${alt.slug}/" hreflang="${altL.lang}" lang="${altL.lang}">${esc(altL.switchLabel)}</a>\n` : ''}        <a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register_header">${esc(L.trial)}</a>
      </nav>
    </div>
  </header>
  <main>
    <section class="hero">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${esc(L.home)}</a><span>/</span><span>${esc(crumb)}</span></nav>
        <div class="hero-grid">
          <div><p class="eyebrow">${esc(page.eyebrow)}</p><h1>${esc(page.h1)}</h1><p class="hero-copy">${esc(page.intro)}</p><div class="hero-actions"><a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register_hero">${esc(L.trialHero)}</a><a class="btn btn-secondary" href="#workflow">${esc(L.seeWorkflow)}</a></div></div>
          <aside class="signal-panel" aria-label="${esc(page.signalTitle)}"><div class="platform-code" aria-hidden="true"><strong>${esc(page.code)}</strong><span>${page.codeNote}</span></div><div class="signal-head"><strong>${esc(page.signalTitle)}</strong><span>${esc(page.signalStatus)}</span></div><ul class="signal-list">${page.signals.map(([name, text, state]) => `<li><span><strong>${esc(name)}</strong><br>${esc(text)}</span><b>${esc(state)}</b></li>`).join('')}</ul></aside>
        </div>
      </div>
    </section>
    <section class="section"><div class="container"><div class="section-head"><p class="section-kicker">${esc(page.problemKicker)}</p><h2>${esc(page.problemTitle)}</h2><p class="section-copy">${esc(page.problemCopy)}</p></div><div class="grid-3">${renderCards(page.pains)}</div></div></section>
    <section class="section section-muted"><div class="container"><div class="section-head"><p class="section-kicker">${esc(L.mechanicsKicker)}</p><h2>${esc(page.mechanicsTitle)}</h2></div>${renderMechanics(page, L)}${renderSources(page.sources, L)}</div></section>
${page.shot ? `    ${renderShot(page.shot)}\n` : ''}    <section class="section"><div class="container"><div class="agent-note"><h2>${esc(page.noteTitle)}</h2><p>${esc(page.note)}</p></div></div></section>
    <section class="section section-muted" id="workflow"><div class="container"><div class="section-head"><p class="section-kicker">${esc(L.workflowKicker)}</p><h2>${esc(page.workflowTitle)}</h2></div><div class="grid-4 steps">${page.workflow.map(([title, text]) => `<article class="card step"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}</div></div></section>
    <section class="section"><div class="container"><div class="example-box"><div><span class="example-label">${esc(page.exampleLabel)}</span><h2>${esc(page.exampleTitle)}</h2></div><p>${page.example}</p></div></div></section>
${page.locale === 'zh' ? `    ${L.pricing(source)}\n` : ''}    <section class="section section-muted"><div class="container"><div class="section-head"><p class="section-kicker">${esc(L.relatedKicker)}</p><h2>${esc(L.relatedTitle)}</h2></div><div class="related-grid">${[...page.related, ...(page.locale === 'zh' ? [['操作帮助中心', '/zh/help/']] : [])].map(([title, href]) => `<a class="related-link" href="${href}"><span>${esc(L.relatedLabel)}</span><strong>${esc(title)} →</strong></a>`).join('')}</div></div></section>
    <section class="section"><div class="container"><div class="section-head"><p class="section-kicker">${esc(L.faqKicker)}</p><h2>${esc(L.faqTitle({ ...page, crumb }))}</h2></div><div class="faq-list">${page.faq.map(([question, answer], index) => `<details${index === 0 ? ' open' : ''}><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join('')}</div></div></section>
    <section class="section"><div class="container"><div class="cta">${L.cta(page, source)}</div></div></section>
  </main>
  <footer class="site-footer"><div class="container footer-row">${L.footer}</div></footer>
  ${umami}
</body>
</html>\n`;
}

for (const page of allPages) {
  const output = resolve(distRoot, page.slug, 'index.html');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, renderPage(page));
}

buildGuides(distRoot);

const priority = (slug) => (slug.replace(/^zh\//, '').startsWith('features/') ? '0.8' : '0.9');
const sitemapUrls = [
  { loc: `${site}/`, priority: '1.0', changefreq: 'weekly' },
  ...allPages.map((page) => ({ loc: `${site}/${page.slug}/`, priority: priority(page.slug), changefreq: 'monthly' })),
  ...guideUrls.map((loc) => ({ loc, priority: '0.8', changefreq: 'monthly' }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${updated}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

writeFileSync(resolve(distRoot, 'sitemap.xml'), sitemap);
console.log(`Generated ${pages.length} English pages, ${zhPages.length} Chinese pages, ${guideUrls.length} guide pages and ${sitemapUrls.length} sitemap URLs.`);
