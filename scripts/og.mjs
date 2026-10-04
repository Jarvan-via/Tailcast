// Per-platform Open Graph covers, rendered by scripts/build-og-images.mjs into
// dist/og/{key}-{en|zh}.jpg. Pages pick a cover from their slug.
export const ogPlatforms = {
  worten: { name: 'Worten', color: '#d94a3a', zh: 'Worten 自动调价', en: 'Worten repricer', zhSub: '分渠道跟价 · 抢购物车 · 守住最低价', enSub: 'Competitor-aware repricing inside your price floor' },
  fnac: { name: 'Fnac', color: '#b88900', zh: 'Fnac 自动调价', en: 'FNAC repricer', zhSub: 'XML 批量改价 · 排除自己 · 批次可追踪', enSub: 'XML offer updates with batch confirmation' },
  darty: { name: 'Darty', color: '#1680c4', zh: 'Darty 自动调价', en: 'Darty repricer', zhSub: 'Darty 专属跟卖对比 · 价格区间保护', enSub: 'Darty-specific competitor handling' },
  onbuy: { name: 'OnBuy', color: '#ff5f3d', zh: 'OnBuy 自动调价', en: 'OnBuy repricer', zhSub: '没赢就跟价 · 赢了试涨价 · 不破底价', enSub: 'Lower to compete, raise after winning' },
  cdiscount: { name: 'Cdiscount', color: '#145ac6', zh: 'Cdiscount 自动调价', en: 'Cdiscount repricer', zhSub: '批量规则 · Package 反馈 · 回读核对', enSub: 'Bulk rules, package feedback and read-back' },
  mirakl: { name: 'Mirakl', color: '#147d64', zh: 'Mirakl 平台调价', en: 'Mirakl repricer', zhSub: '按平台评估 · 渠道价格 · 结果可追踪', enSub: 'Operator-aware repricing for selected marketplaces' },
  multi: { name: 'Europe', color: '#1e6fff', zh: '欧洲平台自动调价', en: 'Marketplace repricing', zhSub: 'Worten · Fnac · Darty · OnBuy · Cdiscount', enSub: 'Worten · FNAC · Darty · OnBuy · Cdiscount' }
};

export function ogImage(slug, lang) {
  const first = slug.replace(/^zh\//, '').replace(/^guides\//, '').split(/[-/]/)[0];
  const key = first in ogPlatforms ? first : 'multi';
  return { url: `https://autopricy.com/og/${key}-${lang === 'zh-CN' ? 'zh' : 'en'}.jpg`, width: 1200, height: 630 };
}
