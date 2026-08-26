import { chromium } from 'playwright-core';
import fs from 'node:fs';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
fs.mkdirSync('lab/v2', { recursive: true });
const jobs = [
  ['desk-top',    1440, 900, '',                    0],
  ['desk-grid',   1440, 900, '',                  760],
  ['desk-filter', 1440, 900, '',                 1500],
  ['desk-project',1440, 900, '#/work/beats-by-dre', 0],
  ['desk-proj-body',1440, 900, '#/work/beats-by-dre', 900],
  ['desk-foot',   1440, 900, '',                 2600],
  ['phone-top',    390, 844, '',                    0],
  ['phone-grid',   390, 844, '',                 900],
  ['phone-project',390, 844, '#/work/manchester-united', 0],
];
for (const [name, w, h, hash, y] of jobs) {
  const p = await b.newPage({ viewport:{ width:w, height:h }, deviceScaleFactor:2 });
  await p.goto('http://localhost:4500/' + hash, { waitUntil:'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  if (y) await p.evaluate(v => window.scrollTo(0, v), y);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `lab/v2/${name}.png` });
  await p.close();
}
await b.close();
console.log('shot', jobs.length);
