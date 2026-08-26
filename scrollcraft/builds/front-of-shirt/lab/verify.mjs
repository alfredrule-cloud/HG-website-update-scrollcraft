import {chromium} from 'playwright-core';
const b=await chromium.launch({executablePath:process.env.SCROLLCRAFT_CHROME});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:4500',{waitUntil:'networkidle'});

// Walk the page slowly so every count window is crossed the way a reader crosses it.
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<H;y+=180){ await p.evaluate(v=>scrollTo(0,v),y); await p.waitForTimeout(45); }
await p.waitForTimeout(900);

const figs=await p.$$eval('.case__fig',els=>els.map(e=>e.textContent.trim()));
const total=await p.$eval('[data-fos-shortfall]',e=>e.textContent.trim());
const worth=await p.$$eval('[data-fos-worthfig]',els=>els.map(e=>e.textContent.trim()));
console.log('ch1 figures :',figs.join(' '));
console.log('ledger worth:',worth.join(' '));
console.log('shortfall   :',total);

// Focus order + visible ring
await p.evaluate(()=>scrollTo(0,0));
const order=[];
for(let i=0;i<9;i++){ await p.keyboard.press('Tab');
  order.push(await p.evaluate(()=>{const a=document.activeElement;
    return (a.tagName+(a.id?'#'+a.id:'')+(a.className&&typeof a.className==='string'?'.'+a.className.split(' ')[0]:'')).slice(0,34);})); }
console.log('focus order :',order.join(' > '));
await b.close();
