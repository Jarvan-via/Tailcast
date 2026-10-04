import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(https:\/\/autopricy\.com\/[^<]*)<\/loc>/g)].map((match) => match[1]);
const errors = [];
const warnings = [];
const alternatesByUrl = new Map();
const seenTitles = new Map();
const seenDescriptions = new Map();

function pagePath(url) {
  const pathname = new URL(url).pathname;
  return pathname === '/' ? resolve(dist, 'index.html') : resolve(dist, pathname.slice(1), 'index.html');
}

function textContent(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
}

for (const url of urls) {
  const file = pagePath(url);
  if (!existsSync(file)) {
    errors.push(`${url}: sitemap target missing (${file})`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? '';
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] ?? '';
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const visibleFaqCount = (html.match(/<details(?:\s|>)/gi) ?? []).length;
  const h2Count = (html.match(/<h2(?:\s|>)/gi) ?? []).length;
  const body = textContent(html);
  const isHelp = /\/zh\/help\/[^/]+\/$/.test(url);
  const isGuide = /\/guides\/[^/]+\/$/.test(url);
  const lang = html.match(/<html lang="([^"]+)"/i)?.[1] ?? '';
  const isChinese = lang === 'zh-CN';
  // Chinese characters carry more meaning per character; Baidu and Google truncate earlier.
  const titleRange = isChinese ? [15, 40] : [35, 70];
  const descriptionRange = isChinese ? [50, 120] : [100, 160];
  const titleLength = [...title].length;
  const descriptionLength = [...description].length;

  for (const [label, value, seen] of [['title', title, seenTitles], ['description', description, seenDescriptions]]) {
    if (value && seen.has(value)) errors.push(`${url}: duplicate ${label} with ${seen.get(value)}`);
    if (value) seen.set(value, url);
  }
  if (isHelp && h2Count < 6) errors.push(`${url}: help page needs workflow, sources and FAQ sections`);
  if (!title) errors.push(`${url}: missing title`);
  if (url !== 'https://autopricy.com/' && (titleLength < titleRange[0] || titleLength > titleRange[1])) warnings.push(`${url}: title length ${titleLength}`);
  if (descriptionLength < descriptionRange[0] || descriptionLength > descriptionRange[1]) warnings.push(`${url}: meta description length ${descriptionLength}`);
  if (url.startsWith('https://autopricy.com/zh/') && !isChinese) errors.push(`${url}: /zh/ page must declare lang="zh-CN"`);
  alternatesByUrl.set(url, new Map([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)].map(([, hreflang, href]) => [hreflang, href])));
  if (canonical !== url) errors.push(`${url}: canonical ${canonical || '(missing)'}`);
  if (h1Count !== 1) errors.push(`${url}: H1 count ${h1Count}`);
  if (!/name="robots" content="index, follow/.test(html)) errors.push(`${url}: missing index/follow robots meta`);
  if (/In today(?:'|’)?s fast-paced|ever-evolving|revolutionize your|unlock your potential/i.test(body)) errors.push(`${url}: banned filler phrase`);
  if (/Rakuten France repricer|Allegro repricer|Catch repricer|Mercado Libre repricer/i.test(body)) errors.push(`${url}: unsupported public repricer claim`);
  if (/(?<!能|不|无法)保证(拿到|赢得)购物车|实时调价|乐天.{0,4}调价|Allegro.{0,4}调价|美客多.{0,4}调价|Catch.{0,4}调价/.test(body)) errors.push(`${url}: unsupported Chinese capability claim`);

  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] ?? '';
  if (!ogImage) errors.push(`${url}: missing og:image`);
  else if (ogImage.startsWith('https://autopricy.com/') && !existsSync(resolve(dist, new URL(ogImage).pathname.slice(1)))) errors.push(`${url}: og:image file missing (${ogImage})`);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!schemas.length) errors.push(`${url}: missing JSON-LD`);
  for (const [, json] of schemas) {
    try {
      const parsed = JSON.parse(json);
      const graph = parsed['@graph'] ?? [];
      const faq = graph.find((item) => item['@type'] === 'FAQPage');
      const article = graph.find((item) => item['@type'] === 'Article');
      const isHub = /\/(guides|help)\/$/.test(url);
      if (url !== 'https://autopricy.com/' && !isHub && (!faq || faq.mainEntity.length !== visibleFaqCount)) {
        errors.push(`${url}: visible/schema FAQ mismatch (${visibleFaqCount}/${faq?.mainEntity?.length ?? 0})`);
      }
      if ((isGuide || isHelp) && !article) errors.push(`${url}: missing Article schema`);
      if (isHub && !graph.some((item) => item['@type'] === 'CollectionPage')) errors.push(`${url}: guide hub missing CollectionPage schema`);
    } catch (error) {
      errors.push(`${url}: invalid JSON-LD (${error.message})`);
    }
  }

  if (isGuide) {
    if (h2Count < 6) errors.push(`${url}: guide H2 count ${h2Count}, expected at least 6`);
    if (!/Primary sources|参考资料/.test(body)) errors.push(`${url}: missing primary source section`);
  }

  if (isHelp && !/href="\/zh\/(?:[a-z-]+-repricer|features\/[^"]+)\//.test(html)) errors.push(`${url}: missing corresponding platform or feature link`);
  for (const [, src, alt] of html.matchAll(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/g)) {
    if (isHelp && !alt) errors.push(`${url}: missing image alt`);
    if (src.startsWith('/') && !existsSync(resolve(dist, src.slice(1)))) errors.push(`${url}: missing image ${src}`);
  }
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split('#', 1)[0].split('?', 1)[0];
    if (!path || path === '/') continue;
    const target = path.endsWith('/') ? resolve(dist, path.slice(1), 'index.html') : resolve(dist, path.slice(1));
    if (!existsSync(target)) errors.push(`${url}: broken internal link ${href}`);
  }
}

for (const [url, alternates] of alternatesByUrl) {
  for (const [hreflang, href] of alternates) {
    if (hreflang === 'x-default' || href === url) continue;
    const back = alternatesByUrl.get(href);
    if (!back) errors.push(`${url}: hreflang ${hreflang} target ${href} is not in the sitemap`);
    else if (![...back].some(([backLang, backHref]) => backLang !== 'x-default' && backHref === url)) errors.push(`${url}: hreflang ${hreflang} target ${href} does not link back`);
  }
}

if (new Set(urls).size !== urls.length) errors.push('sitemap contains duplicate URLs');
if (urls.length !== 45) errors.push(`sitemap URL count ${urls.length}, expected 45`);

console.log(`Checked ${urls.length} sitemap pages.`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`FAIL: ${error}`);
if (errors.length) process.exit(1);
console.log(`SEO checks passed with ${warnings.length} warning(s).`);
