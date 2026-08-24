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
  const body = textContent(html);

  if (!title) errors.push(`${url}: missing title`);
  if (url !== 'https://autopricy.com/' && (title.length < 35 || title.length > 70)) warnings.push(`${url}: title length ${title.length}`);
  if (description.length < 100 || description.length > 160) warnings.push(`${url}: meta description length ${description.length}`);
  if (canonical !== url) errors.push(`${url}: canonical ${canonical || '(missing)'}`);
  if (h1Count !== 1) errors.push(`${url}: H1 count ${h1Count}`);
  if (!/name="robots" content="index, follow/.test(html)) errors.push(`${url}: missing index/follow robots meta`);
  if (/In today(?:'|’)?s fast-paced|ever-evolving|revolutionize your|unlock your potential/i.test(body)) errors.push(`${url}: banned filler phrase`);
  if (/Rakuten France repricer|Allegro repricer|Catch repricer|Mercado Libre repricer/i.test(body)) errors.push(`${url}: unsupported public repricer claim`);

  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!schemas.length) errors.push(`${url}: missing JSON-LD`);
  for (const [, json] of schemas) {
    try {
      const parsed = JSON.parse(json);
      const graph = parsed['@graph'] ?? [];
      const faq = graph.find((item) => item['@type'] === 'FAQPage');
      if (url !== 'https://autopricy.com/' && (!faq || faq.mainEntity.length !== visibleFaqCount)) {
        errors.push(`${url}: visible/schema FAQ mismatch (${visibleFaqCount}/${faq?.mainEntity?.length ?? 0})`);
      }
    } catch (error) {
      errors.push(`${url}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split('#', 1)[0].split('?', 1)[0];
    if (!path || path === '/') continue;
    const target = path.endsWith('/') ? resolve(dist, path.slice(1), 'index.html') : resolve(dist, path.slice(1));
    if (!existsSync(target)) errors.push(`${url}: broken internal link ${href}`);
  }
}

if (new Set(urls).size !== urls.length) errors.push('sitemap contains duplicate URLs');
if (urls.length !== 11) errors.push(`sitemap URL count ${urls.length}, expected 11`);

console.log(`Checked ${urls.length} sitemap pages.`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
for (const error of errors) console.error(`FAIL: ${error}`);
if (errors.length) process.exit(1);
console.log(`SEO checks passed with ${warnings.length} warning(s).`);
