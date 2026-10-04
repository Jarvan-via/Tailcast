// Chinese seller guides. Each guide is the zh-CN alternate of the English guide
// with the same slug and must stay within the same cited sources and
// seo/product-capabilities.md.

export const zhGuides = [
  {
    slug: 'worten-automatic-repricing', platform: 'Worten', landing: '/zh/worten-repricer/',
    title: 'Worten 自动调价教程：购物车规则、跟价设置与生效确认',
    description: 'Worten 购物车（Winning Offer）怎么排序？自动跟价该看哪些数据、最低价最高价怎么设、改价后怎么确认生效？一篇讲清 Worten 卖家的自动调价做法。',
    keywords: 'Worten购物车,Worten自动调价,Worten怎么改价,Worten跟价,Worten Winning Offer',
    h1: 'Worten 自动调价怎么做：从购物车规则到改价生效',
    intro: 'Worten 会把一个卖家的报价放进购物车（Winning Offer）位置展示，但“比别人便宜 0.01 欧”并不能保证拿到购物车。真正有用的自动调价，要看清完整的竞争信息、守住利润底线，并确认平台最终处理了什么。',
    takeaways: ['比较的是可见跟卖的完整报价（商品价 + 运费），不是过期的表格。', '每个自动调价的 Offer 都要有硬性的最低价和最高价。', '价格是购物车的重要因素之一，但不是唯一因素。', '“已提交”和“平台已确认”要分开看。'],
    sections: [
      ['Worten 购物车（Winning Offer）是什么', ['Worten 把购物车位置上展示的报价称为 Winning Offer。根据 Worten 公开的规则，排序会参考商品价加运费，也可能参考店铺质量或 Premium 相关因素。所以“永远比最低价再低一点”不是完整的策略。', '自动调价可以提升价格竞争力，但控制不了库存、配送时效、店铺评分，以及平台使用的全部排序规则。']],
      ['自动跟价需要读取哪些数据', ['调价要从店铺里真实的 Offer 和它在平台上的身份开始：读取当前 Offer，以及对应渠道下可见的跟卖报价。商品身份必须精确，相似的 EAN、列表位置或价格都不足以作为改价依据。', 'Worten 的竞争可能按渠道不同而不同，例如西班牙站和葡萄牙站的跟卖店铺和价格可以完全不一样。每个参与自动调价的 Offer 都需要有效的最低价、最高价和调价规则；缺少跟卖数据或边界无效时，应该跳过或进入保护状态，而不是猜一个价格。']],
      ['一个以底价为先的调价例子', ['假设某 Offer 最低价 €38.00、最高价 €46.00。跟卖降价后，规则算出 €37.90，这个目标价会被最低价拦截。之后规则算出 €41.49，可以提交，但在平台反馈或回读确认之前，它仍然是“处理中”。', '这样可以避免两个常见错误：为了抢位置把利润让光，以及把一次接口请求当成前台价格已经生效的证据。']],
      ['怎样稳妥地开始', ['先接入一个 Worten 店铺，挑一小批商品，核对 Offer 身份、当前价格、可见跟卖和价格边界。观察触发保护、已提交、已确认和失败的结果都正常后，再逐步增加商品。', '经常碰到底价的商品值得单独看一看：它们可能需要调整进货成本或销售策略，而不是更激进的自动降价。']],
      ['该看哪些指标', ['不要只用“改价次数”衡量调价效果。更有意义的是：参与调价的 Offer 数、触发保护的次数、已确认的改价、错误、从提交到确认的时间，以及销量和利润这样的经营结果。', '购物车占比可以参考，但要结合库存、配送和店铺表现一起看。']],
      ['调价先锋怎么做 Worten 自动调价', ['调价先锋按渠道读取 Worten 的跟卖店铺、商品价、运费和总价，按你设置的跟价差值在最低价和最高价之间自动调整；拿到购物车后可以按策略尝试调涨。每次调价的计算、提交、平台确认和失败原因都有记录。', '店铺通过 Worten 的 API 授权信息接入，不需要后台登录密码。注册后自动开通 7 天免费试用，可以先用一个店铺验证效果。']]
    ],
    sources: [['Worten 账户条款与 Winning Offer 说明', 'https://www.worten.pt/termos-e-condicoes-da-conta-online'], ['Worten 数字政策与排序规则', 'https://www.worten.pt/politica-digital']],
    faq: [['Worten 上最便宜的报价一定能拿到购物车吗？', '不一定。Worten 说明排序会参考商品价加运费，以及店铺质量或 Premium 相关因素。'], ['自动调价会低于我设置的最低价吗？', '不会。目标价被限制在最低价和最高价之间，边界无效时不会自动调价。'], ['改价后多久能在前台看到？', '取决于平台处理、接口限制和店铺配置，所以提交和确认要分开追踪。'], ['自动调价能保证拿到购物车吗？', '不能。调价只控制价格，其他平台和店铺因素同样会影响 Winning Offer。']],
    related: [['Worten 自动调价', '/zh/worten-repricer/'], ['最低价保护', '/zh/features/min-max-price-rules/'], ['自动调价原理', '/zh/features/automatic-repricing/']]
  },
  {
    slug: 'onbuy-winning-offer', platform: 'OnBuy', landing: '/zh/onbuy-repricer/',
    title: 'OnBuy 怎么抢购物车？Winning Offer 跟价与赢后涨价策略',
    description: 'OnBuy 卖家怎么抢 Winning Offer（购物车）又不陷入价格战？讲清 Product 和 Listing 的区别、底价怎么算、没赢时跟价、赢了之后怎么谨慎涨价。',
    keywords: 'OnBuy购物车,OnBuy Winning Offer,OnBuy怎么抢购物车,OnBuy调价,OnBuy跟价',
    h1: 'OnBuy 怎么抢购物车：不打价格战的跟价方法',
    intro: 'OnBuy 的调价工具不应该每一轮都把所有 Listing 降一遍价。真正要回答的问题是：这个 Listing 现在有没有赢得购物车？在卖家设定的价格区间里，下一步允许做什么？OnBuy 之后有没有确认这次改价？',
    takeaways: ['商品目录（Product）和可售 Listing 要分开处理。', '用完整的成本算出底价，再设置价格区间。', '根据是否赢得购物车，决定保持、降价还是小幅涨价。', 'OnBuy 没有公开固定的 Winning Offer 公式，别相信“差 0.01 就一定赢”。'],
    sections: [
      ['先分清 Product 和 Listing', ['Product 是商品目录信息；Listing 是卖家自己的销售记录，价格挂在 Listing 上。调价必须改到当前店铺对应的那条 Listing，而不是一个“看起来差不多”的商品。', '同步时把两类记录和它们的 ID 都保留下来，就不会把“商品匹配上了”误当成“有权限改这条 Listing 的价格”。']],
      ['OnBuy 公开了什么，没公开什么', ['OnBuy 的卖家条款规定 Listing 价格由卖家负责，并说明价格需要考虑增值税、配送以及适用的进口费用或关税。买家还能看到卖家资料、评价和徽章。', '公开资料里没有一个稳定、完整的 Winning Offer 评分公式。所以靠谱的做法是不宣称某个固定差价一定能赢。']],
      ['双向调价：没赢就跟，赢了就试着涨', ['Listing 没有赢得购物车、而且有可比的跟卖时，规则可以在最低价之上算出一个更低的目标价。Listing 已经赢了，受控的策略可以尝试更高的价格，但不超过最高价。', '目标不是一直压价，而是在保持竞争力的同时，试探能不能把利润找回来。改价延迟和接口配额也要考虑进去，避免两轮调价互相打架。']],
      ['一个安全区间的例子', ['某 Listing 最低价 £24.00、最高价 £31.00。没赢时，规则可能根据跟卖算出 £26.49；已经赢了，下一轮可以试 £26.99。两种动作都不会超出设定的区间。', '已经排队的改价仍不能证明前台价格变了。要记录这次操作，等待平台处理，再根据之后的状态确认。']],
      ['上线前的检查清单', ['接入一个店铺，同步一小批 Product 和 Listing，核对 ID、币种、当前价格和价格区间。调价频率要尊重平台配额，观察购物车检查、调价动作和确认结果。', '如果还有其他调价工具在运行，同一批 Listing 只能由一个工具负责，否则最后的价格很难解释。']],
      ['调价先锋怎么做 OnBuy 自动调价', ['调价先锋同步 OnBuy 的 Product 和 Listing，每轮检查购物车状态：没赢时在最低价之上跟价，赢了之后按策略小幅涨价，始终不超过最高价。排队、锁和配额都会处理，每次调价都有状态记录。', '工作台里可以直接看到调价次数、购物车占比和每轮调价耗时。注册后自动开通 7 天免费试用。']]
    ],
    sources: [['OnBuy 卖家介绍', 'https://www.onbuy.com/gb/sell/'], ['OnBuy 卖家条款', 'https://cdn.onbuy.com/static/pdf/seller-terms/Seller%20Terms%20v3.0.0.pdf'], ['OnBuy 卖家资料页', 'https://www.onbuy.com/gb/shop/']],
    faq: [['OnBuy 有公开固定的 Winning Offer 公式吗？', '我们查阅的公开资料里没有稳定、完整的公式，所以调价先锋不会宣称有。'], ['为什么要区分 Product 和 Listing？', 'Product 是目录信息，Listing 是卖家自己可以改价的销售记录。'], ['赢得购物车后可以自动涨价吗？', '可以按配置的策略小幅尝试涨价，不会超过卖家设置的最高价。'], ['两个调价工具能同时管同一个 Listing 吗？', '不建议。两个工具可能互相冲突，同一批商品只交给一个工具更安全。']],
    related: [['OnBuy 自动调价', '/zh/onbuy-repricer/'], ['最低价保护', '/zh/features/min-max-price-rules/'], ['多店铺批量调价', '/zh/features/multi-store-management/']]
  },
  {
    slug: 'fnac-darty-repricing', platform: 'Fnac 和 Darty', landing: '/zh/fnac-repricer/',
    title: 'Fnac 和 Darty 调价指南：排序规则、XML 改价与批次状态',
    description: 'Fnac 和 Darty 都用 XML 2.6 接口改价，但排序规则和跟卖对比并不一样。讲清两个法国平台的报价排序、运费、批次处理，以及同时运营两个平台时要注意什么。',
    keywords: 'Fnac调价,Darty调价,Fnac排序规则,Darty排序,Fnac XML接口,法国平台调价',
    h1: 'Fnac 和 Darty 调价：哪些可以共用，哪些必须分开',
    intro: 'Fnac 和 Darty 可以共用 XML 2.6 的对接方式，但它们不是可以互换的两个平台。店铺身份、排除自己的跟卖筛选、竞争信息和排序规则，都需要按平台分别处理。',
    takeaways: ['共用经过验证的 XML 接口，但不共用一套业务规则。', '用正确的平台身份排除自己的店铺。', '比较报价时，统一处理可用的价格和运费信息。', '提交之后还要追踪批次处理结果。'],
    sections: [
      ['两个平台共用的技术部分', ['两个平台都可以用同一种 XML 2.6 方式交换 Offer 数据，并异步处理批次。共用解析、校验和批次状态组件，可以减少重复的运营工作。', '但共用接口不代表可以照搬平台类型、店铺身份或跟卖筛选逻辑。每一次改价仍然必须来自正确的 Fnac 或 Darty 店铺。']],
      ['Fnac 怎么排序报价', ['Fnac 公开的排序说明提到，在相关场景下会按优先级和价格从低到高排序；对部分合作卖家的报价，还会参考评分、投诉记录或是否为专业卖家等店铺质量因素。', '所以调价时应把价格当作重要因素，但不要宣称价格是唯一决定因素。比较报价时，要统一处理可用的运费信息。']],
      ['Darty 有什么不同', ['Darty 公开的平台信息里提供了卖家评分、配送时间等其他排序方式。它的客户指南也显示，合作卖家的配送方式和预计送达时间对购买体验很重要。', '即使 XML 提交方式和 Fnac 很像，Darty 的调价也必须保留自己的店铺身份和专属的跟卖处理逻辑。']],
      ['批次状态是流程的一部分', ['符合条件的目标价会进入 XML 改价批次。批次 ID 只能证明“已提交”，不能证明价格已经生效。批次可能仍在处理中，或返回部分商品的错误，所以系统必须轮询并保存之后的结果。', '把已计算、已提交、处理中、已确认和失败分开记录，失败的商品才不会被“批次提交成功”掩盖。']],
      ['同时运营两个平台的建议', ['每个平台先用一个店铺、一小批 Offer 试运行。核对店铺身份、SKU、当前价格、可见跟卖、运费和价格区间，再把提交的批次和之后的平台状态对比。', '如果 Fnac 和 Darty 都接入了，要分别测试。Fnac 跑通了能证明技术链路没问题，但不能证明 Darty 的业务逻辑也正确。']],
      ['调价先锋怎么做 Fnac 和 Darty 调价', ['调价先锋通过 XML 2.6 接口同步两个平台的 Offer，Fnac 对比时排除自己的店铺并使用可用的运费信息，Darty 使用自己的跟卖处理逻辑。两个平台的店铺可以在一个工作台里管理，批次提交、处理和确认状态都会单独记录。', '注册后自动开通 7 天免费试用，按店铺收费，商品数量不限。']]
    ],
    sources: [['Fnac 平台排序规则', 'https://www.fnac.com/referencement-criteres-classement-marketplace'], ['Fnac Marketplace 条款', 'https://www.fnac.com/Help/cgv-fnac-marketplace'], ['Darty 平台报价说明', 'https://www.darty.com/achat/informations/informations_offres_marketplace.html'], ['Darty 合作卖家配送说明', 'https://www.darty.com/services/solutions/foire_aux_questions?question=sont-modes-livraison-vendeurs-partenaires']],
    faq: [['Fnac 和 Darty 的调价完全一样吗？', '不一样。两者共用部分 XML 接口，但平台身份、卖家筛选和竞争逻辑是分开的。'], ['XML 批次提交了，价格就生效了吗？', '没有。批次还需要处理，每个商品的状态都要单独查看。'], ['价格是唯一的排序因素吗？', '不是。Fnac 和 Darty 的公开信息都提到了店铺质量、评分、配送等因素。'], ['一个店铺授权能同时改两个平台吗？', '不能。授权只属于对应平台的店铺账号，不能混用。']],
    related: [['FNAC 自动调价', '/zh/fnac-repricer/'], ['Darty 自动调价', '/zh/darty-repricer/'], ['自动调价原理', '/zh/features/automatic-repricing/']]
  },
  {
    slug: 'cdiscount-repricing', platform: 'Cdiscount', landing: '/zh/cdiscount-repricer/',
    title: 'Cdiscount 调价指南：平台底价功能和自动调价怎么选',
    description: 'Cdiscount 自带底价相关功能，什么时候还需要外部自动调价？讲清 Octopia 接口的授权、Package 改价、底价校验、反馈和回读，以及两套自动化如何避免冲突。',
    keywords: 'Cdiscount调价,Cdiscount底价,Cdiscount自动调价,Octopia接口,Cdiscount改价',
    h1: 'Cdiscount 调价：从一条价格规则到确认生效',
    intro: 'Cdiscount 的 Offer 改价走 Octopia 接口。可靠的自动调价需要正确的 OAuth 和 SellerId、精确的 Offer 身份、有边界的价格计算、Package 反馈，以及之后的平台回读。',
    takeaways: ['OAuth、SellerId 和 Offer 身份都限定在对应店铺内。', '生成改价 Package 之前，先校验最低价和最高价。', 'Package 处理结果和前台价格是两份不同的证据。', '开启前确认由平台功能还是外部工具负责调价。'],
    sections: [
      ['Octopia 的 Offer 改价方式', ['Octopia 提供 JSON 格式的 Offer 管理接口，Cdiscount 渠道代码为 CDISFR。改价以 Package 的形式提交，经过处理后才会返回商品级反馈。', '因为是异步处理，请求成功只是确认流程的开始。要保存 Package ID 并查看结果，而不是立刻把所有商品标记为成功。']],
      ['身份与授权', ['接入的店铺需要有效的 OAuth 授权和正确的 SellerId。每次改价都必须对准卖家自己的 Offer 和对应渠道，相似的商品记录不能证明这个 Offer 属于你。', '授权失败、Offer 已下架或 ID 不匹配时，应该停止改价并显示错误，而不是猜测着继续。']],
      ['平台底价规则和外部价格边界', ['Octopia 文档说明了 Offer 管理规则和校验，其中包括底价相关的控制。调价先锋在改价进入 Package 之前，再加上卖家设置的最低价和最高价。', '如果 Cdiscount 自带功能或其他调价工具已经在管理同一批 Offer，多个系统同时改价会互相冲突。开启前请检查现有的自动化设置，为每批商品明确一个负责方。']],
      ['什么时候还需要外部自动调价', ['如果你只有一个店铺、商品不多，平台自带的底价功能可能已经够用。当你需要多个店铺统一规则、按表格批量导入、在一个后台里查看每次改价的反馈和结果时，外部调价工具才更有价值。', '无论选哪种方式，最重要的是同一个 Offer 只交给一个系统管理。']],
      ['Package 反馈与回读核对', ['要追踪 Package 的创建、处理状态和商品级反馈。处理完成的 Package 里仍然可能有被拒绝的商品。反馈成功后，最好再读取一次平台上的 Offer，核对最终保存的价格。', '这些检查点对应不同的真实状态：已提交、处理中、被拒绝、已接受、回读确认，每个状态证明的是流程中的不同环节。']],
      ['调价先锋怎么做 Cdiscount 自动调价', ['某 Offer 最低价 €18.50、最高价 €24.00，规则算出 €19.80 并生成 JSON 改价 Package。调价先锋保存 Package ID，检查商品反馈，再回读 Offer；只有之后的证据才能说明平台上的价格已确认。', '多个 Cdiscount 店铺可以在一个工作台里管理，支持表格批量导入调价规则。建议先用一小批 SKU 试运行，授权、反馈和回读都稳定后再扩大。']]
    ],
    sources: [['Octopia Offer 管理 JSON 接口', 'https://developer.octopia-io.net/api-reference/offer-management/offer-management-json/'], ['Cdiscount 支持 JSON Package 改价', 'https://developer.octopia-io.net/changelog/new-feature/cdiscount-now-supports-offer-updates-via-json-packages/'], ['Octopia 管理规则', 'https://developer.octopia-io.net/api-reference/offer-management/management-rules/'], ['Octopia 读取 Offer', 'https://developer.octopia-io.net/api-reference/offer-management/retrieve-offers/']],
    faq: [['什么是 Offer 改价 Package？', '一组异步处理的 Offer 改价请求。要保存它的 ID，并查看处理状态和商品反馈。'], ['Package 处理完成就说明前台价格改好了吗？', '不一定。商品反馈和之后的 Offer 回读能提供更多证据。'], ['调价先锋能和其他调价工具一起用吗？', '同时运行可能冲突，开启前请确认当前由谁负责调价。'], ['调价先锋能保证拿到购物车吗？', '不能。调价只控制价格，平台排序还取决于其他因素。']],
    related: [['Cdiscount 自动调价', '/zh/cdiscount-repricer/'], ['多店铺批量调价', '/zh/features/multi-store-management/'], ['自动调价原理', '/zh/features/automatic-repricing/']]
  },
  {
    slug: 'mirakl-repricing', platform: 'Mirakl', landing: '/zh/mirakl-repricer/',
    title: 'Mirakl 平台调价指南：为什么不同 Mirakl 平台不能一刀切',
    description: 'Worten 等很多欧洲平台基于 Mirakl 搭建，但字段、渠道和跟卖数据各不相同。讲清 Mirakl 平台调价需要的数据、异步导入状态、渠道价格和常见失败原因。',
    keywords: 'Mirakl调价,Mirakl平台,Mirakl接口,Mirakl自动调价,Mirakl渠道价格',
    h1: 'Mirakl 平台调价：开启自动化之前要确认什么',
    intro: 'Mirakl 提供的是平台底座，而不是一套所有卖家通用的流程。每个基于 Mirakl 的平台自己决定开放哪些渠道、Offer 字段、价格控制和竞争数据。安全的调价要先确认具体是哪个平台，而不是假设一个对接就能通用。',
    takeaways: ['每个 Mirakl 平台都要当作一个独立的对接来评估。', '每次改价都带上店铺、SKU、商品和渠道身份。', '计算目标价之前先校验最低价和最高价。', '追踪导入状态和错误：文件上传成功不等于价格已确认。'],
    sections: [
      ['为什么“Mirakl 调价”不是一个通用对接', ['Mirakl 平台提供 Offer、价格和异步导入相关的卖家接口。各平台会按自己的商业模式配置，所以两个都基于 Mirakl 的网站，开放的字段、渠道和权限可能完全不同。', '开启自动化前，要确认平台、国家、店铺 ID、渠道代码、Offer 标识和授权范围。如果这个平台不开放竞争数据，调价工具就不应该凭空编造。']],
      ['一个调价循环需要哪些数据', ['有用的调价循环需要：当前 Offer、有效的调价规则、卖家设置的价格边界，以及平台真正开放的市场数据。Offer 接口可以带上店铺和渠道信息，而具体能读写什么由各平台的接口决定。', '价格同步和自动调价是两回事。同步只是复制一个已知价格；调价要读取允许的市场数据，计算有边界的目标价，提交并验证结果。']],
      ['安全的 Mirakl 调价流程', ['先挑一小批精确的 Offer，核对 ID 和当前价格，设置最低价和最高价，再运行该平台对应的调价规则，只通过支持的 Offer 更新方式提交符合条件的改价。', 'Mirakl 的导入是异步的。要保存导入 ID，轮询状态并查看每一行的错误。上传成功的请求里仍然可能有被拒绝的商品。']],
      ['渠道价格和常见失败原因', ['有些平台使用按渠道区分的价格。如果改价时没有带上正确的渠道，即使 SKU 正确，改价也可能无效甚至改错。频率限制、Offer 已下架、价格区间无效和平台侧校验也会让改价失败。', '操作记录应该区分已计算、被保护、已提交、处理中、已确认和失败，这样出了问题可以直接定位到第一个出错的环节。']],
      ['怎样判断一个 Mirakl 平台能不能接', ['先确认平台是否开放了自动调价所需的数据和操作：Offer 读取、跟卖报价、渠道信息、改价接口和导入状态。缺任何一项，都要先弄清楚再开启自动化。', '新平台建议从一个店铺、一小批 SKU 开始，ID、导入反馈和之后的平台价格都一致后再扩大。']],
      ['调价先锋怎么做 Mirakl 平台调价', ['调价先锋目前公开支持 Worten，并对其他基于 Mirakl 的平台逐个评估：确认平台实际的接口和 Offer 模型后，才开启有边界的自动调价。这不是“支持所有 Mirakl 平台”的承诺。', '如果你在运营其他 Mirakl 平台，可以联系客服确认是否已评估。注册后自动开通 7 天免费试用。']]
    ],
    sources: [['Mirakl 平台接口概览', 'https://developer.mirakl.com/content/product/mmp'], ['Mirakl 卖家 Offer 接口', 'https://developer.mirakl.com/content/product/mmp/rest/seller/openapi3/offers/of01'], ['Mirakl Offer 导入状态', 'https://developer.mirakl.com/content/product/mmp/rest/seller/openapi3/offers/of04']],
    faq: [['一个 Mirakl 对接能用于所有平台吗？', '不能。各平台的字段、渠道、权限、频率限制和竞争数据都可能不同，需要逐个评估。'], ['导入被接受了，价格就改好了吗？', '没有。要保存导入 ID、查看处理状态和商品错误，确认后才算完成。'], ['可以按渠道分别改价吗？', '只有平台开放了该渠道，且对接保留了正确的渠道信息时才可以。'], ['调价先锋能保证拿到购物车吗？', '不能。它只控制符合条件的改价，排序还取决于配送、库存、店铺表现和平台规则。']],
    related: [['Mirakl 平台自动调价', '/zh/mirakl-repricer/'], ['Worten 自动调价', '/zh/worten-repricer/'], ['欧洲多平台自动调价', '/zh/multi-marketplace-repricing/']]
  }
];
