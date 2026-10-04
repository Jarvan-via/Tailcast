// Push canonical sitemap URLs to search engines after a production deploy.
//
//   node scripts/submit-urls.mjs                 # dry run: list what would be sent
//   node scripts/submit-urls.mjs --send          # IndexNow (Bing, Yandex, Seznam…)
//   BAIDU_PUSH_TOKEN=xxx node scripts/submit-urls.mjs --send   # also Baidu 普通收录
//   node scripts/submit-urls.mjs --send --only=/zh/   # limit to matching paths
//
// The IndexNow key file must already be live at https://autopricy.com/<key>.txt.
// The Baidu token comes from 百度搜索资源平台 → 普通收录 → API 提交; never commit it.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const host = 'autopricy.com';
const indexNowKey = '438db09e85513490b9d62c07118a1572';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const send = args.includes('--send');
const only = args.find((arg) => arg.startsWith('--only='))?.slice('--only='.length);

const sitemap = readFileSync(resolve(root, 'dist', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => !only || new URL(url).pathname.startsWith(only));

console.log(`${urls.length} URL(s)${only ? ` matching ${only}` : ''}:`);
for (const url of urls) console.log(`  ${url}`);

if (!send) {
  console.log('\nDry run. Re-run with --send after the release is live.');
  process.exit(0);
}

let failed = false;

const indexNow = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key: indexNowKey, keyLocation: `https://${host}/${indexNowKey}.txt`, urlList: urls })
});
console.log(`\nIndexNow: HTTP ${indexNow.status} ${await indexNow.text()}`);
if (![200, 202].includes(indexNow.status)) failed = true;

const baiduToken = process.env.BAIDU_PUSH_TOKEN;
if (baiduToken) {
  const baidu = await fetch(`http://data.zz.baidu.com/urls?site=https://${host}&token=${encodeURIComponent(baiduToken)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: urls.join('\n')
  });
  console.log(`Baidu: HTTP ${baidu.status} ${await baidu.text()}`);
  if (baidu.status !== 200) failed = true;
} else {
  console.log('Baidu: skipped (set BAIDU_PUSH_TOKEN to enable).');
}

if (failed) process.exit(1);
