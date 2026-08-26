import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await b.newPage({ viewport:{width:900,height:1400}, deviceScaleFactor:2 });
await p.goto('http://localhost:4500/tools/logo-lab.html', { waitUntil:'networkidle' });
await p.waitForFunction(() => document.title === 'ready');
await p.waitForTimeout(400);
await p.screenshot({ path:'lab/logo-variants.png', fullPage:true });
console.log('ok');
await b.close();
