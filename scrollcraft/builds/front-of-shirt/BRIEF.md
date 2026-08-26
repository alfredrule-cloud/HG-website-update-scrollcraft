# BRIEF — FRONT OF SHIRT

Interviewed, not self-authored. Four answers came from the picker, the rest
arrived as a written brief the client uploaded (`frontofshirtwebsiteprompt.md`).
Where the two disagree, the written brief wins, because it was authored for this
business and the picker answers were given before the subject was known. The one
place they disagree is recorded below and was resolved deliberately.

---

## The eight interview answers

**1. Vibe in three to five words, plus references from any medium.**

> Premium, energetic, young, lively.

With the client's own gloss, verbatim, because every one of the four has a wrong
default reading:

> **Premium** does not mean navy and serif and heritage. It means high craft,
> expensive restraint, nothing amateur, no stock photography, no clip-art
> footballs. It should feel like the best-produced document anyone at that club
> has ever been sent.
> **Energetic** means pace and confidence in the writing and the type, not
> bouncing animations.
> **Young** means the visual language of contemporary sport and fashion
> publishing, not of a 2014 sports marketing consultancy.
> **Lively** means saturated colour, big type, genuine swagger.

> The tone is the tone of someone who knows exactly what a sleeve is worth and
> isn't going to haggle.

No media references were given. The reference that governs is the client's own
sentence: *the best-produced document anyone at that club has ever been sent.*
That is a printed-matter reference, and it picked the grammar.

**2. The scroll journey, section by section, in their words.**

> 1. Hero — as above. [the rate card]
> 2. The case, in three figures.
> 3. What we do — the three pillars (Value it / Sell it / Prove it).
> 4. Prove it, expanded.
> 5. Who this is for.
> 6. The people.
> 7. Point of view / Journal.
> 8. Book a valuation.

**3. The energy curve.**

> Loud open, then earn the quiet. Hit hard on the hero, then drop into stillness
> so the substance reads.

Corroborated by the written brief: *One orchestrated moment (the rate card
revaluation) and then discipline everywhere else.*

**4. How should someone feel stage by stage, and what is the ONE moment they
should remember?**

The stage-by-stage answer is the feeling curve below. The one moment, from the
written brief:

> This is the thing the site is remembered for, and it's the thesis of the
> business made visible. The hero is not a headline over a photo. The hero is a
> price list.

**5. One thing this site should do that no site they have seen does.**

> Each line has two figures: what clubs currently charge, struck through in
> concrete, and what it's actually worth, in tangerine. On scroll or on load,
> the struck-through figure resolves into the new one — one orchestrated moment,
> counting up, staggered by row, then it settles and stops. It does not loop.

**6. How far from premium-minimal.**

Picker answer: **premium-minimal**. Written brief: *saturated colour fields, not
white space with accents*, *big type, genuine swagger*, *type scale should be
violent*.

**These are not the same page, and the conflict was resolved in favour of the
written brief.** The client's own definition of premium is "high craft,
expensive restraint", not "quiet, dark, one accent, air". So the build is
premium in *discipline* (one orchestrated moment, snap hovers, no decorative
motion, nothing amateur) and maximal in *colour and type scale*. In the skill's
range table that lands on **Editorial**, not premium-minimal. Flagged to the
client in the report.

**7. One unbroken world, or distinct scenes?**

> Distinct scenes / chapters.

Corroborated by the written brief's ground rule: *any given section is either
ultramarine-dominant or chalk-dominant. Never a third state.* That is a hard cut
per section, which forbids drift and confirms the chapter reading.

**8. What assets do they already have?**

Picker answer: **nothing, generate it**. Then, on being told no generation
budget exists in this session (no `KIE_AI_API_KEY`, Higgsfield free-plan at zero
credits): **build it now, add imagery later**.

This turned out to be the right answer for a reason unrelated to budget. The
written brief bans essentially every photographic option it could have used:
*no stock photography, no clip-art footballs, no silhouettes of players, no
motion-blur action shots with a gradient over them, no stock headshots against
brick walls, no video background.* A page built to that brief is typographic and
documentary by construction. Nothing on the page is waiting on an asset except
the team photographs in chapter five, which are marked in the markup.

---

## The feeling curve

Written before the acts existed. Emotion first, cause second.

```
0  Indictment    their own rate card, and every number on it is wrong.
                 The held price list; struck figures resolving upward.
1  Alarm         the gap is widening and it is not an accident.
                 Verified league figures counting up inside running prose.
2  Clarity       three plain deliverables, named as documents not services.
                 Running text arriving in sequence. No cards.
3  Trust         somebody actually does the boring part.
                 A wipe, and a real report fragment is on the page.
4  Recognition   "he is talking about us." And for some readers, relief that
                 he is not.
                 Two qualification columns travelling at different rates.
5  Intimacy      real people, real deals, no theatre.
                 The smallest type on the site. The quietest screen.
6  Resolve       one action, one label, one field to fill.
                 The masthead plate. Everything stops and holds.
```

No two adjacent lines carry the same feeling. Chapter 5 is the authored quiet:
it is deliberately the least eventful screen on the page, and it is there so
that chapter 6 lands as a decision rather than as one more section.

## The peak

Chapter 0, and it holds the largest span on the page by a factor of roughly
1.6 against the next largest.

The sentence a visitor would say to a friend:

> the price list rewrote itself the second I scrolled, and every number went up

It is the opening act rather than a late one, which is unusual and is what the
client asked for: loud open, then earn the quiet. The silence the peak needs is
in front of it rather than behind it. On landing, the card sits still and shows
only what clubs charge today. Nothing moves until the visitor's first scroll
gesture. That still frame is the before.

## The tell-someone sentence

> It's the site where **you scroll once and watch every price you have ever
> charged get crossed out and replaced with a bigger one, with the shortfall
> totalling up at the bottom.**

The signature move and the peak are the same moment, as they should be.

## The signature move

**The revaluation ledger.** Bespoke, coded in the page, driven off the hero
act's `--sc-p`. The engine is untouched.

On the visitor's first scroll gesture, every line of the rate card revalues:
the current figure stays, struck through, and the real figure resolves in beside
it, staggered by row. As each row lands, a shortfall total at the foot of the
card accumulates the difference and settles on one figure. It runs once. It does
not loop and it does not replay on scroll-back.

It is distinguishable from the kit's `count` device on three counts: two figures
per row with the strike as the point, a running total that computes from the
rows as they land rather than animating to a fixed target, and a single
gesture-triggered firing that never repeats.

## Authored silence

Three places the verification pass must not read as dead scroll:

1. **The landing frame of chapter 0.** The card at rest, struck figures only,
   nothing in motion. This is the before-state of the peak and it is load-bearing.
2. **The top of chapter 5.** The quietest screen on the site by design.
3. **The held final screen of chapter 6.** The close holds rather than fading;
   the last cue takes one value.

---

## What is not settled

- **The rate card figures are indicative, not verified market data**, and the
  card says so on its face in mono, as the client specified: *Indicative 2026/27
  rates. Yours will be different, that's what the call is for.* The skill bans
  invented statistics in counters. These are labelled indicative rather than
  presented as fact, which is the honest form, but the client should replace
  them with their own book before this goes live.
- **The league figures in chapter 1 are verified** against Deloitte's Annual
  Review of Football Finance and are cited on the page.
- **Team photographs and the journal pieces are placeholders**, marked in the
  markup.

---

## Palette revision, after first render

The client saw the first build in the brief's electric ultramarine `#1B2FD8`
with tangerine `#FF6A13` and asked for something "more professional and
elegant". The field was taken down to a deep ink navy and the accent to an
antique brass:

| Role | Was | Now | Contrast |
|---|---|---|---|
| Dominant field | `#1B2FD8` ultramarine | `#131B3D` ink navy | bone on it, 14.6:1 |
| Light chapters | `#FAFAF7` chalk | `#F2EFE9` warm bone | ink on it, 15.8:1 |
| Accent, on navy | `#FF8A3D` | `#C9A227` brass | 6.9:1, body-safe |
| Accent, on bone | `#C2410C` | `#8A6410` bronze | 4.7:1, body-safe |

The structure did not change: still one saturated field, still one accent hue in
two lightnesses, still a hard cut between the two grounds and no drift. The old
tangerine pair only cleared 3.7:1 and 5.1:1; the brass pair clears 4.5:1 on both
grounds, so the revision improved legibility as well as tone.

**The trade-off, stated plainly.** The brief asked for premium, energetic,
*young*, lively, and specified "saturated colour, big type, genuine swagger".
Brass on deep navy is more elegant and less young than ultramarine on tangerine.
The type scale, the violent jump and the swagger of the copy are untouched, so
the page keeps its energy in the writing and the typography rather than in the
colour. If the client wants the youth back, the field is the lever: the same
brass works over a mid-blue.

## The feel check

Scrolled cold, one word per chapter, then diffed against the intended curve.

| Chapter | Intended | Felt | Verdict |
|---|---|---|---|
| 0 | Indictment | Indictment | Holds. The struck figures and the climbing shortfall do the work |
| 1 | Alarm | Concern | **Missed, and fixed.** See below |
| 2 | Clarity | Clarity | Holds |
| 3 | Trust | Trust | Holds, and it is the strongest act after the hero |
| 4 | Recognition | Recognition | Holds |
| 5 | Intimacy | Unfinished | **Blocked on client content**, not on design |
| 6 | Resolve | Resolve | Holds |

**Chapter one was built wrong and was rebuilt.** It came out as four paragraphs
in a two-column grid, which is a stats bar wearing prose, and the brief
explicitly banned that: *"Not a stats bar, a short argued passage with the
numbers set large and inline."* It is now one column at a 46ch measure, one
argued passage, figures inline at display scale, with the landing line set off
above a rule. Felt state moved from Concern to Alarm.

**Chapter five cannot pass the feel check yet.** It reads "unfinished" because
it is: the people are bracketed placeholders. That is the honest state, not a
design failure, and it resolves the moment real names and real deals go in.
