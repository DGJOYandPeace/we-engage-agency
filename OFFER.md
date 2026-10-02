# The Offer — copy of record and design notes

Working document for editing the engagement language. Everything under
**Copy of record** is transcribed from the live markup, so an edit here can be
diffed against what is shipped.

House style: **no em dashes in new copy.** Client quotes are never restyled.

- **Lives in** `index.html`, section `#offer`
- **Styling** `css/site.css`, "Tier tones" and "The offer, round 2"
- **Behaviour** `js/site.js` — tier toggle, and the `PACKAGES` handoff
- **Mirrored in** `contact.html` — the `package` select and the budget bands
- **Priced in** `.private/pricing.json` — never committed
- **The fifth engagement** is in `.private/ops-reference.md` — never public

---

## Copy of record

### Experience block, above the cards

| Slot | Current |
| --- | --- |
| Overline | What saying yes looks like |
| Body | Confidence that everyone who finds you saw everything they needed to understand your value. A stronger personal connection with the community already searching for what you offer. |
| Steps label | A premium production, carried end to end |
| Step 1 | **We plan it together.** A planning conversation to find the story and who needs to tell it. |
| Step 2 | **We handle the day.** Crew, lighting, sound, releases, schedule. You show up and speak. |
| Step 3 | **You see the cut.** Your film in 14 business days, revisions included. |
| Step 4 | **It opens doors.** A film built to recruit, raise money, sell, and be shared for years. |

### Section header

| Slot | Current |
| --- | --- |
| Overline | The offer |
| Headline | One engagement, built to become a relationship. |
| Subline | Start with one film for the moment that matters. Grow into a series or a year-long program when the story does. |
| Craft line | Real people, real places, a real crew. |

### Single Story

| Slot | Current |
| --- | --- |
| Tagline | Your hero film for the moment that matters. |
| Price | Starting at $8,750 |
| Plain sentence | For a launch, an opening, a milestone. We spend a day with you and the people who built it, and deliver a film you'll be proud to put your name on. |
| Film days | One |
| You receive | One hero film, right around three minutes, plus your full raw footage archive |
| Delivery | 14 business days after your film day. Rush in 7. |
| Revisions | Revisions included. Additional rounds available if you'd like them. |
| Your time | A planning conversation, the film day, and virtual check-ins along the way |
| Where it runs | Your website, social, email, events and paid digital ads |
| Note | Hero film: your main film, the one that leads your website, launch or event. |
| Note | We put the budget where it counts: the film. Social Cutdowns can be added anytime. |
| What moves the price | Number of locations, crew size, travel, and rush delivery. |
| Proof (quote) | Within two weeks, and within budget, he and his team created a gorgeous and effective promotional video. Dr. Theresa Wong W Geriatrics |
| Call CTA | Book a call about this |
| Package | `single-story` |

### Story Series

| Slot | Current |
| --- | --- |
| Tagline | Strategy first, then two film days across a project arc. |
| Price | Starting at $20,000 |
| Plain sentence | When the story has more than one voice and more than one place to film. We start with strategy, talk to the people at the center of it, and build the story before we film it. |
| Strategy | A strategy call, conversations with your key voices, and a narrative plan |
| Film days | Two, across your project arc |
| You receive | One hero film plus two Signature highlight videos from the same capture, and your full raw footage archive |
| Delivery | 14 business days after your final film day. Rush in 7. |
| Revisions | Revisions included. Additional rounds available if you'd like them. |
| Your time | The strategy call, scheduling your voices, two film days, virtual check-ins |
| Where it runs | Web, social, email, events, paid digital. Broadcast Ready available for TV. |
| What moves the price | Number of voices and locations, crew size, travel, rush delivery, Broadcast Ready. |
| Proof (stat) | Magic Hair: two television campaigns and a 40% lift in store traffic. |
| Call CTA | Book a call about this |
| Package | `story-series` |

### Production Partner

| Slot | Current |
| --- | --- |
| Tagline | Your production team, on call. |
| Price | $12,500 monthly. Six-month minimum. |
| Plain sentence | A production day every month, a producer in your corner every week, and a crew that will know your story. Built for the stretch when the story keeps moving: a launch, a campaign, a season of growth. |
| Film days | One every month, with ready crew, lighting and kit |
| Producer | Weekly producer sessions, four a month |
| You receive | A hero film every other month, two Signature highlight videos every month, and your full raw footage archive |
| Priority | Held dates on our calendar and access to our vetted crew roster |
| Delivery | 14 business days after each film day. Rush in 7. |
| Proof (stat) | Los Angeles Master Chorale: five years of event and fundraising films. |
| Call CTA | Book a call about this |
| Package | `production-partner` |

### Fractional Producer

| Slot | Current |
| --- | --- |
| Tagline | Producer-level thinking for teams with their own crew. |
| Price | $6,500 monthly. Three-month minimum. |
| Plain sentence | Your team has the crew. You need a producer with creative vision and a talent for production efficiency. |
| Rhythm | Two working sessions a week, built around your calendar. |
| Covers | Strategy, narrative planning, shot-list architecture and stakeholder interviews |
| Add a shoot | Need our crew for a day? Add a film day as its own line, anytime. |
| Note | A standing rhythm always runs at a better rate than booking sessions one at a time. |
| Proof (stat) | Broadcast production background across Fox, CBS, ABC, BET and Comedy Central. |
| Call CTA | Book a call about this |
| Package | `fractional-producer` |

### Shared band

**Every engagement includes**

- On-screen titles, brand look carried through the edit
- Captions when you need them, at no extra cost
- Revisions included. Additional rounds available if you'd like them.
- Your full raw footage archive
- Releases and consent handled by us
- Certificate of insurance on request
- Rights to use your films on your website, social, email, events and paid digital ads

**Add to any engagement**

- Strategy Session, $1,500, credited toward any engagement
- Social Cutdowns
- Additional Signature highlight videos
- Additional round of revisions
- Rush delivery
- Spanish subtitles or a full Spanish-language version
- Accessibility package
- Additional film days
- Broadcast Ready (Story Series and above)

Beneath the band:

> 

---

## Design notes

### One path, for now
Every card carries a single action: **Book a call about this**, to
`/contact.html?package=…`.

The design is two paths. The person who wants a number now and the person who
wants to talk first are different buyers, and neither should have to use the
other's door. But the proposal builder does not exist, so the primary action
on all four cards pointed at a 404. A dead primary button costs more than a
missing one: it is the loudest thing on the card, and the person most ready to
buy is the one who hits it.

So the proposal path is withheld rather than redesigned. The retired markup is
in `.private/proposal-cta.html` verbatim, including each card's own secondary
wording, which is not identical across the four. Restore it the day
`/proposal.html` ships and this note goes back to reading "two paths".

### The experience block earns its position
It sits above the cards so the price is read by someone who already knows what
they are buying. Below them it would be a justification instead of a frame.

### The permission layer
Collapsed, each engagement is a name, a line about who it is for, and a price.
Specs and proof come out on hover, tap or keypress. **One card open at a
time**, enforced in JS. Five open panels is a price list again, in a worse
shape.

### Tier tones

| Tier | Tone | | Reasoning |
| --- | --- | --- | --- |
| Single Story | `#92B6CF` | blue | The focused single. Contained, one thing done properly. |
| Story Series | `#86BD97` | green | Where most engagements start. The entry to the ladder. |
| Production Partner | `#7FBFC4` | teal | Between the green and the blue without joining the ladder. The one region of the wheel the other four leave open. |
| Fractional Producer | `#BCA9D8` | violet | Deliberately off the ladder. Not a bigger or smaller version of the others. |

All four matched on perceptual lightness, **CIE L\* 72.0 to 73.4**, reading
**8.05:1 to 8.39:1** on the card ground. Matched on L\* rather than contrast
ratio, because two colours can share a ratio and still look unequal.

Nothing is tinted at rest. The tone arrives as the panel expands: a rule wipes
down the left edge, a 7% wash settles into the body, the price takes the
colour. **The CTA stays brass on every tier** — the action is one constant
thing, not a fifth colour to decode.

### Two kinds of proof
A client's own words are set apart and italicised behind a rule in the tier's
own tone, so they read as a quote before they are read as a sentence. A stat
or a career credit is a statement of fact in our voice and would look like a
misattributed quote given the same treatment. The element carries the
distinction, `figure` against `p`, so no extra class is needed.

### Spec rows
Two columns, no icons. The content is specific enough that decoration would
only get between it and the reader. They collapse to stacked pairs below 560px.

---

## Rules of record

1. **No itemised breakdown on the site.** Production tiers are floors
   ("Starting at"); recurring lines are set figures. The split is deliberate:
   scope moves on a production engagement, so a floor is honest there, while a
   retainer quoted as a floor invites a negotiation downward.
2. **No pricing logic in the repo.** Only the five card prices, the Fractional
   one-session line and the Strategy Session price may appear in site code.
   Everything else lives in `.private/pricing.json` and reaches the Worker as
   a secret.
3. **One name per deliverable.** A hero film is never an anchor film. A
   60-second Signature highlight video is never a cutdown, and Social Cutdowns
   are never Signature highlight videos.
4. **No tier tells a first-time client it is not for them.**
5. **No disclaimers.** State what a thing is; let the structure carry the
   distinction.
6. **Lengths and counts are warm now, not fenced.** Round 3 traded precision
   for tone on purpose: the hero film is "right around three minutes" rather
   than "two to four", the highlight video dropped "60-second", and revisions
   became "included, additional rounds available" rather than a count of two.
   Each was a fence an earlier round put up deliberately, so if scope
   conversations start drifting, this is the rule that moved.
7. **The second row is a fit test, not a feature.** Features belong in the
   spec rows.
8. **No em dashes in new copy.** Client quotes are never restyled.

---

## Internal only: Annual Partnership

**Not a public tier.** It is never a card, never a public price, never a
`?package=` value a prospect can reach. It surfaces on a discovery call, as a
flag on a proposal that signals a recurring cadence, or as David's manual
override before sending.

It was pulled from the public grid because, shown beside Production Partner, a
first-time institutional visitor read the two as competing tiers rather than
as two different kinds of support. Production Partner's standing producer
relationship wins for nearly every first-time buyer at a similar commitment.

The public page hints at it exactly once, and only here: **Production
Partner's secondary link reads "Need a different cadence? Book a call"** where
every other card reads "Rather talk first? Book a call". No fifth card, no
third link.

**Its copy, price, internal package value and the proposal-override logic live
in `.private/ops-reference.md`, not in this file.** The handoff asked for them
here; this repo is public, and a price documented as "never public" does not
belong in it. The retired card's markup is kept verbatim at
`.private/ap-card.html` for the manual-proposal path.

---

## Open questions

**Three scope fences came down in Round 3.** "Right around three minutes" is
softer than "two to four minutes", "Signature highlight video" no longer
states a length at all, and "revisions included" no longer states a number.
That is a deliberate trade of precision for warmth and it reads better on the
page. It does mean the proposal and the engagement letter are now the only
places a client agrees to a specific length or a specific number of rounds.
Worth watching whether scope conversations get longer.

**`/proposal.html` is the one thing the offer section is still missing.**
Until it exists the cards have one door instead of two, and every prospect
arrives through a call. That is a working funnel, not a broken one, but it
asks a buyer who is ready to commit to slow down and schedule, which is the
conversion the second path existed to protect.

**The Magic Hair 40% figure now leads a card.** It has moved from a case study
deep in the site to the offer section, where it is one of five proof lines and
carries far more weight. It has never been independently verified. Stand it up
or soften it.

**"Signature" does double duty.** The tier named Signature Story is retired and
"Signature" now names a deliverable only. Watch for the old meaning
resurfacing in new copy.

**Payment terms are decided** (decision 4 of the round 1 handoff), for all
five price points. Terms are a condition of business rather than a rate, so
there is no reason they could not appear on the site, but nothing on the site
states them today and whether they should is a separate decision. The record
lives in `.private/ops-reference.md`.

**The lighter Fractional cadence came off the card.** The one-session-a-week
rate is no longer public: it is a concession to offer in conversation or to
surface through the proposal builder, not a discount a stranger reads before
deciding they want the engagement. The figure and the rule for when to reach
for it live in `.private/ops-reference.md`. The open question is unchanged in
substance and now entirely internal: should the builder flag the lighter
cadence when a prospect's answers suggest a third or fourth ad hoc Strategy
Session in a short window? Same mechanism as the Annual Partnership signal.
**Confirm before the Worker's flagging logic is built.**

**`contact.html` mirrors the prices and can drift.** The select options and
budget bands repeat the card figures, so a price edit is an edit in two files.
A scripted check runs with the QA suite.
