/* Render each placeholder scene to frames, then encode a looping MP4 + WebM
   and a poster still. Placeholders only: real footage replaces these by
   filename, see SLOTS.md. */
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUT = 'assets';
const TMP = 'tools/.frames';
const FPS = 24, SECONDS = 4;
const FRAMES = FPS * SECONDS;

// scene name -> output slug
// [scene, slug, startAt] — startAt rotates the loop so frame 0 is a strong
// frame. Every scene is periodic, so rotating keeps the loop seamless, and it
// means the poster IS the video's first frame: no jump when hover starts.
const MAP = [
  ['pulse',   '01-beats',      0],
  ['stripes', '02-manutd',     0],
  ['arc',     '03-callaway',   0.46],
  ['scan',    '04-skysports',  0.34],
  ['chevron', '05-astonvilla', 0],
  ['mosaic',  '06-arsenal',    0],
  ['drift',   '07-academy',    0],
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('file://' + path.resolve('tools/scenes.html'));

for (const [scene, slug, startAt] of MAP) {
  fs.rmSync(TMP, { recursive: true, force: true });
  fs.mkdirSync(TMP, { recursive: true });

  for (let i = 0; i < FRAMES; i++) {
    const dataUrl = await page.evaluate(
      ([s, p]) => window.renderFrame(s, p),
      [scene, (i / FRAMES) + startAt]
    );
    fs.writeFileSync(
      path.join(TMP, String(i).padStart(4, '0') + '.jpg'),
      Buffer.from(dataUrl.split(',')[1], 'base64')
    );
  }

  const ff = (...a) => execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...a]);
  const seq = path.join(TMP, '%04d.jpg');

  // poster: frame 0, what shows before hover and under reduced motion
  fs.copyFileSync(path.join(TMP, '0000.jpg'), path.join(OUT, `${slug}-poster.jpg`));

  ff('-framerate', String(FPS), '-i', seq,
     '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
     '-crf', '26', '-preset', 'slow', '-movflags', '+faststart', '-an',
     path.join(OUT, `${slug}.mp4`));

  ff('-framerate', String(FPS), '-i', seq,
     '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0', '-row-mt', '1',
     '-pix_fmt', 'yuv420p', '-an',
     path.join(OUT, `${slug}.webm`));

  const kb = f => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + 'KB';
  console.log(`${slug}  mp4 ${kb(slug + '.mp4')}  webm ${kb(slug + '.webm')}  poster ${kb(slug + '-poster.jpg')}`);
}

fs.rmSync(TMP, { recursive: true, force: true });
await browser.close();
