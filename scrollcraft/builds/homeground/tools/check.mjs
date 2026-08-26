import { chromium } from 'playwright-core';
const EXE = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const URL = 'http://localhost:4500';
const b = await chromium.launch({ executablePath: EXE });
let fail = 0;
const ok  = (n, c, x = '') => { console.log(`${c ? ' ok ' : 'FAIL'}  ${n}${x ? '  ' + x : ''}`); if (!c) fail++; };

/* ── 1. layout: no horizontal overflow anywhere ───────────────────────── */
for (const w of [390, 620, 768, 1040, 1440]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    window.scrollTo(9999, 0); const x = window.scrollX; window.scrollTo(0, 0);
    return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, x,
             cols: getComputedStyle(document.getElementById('grid')).gridTemplateColumns.split(' ').length };
  });
  ok(`no h-scroll @${w}`, r.x === 0 && r.sw <= r.cw + 1, `sw=${r.sw} cw=${r.cw} cols=${r.cols}`);
  await p.close();
}

/* ── 2. motion: nothing loads off-screen, hover plays, leave pauses ────── */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const reqs = [];
  p.on('request', q => { if (/\.(mp4|webm)$/.test(q.url())) reqs.push(q.url().split('/').pop()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(400);
  ok('no clip fetched on load', reqs.length === 0, `fetched=[${reqs}]`);

  const first = p.locator('.tile').first();
  await first.hover();
  await p.waitForTimeout(900);
  const st = await p.evaluate(() => {
    const t = document.querySelector('.tile');
    const v = t.querySelector('.tile__vid');
    return { playing: t.classList.contains('is-playing'), paused: v.paused, t: v.currentTime, srcs: v.querySelectorAll('source').length };
  });
  ok('hover attaches webm+mp4 sources', st.srcs === 2, `sources=${st.srcs}`);
  ok('hover plays the clip', st.playing && !st.paused && st.t > 0, `t=${st.t.toFixed(2)}`);
  ok('only the hovered clip fetched', reqs.length <= 2, `fetched=[${reqs}]`);

  await p.mouse.move(5, 5);
  await p.waitForTimeout(300);
  const after = await p.evaluate(() => {
    const t = document.querySelector('.tile');
    return { playing: t.classList.contains('is-playing'), paused: t.querySelector('.tile__vid').paused };
  });
  ok('pointer leave pauses', after.paused && !after.playing);
  await p.close();
}

/* ── 3. reduced motion: no clip ever fetched, captions visible ─────────── */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  const reqs = [];
  p.on('request', q => { if (/\.(mp4|webm)$/.test(q.url())) reqs.push(q.url()); });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.locator('.tile').first().hover();
  await p.waitForTimeout(700);
  ok('reduced motion fetches no clip', reqs.length === 0, `fetched=${reqs.length}`);
  const capOpacity = await p.evaluate(() => getComputedStyle(document.querySelector('.tile__cap')).opacity);
  ok('reduced motion shows captions', capOpacity === '1', `opacity=${capOpacity}`);
  await ctx.close();
}

/* ── 3b. touch / narrow: titles must be visible without hover ──────────── */
{
  for (const [label, opts] of [
    ['touch phone', { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }],
    ['narrow desktop window', { viewport: { width: 500, height: 900 } }],
  ]) {
    const ctx = await b.newContext(opts);
    const p = await ctx.newPage();
    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const o = await p.evaluate(() => getComputedStyle(document.querySelector('.tile__cap')).opacity);
    ok(`captions visible without hover — ${label}`, o === '1', `opacity=${o}`);
    await ctx.close();
  }
}

/* ── 4. filters ───────────────────────────────────────────────────────── */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(URL, { waitUntil: 'networkidle' });
  const total = await p.locator('.tile').count();
  await p.locator('[data-set="discipline"] button', { hasText: 'Kit launch' }).click();
  await p.waitForTimeout(200);
  const shown = await p.locator('.tile:not([hidden])').count();
  const label = await p.locator('#count').textContent();
  ok('discipline filter narrows', shown === 3 && shown < total, `${shown}/${total} — "${label}"`);
  const pressed = await p.locator('[data-set="discipline"] button[aria-pressed="true"]').textContent();
  ok('aria-pressed tracks state', pressed.trim() === 'Kit launch', pressed);
  await p.locator('[data-set="discipline"] button', { hasText: 'Kit launch' }).click();
  await p.waitForTimeout(200);
  ok('toggling off restores all', await p.locator('.tile:not([hidden])').count() === total);

  // client list filters the same grid
  await p.locator('#clientList button', { hasText: 'Callaway' }).click();
  await p.waitForTimeout(300);
  ok('client list drives the filter', await p.locator('.tile:not([hidden])').count() === 1);
  await p.close();
}

/* ── 5. routing + per-project meta ────────────────────────────────────── */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.locator('.tile__link').first().click();
  await p.waitForTimeout(300);
  const r = await p.evaluate(() => ({
    isProject: document.body.classList.contains('is-project'),
    hash: location.hash,
    title: document.title,
    og: document.querySelector('meta[property="og:title"]').content,
    ogImg: document.querySelector('meta[property="og:image"]').content,
    sections: [...document.querySelectorAll('.project .sect h3')].map(h => h.textContent),
    h2: !!document.querySelector('.project__client'),
  }));
  ok('tile routes to project', r.isProject && r.hash === '#/work/beats-by-dre', r.hash);
  ok('project template complete', JSON.stringify(r.sections) === '["Challenge","Idea","Execution","Result"]', r.sections.join('/'));
  ok('title updates per project', /Beats by Dre/.test(r.title), r.title);
  ok('og:title updates', /Beats by Dre/.test(r.og));
  ok('og:image is the project still', /01-beats-poster/.test(r.ogImg), r.ogImg);

  await p.goBack();
  await p.waitForTimeout(300);
  const back = await p.evaluate(() => ({ isProject: document.body.classList.contains('is-project'), title: document.title }));
  ok('back returns to the grid', !back.isProject && !/Beats/.test(back.title));
  await p.close();
}

/* ── 6. a11y: heading order, alt text, focus ──────────────────────────── */
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(URL, { waitUntil: 'networkidle' });
  const a = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    return {
      levels: [...document.querySelectorAll('h1,h2,h3')].map(h => +h.tagName[1]),
      noAlt: imgs.filter(i => !i.getAttribute('alt')).length,
      filenameAlt: imgs.filter(i => /\.(jpg|png|webp)/i.test(i.getAttribute('alt') || '')).length,
      lazy: imgs.filter(i => i.loading === 'lazy').length,
      imgs: imgs.length,
    };
  });
  let jump = null;
  for (let i = 1; i < a.levels.length; i++) if (a.levels[i] - a.levels[i - 1] > 1) jump = `${a.levels[i-1]}->${a.levels[i]}`;
  ok('no skipped heading levels', !jump, jump || a.levels.join(''));
  ok('every image has alt', a.noAlt === 0, `missing=${a.noAlt}/${a.imgs}`);
  ok('no filename alt text', a.filenameAlt === 0);
  ok('posters lazy-load', a.lazy === a.imgs, `${a.lazy}/${a.imgs}`);

  const order = [];
  for (let i = 0; i < 6; i++) {
    await p.keyboard.press('Tab');
    order.push(await p.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      return `${el.tagName}.${(el.className || '').toString().split(' ')[0]} outline=${cs.outlineWidth}`;
    }));
  }
  ok('focus ring visible on every stop', order.every(o => !/outline=0px/.test(o)), order[0]);
  console.log('     tab order: ' + order.map(o => o.split(' ')[0]).join(' > '));
  await p.close();
}

await b.close();
console.log(fail ? `\n${fail} FAILED` : '\nall checks passed');
process.exit(fail ? 1 : 0);
