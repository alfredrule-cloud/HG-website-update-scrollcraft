/* Build the self-contained review copy. The artifact host serves one HTML file
   with no sibling assets and this account has no artifact `assets` capability,
   so fonts and media are inlined as data: URIs. That makes the review copy
   heavier than the real build — the lazy-load and hover-gated fetch logic is
   unchanged, but the bytes already arrived with the document. Deploy the repo
   build, not this one. */
import fs from 'node:fs';
const rd = f => fs.readFileSync(f, 'utf8');
const b64 = f => fs.readFileSync(f).toString('base64');
const mode = process.argv[2];           // 'artifact' strips the html wrapper
const out  = process.argv[3];

const src = rd('index.html');
const headEnd = src.indexOf('</head>');
let head = src.slice(src.indexOf('<title>'), headEnd);
let body = src.slice(src.indexOf('<body>', headEnd) + '<body>'.length, src.lastIndexOf('</body>'));

// fonts
const type = rd('type.css').replace(/url\("fonts\/([^"]+)"\)/g,
  (_, f) => `url("data:font/woff2;base64,${b64('fonts/' + f)}")`);
head = head.replace('<link rel="stylesheet" href="type.css">', `<style>\n${type}\n</style>`);

// media: posters are src= in markup, clips are data-webm / data-mp4
const MIME = { jpg: 'image/jpeg', webm: 'video/webm', mp4: 'video/mp4' };
const inline = p => {
  const ext = p.split('.').pop();
  return `data:${MIME[ext]};base64,${b64(p)}`;
};
let bytes = 0;
for (const f of fs.readdirSync('assets')) {
  const path = 'assets/' + f;
  const uri = inline(path);
  bytes += fs.statSync(path).size;
  body = body.split(`assets/${f}`).join(uri);
}
// The templates build asset paths from a key. These sit INSIDE a template
// literal (src="assets/${p.media}-poster.jpg"), not wrapped in backticks, so
// they are replaced as literal text with an interpolation of the lookup table.
// String split/join, not regex: the needle contains $ { }.
const swap = (needle, repl) => { body = body.split(needle).join(repl); };
swap('assets/${p.media}-poster.jpg', '${POSTERS[p.media]}');
swap('assets/${p.media}.webm',       '${WEBMS[p.media]}');
swap('assets/${p.media}.mp4',        '${MP4S[p.media]}');
swap("'assets/01-beats-poster.jpg'", 'POSTERS["01-beats"]');
const keys = [...new Set(fs.readdirSync('assets').map(f => f.replace(/(-poster)?\.(jpg|webm|mp4)$/, '')))];
const table = ['POSTERS', 'WEBMS', 'MP4S'].map((n, i) => {
  const ext = ['-poster.jpg', '.webm', '.mp4'][i];
  return `const ${n} = {${keys.map(k => `"${k}":"${inline('assets/' + k + ext)}"`).join(',')}};`;
}).join('\n');
body = body.replace('const PROJECTS = [', table + '\nconst PROJECTS = [');

// the favicon comes from the publish parameter; the og:image tags stay as
// written (they cannot work from a single file either way — documented)
head = head.replace(/<link rel="icon"[\s\S]*?">\s*/g, '');

const doc = mode === 'artifact'
  ? head.trim() + '\n' + body
  : `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>`;

fs.writeFileSync(out, doc);
console.log(`${out}  ${(doc.length / 1048576).toFixed(2)}MB  (media ${(bytes / 1024).toFixed(0)}KB raw)`);
