// Render per-platform Open Graph covers (1200×630) into dist/og/.
// Requires Playwright with Chromium: node scripts/build-og-images.mjs
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ogPlatforms } from './og.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'dist', 'og');
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(`${execSync('npm root -g').toString().trim()}/playwright`); }

const logo = readFileSync(resolve(root, 'dist', 'logo.svg'), 'utf8');
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function html(platform, lang) {
  const zh = lang === 'zh';
  return `<!doctype html><html lang="${zh ? 'zh-CN' : 'en'}"><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; }
    body { width: 1200px; height: 630px; font-family: "MiSans", "HarmonyOS Sans SC", "Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", "PingFang SC", sans-serif; color: #111827;
      background: radial-gradient(circle at 88% 18%, ${platform.color}26, transparent 38%), linear-gradient(160deg, #ffffff 0 58%, #f4f7fb 100%); }
    .bar { position: absolute; left: 0; top: 0; bottom: 0; width: 18px; background: ${platform.color}; }
    .wrap { position: absolute; inset: 64px 80px 60px 98px; display: flex; flex-direction: column; }
    .brand { display: flex; align-items: center; gap: 16px; font-size: 30px; font-weight: 800; }
    .brand svg { width: 52px; height: 52px; }
    .brand small { color: #758196; font-size: 20px; font-weight: 700; letter-spacing: .08em; }
    .tag { margin-top: 76px; display: inline-flex; align-self: flex-start; padding: 8px 18px; border-radius: 999px; color: ${platform.color}; background: ${platform.color}18; font-size: 24px; font-weight: 800; letter-spacing: .04em; }
    h1 { margin-top: 26px; font-size: ${zh ? 88 : 80}px; line-height: 1.08; letter-spacing: -0.03em; font-weight: 900; }
    p { margin-top: 24px; color: #4f5d70; font-size: 34px; font-weight: 600; }
    .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: center; color: #263244; font-size: 26px; font-weight: 700; }
    .foot b { color: ${platform.color}; }
  </style></head><body><div class="bar"></div><div class="wrap">
    <div class="brand">${logo}<span>${zh ? '调价先锋' : 'Autopricy'} <small>${zh ? 'AUTOPRICY' : 'MARKETPLACE REPRICING'}</small></span></div>
    <span class="tag">${esc(platform.name.toUpperCase())}</span>
    <h1>${esc(zh ? platform.zh : platform.en)}</h1>
    <p>${esc(zh ? platform.zhSub : platform.enSub)}</p>
    <div class="foot"><span>${zh ? '<b>¥168</b> / 店铺 / 月 · 商品数量不限' : 'Unlimited SKUs per store'}</span><span>${zh ? '免费试用 7 天' : '7-day free trial'} · autopricy.com</span></div>
  </div></body></html>`;
}

mkdirSync(outDir, { recursive: true });
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [key, platform] of Object.entries(ogPlatforms)) {
  for (const lang of ['en', 'zh']) {
    await page.setContent(html(platform, lang), { waitUntil: 'load' });
    await page.screenshot({ path: resolve(outDir, `${key}-${lang}.jpg`), type: 'jpeg', quality: 85 });
  }
}
await browser.close();
console.log(`Rendered ${Object.keys(ogPlatforms).length * 2} Open Graph images into dist/og/.`);
