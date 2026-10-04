import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Public assets cache for 30 days. A content version avoids stale styles
// after future releases while keeping the shared CSS file hand-maintained.
const css = readFileSync(fileURLToPath(new URL('../dist/platform.css', import.meta.url)));
export const platformCssHref = `/platform.css?v=${createHash('sha256').update(css).digest('hex').slice(0, 12)}`;
