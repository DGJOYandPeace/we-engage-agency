# We Engage Agency — site map and working rules

The index. What every page is for, what is load-bearing, and where the
detail lives. Read this first; it points at the rest rather than repeating it.

**Live:** `weengageagency.com` · GitHub Pages from `main` · push = deploy
**Stack:** static HTML, one stylesheet, one script. No build step, no framework.

| Deeper detail | In |
| --- | --- |
| Hosting, DNS, the domain move, design tokens, verification method | `README.md` |
| Every image and video, encode recipes, testimonial text + consent | `ASSETS.md` |
| Offer copy of record, tier tones, pricing rules, experience section | `OFFER.md` |
| Internal costing, scenario builder | `.private/` — **gitignored, never commit** |

---

## The pages

### `/` index.html
The whole argument in one scroll. Hero → what we do → BTS mosaic → LBUSD
feature → Village Treasures teaser → **`#offer`** → testimonials → CTA.

- Hero is two loops: 16:9 above 768px, 4:5 below. The still is never hidden —
  the loop fades in over it only once a frame has painted.
- `#offer` is the permission layer. Four cards, one open at a time. **Its copy
  is governed by `OFFER.md`, not by this file.**
- BTS mosaic replaced a portrait of David. The section claims people finish a
  shoot glad they said yes; the frames are that claim as evidence.

### `/education.html` — the beachhead
The vertical that earns public-sector track record. Gets the most real estate.
LBUSD anchor with a named witness → Teach Long Beach → Colburn → Girl Scouts →
"In their words" → CTA.

### `/healthcare.html` — the secondary vertical
Faster cycle, cash-flow bridge. W Geriatrics anchor, Ayurveda By Siva
testimonial with her logo carried large.

### `/work.html` — the case index
LA Master Chorale (`#lamc`, five years) → Altadena Music Theatre
(`#altadena-music-theatre`) → Magic Hair (`#magic-hair`) → archive.
Brand and founder work lives here and does **not** compete for top billing.

### `/village-treasures.html` — the flagship
A client assignment that became a festival film. Proof of range, linked from
the homepage teaser rather than inlined.

### `/about.html`
David's biography, with **Career credits inside the bio column** — they are his,
so they sit with him. Agency clients is the only band, standing alone. That
separation is the argument; no paragraph should have to explain it.

### `/contact.html` — the only conversion point
`noindex`. Intake form gates the Calendly embed: no booking without it.
Posts form-encoded to Basin. The "open in a new tab" escape hatch lives
**outside** `#calendly`, because that element's contents are replaced by the
iframe.

### `/qualify.html` — call prep, unlisted
`noindex, nofollow`. Linked from the Calendly booking confirmation. Four
optional questions that prepare David for a call already booked. **Never a
figure, and not a proposal path** — tier resolution lives in the Worker.

### `/proposal.html` — the proposal builder
Public, `noindex`. Stepped form with a progress bar. Accepts `?package=` to
preselect. Posts to the Worker. Ends on a confirmation screen, never a price.

### `/worker/`
Cloudflare Worker source. Pricing config is **not** committed; it is injected
as an environment secret. See `worker/README.md`.

### `/404.html`
Root-absolute asset paths, because Pages serves it at whatever URL was missed.

---

## Rules that hold everywhere

1. **Two paths, one destination.** Every page ends in the same closing
   module. Offer cards carry exactly one primary CTA ("I'm ready to start
   this", to `/proposal.html?package=…`) and one secondary text link
   ("Rather talk first? Book a call", to `/contact.html?package=…`). No
   third ask competes with these anywhere.
2. **No page dead-ends.**
3. **No pricing logic in the repo.** The only figures in site code are the
   five card prices, the Fractional Producer one-session line, and the
   Strategy Session price. Add-on prices, adders, tier logic and internal
   unit rates live in the Worker's private config, sourced from
   `.private/pricing.json`. Nothing in `public/`, any HTML or any
   client-side JS can compute a quote.
4. **A testimonial needs recorded consent.** Provenance goes in `ASSETS.md`
   beside the quote. A private message repeated publicly is not consent.
5. **Career credits are not clients.** Networks David worked for are separate
   from agency engagements, in their own directory and their own section.
6. **Video embeds are click-to-load.** Nothing reaches YouTube or Vimeo until a
   visitor asks.
7. **`public/` is publicly fetchable even when unreferenced.** Removing a link
   does not remove the file. Delete it.
8. **Pin the H.264 level.** `-level 4.0` for 1080p and below, or older Safari
   refuses to play what Chrome plays fine.
9. **Pages cannot send cache headers.** `?v=N` on an asset URL is the only thing
   that expires it. Bump paired assets together.
10. **The domain is hardcoded in every `<head>`** — canonical, `og:url`,
    `og:image`. Absolute by necessity. A domain move is an edit in all of them.
11. **A quote is only ever delivered by email.** `proposal.html` never renders
    a figure on screen. The Worker computes it, emails David immediately, and
    emails the prospect ten minutes later unless David holds it.
12. **No em dashes in new copy.** House style. Existing copy still carries
    them; quotes from clients are never restyled, whatever the house says.

---

## Before pushing

Serve locally and sweep for overflow at **320, 360, 390, 430, 768, 1440**:

```
python3 -m http.server 8000
```

**Warm the image cache before measuring.** An undecoded image contributes no
width, so a cold-cache sweep reports clean on a page that is broken. This has
produced a false all-clear before.

Exclude `position: fixed` ancestors — the offscreen skip link sits at -9999px
by design and is not an overflow.

---

## For an LLM reading this

This file is `CLAUDE.md` at the repo root, so Claude Code loads it
automatically at the start of every session — no one has to paste or link it.

Keep it an index, not an encyclopedia. It earns its place by being short
enough to always be in context and by pointing accurately at the three
deeper documents. When something here grows past a few lines, it belongs in
`README.md`, `ASSETS.md` or `OFFER.md` with a pointer left behind.
