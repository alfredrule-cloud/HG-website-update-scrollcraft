# Website build prompt — FRONT OF SHIRT

*Paste the whole thing into your builder of choice. Swap the name if you'd rather — everything below holds.*

---

## The business

**FRONT OF SHIRT** is an outsourced commercial department for women's football clubs below the elite tier — the WSL2/Championship and tier 3 sides, plus independent women's clubs operating outside a men's parent structure.

These clubs are sitting on an audience that has grown faster than their ability to sell it. They have no commercial director, no media pack, no proof-of-delivery reporting, and no idea what their inventory is actually worth. So they sell a shirt sleeve for £4,000 that should go for £25,000, and the sponsor never renews because nobody ever showed them what they got.

We fix that. Three things:

1. **Valuation & inventory** — audit everything sellable (shirt, sleeve, training kit, LED, matchday, digital, community, data), price it properly, build the media pack.
2. **Sell it** — take the packages to market. Category-led, not spray-and-pray. Real brands, real deals.
3. **Prove it** — post-campaign reporting sponsors actually read. Screen time, reach, attribution, renewal case. This is the bit nobody does and it's why deals die at year one.

Model: monthly retainer plus commission on what we sell.

**Not** a diversity initiative. Not a charity. Not "supporting the women's game." A commercial agency that happens to work exclusively in the fastest-growing sports rights market in Europe, and knows it better than the generalists do.

---

## The site's single job

Get a club chief executive or commercial lead to book a valuation call.

Secondary: make a brand's sponsorship buyer think *these are the people to talk to about women's football.*

Everything on the page serves the first job. Nothing is there to look nice.

---

## Brand personality

Premium, energetic, young, lively — but read all four carefully, because the default interpretation of each one is wrong here.

- **Premium** does not mean navy and serif and heritage. It means high craft, expensive restraint, nothing amateur, no stock photography, no clip-art footballs. It should feel like the best-produced document anyone at that club has ever been sent.
- **Energetic** means pace and confidence in the writing and the type, not bouncing animations.
- **Young** means the visual language of contemporary sport and fashion publishing, not of a 2014 sports marketing consultancy.
- **Lively** means saturated colour, big type, genuine swagger.

The tone is the tone of someone who knows exactly what a sleeve is worth and isn't going to haggle.

### Anti-brief — do not do any of this

- No pink as the theme colour. Pink as the default for anything women's is patronising and every competitor does it.
- No "empowerment," "inspiring the next generation," "levelling the playing field," "the future is female," "changing the game." Not one of these phrases anywhere on the site.
- No silhouettes of players. No motion-blur action shots with a gradient over them.
- No hero that is a big number, small label, three supporting stats and a gradient accent.
- No cream background with a terracotta accent. No near-black background with one acid-green accent. Both are exhausted.
- No trust-badge row of grey logos. If we have clients, show the deal and the number.

---

## Visual system

### Colour

Build the site on saturated colour fields, not white space with accents. The dominant surface is the blue.

| Token | Hex | Use |
|---|---|---|
| Ultramarine | `#1B2FD8` | Primary field. Full-bleed sections, hero, footer. |
| Chalk | `#FAFAF7` | Type on ultramarine; alternating light sections. |
| Ink | `#0B0B0F` | Body copy on chalk. Never pure black. |
| Tangerine | `#FF6A13` | One accent. Prices, live figures, hover states, the underline. |
| Concrete | `#9A9A93` | Utility only — captions, table rules, disabled states. |

Rule: any given section is either ultramarine-dominant or chalk-dominant. Never a third state. Tangerine appears no more than twice per viewport.

### Type

- **Display:** a wide or expanded grotesque, set enormous and tight. Monument Extended or Druk Wide if licensed; Archivo Expanded (weights 700/800) as the free substitute. Tracking slightly negative. Sentence case for headlines, uppercase only for labels.
- **Body:** a warm neutral grotesque — Söhne or GT America if licensed; Instrument Sans or Inter otherwise. 17–19px, generous line height.
- **Data:** a mono for every number, price and stat — ABC Diatype Mono, or JetBrains Mono free. This is important: the numbers should look like they came off a rate card, not out of a paragraph.

Type scale should be violent. Hero display around 8–11vw. Body 1.1rem. Almost nothing in between. The jump is the point.

### Signature element — the rate card

This is the thing the site is remembered for, and it's the thesis of the business made visible.

The hero is not a headline over a photo. **The hero is a price list.** A clean, mono-set, line-ruled rate card of women's football inventory — shirt front, sleeve, back of shirt, training kit, LED package, matchday title, community programme — with prices set in tangerine.

Each line has two figures: what clubs currently charge, struck through in concrete, and what it's actually worth, in tangerine. On scroll or on load, the struck-through figure resolves into the new one — one orchestrated moment, counting up, staggered by row, then it settles and stops. It does not loop.

Above it, one line of display type. Something like:

> **You are underselling everything you own.**

And beneath the card, small and mono: *Indicative 2026/27 rates. Yours will be different — that's what the call is for.*

That's the whole hero. No image. No badge row. No scroll indicator.

---

## Page structure

**1. Hero** — as above.

**2. The case, in three figures.** Not a stats bar — a short argued passage with the numbers set large and inline. WSL club revenue reached £90m in 2024/25, up 39% on the prior season. The top four clubs took 71% of it. The gap between the highest and lowest earner in the league widened to 16x. Commercial income is 72% of the top clubs' revenue — which means commercial capability is the entire difference between the clubs pulling away and the clubs falling behind. Land it: *the money is here. It is not distributed by accident.*

**3. What we do** — the three pillars (Value it / Sell it / Prove it). Full-bleed ultramarine. Each pillar gets a real explanation, not a three-word card. Say what the deliverable actually is: an inventory audit document, a priced media pack, a named target list by category, a quarterly partner report.

**4. Prove it, expanded.** Give this its own section because it's the differentiator. Show a fragment of an actual partner report — logo screen-time minutes, reach by asset, renewal recommendation. Make it look real and make it look good. This section sells the whole business.

**5. Who this is for.** Blunt qualification. Championship and tier 3 clubs. Independent women's clubs. Women's teams inside a men's parent club who are being sold as an afterthought in a bundled deal. And who it isn't for — say so. Turning people away is the most premium move on the page.

**6. The people.** One section, honest. Agency background, brands worked with, football background. No stock headshots against brick walls.

**7. Point of view / Journal.** Three or four pieces max at launch, but the design should carry a proper editorial index. This is the long game — it's how brand-side buyers find us.

**8. Book a valuation.** Not "contact us." Not a nine-field form. Name, club, role, email, one open box. Ultramarine field, tangerine button. Button says *Book a valuation call* and the confirmation says *Booked.*

---

## Motion

One orchestrated moment (the rate card revaluation) and then discipline everywhere else.

- Hover states snap, they don't fade. 80–120ms.
- Section entries: a short upward translate with opacity, staggered, once. Never on re-scroll.
- A single horizontal marquee is permitted, once, in the footer — league names, not client logos.
- `prefers-reduced-motion` fully respected: the rate card renders in its final state.

---

## Technical

- Single-page scroll for the main site; the journal is separate.
- Fully responsive — on mobile the rate card becomes a stacked list, still with both figures, still with the resolve.
- Visible keyboard focus rings in tangerine.
- Fast. No video background, no heavy libraries, system-loaded fonts where possible.
- Semantic headings, real alt text, contrast checked against chalk-on-ultramarine.

---

## Copy rules

Short declarative sentences. Football vernacular used sparingly and used correctly. Numbers wherever a claim is made. No adjective doing a verb's job. Never explain what women's football is or why it matters — the reader already knows, and explaining it is what everyone else does.

If a sentence could appear on a generalist sports agency's website, cut it.
