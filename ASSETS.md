# Asset Manifest — We Engage Agency

Confirmed state of `public/` for the 2026 site rebuild. All 30 uploaded files were organized from the flat repo root into the structure defined in the build brief, renamed to a consistent convention, and optimized.

**Totals:** 30 source files, 15.95 MB → **2.39 MB** organized (85% reduction). Every image is under the 500 KB review threshold. Hero video unchanged at 4.2 MB.

---

## Structure

```
public/
├── career-credits/     — broadcast/career logos (Section 12 — NOT client work)
├── clients/            — full client logo set for sector pages
├── images/             — David's portrait
├── logos/              — WEA brand marks + David's signature
├── thumbnails-posters/ — video cover art, laurels, posters, case-study stills
├── trusted-by-marks/   — homepage trust bar (curated subset of /clients)
├── video/              — heroloop.mp4 + hero-poster.jpg
└── videos.json         — video catalog
```

### public/clients/ (13)
`ayurveda-by-siva.png` · `coin-hunt-fest-2023.png` · `colburn-transparent.png` · `colburn-white-nontransparent.png` · `craft-and-light.png` · `cubieverse.png` · `district-logo-blue-stripe.jpg` · `girl-scouts-gla.png` · `girl-scouts-gla-two.png` · `la-master-chorale-logo.jpg` · `mhc-white.jpg` · `shane-safir-horizontal-logo.png` · `wgeriatrics-logo.png`

### public/trusted-by-marks/ (5)
The exact five named in brief Section 6: `district-logo-blue-stripe.jpg` · `la-master-chorale-logo.jpg` · `colburn-transparent.png` · `girl-scouts-gla.png` · `mhc-white.jpg`

These are duplicated from `/clients` (264 KB total) so the curated homepage set is explicit in the file tree, as the brief specifies. Alternative if you'd rather not duplicate: keep one copy in `/clients` and define the trust-bar subset in code.

### public/career-credits/ (4)
`academy-museum.jpg` · `alcon.png` · `warner-bros.png` · `machinima.jpg`

**Added folder, not in the brief's Section 10 tree.** Section 12 requires these stay visibly distinct from the client roster ("do not blend these into the client trust bar") — a separate directory makes that structural rather than a rule someone has to remember.

### public/logos/ (4)
`wea-mark-round.png` · `wea-mark-rectangle-transparent.png` · `david-geathers-signature-black.png` · `david-geathers-signature-white.png`

### public/thumbnails-posters/ (8)
`colburn-testimonial-thumbnail.jpg` · `laurels-paff2024-black-on-white.png` · `laurels-paff2024-white-on-black.png` · `village-treasures-poster-wide.jpg` · `village-treasures-white-transparent.png` · `village-treasures-bts-makeup.jpg` · `mhc-model-banner-with-logo.jpg` · `w-geriatrics-appreciation-post.jpg`

### public/images/ (1)
`david-geathers-portrait.jpeg` — 212 KB, matches the brief's stated 216 KB. Used as-is.

### public/video/ (2)
`heroloop.mp4` — 4.2 MB, 1920×1080, H.264, 21.65s, no audio track.
`hero-poster.jpg` — 76 KB still from t=1s, for the sub-768px hero and `prefers-reduced-motion` fallback.

---

## Renames applied

| Original | Now | Why |
|---|---|---|
| `chf-cubie-verse.png` | `coin-hunt-fest-2023.png` | **Was misnamed.** File is the Coin Hunt Fest 2023 logo, not a Cubieverse asset. Verified visually. |
| `colbun-white-nontransparent.png` | `colburn-white-nontransparent.png` | Typo — missing `r` in Colburn |
| `machinimag.jpg` | `machinima.jpg` | Typo (brief flagged this) |
| `shanesafir_horizontal-logo.png` | `shane-safir-horizontal-logo.png` | Underscore → hyphen convention |
| `Village-treasures-poster-wide.jpg` | `village-treasures-poster-wide.jpg` | Capitalization — brief Section 10 explicitly called this out |

All filenames are now lowercase-with-hyphens. No spaces, no underscores, no mixed case.

---

## Optimization

Two of the three largest files were **photographs saved as PNG with an entirely unused alpha channel** — verified opaque before converting, so nothing was lost.

| File | Before | After | Saved | Method |
|---|---|---|---|---|
| `village-treasures-bts-makeup` | 6795 KB | 227 KB | 96% | PNG→JPEG (alpha unused), 3360→2400px |
| `mhc-model-banner-with-logo` | 3295 KB | 294 KB | 91% | PNG→JPEG (alpha unused), 2572→2000px |
| `village-treasures-poster-wide` | 1594 KB | 367 KB | 76% | 3840→2000px |
| `craft-and-light` | 898 KB | 86 KB | 90% | 1920→1000px + pngquant |
| `cubieverse` | 468 KB | 40 KB | 91% | 8334→1400px (absurd source width) + pngquant |
| `david-geathers-signature-white` | 402 KB | 15 KB | 96% | 16-bit→8-bit + pngquant |
| `laurels-paff2024-black-on-white` | 429 KB | 41 KB | 90% | 2000→1200px + pngquant |
| `ayurveda-by-siva` | 338 KB | 33 KB | 89% | 1721→800px + pngquant |
| `w-geriatrics-appreciation-post` | 243 KB | 107 KB | 56% | PNG→JPEG |

Transparency was preserved on every logo that actually uses it. All images verified to decode cleanly after processing.

---

## Needs a decision

### 1. Trust-bar logos will not read on the dark palette

The brief's reference palette is a warm dark background (`#1C1410`). I composited each logo onto it. **Two of the five trust-bar marks the brief specifies are dark-inked transparent PNGs and become nearly invisible:**

- `colburn-transparent.png` — black wordmark disappears; only the blue waves survive
- `girl-scouts-gla.png` — black "girl scouts" text disappears

The other three only "work" because they're opaque rectangles — so the trust bar as currently specified would render as a row of mismatched white, pale-blue, and sage-green boxes rather than a unified logo row. That undercuts the premium feel the brief is after.

Three ways out:
- **(a)** Put the trust bar on a light background band — simplest, brand-safe, no logo alteration.
- **(b)** Request official white/knockout logo versions from each client — most brand guidelines include one. Cleanest result, but needs outreach.
- **(c)** Uniform white rounded tiles behind every logo — consistent, brand-safe, works on dark.

I'd recommend (a) or (c) now, with (b) as the upgrade. I can generate knockout versions myself, but recoloring a client's mark without permission can violate their brand guidelines, so I haven't.

`colburn-white-nontransparent.png` and `girl-scouts-gla-two.png` are the white-boxed variants already on hand if you go the tile route.

### 2. Two logos still have no home in the IA
- **Cubieverse** — Section 7 says don't feature it as a primary Work entry; allowed only in a lower "additional work" grid. Include at all?
- **Shane Safir** — appears nowhere in the brief. Unknown sector, unknown whether case-study material exists.

### 3. Missing vs. the brief
- **Micheaux Film Festival laurel** — Section 8 claims both Micheaux and PAFF selections, but only PAFF laurels were supplied. Micheaux is text-only credit unless a graphic arrives.
- **11 of 14 video embed IDs.** Only `LgQIx5MdfnU` (CAMS), `eGcAtYZUJTk` (Next-Gen Learning), and Village Treasures' Vimeo were recoverable from the brief. Nothing guessed. Still needed: Renaissance HS, Teach Long Beach, Cabrillo HS, Colburn Summer Encounter, Colburn testimonial, W Geriatrics, Magic Hair, LA Master Chorale, Unconquered, Craft + Light, Coin Hunt Fest.

### 4. Positioning conflict inside the hero loop
The reel contains an event/nightlife segment around t=12s. Section 2 explicitly retires standalone event videography and music-video work from front-page and hero content. Consider a re-cut before launch.

### 5. The build brief is not in this repo
This repo is **public**. `BUILDBRIEF.md` contains internal costing units explicitly marked "DO NOT PUBLISH" (Production Day / Story Piece / Anchor Film rates), plus pricing strategy and business background. It's gitignored at `.private/BUILDBRIEF.md`. Move it to a private repo if you want it version-controlled.

---

## videos.json

14 entries. The three Section 9 data-quality issues are resolved:
- Duplicate collapsed — `eGcAtYZUJTk` was listed under two titles; kept "Next-Gen Learning".
- CAMS "(Interviews)" folded into one entry with `cuePoint: 45` rather than a second row.
- Village Treasures' Vimeo hash (`235dd7ccb8`) stored as its own field so embed construction cannot silently drop it and break playback.
