// Fails if navigation, footer or form code links to investindia.gov.in.
// (Source citations inside src/data are allowed — they are references, not navigation.)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['src/components', 'src/app'];
const bad = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mjs)$/.test(f) && /investindia\.gov\.in/i.test(readFileSync(p, 'utf8'))) bad.push(p);
  }
};
roots.forEach(walk);
if (bad.length) {
  console.error('FAIL: Invest India links found in:\n' + bad.join('\n'));
  process.exit(1);
}
console.log('OK: no Invest India links in navigation, components or pages.');
