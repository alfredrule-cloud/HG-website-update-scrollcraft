# Media slots — what to drop where

Every media frame on the page is a placeholder. To fill one, drop a file into
`assets/` with the **exact filename** below. No HTML edit is needed for the
still; the `<video>` line is already written and commented out beneath each
still.

## How a slot works

```html
<!-- still: shown until a video is supplied -->
<img class="hg-frame__img" src="assets/01-beats.jpg" width="1600" height="900" alt="…">

<!-- video: uncomment, and it replaces the still -->
<!-- <video class="hg-frame__vid" src="assets/01-beats.mp4"
        autoplay loop muted playsinline poster="assets/01-beats.jpg"></video> -->
```

Stills are **16:9, 1600×900 or larger**. Videos are **16:9, muted, and should be
6–12 seconds**, cut to loop. Keep them under ~4 MB each; they autoplay on
entry, so weight is felt immediately.

**Two slots are marquee plates.** Beats by Dre (01) and Manchester United (02)
sit on a wider, cinematic frame at **2:1** on desktop, so a 16:9 file is
centre-cropped top and bottom there. Supply those two with headroom, or send a
2:1 crop. Below 1024px they revert to 16:9 and nothing is cropped. These two are
wider than the rest on purpose: they are the projects with confirmed
attribution, and giving them more room is what stops seven identical plates
reading as one repeated beat.

---

## The slots, in page order

| # | Filename | Client | Project | Attribution |
|---|---|---|---|---|
| 01 | `01-beats.jpg` / `.mp4` | Beats by Dre | "Some play, others glide" — Cole Palmer, 80-second spot | **Verified** |
| 02 | `02-manutd.jpg` / `.mp4` | adidas Originals × Manchester United | Kit launch film — Barry Keoghan, dir. Tom Day | **Verified** |
| 03 | `03-callaway.jpg` / `.mp4` | Callaway Golf | The indoor-golfers film (made with MSQ Sport & Entertainment) | **Verified**, exact title to confirm |
| 04 | `04-skysports.jpg` / `.mp4` | Sky Sports | — | **Confirm off your own site** |
| 05 | `05-astonvilla.jpg` / `.mp4` | Aston Villa | — | **Confirm off your own site** |
| 06 | `06-arsenal.jpg` / `.mp4` | adidas × Arsenal | — | **Confirm off your own site** |
| 07 | `07-academy.jpg` / `.mp4` | Homeground Academy | Homeground's own initiative — careers in sport beyond turning pro | **Verified**, needs a project line |

---

## What I could and could not confirm

I could not reach homeground.london or the Instagram account: this environment's
network egress proxy blocks both, and there was no asset-generation budget to
fall back on. Everything above came from public press coverage instead, so:

**Verified** — I found independent press confirming Homeground made it.

**Confirm off your own site** — the *client* is confirmed (all three appear on
Homeground's own work page per its search listing), but I could not confirm which
specific project. The label on the page currently reads `Project title to
confirm` in those three slots, in the same type as every other label, so it does
not look broken — it looks like a field waiting on you.

**One thing to watch on slot 05.** The adidas × Aston Villa 2024/25 away-kit
"Gaslamp" neo-noir film was made by **M+C Saatchi, not Homeground**. Do not put
that one in this slot. Aston Villa is genuinely a Homeground client; it is that
particular film that belongs to someone else.

---

## The three capability plates

These are not media slots and need nothing dropped in. They are set in the same
label schema as the work, which is what makes the calm section read as part of
the collection rather than as a marketing interruption:

- **Strategy & comms**
- **Creative & design**
- **Production**

Sourced from Homeground's own description of itself ("brand strategy and comms,
creative, design and production for brands involved in sport and sport culture").
Reword freely — the schema holds as long as each plate keeps one short label and
one line under it.

---

## The logo

Built from the artwork you sent: the arched collegiate "HOMEGROUND" wordmark in
near-black on the acid lime. It is **set as SVG text on an arc** in *Graduate* (a
collegiate varsity face, self-hosted in `fonts/`), thickened with a
painted-under stroke to match the weight of your artwork. Real markup, so it
stays sharp at any size and screen readers read it as "Homeground".

It is a close reconstruction, **not a trace of your actual file.** For exact
fidelity, drop the real vector at `assets/logo.svg` and replace the three
`.hg-logo` blocks in `index.html` with:

```html
<img class="hg-logo" src="assets/logo.svg" alt="Homeground">
```

It appears in exactly three places: the index in the margin, the hero plate, and
the footer of the closing plate.

## The lime

`--hg-lime: #7CEE00` is **eyeballed from your image, not sampled from a file.**
If you have the real hex, change it in one place at the top of `index.html` and
the whole page follows: the hero field, the index stamps, the peak wall and the
closing plate all derive from it. Two companions derive from the same hue —
`--hg-lime-deep` (`#3D7300`) is the accent on the light ground, because the
bright lime only clears 1.3:1 there and would fail contrast; adjust it if you
move the main lime far.
