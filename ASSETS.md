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

## Altadena Music Theatre — audience response

The `/work` case reproduces the response to the client's own post as markup,
not as screenshots. The screenshots David supplied
(`amt-lsh-socialfeed-comments1-6.png`) were the source for the transcription
and have been **removed from the repo** — an unreferenced file in `public/` is
still publicly fetchable, so leaving them would have published the very
handles and profile photos the rebuild exists to withhold. David holds the
originals as the record.

What the page keeps, because it is the evidence: verification badges, the
per-comment like counts, the words verbatim, and the 747 / 39 / 25 totals.
What it drops: profile photos, replaced by a gradient disc whose hue is
derived from the handle, so one person is one colour across the page without
the markup ever carrying who they are; and full handles, shortened to their
first two characters.

Figures are the first 72 hours after posting. The run sold out.

## Behind-the-scenes stills

`public/images/bts/` — seven frames supplied by David for the homepage "what we
do" section, renamed from `wea-what-we-do-images*.jpeg` and resampled to a
1600px long edge (2.1 MB → 1.4 MB total).

| File | What it shows |
| --- | --- |
| `bts-crew-and-subjects.jpg` | Crew and participants together between takes, everyone relaxed |
| `bts-between-takes.jpg` | Two participants laughing together (vertical) |
| `bts-studio-interview.jpg` | Studio interview, lights and monitor in frame |
| `bts-camera-rig-shop.jpg` | Camera and monitor rig set up inside a client's shop |
| `bts-on-location-operating.jpg` | David operating camera on location |
| `bts-loft-interview-wide.jpg` | Wide interview setup in a brick loft |
| `bts-subject-mid-interview.jpg` | A participant mid-sentence, talking with her hands |

These replaced the David portrait in that section. The portrait duplicated the
one on About and argued nothing; the section is about what a shoot is actually
like, and the copy claims people finish the day glad they said yes — these
frames are that claim as evidence. The portrait itself is untouched and still
in use on About.

## Village Treasures — facts of record

Written down because the first version of this page carried invented
biography. Nothing here should be embellished again without David confirming it.

- **Max Vitz is a woman.** She owns Village Treasures, an African art store in
  downtown Long Beach. Earlier copy called her "a man" throughout and built a
  backstory about her holding a neighbourhood together for decades. None of that
  came from David. It is gone.
- **The film is fiction, not a portrait.** Coming-of-age with a turn into magical
  realism: Stevi, a screen-absorbed teenager, finds a Kalimba in the store and
  every play of it fills the room with dancers. The studio chose to lean into the
  shop as a setting and write a story that could only happen there.
- **The City Council honours were hers, not the film's.** Long Beach City Council
  honoured Max Vitz in chambers with recognition from Mayor Rex Richardson and
  Congressman Robert Garcia. The film's own recognition was *part of* those
  ceremonial honours — it did not cause them.
- **The season around it:** Official Selection at the Pan African Film Festival
  and the Micheaux Film Festival, press coverage, and festival screenings.
- **Credits:** co-directed with Donovan Gardener; David edited and wrote and
  performed the score, *I Call It Kalimba*.

## Testimonial source text

Full text as supplied, so a future pull can be re-cut without hunting for the
original. Anything published on the site is an excerpt of one of these; an
ellipsis in a published quote means a sentence was dropped, never that words
were changed or reordered.

**Jeroen Van den Bosch — Titanium Toaster Corp**

> It was a delight working with David for our company introduction video. I find
> David to be very talented, creative, ambitious, and extremely qualified for
> many aspects of the Film and Music Production Business. I would enthusiastically
> recommend David to any company and or production team.

Published on the homepage as the first and last sentences. The middle sentence
is a list of adjectives — true, but it makes a weaker trust asset than the named
deliverable and the recommendation, so it is the one dropped.

**Dr. Theresa Wong — W Geriatrics**

> Within two weeks, and within budget, he and his team created a gorgeous and
> effective promotional video — now featured on the homepage of my website.

From her own public appreciation post, which is also reproduced as an image on
`/healthcare` — stronger than the text alone, because a reader can see who said
it and that nobody was asked to.

**Dr. Siva Mohan — Ayurveda By Siva, Inc.**

> Super professional, got what I envisioned, and timely. He gives his feedback in
> ever so gentle a manner, so I didn't feel silly for my technical un-savvyness.

Published in full on `/healthcare` and excerpted on the homepage.

**Eileen Ringwald — Girl Scouts of Greater Los Angeles**

> We Engage is a great company to work with. David's attention to detail shows
> from throughout the project process from planning, to the shoot day, and
> after. His professionalism and passion for creating the best work really made
> it easy for us to land on what we needed. He even made a change months after
> the fact to one of the videos when we had to make a venue change to an event
> mentioned.

Consent: ticked **"Feel free to share my testimony and my name."** No photo
supplied. Published on `/education`. Two changes, both noted here so the
original stands as the record: the closing sentence about a venue change is
dropped, and "shows from throughout" is set as "shows throughout" — the stray
"from" is a typing slip, not a turn of phrase.

**Jessica Fletcher — Muir Reunion**

> David and his team caught the vision of our project and delivered above and
> beyond our expectations. They were professional and efficient and took
> initiative to capture and execute our vision entirely. We are so pleased with
> the outcome and we are so thankful we decided to film our event. We will be
> returning to We Engage Agency for all future projects.

Consent: ticked **"Feel free to share my testimony and my name."** No photo
supplied. Published on `/education` with the sentence about filming the event
dropped, per David.

**Chris Thompson — Assistant Principal, CAMS High School, LBUSD**

> I am speechless. Both our Principal and I are so happy with this movie. In 6
> minutes you told the CAMS story.

Published as "I am speechless… In 6 minutes you told the CAMS story." — the middle
sentence is dropped so the quote lands on the specific thing he said.

Source: email to David, 29 May 2019, subject "Re: [Video Link] CAMS Campus
Introduction Video", on delivery of the film. Published in full on `/education`
inside the LBUSD anchor case, directly under the film grid.

**Consent is not on record for this one, and it is different in kind from the
others.** Eileen Ringwald and Jessica Fletcher each submitted a testimonial form
and ticked "share my testimony and my name". This is a private email, and it
names a serving public-school administrator with his title and district. The
content is warm and nothing about it is sensitive, but the ordinary courtesy —
and the thing that protects the relationship — is to ask. A one-line note to
Chris Thompson saying where it appears would settle it. Until then, treat this
as published at David's direction rather than with recorded permission.

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
