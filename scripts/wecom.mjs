// 企业微信渠道码（2026-10-26）：扫码加好友后，worten-admin 自动发对应平台的欢迎语并打「来源平台」标签。
// 图片是 GET /customer/wecom/channel-qrcodes 生成的长期码，手工放在 dist/wecom/。
// 中文平台页和平台教程在 CTA 放该平台的码；其他中文页面在页脚放通用码，一页只出现一个码。英文页不放。

const labels = { general: '调价先锋', mirakl: 'Worten / Mirakl', fnac: 'FNAC / Darty', onbuy: 'OnBuy', cdiscount: 'Cdiscount' };

const channelBySlug = {
  'zh/worten-repricer': 'mirakl',
  'zh/mirakl-repricer': 'mirakl',
  'zh/fnac-repricer': 'fnac',
  'zh/darty-repricer': 'fnac',
  'zh/onbuy-repricer': 'onbuy',
  'zh/cdiscount-repricer': 'cdiscount',
  // 中文调价教程（zh-guides.mjs 的 slug）
  'worten-automatic-repricing': 'mirakl',
  'mirakl-repricing': 'mirakl',
  'fnac-darty-repricing': 'fnac',
  'onbuy-winning-offer': 'onbuy',
  'cdiscount-repricing': 'cdiscount',
};

export function wecomChannel(slug) {
  return channelBySlug[slug] ?? null;
}

export function wecomCard(channel) {
  return `<div class="wecom-card"><img src="/wecom/${channel}.png" alt="${labels[channel]} 企业微信二维码" width="112" height="112" loading="lazy"><p><strong>扫码加企业微信</strong><span>自动发你 ${labels[channel]} 能用的功能和试用说明</span></p></div>`;
}

export const wecomFooter = `<div class="wecom-footer"><img src="/wecom/general.png" alt="调价先锋企业微信二维码" width="84" height="84" loading="lazy"><span>扫码加企业微信<br>咨询功能与试用</span></div>`;
