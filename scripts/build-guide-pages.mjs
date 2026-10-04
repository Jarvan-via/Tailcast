import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ogImage } from './og.mjs';
import { platformCssHref } from './assets.mjs';
import { zhGuides } from './zh-guides.mjs';
import { zhHelp } from './zh-help.mjs';

const site = 'https://autopricy.com';
const app = 'https://app.autopricy.com';
const published = '2026-08-24';

export const guides = [
  {
    slug: 'mirakl-repricing', platform: 'Mirakl', landing: '/mirakl-repricer/',
    title: 'Mirakl Repricing Guide: How It Works and What to Check',
    description: 'Learn how Mirakl repricing works across selected marketplace operators, from Offer data and channel pricing to import status, limits, and verification.',
    h1: 'Mirakl repricing: what sellers need to verify before automating',
    intro: 'Mirakl provides a marketplace platform, not one universal seller workflow. Each operator decides the channels, Offer fields, pricing controls and competitive data it exposes. A safe repricing setup starts by validating the exact operator rather than assuming that one connector works everywhere.',
    takeaways: ['Treat every Mirakl operator as a separate integration boundary.', 'Keep shop, SKU, product and channel identity attached to every update.', 'Validate minimum and maximum prices before calculating a target.', 'Track import status and errors; an accepted file is not a confirmed price.'],
    sections: [
      ['Why “Mirakl repricer” is not a single integration', ['Mirakl Marketplace includes seller APIs for Offers, pricing and asynchronous imports. Operators configure the marketplace around their own commercial model, so two Mirakl-powered sites can expose different fields, channels and permissions.', 'Before enabling automation, identify the operator, country, shop ID, channel codes, Offer identifiers and authorization scope. If competitive data is not available for that operator, the repricer must not invent it.']],
      ['The data a repricing loop needs', ['A useful loop needs the current Offer, a valid pricing rule, seller-set boundaries and a market signal that is genuinely available. The Offer API can carry shop and channel context, while operator-specific endpoints determine what can be read or changed.', 'Price synchronisation and repricing are different. Synchronisation copies a known value. Repricing observes a permitted market signal, calculates a bounded target, submits it and verifies the result.']],
      ['A safe Mirakl workflow', ['Start with a small set of exact Offers. Confirm identifiers and current values, add minimum and maximum prices, then run the marketplace-specific decision rule. Submit only eligible changes through the supported Offer update path.', 'Mirakl imports are asynchronous. Preserve the import identifier, poll its status and review line-level errors. A request that was uploaded successfully can still contain rejected items.']],
      ['Channel pricing and common failure modes', ['Some operators use channel-specific prices. An update without the correct channel context can be irrelevant or wrong, even when the SKU is valid. Rate limits, inactive Offers, invalid ranges and operator-side validation can also stop an action.', 'The operational history should distinguish calculated, protected, submitted, processing, confirmed and failed. These states make it possible to diagnose the first broken stage without guessing.']],
      ['When Autopricy is a fit', ['Autopricy supports selected Mirakl-derived operators after checking their actual API and Offer model. It is a fit when the operator exposes the inputs and actions required for bounded price automation. It is not a claim of compatibility with every Mirakl marketplace.', 'For a new operator, begin with one store and a controlled SKU sample. Expand only after identifiers, import feedback and later platform values agree.']]
    ],
    sources: [['Mirakl Marketplace API overview', 'https://developer.mirakl.com/content/product/mmp'], ['Mirakl seller Offer API', 'https://developer.mirakl.com/content/product/mmp/rest/seller/openapi3/offers/of01'], ['Mirakl Offer import status', 'https://developer.mirakl.com/content/product/mmp/rest/seller/openapi3/offers/of04']],
    faq: [['Does one Mirakl integration work for every operator?', 'No. Operators can differ in fields, channels, permissions, rate limits and competitive data. Support must be assessed per operator.'], ['Is an accepted import a confirmed price change?', 'No. Keep the import ID, check processing status and review item errors before treating the update as complete.'], ['Can a rule update channel-specific prices?', 'Only when the operator exposes that channel and the integration preserves the correct channel context.'], ['Does Autopricy guarantee the winning Offer?', 'No. It controls eligible price actions; placement may also depend on delivery, availability, seller performance and operator rules.']],
    related: [['Mirakl repricer', '/mirakl-repricer/'], ['Automatic repricing', '/features/automatic-repricing/'], ['Multi-marketplace repricing', '/multi-marketplace-repricing/']]
  },
  {
    slug: 'worten-automatic-repricing', platform: 'Worten', landing: '/worten-repricer/',
    title: 'Worten Automatic Repricing: How to Change Prices Safely',
    description: 'A practical guide to Worten automatic repricing, including Winning Offer signals, price boundaries, Offer identity, submission, and confirmation.',
    h1: 'How automatic repricing works on Worten',
    intro: 'Worten highlights a Winning Offer in the Buy Box, but the lowest item price alone does not guarantee that position. Sellers need a repricing loop that considers the available Offer context, protects margin and verifies what the marketplace actually processed.',
    takeaways: ['Compare the complete available Offer context, not a stale spreadsheet.', 'Use a hard minimum and maximum for every automated Offer.', 'Treat price as one Winning Offer input, not a guarantee.', 'Separate submission from marketplace confirmation.'],
    sections: [
      ['What the Worten Winning Offer means', ['Worten describes the Winning Offer as the Offer highlighted in the Buy Box. Its public criteria include price plus shipping and can also include seller-quality or Premium-related signals. That means “always be one cent cheaper” is not a complete strategy.', 'A repricer can improve price competitiveness. It cannot control stock, delivery performance, seller quality or every ranking rule used by the marketplace.']],
      ['The inputs Autopricy checks', ['The workflow starts from the real store Offer and its marketplace identity. It reads the current Offer and available comparable market prices for the relevant channel. Exact identity matters: a similar EAN, list position or price is not enough evidence to update an Offer.', 'Each eligible Offer needs a valid minimum, maximum and pricing rule. Missing competition or invalid boundaries should produce a skip or protected state, not a guessed price.']],
      ['A boundary-first repricing example', ['Suppose an Offer has a minimum of €38.00 and a maximum of €46.00. A competitor signal leads the rule to calculate €37.90. The floor blocks that target. If the rule later calculates €41.49, the value can be submitted, but remains pending until marketplace feedback or read-back supports confirmation.', 'This avoids two common errors: sacrificing margin to chase position and presenting an API request as proof that the storefront price is live.']],
      ['How to roll out safely', ['Connect one Worten store, audit a small product set and confirm Offer identity, current price, available competition and rule boundaries. Observe protected, submitted, confirmed and failed results before adding more products.', 'Review products that repeatedly hit the floor. They may need a different commercial strategy rather than more aggressive automation.']],
      ['What to measure', ['Do not measure a repricer only by the number of price changes. Track eligible Offers, protected decisions, confirmed changes, errors, time to confirmation and commercial outcomes such as sales or margin.', 'Winning Offer visibility can be useful, but it should be interpreted alongside availability, delivery and seller performance.']]
    ],
    sources: [['Worten marketplace terms and Winning Offer', 'https://www.worten.pt/termos-e-condicoes-da-conta-online'], ['Worten digital policy and ranking criteria', 'https://www.worten.pt/politica-digital']],
    faq: [['Does the cheapest Worten Offer always win?', 'No. Worten states that ordering can include price plus shipping and seller-quality or Premium-related criteria.'], ['Can Autopricy go below my minimum price?', 'Eligible calculations are constrained by the configured minimum and maximum. Invalid boundaries should stop automation.'], ['How fast do updates appear?', 'Timing depends on platform processing, API limits and store configuration, so submission and confirmation are tracked separately.'], ['Does repricing guarantee the Buy Box?', 'No. Repricing controls eligible price actions, while other marketplace and seller signals can affect the Winning Offer.']],
    related: [['Worten repricer', '/worten-repricer/'], ['Price boundaries', '/features/min-max-price-rules/'], ['Automatic repricing', '/features/automatic-repricing/']]
  },
  {
    slug: 'onbuy-winning-offer', platform: 'OnBuy', landing: '/onbuy-repricer/',
    title: 'How to Win the OnBuy Buy Box Without a Price War',
    description: 'Learn how to approach the OnBuy Winning Offer with Product and Listing identity, total seller costs, bounded repricing, winning checks, and safe rollout.',
    h1: 'How to compete for the OnBuy Winning Offer without uncontrolled price cuts',
    intro: 'An OnBuy repricer should not lower every Listing on every cycle. The useful question is whether the Listing is currently winning, which action is allowed inside the seller’s price range, and whether OnBuy later confirms the change.',
    takeaways: ['Keep Product catalogue data separate from the sellable Listing.', 'Set boundaries using the seller’s full cost model.', 'Use winning-state checks to choose between holding, lowering or a bounded increase.', 'Do not describe a fixed Winning Offer formula that OnBuy has not publicly documented.'],
    sections: [
      ['Start with Product and Listing identity', ['A Product provides catalogue context; a Listing is the seller-specific commercial record that carries the price. Repricing must update the exact Listing belonging to the connected shop, not an approximate product match.', 'Synchronise both records and retain their identifiers. This prevents a catalogue match from being mistaken for authority to change a seller Listing.']],
      ['What public OnBuy information does and does not prove', ['OnBuy’s seller terms place responsibility for the Listing price on the seller and describe prices in the context of VAT, delivery and applicable import costs or duties. Seller profiles, reviews and badges are also visible to buyers.', 'Public pages do not provide a stable, complete Winning Offer scoring formula. A responsible guide therefore avoids claiming that one fixed price difference guarantees the winning position.']],
      ['A two-direction repricing strategy', ['When a Listing is not winning and a comparable competing signal is available, a rule can calculate a lower target inside the minimum price. When the Listing is winning, a controlled strategy may test a higher value without crossing the maximum.', 'The goal is not continuous undercutting. It is to remain competitive while discovering whether margin can be recovered. Delays and quotas should prevent overlapping cycles from fighting each other.']],
      ['Example with a safe range', ['A Listing has a £24.00 minimum and £31.00 maximum. If it is not winning, the rule may calculate £26.49 from the available comparison. If it is already winning, a later cycle may test £26.99. Neither action can leave the approved range.', 'A queued update is still not storefront proof. Record the action, wait for processing and use the available later state before labelling it confirmed.']],
      ['Rollout checklist', ['Connect one shop and sync a controlled group of Products and Listings. Check identifiers, currencies, current values and boundaries. Run slowly enough to respect platform quotas and observe winning checks, actions and confirmations.', 'If another pricing tool is active, choose one owner for overlapping Listings. Competing automation can make the resulting price impossible to explain.']]
    ],
    sources: [['OnBuy seller overview', 'https://www.onbuy.com/gb/sell/'], ['OnBuy seller terms', 'https://cdn.onbuy.com/static/pdf/seller-terms/Seller%20Terms%20v3.0.0.pdf'], ['OnBuy seller profiles', 'https://www.onbuy.com/gb/shop/']],
    faq: [['Does OnBuy publish a fixed Winning Offer formula?', 'The public sources reviewed do not provide a stable, complete formula, so Autopricy does not claim one.'], ['Why separate Product and Listing?', 'The Product is catalogue context; the Listing is the seller-specific record whose price can be changed.'], ['Can the repricer raise a price after winning?', 'A configured strategy can test a bounded increase when supported, without crossing the seller-set maximum.'], ['Should two repricers manage the same Listing?', 'No. Overlapping tools can issue conflicting actions, so one clear pricing owner is safer.']],
    related: [['OnBuy repricer', '/onbuy-repricer/'], ['Price boundaries', '/features/min-max-price-rules/'], ['Multi-store management', '/features/multi-store-management/']]
  },
  {
    slug: 'fnac-darty-repricing', platform: 'FNAC and Darty', landing: '/fnac-repricer/',
    title: 'FNAC and Darty Repricing Guide: Shared XML, Different Rules',
    description: 'Understand FNAC and Darty repricing: their shared XML 2.6 boundary, marketplace-specific seller logic, Offer comparison, batch updates, and status checks.',
    h1: 'FNAC and Darty repricing: what is shared and what must stay separate',
    intro: 'FNAC and Darty can share an XML 2.6 integration boundary, but they are not interchangeable marketplaces. Store identity, seller filtering, competitive context and ranking information must remain explicit for each platform.',
    takeaways: ['Reuse the verified XML transport boundary, not one generic business rule.', 'Exclude the current seller using the correct marketplace identity.', 'Interpret available price and delivery data consistently.', 'Track batch processing after submission.'],
    sections: [
      ['The shared technical boundary', ['Both workflows can use the same XML 2.6 style of Offer exchange and asynchronous batch handling. Shared parsing, validation and batch-status components reduce operational duplication.', 'That shared transport does not justify copying marketplace type, account identity or competitor-selection logic. The action must still originate from the correct FNAC or Darty shop.']],
      ['How FNAC presents Offers', ['FNAC’s public ranking information describes priority and increasing-price ordering in relevant marketplace contexts. It also lists seller-quality factors such as ratings, complaint history or professional status for some partner Offer situations.', 'A repricer should therefore treat price as an important input without claiming it is the only determinant of placement. Available delivery data should be interpreted consistently when comparing Offers.']],
      ['How Darty differs', ['Darty’s marketplace information exposes alternate ordering criteria such as seller rating and delivery time. Its customer guidance also shows that partner delivery modes and estimated delivery dates matter to the buying experience.', 'The Darty workflow must retain its own seller identity and marketplace-specific competitor handling even when the XML submission mechanism resembles FNAC.']],
      ['Batch status is part of the workflow', ['An eligible target is placed in an XML update batch. The batch identifier proves submission, not a live price. Processing can remain pending or return item errors, so the system must poll and store the later result.', 'Keep calculated, submitted, processing, confirmed and failed states separate. This makes failed items visible instead of hiding them behind a successful batch request.']],
      ['Practical rollout', ['Start with one store and a small Offer set on each platform. Confirm seller identity, SKU, current price, available competition, delivery context and boundaries. Then compare submitted batches with later marketplace status.', 'If both FNAC and Darty are connected, test them independently. A successful FNAC path is useful technical evidence, but it does not prove that Darty business logic is correct.']]
    ],
    sources: [['FNAC marketplace ranking criteria', 'https://www.fnac.com/referencement-criteres-classement-marketplace'], ['FNAC Marketplace terms', 'https://www.fnac.com/Help/cgv-fnac-marketplace'], ['Darty marketplace Offer information', 'https://www.darty.com/achat/informations/informations_offres_marketplace.html'], ['Darty partner delivery information', 'https://www.darty.com/services/solutions/foire_aux_questions?question=sont-modes-livraison-vendeurs-partenaires']],
    faq: [['Are FNAC and Darty repricing identical?', 'No. They share parts of the XML boundary, but marketplace identity, seller filtering and competitive logic remain separate.'], ['Does XML batch submission mean the price is live?', 'No. The batch still needs processing and item-level status must be reviewed.'], ['Is price the only ranking factor?', 'No. Public FNAC and Darty information also describes seller-quality, rating, delivery or related criteria.'], ['Can one store credential update both platforms?', 'Store authority stays scoped to the actual marketplace account; it should not be inferred or shared.']],
    related: [['FNAC repricer', '/fnac-repricer/'], ['Darty repricer', '/darty-repricer/'], ['Automatic repricing', '/features/automatic-repricing/']]
  },
  {
    slug: 'cdiscount-repricing', platform: 'Cdiscount', landing: '/cdiscount-repricer/',
    title: 'Cdiscount Repricing Guide: Native Floor Price vs Repricer',
    description: 'Learn Cdiscount repricing through Octopia Offer APIs: OAuth, SellerId, JSON package updates, price-floor validation, feedback, and marketplace read-back.',
    h1: 'Cdiscount repricing: from a price rule to a verified marketplace result',
    intro: 'Cdiscount Offer updates use the Octopia API workflow. A reliable repricer needs the correct OAuth and SellerId context, valid Offer identity, bounded calculations, package feedback and a later marketplace read-back.',
    takeaways: ['Keep OAuth, SellerId and Offer identity scoped to the connected store.', 'Validate minimum and maximum prices before creating an update package.', 'Treat package processing and storefront state as separate evidence.', 'Review native or external automation before assigning a pricing owner.'],
    sections: [
      ['The Octopia Offer update model', ['Octopia provides JSON Offer-management APIs for marketplace updates, including the Cdiscount channel identified as CDISFR. Updates are submitted as packages and move through processing states before item feedback is available.', 'That asynchronous model means a successful request is the beginning of the verification path. Store the package identifier and inspect its result rather than marking every item successful immediately.']],
      ['Identity and authorization', ['The connected store needs valid OAuth context and the correct SellerId. Every action must target the exact seller Offer and marketplace channel. A similar product record does not prove ownership of the Offer being changed.', 'Authorization failures, inactive Offers and mismatched identifiers should stop the update with a visible error. They should never trigger a fallback guess.']],
      ['Price boundaries and management rules', ['Octopia documents Offer management rules and validation, including price-floor-related controls. Autopricy adds seller-defined minimum and maximum values to the calculation before an eligible change enters a package.', 'If an existing Cdiscount or third-party pricing tool manages the same Offers, overlapping actions can conflict. Audit current automation and choose a clear owner for the scope.']],
      ['Package feedback and read-back', ['Track package creation, processing status and item-level feedback. A processed package can still contain rejected rows. After successful feedback, retrieve the marketplace Offer again when possible to compare the later stored value.', 'These checkpoints support honest states: submitted, processing, rejected, accepted and confirmed by read-back. Each proves a different part of the workflow.']],
      ['A controlled example', ['An Offer has a €18.50 minimum and €24.00 maximum. The rule calculates €19.80 and creates a JSON update package. Autopricy retains the package ID, checks item feedback and then reads the Offer again. Only the later evidence supports describing the marketplace value as confirmed.', 'Begin with a small SKU group and review every error category. Expand after authorization, package feedback and read-back are stable.']]
    ],
    sources: [['Octopia Offer Management JSON API', 'https://developer.octopia-io.net/api-reference/offer-management/offer-management-json/'], ['Cdiscount JSON Offer packages', 'https://developer.octopia-io.net/changelog/new-feature/cdiscount-now-supports-offer-updates-via-json-packages/'], ['Octopia management rules', 'https://developer.octopia-io.net/api-reference/offer-management/management-rules/'], ['Octopia retrieve Offers', 'https://developer.octopia-io.net/api-reference/offer-management/retrieve-offers/']],
    faq: [['What is an Offer update package?', 'It is an asynchronous group of Offer changes. Keep its identifier and inspect processing and item feedback.'], ['Does a processed package prove the storefront price?', 'Not by itself. Item feedback and a later Offer read-back provide additional evidence.'], ['Can Autopricy run beside another repricer?', 'Overlapping automation can conflict, so the current pricing owner should be reviewed before activation.'], ['Does Autopricy guarantee the featured Offer?', 'No. It controls eligible price actions, while marketplace placement can depend on other signals.']],
    related: [['Cdiscount repricer', '/cdiscount-repricer/'], ['Automatic repricing', '/features/automatic-repricing/'], ['Multi-store management', '/features/multi-store-management/']]
  }
];

const zhPublished = '2026-10-04';

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const umami = `<script>if(location.hostname.includes('autopricy.com')){const s=document.createElement('script');s.defer=true;s.src='${app}/umami.js';s.dataset.websiteId='20f3ddd5-3c5b-4b32-91ca-6db0ff7ade94';document.head.appendChild(s);}</script>`;

const locales = {
  en: {
    lang: 'en', ogLocale: 'en_US', prefix: '', published, switchLabel: 'English',
    brandHome: 'Autopricy home', logoAlt: 'Autopricy logo', brand: 'Autopricy', brandSmall: 'Marketplace repricing', navAria: 'Primary navigation',
    nav: [['Marketplaces', '/multi-marketplace-repricing/'], ['Automatic repricing', '/features/automatic-repricing/']],
    home: 'Home', guides: 'Guides', breadcrumbHome: 'Autopricy', trial: 'Start free trial', trialHero: 'Start 7-day free trial',
    eyebrow: (g) => `Seller guide / ${g.platform}`,
    meta: (date) => `Published ${date} · Reviewed against product implementation and cited marketplace sources`,
    seePlatform: (g) => `See ${g.platform} repricing`, takeaways: 'Key takeaways',
    context: (g) => `Need the product workflow first? Review the <a href="${g.landing}">${esc(g.platform)} repricer page</a> for supported capabilities and limits.`,
    sources: 'Primary sources', faq: (g) => `${g.platform} repricing FAQ`,
    relatedKicker: 'Related resources', relatedTitle: 'Continue from guide to implementation', relatedLabel: 'Autopricy resource',
    ctaTitle: 'Test the workflow on a real store', ctaCopy: 'Start with one supported store, a controlled product scope and visible platform results.',
    footer: (g) => `<span>© 2026 Autopricy · Beijing Qingshi Technology Co., Ltd.</span><nav class="footer-links"><a href="/multi-marketplace-repricing/">Marketplaces</a><a href="/guides/">Guides</a><a href="${g?.landing ?? '/features/automatic-repricing/'}">${esc(g?.platform ?? 'Automatic repricing')}</a><a href="${app}/privacy.html">Privacy</a></nav>`,
    hub: {
      title: 'Marketplace Repricing Guides for European Sellers | Autopricy',
      description: 'Practical repricing guides for Worten, FNAC, Darty, OnBuy, Cdiscount and Mirakl sellers: ranking rules, price boundaries, API updates and confirmation.',
      eyebrow: 'Seller guides', h1: 'Marketplace repricing guides',
      intro: 'Each guide explains how one marketplace orders offers, which data a repricer can use, how updates are confirmed and where automation should stop. Every guide cites the marketplace’s own documentation.',
      read: 'Read guide →'
    }
  },
  zh: {
    lang: 'zh-CN', ogLocale: 'zh_CN', prefix: 'zh/', published: zhPublished, switchLabel: '中文',
    brandHome: '调价先锋 Autopricy 首页', logoAlt: '调价先锋 Autopricy 标志', brand: '调价先锋', brandSmall: 'Autopricy', navAria: '主导航',
    nav: [['支持平台', '/zh/multi-marketplace-repricing/'], ['自动调价', '/zh/features/automatic-repricing/']],
    home: '首页', guides: '调价教程', breadcrumbHome: '调价先锋', trial: '免费试用', trialHero: '免费试用 7 天',
    eyebrow: (g) => `卖家教程 / ${g.platform}`,
    meta: (date) => `发布于 ${date} · 已对照产品实现和平台官方资料核对`,
    seePlatform: (g) => `查看 ${g.platform} 自动调价`, takeaways: '本文要点',
    context: (g) => `想先了解产品怎么做？请看 <a href="${g.landing}">${esc(g.platform)} 自动调价页面</a>，里面写明了支持的能力和限制。`,
    sources: '参考资料', faq: (g) => `${g.platform} 调价常见问题`,
    relatedKicker: '相关页面', relatedTitle: '从教程到实际操作', relatedLabel: '调价先锋',
    ctaTitle: '先用一个店铺试跑', ctaCopy: '注册后自动开通 7 天免费试用，¥168/店铺/月，商品数量不限。客服电话 177 2028 4880。',
    footer: () => `<span>© 2026 调价先锋 Autopricy · 北京轻石科技有限公司 · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">京ICP备2026039016号</a></span><nav class="footer-links" aria-label="页脚导航"><a href="/">首页</a><a href="/zh/multi-marketplace-repricing/">支持平台</a><a href="/zh/guides/">调价教程</a><a href="/zh/help/">帮助中心</a><a href="/zh/help/">帮助中心</a><a href="${app}/privacy.html">隐私政策</a></nav>`,
    hub: {
      title: '欧洲平台自动调价教程｜Worten、Fnac、OnBuy - 调价先锋',
      description: 'Worten、Fnac、Darty、OnBuy、Cdiscount 和 Mirakl 平台的自动调价教程：购物车排序规则、价格边界、接口改价和生效确认，每篇都引用平台官方资料。',
      eyebrow: '卖家教程', h1: '欧洲平台自动调价教程',
      intro: '每篇教程讲清一个平台怎么排序报价、调价能用哪些数据、改价怎么确认生效，以及自动化应该在什么时候停下来。所有教程都引用平台自己的官方文档。',
      read: '阅读教程 →'
    }
  }
};

const allGuides = [
  ...guides.map((guide) => ({ ...guide, locale: 'en' })),
  ...zhGuides.map((guide) => ({ ...guide, locale: 'zh' })),
  ...zhHelp
];

function guideUrl(guide) {
  return `${site}/${locales[guide.locale].prefix}${guide.kind === 'help' ? 'help' : 'guides'}/${guide.slug}/`;
}

function counterpart(guide) {
  return allGuides.find((other) => other.slug === guide.slug && other.locale !== guide.locale && other.kind === guide.kind);
}

function head({ L, title, description, keywords, url, alternates, ogType, og, schema }) {
  return `<!DOCTYPE html><html lang="${L.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${keywords ? `<meta name="keywords" content="${esc(keywords)}">` : ''}<meta name="robots" content="index, follow, max-image-preview:large"><link rel="canonical" href="${url}">${alternates.map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${href}">`).join('')}<link rel="icon" href="/logo.svg" type="image/svg+xml"><link rel="stylesheet" href="${platformCssHref}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${ogType}"><meta property="og:url" content="${url}"><meta property="og:locale" content="${L.ogLocale}"><meta property="og:image" content="${og.url}"><meta property="og:image:width" content="${og.width}"><meta property="og:image:height" content="${og.height}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(schema)}</script></head>`;
}

function header(L, { source, extra = [], alt }) {
  return `<header class="site-header"><div class="container nav"><a class="brand" href="/" aria-label="${esc(L.brandHome)}"><img src="/logo.svg" alt="${esc(L.logoAlt)}" width="32" height="32"><span>${esc(L.brand)}<small>${esc(L.brandSmall)}</small></span></a><nav class="nav-links" aria-label="${esc(L.navAria)}">${[...L.nav, ...extra].map(([label, href]) => `<a href="${href}">${esc(label)}</a>`).join('')}${alt ? `<a class="lang-switch" href="${alt.href}" hreflang="${alt.L.lang}" lang="${alt.L.lang}">${esc(alt.L.switchLabel)}</a>` : ''}<a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register">${esc(L.trial)}</a></nav></div></header>`;
}

function renderGuide(guide) {
  const L = guide.kind === 'help' ? { ...locales.zh, guides: '帮助中心', meta: (date) => `更新于 ${date} · 操作说明以当前平台页面为准`, seePlatform: () => '查看对应功能', context: () => '首次使用先确认当前店铺、平台与操作范围。' } : locales[guide.locale];
  const hubPath = guide.kind === 'help' ? 'help' : 'guides';
  const url = guideUrl(guide);
  const alt = counterpart(guide);
  const altUrl = alt && guideUrl(alt);
  const enUrl = guide.locale === 'en' ? url : altUrl ?? url;
  const source = `${guide.locale === 'zh' ? 'zh_' : ''}${guide.kind === 'help' ? 'help' : 'guide'}_${guide.slug.replaceAll('-', '_')}`;
  const og = ogImage(guide.slug, L.lang);
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'Article','@id':`${url}#article`,headline:guide.h1,description:guide.description,inLanguage:L.lang,datePublished:L.published,dateModified:L.published,image:og.url,mainEntityOfPage:{'@id':`${url}#webpage`},author:{'@type':'Organization',name:'Autopricy'},publisher:{'@type':'Organization',name:'Autopricy',logo:{'@type':'ImageObject',url:`${site}/logo.svg`}}},
    {'@type':'WebPage','@id':`${url}#webpage`,url,name:guide.title,description:guide.description,inLanguage:L.lang,isPartOf:{'@id':`${site}/#website`},about:{'@id':`${site}/#software`}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:L.breadcrumbHome,item:`${site}/`},{'@type':'ListItem',position:2,name:L.guides,item:`${site}/${L.prefix}${hubPath}/`},{'@type':'ListItem',position:3,name:guide.h1,item:url}]},
    {'@type':'FAQPage',mainEntity:guide.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
  ]};
  const alternates = [[L.lang, url], ...(alt ? [[locales[alt.locale].lang, altUrl]] : []), ['x-default', enUrl]];
  return `${head({ L, title: guide.title, description: guide.description, keywords: guide.keywords, url, alternates, ogType: 'article', og, schema })}
<body class="theme-multi guide-page">${header(L, { source, extra: [[guide.platform, guide.landing]], alt: alt && { href: altUrl.replace(site, ''), L: locales[alt.locale] } })}
<main><article><header class="guide-hero"><div class="container guide-narrow"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${esc(L.home)}</a><span>/</span><a href="/${L.prefix}${hubPath}/">${esc(L.guides)}</a><span>/</span><span>${esc(guide.platform)}</span></nav><p class="eyebrow">${esc(L.eyebrow(guide))}</p><h1>${esc(guide.h1)}</h1><p class="hero-copy">${esc(guide.intro)}</p><p class="guide-meta">${esc(L.meta(L.published))}</p><a class="btn btn-primary" href="${guide.landing}">${esc(L.seePlatform(guide))}</a></div></header>
<div class="container guide-shell"><aside class="guide-summary"><strong>${esc(L.takeaways)}</strong><ul>${guide.takeaways.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></aside><div class="guide-article"><p class="guide-context">${L.context(guide)}</p>${guide.sections.map(([heading, paragraphs],i)=>`<section id="section-${i+1}"><h2>${esc(heading)}</h2>${paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}${(guide.images ?? []).filter(image => image.after === i).map(image => `<figure><img src="${image.src}" alt="${esc(image.alt)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async" style="max-width:100%;height:auto"><figcaption>${esc(image.alt)}；界面示例，实际设置以当前店铺为准。</figcaption></figure>`).join('')}</section>`).join('')}<section><h2>${esc(L.sources)}</h2><ul class="guide-sources">${guide.sources.map(([label,href])=>`<li><a href="${href}" target="_blank" rel="noopener noreferrer">${esc(label)}</a></li>`).join('')}</ul></section><section><h2>${esc(L.faq(guide))}</h2><div class="faq-list">${guide.faq.map(([q,a],i)=>`<details${i===0?' open':''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section></div></div>
<section class="section section-muted"><div class="container"><div class="section-head"><p class="section-kicker">${esc(L.relatedKicker)}</p><h2>${esc(L.relatedTitle)}</h2></div><div class="related-grid">${guide.related.map(([label,href])=>`<a class="related-link" href="${href}"><span>${esc(L.relatedLabel)}</span><strong>${esc(label)} →</strong></a>`).join('')}</div></div></section><section class="section"><div class="container"><div class="cta"><div><h2>${esc(L.ctaTitle)}</h2><p>${esc(L.ctaCopy)}</p></div><a class="btn btn-primary" href="${app}/?source=${source}#/register" data-umami-event="seo_${source}_register">${esc(L.trialHero)}</a></div></div></section></article></main>
<footer class="site-footer"><div class="container footer-row">${L.footer(guide)}</div></footer>${umami}</body></html>\n`;
}

function renderHub(locale) {
  const L = locales[locale];
  const H = L.hub;
  const url = `${site}/${L.prefix}guides/`;
  const other = locales[locale === 'en' ? 'zh' : 'en'];
  const otherUrl = `${site}/${other.prefix}guides/`;
  const items = allGuides.filter((guide) => guide.locale === locale && guide.kind !== 'help');
  const og = ogImage('multi', L.lang);
  const schema = {'@context':'https://schema.org','@graph':[
    {'@type':'CollectionPage','@id':`${url}#webpage`,url,name:H.title,description:H.description,inLanguage:L.lang,isPartOf:{'@id':`${site}/#website`},mainEntity:{'@type':'ItemList',itemListElement:items.map((guide, index) => ({'@type':'ListItem',position:index+1,url:guideUrl(guide),name:guide.title}))}},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:L.breadcrumbHome,item:`${site}/`},{'@type':'ListItem',position:2,name:L.guides,item:url}]}
  ]};
  const alternates = [[L.lang, url], [other.lang, otherUrl], ['x-default', `${site}/guides/`]];
  return `${head({ L, title: H.title, description: H.description, url, alternates, ogType: 'website', og, schema })}
<body class="theme-multi guide-page">${header(L, { source: `${locale === 'zh' ? 'zh_' : ''}guides_hub`, alt: { href: otherUrl.replace(site, ''), L: other } })}
<main><header class="guide-hero"><div class="container guide-narrow"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">${esc(L.home)}</a><span>/</span><span>${esc(L.guides)}</span></nav><p class="eyebrow">${esc(H.eyebrow)}</p><h1>${esc(H.h1)}</h1><p class="hero-copy">${esc(H.intro)}</p></div></header>
<section class="section"><div class="container"><div class="related-grid guide-hub">${items.map((guide) => `<a class="related-link" href="${guideUrl(guide).replace(site, '')}"><span>${esc(guide.platform)}</span><strong>${esc(guide.h1)}</strong><p>${esc(guide.description)}</p><em>${esc(H.read)}</em></a>`).join('')}</div></div></section>
<section class="section"><div class="container"><div class="cta"><div><h2>${esc(L.ctaTitle)}</h2><p>${esc(L.ctaCopy)}</p></div><a class="btn btn-primary" href="${app}/?source=${locale === 'zh' ? 'zh_' : ''}guides_hub#/register">${esc(L.trialHero)}</a></div></div></section></main>
<footer class="site-footer"><div class="container footer-row">${L.footer()}</div></footer>${umami}</body></html>\n`;
}

export const guideUrls = [
  `${site}/guides/`, `${site}/zh/guides/`, `${site}/zh/help/`,
  ...allGuides.map(guideUrl)
];

export function buildGuides(distRoot) {
  for (const guide of allGuides) {
    const output = resolve(distRoot, `${locales[guide.locale].prefix}${guide.kind === 'help' ? 'help' : 'guides'}`, guide.slug, 'index.html');
    mkdirSync(resolve(output, '..'), { recursive: true });
    writeFileSync(output, renderGuide(guide));
  }
  const helpOutput = resolve(distRoot, 'zh/help/index.html');
  mkdirSync(resolve(helpOutput, '..'), { recursive: true });
  writeFileSync(helpOutput, renderHelpHub());
  for (const locale of ['en', 'zh']) {
    const output = resolve(distRoot, `${locales[locale].prefix}guides`, 'index.html');
    mkdirSync(resolve(output, '..'), { recursive: true });
    writeFileSync(output, renderHub(locale));
  }
}

function renderHelpHub() {
  const L = locales.zh;
  const url = `${site}/zh/help/`;
  const title = '调价先锋帮助中心：授权、同步与调价设置';
  const description = '按操作任务查看店铺授权、商品同步、表格规则导入导出、调价计划、OnBuy Listing、Cdiscount Offer、批量操作和采集插件教程。每篇说明适用平台、操作范围与结果检查，首次使用可从绑定店铺开始。';
  const schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'CollectionPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: 'zh-CN', mainEntity: {'@type': 'ItemList', itemListElement: zhHelp.map((g, i) => ({'@type': 'ListItem', position: i + 1, name: g.h1, url: guideUrl(g)}))}},
    {'@type': 'BreadcrumbList', itemListElement: [{'@type': 'ListItem', position: 1, name: '首页', item: `${site}/`}, {'@type': 'ListItem', position: 2, name: '帮助中心', item: url}]}
  ]};
  return `${head({L, title, description, url, alternates: [['zh-CN', url]], ogType: 'website', og: ogImage('multi', L.lang), schema})}
<body class="theme-multi guide-page">${header(L, {source: 'zh_help_hub'})}<main><header class="guide-hero"><div class="container guide-narrow"><nav class="breadcrumb"><a href="/">首页</a><span>/</span><span>帮助中心</span></nav><p class="eyebrow">操作教程</p><h1>调价先锋帮助中心</h1><p class="hero-copy">从授权和同步，到填写价格规则与查看平台结果。按当前任务选择教程，不同平台分别操作。</p></div></header><section class="section"><div class="container"><div class="related-grid guide-hub">${zhHelp.map(g => `<a class="related-link" href="${guideUrl(g).replace(site, '')}"><span>${esc(g.platform)}</span><strong>${esc(g.h1)}</strong><p>${esc(g.description)}</p><em>查看步骤 →</em></a>`).join('')}</div></div></section><section class="section"><div class="container"><p>需要了解调价原理？查看<a href="/zh/guides/">中文调价教程</a>。应用内仍可使用<a href="${app}/help.html">完整操作说明</a>。</p></div></section></main><footer class="site-footer"><div class="container footer-row">${L.footer()}</div></footer>${umami}</body></html>\n`;
}
