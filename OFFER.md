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

---

## Copy of record

### Experience block, above the cards

| Slot | Current |
| --- | --- |
| Overline | What saying yes looks like |
| Headline | More than footage. A production you never have to manage. |
| Body | Anyone can hand over video files. What you get with us is the part nobody sees: the planning call that finds the real story, the schedule built around your people, the releases handled, the crew that shows up already knowing who they are filming and why. Your team walks off set glad they said yes. You walk away with a film you are proud to put your name on, delivered the right way the first time. |
| Step 1 | **We plan it together.** One call to find the story and who needs to tell it. |
| Step 2 | **We handle the day.** Crew, lighting, sound, releases, schedule. You show up and speak. |
| Step 3 | **You see the cut.** Your film in 14 business days, with two rounds of revisions. |
| Step 4 | **It opens doors.** A film built to recruit, raise money, sell, and be shared for years. |
| Closing |  |

### Section header

| Slot | Current |
| --- | --- |
| Overline | The offer |
| Headline | One engagement, built to become a relationship. |
| Subline | Start with one film for the moment that matters. Grow into a series or a year-long program when the story does. |
| AI line | Real people, real places, a real crew. We use smart tools to keep records and move faster, never to replace the conversation in front of the camera. |

### Single Story

| Slot | Current |
| --- | --- |
| Tagline | Your hero film for the moment that matters. |
| Price | Starting at $8,750 |
| Plain sentence | For a launch, an opening, a milestone. We spend a day with you and the people who built it, and deliver a film you'll be proud to put your name on. |
| Film days | One |
| You receive | One hero film, two to four minutes, plus your full raw footage archive |
| Delivery | 14 business days after your film day. Rush in 7. |
| Revisions | Two rounds |
| Your time | A planning call, the film day, and quick digital check-ins between |
| Where it runs | Your website, social, email, events and paid digital ads |
| Note | Hero film: your main film, the one that leads your website, launch or event. |
| Note | We put the budget where it counts: the film. Social Cutdowns can be added anytime. |
| What moves the price | Number of locations, crew size, travel, and rush delivery. |
| Proof | Within two weeks, and within budget, he and his team created a gorgeous and effective promotional video. Dr. Theresa Wong W Geriatrics |
| Package | `single-story` |

### Story Series

| Slot | Current |
| --- | --- |
| Tagline | Strategy first, then two film days across a project arc. |
| Price | Starting at $20,000 |
| Plain sentence | When the story has more than one voice and more than one place it needs to land. We start with strategy, talk to the people at the center of it, and build the story before we film it. |
| Strategy | A strategy call, conversations with your key voices, and a narrative plan |
| Film days | Two, across your project arc |
| You receive | One hero film plus two 60-second Signature highlight videos from the same capture, and your full raw footage archive |
| Delivery | 14 business days after your final film day. Rush in 7. |
| Revisions | Two rounds per film |
| Your time | The strategy call, scheduling your voices, two film days, digital check-ins |
| Where it runs | Web, social, email, events, paid digital. Broadcast Ready available for TV. |
| What moves the price | Number of voices and locations, crew size, travel, rush delivery, Broadcast Ready. |
| Proof | Magic Hair: two television campaigns and a 40% lift in store traffic. |
| Package | `story-series` |

### Production Partner

| Slot | Current |
| --- | --- |
| Tagline | Your production team, on call. |
| Price | $12,500 monthly. Six-month minimum. |
| Plain sentence | A production day every month, a producer in your corner every week, and a crew that already knows your story. Built for the stretch when the story keeps moving: a launch, a campaign, a season of growth. |
| Film days | One every month, with full crew, lighting and kit |
| Producer | Weekly producer sessions, four a month |
| You receive | A hero film every other month, two 60-second Signature highlight videos every month, and your full raw footage archive |
| Priority | Held dates on our calendar and access to our vetted crew roster |
| Delivery | 14 business days after each film day. Rush in 7. |
| Proof | Los Angeles Master Chorale: five years of event and fundraising films. |
| Package | `production-partner` |

### Fractional Producer

| Slot | Current |
| --- | --- |
| Tagline | Producer-level thinking for teams with their own crew. |
| Price | $6,500 monthly. Three-month minimum. |
| Plain sentence | Your team has the crew. You need a producer with creative vision and a talent for production efficiency. |
| Rhythm | Two working sessions a week. Each ends with a deliverable by noon and a standing 12 to 3 PM window for your questions. |
| Covers | Strategy, narrative planning, shot-list architecture and stakeholder interviews |
| Add a shoot | Need our crew for a day? Add a film day as its own line, anytime. |
| Note | Also available at one session a week, $3,500 monthly. |
| Proof | Broadcast production background across Fox, CBS, ABC, BET and Comedy Central. |
| Package | `fractional-producer` |

### Shared band

**Every engagement includes**

- Captions on every film
- Two rounds of revisions
- Your full raw footage archive
- Releases and consent handled by us
- Certificate of insurance on request
- Rights to use your films on your website, social, email, events and paid digital ads

**Add to any engagement**

- Strategy Session, $1,500, credited toward any engagement
- Social Cutdowns
- Additional 60-second Signature highlight videos
- Rush delivery
- Spanish subtitles or a full Spanish-language version
- Accessibility package
- Additional film days
- Broadcast Ready (Story Series and above)

Beneath the band:

> 

---

## Design notes

### Two paths, one destination
Every card carries one primary action to the proposal builder and one quiet
text link to a call. The person who wants a number now and the person who
wants to talk first are different buyers, and neither should have to use the
other's door. Nothing else on the page competes with these two.

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
6. **A named length is a scope fence.** "60-second" and "two to four minutes"
   are commercial work, not decoration.
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

**The Magic Hair 40% figure now leads a card.** It has moved from a case study
deep in the site to the offer section, where it is one of five proof lines and
carries far more weight. It has never been independently verified. Stand it up
or soften it.

**"Signature" does double duty.** The tier named Signature Story is retired and
"Signature" now names a deliverable only. Watch for the old meaning
resurfacing in new copy.

**Payment terms are still open** (decision 4 of the round 1 handoff). Nothing
on the site states them; the proposal email will need a line.

**`contact.html` mirrors the prices and can drift.** The select options and
budget bands repeat the card figures, so a price edit is an edit in two files.
A scripted check runs with the QA suite.
