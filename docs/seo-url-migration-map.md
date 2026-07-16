# Autopricy SEO URL Migration Map

Updated: 2026-07-16

## Public website

| Legacy URL | Target URL | Status | Tested | Notes |
|---|---|---:|---|---|
| `https://wortenprice.com/` | `https://autopricy.com/` | 301 | Yes | Apex DNS now points to the `ali` Nginx origin and the dedicated TLS certificate is active. |
| `https://www.wortenprice.com/` | `https://autopricy.com/` | 301 | Yes | Direct Nginx origin. |
| `https://www.wortenprice.com/tiaojia.html` | `https://autopricy.com/#features` | 301 | Yes | Closest current product-capability section. |
| `https://www.wortenprice.com/zidong-tiaojia.html` | `https://autopricy.com/#workflow` | 301 | Yes | Closest current automated workflow section. |
| `https://www.wortenprice.com/jingzheng-tiaojia.html` | `https://autopricy.com/#features` | 301 | Yes | Closest current competitive repricing section. |
| `https://www.wortenprice.com/piliang-tiaojia.html` | `https://autopricy.com/#features` | 301 | Yes | Closest current batch-operation section. |
| `https://www.wortenprice.com/robots.txt` | `https://autopricy.com/robots.txt` | 301 | Yes | Keeps crawlers able to follow the migration. |
| `https://www.wortenprice.com/sitemap.xml` | `https://autopricy.com/sitemap.xml` | 301 | Yes | The new sitemap contains only canonical public pages. |
| `https://www.wortenprice.com/image/qr.png` | None | 410 | Yes | Historical QR asset has no canonical replacement. |
| Other `www.wortenprice.com` paths | None | 410 | Yes | Avoids redirecting unknown URLs to the homepage as soft 404s. |

The apex and `www` hosts now use the same exact-path redirect policy. Unknown legacy paths return `410` instead of becoming soft 404s on the new homepage.

## Business application

| Legacy URL | Target URL | Status | Tested | Notes |
|---|---|---:|---|---|
| `https://vip.wortenprice.com/` | `https://app.autopricy.com/` | 301 | Yes | The SPA redirects unauthenticated users to its real login route. |
| `https://vip.wortenprice.com/help.html` | `https://app.autopricy.com/help.html` | 301 | Yes | Exact document replacement. |
| `https://vip.wortenprice.com/privacy.html` | `https://app.autopricy.com/privacy.html` | 301 | Yes | Exact document replacement. |
| `https://vip.wortenprice.com/terms.html` | `https://app.autopricy.com/terms.html` | 301 | Yes | Exact document replacement. |
| `https://vip.wortenprice.com/login` | `https://app.autopricy.com/#/login` | 301 | Yes | Explicit non-hash legacy route. |
| `https://vip.wortenprice.com/register` | `https://app.autopricy.com/#/register` | 301 | Yes | Explicit non-hash legacy route. |
| `https://vip.wortenprice.com/#/login` | `https://app.autopricy.com/#/login` | 301 | Browser check pending | URL fragments are client-side; the server receives `/` and redirects to the app origin. |
| `https://vip.wortenprice.com/#/register` | `https://app.autopricy.com/#/register` | 301 | Browser check pending | URL fragments are client-side; the server receives `/` and redirects to the app origin. |
| Legacy `/api/`, `/api/send`, `/socket.io/`, `/umami.js` and built static assets | Compatibility origin | 200/proxy | Yes | Temporarily retained to protect already-open clients and unconfirmed integrations. |
| Other `vip.wortenprice.com` paths | None | 410 | Yes | Unknown non-business paths are not redirected to the app homepage. |

## Indexing policy

- `autopricy.com` and its four public canonical pages are indexable and listed in the public sitemap.
- `app.autopricy.com` is a private business application. Its SPA, help page, privacy policy, and terms use `noindex,follow` and are intentionally excluded from any sitemap.
- Legacy domain text may remain in legal documents as historical service scope, but it must not remain a clickable primary entry.
