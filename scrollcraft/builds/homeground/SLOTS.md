# Media slots — what to drop where

Every project currently shows an **authored placeholder plate**, not real work.
Each is a generative broadcast field rendered from `tools/scenes.html` — seven
visually distinct plates so the grid reads as seven different things rather than
seven grey boxes. They exist to prove the motion pipeline; they are not the
work.

## How a slot works

Each project needs **three files** in `assets/`, named from its `media` key in
the `PROJECTS` array in `index.html`:

| File | Purpose |
|---|---|
| `<key>-poster.jpg` | The resting frame. Shown until hover, and the *only* thing shown on touch devices and under reduced motion. |
| `<key>.webm` | Hover clip, VP9. Browsers that support it take this — it is the smaller file. |
| `<key>.mp4` | Hover clip, H.264. Safari and older browsers. |

Drop all three in with the right filename and nothing else changes. No HTML
edit, no rebuild.

**Specs.** 16:9. Poster 1280×720 or larger. Clips **4–8 seconds, silent, cut to
loop** — they play on hover and loop until the pointer leaves, so a hard cut
back to frame 1 is visible. Keep each clip under ~1.5 MB; the current
placeholders run 15–220 KB.

**The poster must be the clip's first frame.** Otherwise the tile jumps at the
moment hover starts. Two of the placeholders (`03-callaway`, `04-skysports`)
have their loops rotated in `tools/render.mjs` for exactly this reason — frame 0
was a near-empty frame, so the loop was rotated to start somewhere strong and
the poster taken from the new frame 0.

---

## The slots

| Key | Client | Project | Discipline | Attribution |
|---|---|---|---|---|
| `01-beats` | Beats by Dre | "Some play, others glide" — Cole Palmer, 80-second spot | Film | **Verified** |
| `02-manutd` | Manchester United | adidas Originals kit launch film — Barry Keoghan, dir. Tom Day | Kit launch | **Verified** |
| `03-callaway` | Callaway | The golfers stuck indoors (with MSQ Sport & Entertainment) | Film | **Verified**, exact title to confirm |
| `04-skysports` | Sky Sports | — | Broadcast | **Confirm off your own site** |
| `05-astonvilla` | Aston Villa | — | Kit launch | **Confirm off your own site** |
| `06-arsenal` | Arsenal | — | Kit launch | **Confirm off your own site** |
| `07-academy` | Homeground Academy | Careers in sport beyond turning pro | Social | **Verified**, needs a project line |

**Watch slot 05.** The adidas × Aston Villa 2024/25 away-kit "Gaslamp" neo-noir
film was made by **M+C Saatchi, not Homeground**. Aston Villa is genuinely a
Homeground client; that particular film is not Homeground's work.

---

## Adding the rest of the roster

The grid, the filters, the client list, the routing and the project pages are
all generated from one array — `PROJECTS`, near the top of the `<script>` in
`index.html`. Adding a project is one object:

```js
{
  slug: 'nike-something',            // becomes #/work/nike-something
  client: 'Nike',
  title: 'Campaign name',
  discipline: 'Film',                // appears in the Discipline filter
  sport: 'Football',
  media: '08-nike',                  // assets/08-nike-poster.jpg + .webm + .mp4
  verified: true,
  facts: ['60-second film', 'Dir. Someone'],
  challenge: null, idea: null, execution: null,   // null renders "awaiting copy"
  metric: null,                      // ONLY a real, checkable figure
  metricNote: 'A verifiable fact if there is no metric'
}
```

Nothing else needs touching. The filter sets, the client list and the counts all
derive from the array.

---

## Alt text

Every poster currently carries `Placeholder plate for <client> — <title>`, which
is honest for a placeholder and useless once the real frame lands. **When you
supply real stills, describe the frame**: "Cole Palmer in a dark tunnel, Beats
headphones around his neck." That is the line a screen-reader user hears, and it
is generated in `tileHTML()` — change it there to read from a per-project `alt`
field if you want them individually written.

---

## The three copy fields

`challenge`, `idea` and `execution` are `null` on every project, which renders a
marked **awaiting copy** slot rather than plausible-sounding fiction about a real
client's brief. Fill them in with one short paragraph each.

`metric` is the one to be careful with. It stays `null` unless you have a real,
checkable figure — a fabricated percentage on a page naming Beats by Dre and
adidas is a credibility and legal problem, not a design element. Where there is
no metric, `metricNote` carries a verifiable fact instead and the tile reads
"Result to confirm" until you supply one.

---

## The logo and the lime

The wordmark is the arched collegiate "HOMEGROUND" set as SVG text on an arc in
*Graduate*, thickened with a painted-under stroke. A close reconstruction, **not
a trace of your file** — drop the real vector at `assets/logo.svg` and swap the
`<svg class="logo">` block in the header for `<img src="assets/logo.svg"
alt="Homeground">`.

`--lime: #7CEE00` is **eyeballed from your image, not sampled.** Change it once
at the top of `index.html`. Its companion `--lime-deep: #3D7300` is the accent on
the off-white ground: the bright lime only clears 1.3:1 there and cannot legally
carry text or a focus ring, so anything that needs contrast on light uses the
deep one. If you move the main lime far, move that too.

---

## Regenerating the placeholders

```bash
node tools/render.mjs      # renders frames, encodes mp4 + webm + poster
```

Edit the scenes in `tools/scenes.html`. Delete both files once real footage is
in; nothing in `index.html` depends on them.
