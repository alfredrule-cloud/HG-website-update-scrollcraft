# Inventory detail shots

Seven stills, one per line of the audit schedule in chapter two. Not yet
generated: the client chose the direction but held the budget. Everything needed
to produce them is here, and the page is already built to receive them.

## Why these shots and not football photography

The client's anti-brief rules out almost every sports image: no stock
photography, no silhouettes of players, no motion-blur action shots with a
gradient over them, no clip-art footballs. What is left, and what actually suits
a business that sells inventory, is **photographing the inventory itself**. These
are catalogue shots of the things on the rate card, not pictures of the sport.

## The style preamble

**Reuse this verbatim at the head of every prompt.** Do not paraphrase it. It is
the only thing making seven separate generations look like one shoot.

```
Editorial catalogue photography for a sports rights rate card. One hard key
light from upper left, soft fill, deep matte shadow. Seamless ink-navy surface,
#131B3D. Palette restricted to ink navy, warm bone and antique brass. 85mm,
shallow depth of field, square-on or slight three-quarter. No people, no faces,
no hands, no readable text, no logos, no brand marks, no competition badges.
Calm, expensive, understated. Photographic, never illustrated or 3D.
```

## The shots

| # | File | Scene to append to the preamble |
|---|---|---|
| 01 | `inv-01-front.webp` | A folded match shirt front panel, blank, filling the frame at a slight angle. Fabric texture and stitch line visible. |
| 02 | `inv-02-sleeve.webp` | A single shirt sleeve laid flat, blank sponsor area facing camera, one crisp fold running through the frame. |
| 03 | `inv-03-back.webp` | The reverse of a match shirt, blank between the shoulders, hanging with a soft vertical fall. |
| 04 | `inv-04-training.webp` | A stack of folded training tops, edge-on, shallow focus falling off across the stack. |
| 05 | `inv-05-led.webp` | A dark LED perimeter board unlit, seen at a low raking angle so the pixel grid catches the key light. |
| 06 | `inv-06-matchday.webp` | A closed matchday programme on a flat surface, blank cover, one corner lifted. |
| 07 | `inv-07-community.webp` | A folded child-size training bib on a plain surface, blank, soft top light. |

## Producing them

Either route works. Cost is roughly 2 credits or a few cents per still, so the
whole set is a small spend.

```bash
# kie.ai (the skill's native path; needs KIE_AI_API_KEY)
node <skill>/scripts/kie.mjs still "<preamble>\n\n<scene>" assets/inv-01-front.png --ar 3:2

# then encode to webp at the size the page actually uses
ffmpeg -i assets/inv-01-front.png -vf "scale=224:144:force_original_aspect_ratio=increase,crop=224:144" \
       -c:v libwebp -quality 82 assets/inv-01-front.webp
```

Higgsfield works too: `generate_image` with `model: nano_banana_pro`,
`aspect_ratio: "3:2"`, then the same encode.

**Look at every frame before using it.** Rerolling costs less than shipping a bad
one. Reject anything with legible text, a logo, a hand, or a colour outside the
palette.

## Turning them on

The page already carries the layout, the sizing and the responsive rules. Once
the seven files exist:

1. Add `schedule--illustrated` to the table's class in chapter two.
2. Uncomment the seven `<img>` tags in the schedule rows.

Nothing else changes. Slots are 112x72 CSS px, served at 2x (224x144), and they
are hidden below 620px where the schedule already drops its right-hand column.
