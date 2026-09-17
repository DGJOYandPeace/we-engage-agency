# The Offer — copy of record and design notes

Working document for editing the engagement language. Everything under
**Copy of record** is verbatim from the live site as of this commit, so an edit
here can be diffed against what is shipped.

- **Lives in** `index.html`, section `#offer`
- **Styling** `css/site.css`, the "Tier tones" block
- **Behaviour** `js/site.js` — tier toggle, and the `PACKAGES` handoff
- **Mirrored in** `contact.html` — the `package` select and the budget bands

---

## Copy of record

### Section header

| Slot | Current |
| --- | --- |
| Eyebrow | The offer |
| H2 | One engagement, built to become a relationship. |
| Lede | Most engagements start as a Story Series. It's the full system from brief to delivery. |

### Story Series — the lead

| Slot | Current |
| --- | --- |
| Name | Story Series |
| Overline | Strategy first, then two production days across a project arc. |
| Price | Starting at $15,000 |
| Detail | Producer-led from the first strategy call. Stakeholder interviews and narrative planning, two production days across a project arc, one anchor film plus two 60-second highlight videos from the same capture. Full raw footage archive included. |
| Proof | *(none)* |
| Action | I'm ready to start this → |

### Signature Story — the downsell

| Slot | Current |
| --- | --- |
| Name | Signature Story |
| Overline | One production day, coordinated tightly enough to deliver the whole story. |
| Price | Starting at $6,500 |
| Detail | One production day. One anchor film of two to four minutes. Full raw footage archive included. |
| Proof | The right size when there is one thing to say and a date to say it by. |
| Action | I'm ready to start this → |

### Story Program — the upsell

| Slot | Current |
| --- | --- |
| Name | Story Program |
| Overline | Built for the budget cycle you're already planning around. |
| Price | Starting at $24,000 |
| Detail | Four production days across the budget cycle you're already planning for. Anchor film, four 60-second highlight videos, and Producer Engagement included, with the right crew brought in as scope grows. |
| Proof | *(none)* |
| Action | I'm ready to start this → |

### Producer Engagement — the separate line

| Slot | Current |
| --- | --- |
| Name | Producer Engagement |
| Overline | Strategy, planning and production supervision. |
| Price | From $2,500 monthly |
| Detail | Strategy, narrative planning, shot-list architecture and stakeholder interviews. Retained monthly, starting at $2,500 and scaling with production demand — or folded into a Story Program, where it is already included. |
| Proof | The buyer? Teams with a crew who need a producer with creative vision and a talent for production efficiency. |
| Action | I'm ready to start this → |

---

## Design notes

### The permission layer

Collapsed, each engagement is a **name and one sentence** — a menu line. Price
and detail come out on hover, tap or keypress.

The reason is the order of the questions. A price list asks someone to compare
four numbers before they know what any of them buy, and the reflex answer to
that is the cheapest, or nothing. Opening a card is the visitor giving
themselves permission to look, and by the time the number appears they have
already read what it is for.

**One card open at a time.** Enforced in JS — opening one closes the rest. Four
open panels is a price list again, in a worse shape.

### Tier tones

Each card carries a `--tone`, and every coloured surface reads that one
property: the left rule, the wash behind the expanded body, the price, the cue.
Re-tinting a tier is one line.

| Tier | Tone | | Reasoning |
| --- | --- | --- | --- |
| Story Series | `#86BD97` | green | Start here. The entry point of a sequence a buyer already knows how to read. |
| Signature Story | `#92B6CF` | blue | The focused single. Contained, considered, one thing done properly. |
| Story Program | `#E0A85C` | gold | The premium. This is `--accent-night` itself, unchanged, which keeps the set inside the palette rather than beside it. |
| Producer Engagement | `#BCA9D8` | violet | Deliberately **off** the green-blue-gold ladder. This tier is not a bigger or smaller version of the others, and a colour that refuses to rank is the honest signal for that. |

All four are matched on perceptual lightness — CIE **L\* 72.0–72.6** — so no
tier shouts louder than another, and each reads **8.05–8.20:1** on the card
ground, past the 4.5:1 WCAG asks of text. Matching on L\* rather than on
contrast ratio is the point: two colours can share a contrast ratio and still
look unequal, because contrast ratio is not a perceptual scale.

**Nothing is tinted at rest.** The section opens quiet and the tone arrives as
the panel expands — a rule wipes down the left edge, a wash of the same hue at
7% settles into the top of the body, the price takes the colour. Three signals
at low volume read as designed; one loud one reads as decoration.

**The CTA stays brass on every tier.** The action should be one constant thing,
not a fifth colour to decode.

### The handoff

Each action carries its own package into the intake form:

```
/contact.html?package=story-series
```

`site.js` reads the parameter, pre-selects the matching `select` option, and
reveals a banner confirming the choice. A lead arrives already saying **which
engagement they want** rather than "interested" — which changes the first
conversation from qualification to scope.

---

## Rules of record

These are settled. Re-open them deliberately, not by accident during a copy
pass.

1. **Prices are floors, never menus.** "Starting at" and "From". No itemised
   line-item breakdown on the site, ever.
2. **Internal costing units never appear.** Per-unit rates are a private
   pricing tool, not public copy. They are not in this repo and must not enter
   it.
3. **One name per deliverable.** A 60-second cut is a **60-second highlight
   video**, everywhere it appears. "Story piece" collided with Story Series and
   Story Program and is retired.
4. **No tier tells a first-time client it is not for them.** Story Program lost
   both a proof line and an overline to this rule. "Usually after a first
   project has landed" is the shape to watch for.
5. **No disclaimers.** Copy that defends against an unasked question starts a
   conversation nobody wanted. State what a thing is; let the structure carry
   the distinction.
6. **A named length is a scope fence.** "60-second" and "two to four minutes"
   are doing commercial work, not decoration. "Short" gets negotiated.

---

## Open questions for the next pass

**Producer Engagement is the odd one and the copy knows it.** It is the only
tier with a "The buyer?" line, which reads as the copy explaining itself
because the tier does not slot into the ladder. The violet solves this
visually. The language has not caught up.

**"I'm ready to start this" is the same on all four.** It suits Story Series,
where it is a genuine commitment. On Producer Engagement — a monthly retainer —
"start this" is a slightly different act. Worth deciding whether the action
label should vary by tier or stay constant for the same reason the colour
doesn't.

**Two tiers have a proof line and two don't.** Signature Story and Producer
Engagement carry one; Story Series and Story Program do not, both having lost
theirs to Rule 4. The asymmetry is currently invisible because only one card
opens at a time — but it is unintentional, and worth making a decision rather
than a leftover.

**The lede and the lead card no longer overlap** — the lede was trimmed when
the card's framing line came out. Check they have not drifted back together on
the next edit.

**`contact.html` mirrors the prices and can drift.** The select options and the
budget bands repeat the numbers from this section. One known inconsistency
today: the card reads **"From $2,500 monthly"** and the select reads
**"Producer Engagement — from $2,500"**, dropping the word that resolves the
ambiguity. Any price edit here is an edit in two files.
