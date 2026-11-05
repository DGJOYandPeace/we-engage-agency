# Continuity report

Written 2026-11-05. **Public by design.** This repo is public, so nothing in here
is a price, a payment term, a secret or an internal rate. Those live in the
private notes, and this file only says that they exist and what they cover.

Read this at the start of a session. Update it at the end of one.

---

## 1. How work gets lost, and how often

There are four different things that "refresh" or "reset", and they lose
different things.

| What happens | Triggered by | What is lost | What survives |
| --- | --- | --- | --- |
| **Context compaction** | The conversation getting long enough that it no longer fits. Not the clock. | Exact wording of earlier copy, the reasoning behind choices, long dictated notes, anything agreed in chat but never written to a file. A summary replaces it. | The repo, `CLAUDE.md`, commit messages, anything already pushed. |
| **Container reset** | The cloud session's machine being reclaimed after inactivity or when a session ends. | Every file not pushed to GitHub: gitignored folders (`.private/`), scratch scripts, mockup images, installed tools, the working copy of the repo itself. | Anything on GitHub. |
| **Model switch** | Changing the model mid-session. | Nothing in files. The new model starts from the summary, not from the old one's memory. | Everything written down. |
| **Tool disconnects** | Connectors (GitHub, Canva, Klaviyo) dropping and returning. | Nothing stored. A push through the connector can fail while a plain `git push` still works. | Everything pushed. |

**How often.** There is no fixed schedule, and I will not invent one.
Compaction happens when a conversation gets long. A container reset happens
after a period of inactivity or when a session ends, and the exact window is not
published. What was actually observed on this project:

- **Compaction:** at least once. The session this report was written in began
  from a summary of the one before it.
- **Container resets:** at least twice. On 2026-10-07 the working copy of the
  site, the whole `.private/` folder and the installed test tooling were gone.
  By 2026-11-05 the working copy and the test scripts were gone again.
- **Gaps:** the work spanned 2026-09-30 to 2026-11-05 with multi-day pauses.
  Treat any pause longer than a working session as a reset.

**The rule that follows.** Anything not pushed to GitHub, or saved outside the
session, can disappear at any point. A gitignored file lives in exactly one
place, the container, and that place is temporary.

## 2. What was lost, and the status of recovery

| Item | Where it lived | Status |
| --- | --- | --- |
| `pricing.json` (the proposal Worker's source of truth) | `.private/` | **Lost.** Must be restored from the original handoff or rebuilt. |
| Operating reference (terms, rates, resolution rules) | `.private/ops-reference.md` | **Lost.** Decisions are recorded in the private addendum delivered with this report. |
| Original build brief | `.private/BUILDBRIEF.md` | **Lost.** Restore from the original upload. |
| Local scenario calculator | `.private/scenario-builder.html` | **Lost.** Rebuild after pricing is restored. |
| Retired card markup (Annual Partnership, proposal CTAs) | `.private/ap-card.html`, `proposal-cta.html` | **Lost.** The proposal CTA markup is described in `OFFER.md`. |
| Parked copy | `.private/parked-copy.md` | **Lost.** The one parked item is recorded in the private addendum. |
| QA test scripts (card hover, forms, hero playback) | session scratch folder | **Lost, twice.** Behaviors are listed in section 6 so they can be rebuilt. |

The fix is a **separate private repository** for the first six rows. It is in
progress. When it exists, add its name here and in `CLAUDE.md`.

## 3. State of the site

- **Live at** `weengageagency.com`, served from this repo by GitHub Pages (`CNAME`).
- **Email:** Namecheap Private Email. `david@` is the mailbox and `hi@` is an
  alias that can receive but cannot send. Auto-renew is currently off.
- **Forms:** all post form-encoded to one Basin endpoint, told apart by the
  `_subject` field. The account is at its forms limit, which is why there is one.
- **Booking:** Calendly. The intake form on `/contact.html` gates the calendar.
- **Pages:** see `CLAUDE.md` for the map. Copy of record for the offer is
  `OFFER.md`. Assets and consent records are in `ASSETS.md`.

### The offer, as it stands
Four cards, in this order: **Premium Story**, **Single Story**, **Production
Partner**, **Fractional Producer**. Premium Story leads on purpose.

- Premium Story was **Story Series** until 2026-10-08. The internal package
  value is still `story-series` so shared links keep working. Only the name
  changed. The contact form and `js/site.js` map it to the new label.
- Every card currently has one action, "Book a call about this". The
  proposal button was withdrawn because `/proposal.html` does not exist.
- An Annual Partnership engagement exists but is **never public**: no card, no
  price, no reachable `?package=`.

### The hero and headline decisions
- Hero: "Let's make the film that moves people forward." No eyebrow. Set low and
  fluid so the picture above it stays clear.
- Homepage close sets up the form: "Let us hear from you. We'll take it from
  there."
- Contact page: eyebrow "We're listening", headline "What should people
  understand, feel and do?"
- **Do not frame film as only something said**, and do not cast the client as
  "trying to say" something. That is rule 13 in `CLAUDE.md`.
- American spelling (rule 14). `Theatre` stays in the company's name and the art form.

### Google Business Profile (managed outside this repo)
Done or drafted: description rewritten, services drafted, booking link set to
the contact page with tracking parameters, hours set to "Open with no main
hours". Still to do: change the website to the no-www address, add Altadena, Los
Angeles and Long Beach to the service area, add LinkedIn, set an opening date,
add photos, seed Q&A, ask clients for reviews, add a second owner.

## 4. Decisions that exist only in conversation or in private notes

These were decided. They are not in this repo, on purpose or by accident.

- **Payment terms** for all five price points were decided on 2026-10-01. They
  are in the private addendum.
- **The lighter Fractional cadence** is internal. It is not on the site.
- **The proposal builder's flagging logic** (when to suggest the lighter
  cadence) was decided yes, as a note to David, not an offer to a stranger.
- **The proposal Worker should send David a draft to approve,** not auto-send a
  quote, because a stranger could otherwise probe the rate card by resubmitting.
- **Internal costing units** exist and must never reach the repo or the site.

## 5. Claims on the site that are not independently verified

- Magic Hair: "two TV ad campaigns increased store traffic by 40%". It now leads
  a tier card. Verify the source or soften it.
- Magic Hair testimonial: the file is a repurposed social cut with burned-in
  graphics, not a clean master. The caption no longer says it is one.
- Laurels and award wording on Village Treasures, and the council recognition,
  were supplied, not checked against a public source.
- LA Master Chorale: the section describes the fundraising films, the Big Sing
  California edit and the Big Sing 2022 filming as supplied. "Film teams across
  California" is David's account.
- CAMS ranking caption on `/education`.
- Chris Runco's name on the Altadena Spotlight card was confirmed by David.
- A testimonial needs recorded consent with provenance in `ASSETS.md`. Shane
  Safir's quote is retired. Her logo file is still in `public/` and flagged for
  deletion, because anything in `public/` is fetchable by URL.

## 6. Open work

1. Build `/proposal.html`, the stepped project form. Four links to it were
   removed because they returned 404.
2. Build and deploy the Cloudflare Worker. Needs the restored pricing config.
3. Create the private repository and restore the lost files into it.
4. Review the Work and About closing headlines ("Have something worth telling?",
   "Let's talk about your story"), which predate rule 13.
5. The Education page has a "Why a reviewer should care" callout, the same
   pattern cut elsewhere.
6. A clean master of the Magic Hair testimonial, if one exists.
7. Check-in with Dr. Wong about W Geriatrics. A better middle beat may come from it.
8. Finish the Business Profile items in section 3.
9. About 86 em dashes remain in older copy. New copy does not use them.
10. Turn on Private Email auto-renew, and set up the backup drive.

### Behaviors worth testing again if the code changes
- Offer cards: hovering a header opens it and it stays; resting on the next
  opens that and closes the last; a fast sweep opens nothing; a card sliding
  under a still pointer does not chain-open; Enter and Space toggle; a tap
  toggles on touch. The logic is in the Offer tiers block in `js/site.js`.
- Hero video: mounts only when allowed, fades in over the still, falls back to
  the still on refusal. The Magic Hair reel is lazy.
- Contact and feedback forms: required fields mark all gaps at once, and the
  feedback consent is a required yes or no.
- No horizontal overflow at 320, 390, 768 and 1440 on every page.

## 7. Starting a session

```sh
git clone --depth 1 https://github.com/DGJOYandPeace/we-engage-agency /home/user/we-engage-agency
cd /home/user/we-engage-agency && git log --oneline | head -3     # confirm it matches GitHub
pip install playwright==1.56.0 pillow                              # browsers are preinstalled
python3 -m http.server 8099                                        # local preview
# Chromium: /opt/pw-browsers/chromium-1194/chrome-linux/chrome
```

Headless Chromium has no H.264 decoder. To test video, serve a small WebM at
the real URL.

## 8. Ending a session

1. Commit and push everything. Unpushed means lost.
2. Anything decided in conversation goes into a file: here, `OFFER.md`,
   `ASSETS.md`, `CLAUDE.md`, or the private notes if it is sensitive.
3. Download any file you want to keep. Files sent in chat do not persist.
4. Update this report's date and section 6.
