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

### 1. RESOLVED — white knockouts generated

Client approved knockouts, so `public/trusted-by-marks/` now holds white monochrome versions of all five trust-bar marks (`*-white.png`), plus knockouts for Ayurveda, W Geriatrics, and all four career credits. Full-colour originals stay in `/clients` and `/career-credits` for light-background use.

Three extraction methods were needed because the sources are built differently: marks with real alpha were recoloured in place; marks sitting on a white field had alpha derived from ink density; and two marks (LBUSD, W Geriatrics) are *light art on a coloured field*, needing the inverse. Alcon is light art on near-black and needed a luminance ramp of its own. Each was checked against `#1C1410` rather than assumed.

**Craft + Light was deliberately not knocked out.** Its identity is a peach-and-gold watercolour brushstroke; reduced to one colour it becomes an unreadable white blob. Use the full-colour original on a light tile.

The homepage trust bar also caps logo width as well as height. These marks range from 2.6:1 to 7.4:1, and height-only sizing rendered LA Master Chorale at 339px against Magic Hair's 95px — the row stopped reading as a set.

<details><summary>Original finding (kept for the record)</summary>

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
</details>

### 2. Two logos still have no home in the IA
- **Cubieverse** — Section 7 says don't feature it as a primary Work entry; allowed only in a lower "additional work" grid. Include at all?
- **Shane Safir** — appears nowhere in the brief. Unknown sector, unknown whether case-study material exists.

### 3. Missing vs. the brief
- **Micheaux Film Festival laurel** — Section 8 claims both Micheaux and PAFF selections, but only PAFF laurels were supplied. Micheaux is text-only credit unless a graphic arrives.

### 3a. Two case studies the brief requires have no video

The link list closed most catalog gaps, but two of the brief's named case studies still have nothing to embed:

- **Colburn School — nothing at all.** Section 7 makes Colburn the #2 case study on `/education` and specifically requires the client testimonial video be embedded, calling it "one of the strongest trust assets David has." We have `colburn-testimonial-thumbnail.jpg` but no video for it, and no Summer Encounter promo. **This blocks the `/education` page as specified.**
- **Cabrillo High School — no film.** Section 7's headline stat is "four films, three campuses." The links supply Renaissance and CAMS only — two campuses. Counting Teach Long Beach gives three films across two campuses. Either a Cabrillo link is missing, or the stat line needs rewording so it doesn't overstate to a district reviewer doing diligence.
- **Magic Hair Company — no labelled video.** Section 7 says feature MHC prominently on `/work` with the verified 40% store-traffic stat. Nothing in the list is labelled Magic Hair; `Hair and Beauty Reel` (Vimeo 239795743) may be it. Needs confirmation.

### 3b. Answered by the link list
- **Girl Scouts of Greater LA** — no video supplied, which resolves the brief's own open question (Section 14): logo-only in the trust bar, no forced case study.
- **The two known duplicates are confirmed**, not just assumed: "Video Production for Schools" and "Next-Gen Learning" both resolve to `eGcAtYZUJTk`, and CAMS "(Interviews)" is the CAMS film at `?t=45`.

### 3c. Work the brief did not anticipate
The list includes eight videos with no place in the current IA: CODON VR and The Wave VR (tech/startup — a vertical the brief doesn't cover), the WEA Showreel (a general reel, which cuts against the sector-specific funnel in Section 4), Meet our Community (client unidentified), Veda MeLA, and three music videos plus a music showreel (Section 2 retires music-video work from the front page). They are catalogued with `needsConfirmation: true` rather than dropped.

### 4. Positioning conflict inside the hero loop
The reel contains an event/nightlife segment around t=12s. Section 2 explicitly retires standalone event videography and music-video work from front-page and hero content. Consider a re-cut before launch.

### 5. The build brief is not in this repo
This repo is **public**. `BUILDBRIEF.md` contains internal costing units explicitly marked "DO NOT PUBLISH" (Production Day / Story Piece / Anchor Film rates), plus pricing strategy and business background. It's gitignored at `.private/BUILDBRIEF.md`. Move it to a private repo if you want it version-controlled.

---

## videos.json

**23 entries, every one with an embed ID.** No duplicates. Built from the client-supplied link list.

All three Section 9 data-quality issues resolved, and the first two are now *confirmed* by the link list rather than inferred:
- `eGcAtYZUJTk` appears under two titles ("Next-Gen Learning" and "Video Production for Schools") — collapsed to one entry.
- CAMS "(Interviews)" is the CAMS film at `?t=45` — stored as `cuePoint: 45`, not a second row.
- Village Treasures' Vimeo hash (`235dd7ccb8`) is a separate field so embed construction cannot silently drop it and break playback.

Distribution: education 5 · brand 5 · music 4 · healthcare 2 · nonprofit 2 · narrative 2 · tech 2 · agency 1.
Featured: Renaissance HS, CAMS HS, Teach Long Beach, W Geriatrics, Village Treasures.

**Schema extended** beyond the brief's Section 9 enum with `tech` and `agency` sectors — the link list contains VR/startup work and WEA's own reels that the original six sectors didn't anticipate. Also added `vimeoHash`, `needsConfirmation`, and an `embedPatterns` block in `_meta` so embed URLs are built from one definition rather than hand-assembled per page.

**Embed IDs were transcribed verbatim and could not be machine-verified** — YouTube and Vimeo are unreachable from this build container (a known-good control ID also failed to resolve). David has since clicked through the published pages and confirmed the embeds play.

7 entries carry `needsConfirmation: true` where the client or sector was inferred from a title rather than stated.
