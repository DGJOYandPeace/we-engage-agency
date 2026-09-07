# We Engage Agency

Marketing site for We Engage Agency — interview-driven institutional storytelling, founded 2015 by David Geathers.

Static HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies. What is in the repo is what ships.

---

## Running it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works. There is nothing to install or compile.

## Deploying

Vercel, connected to this repository's `main` branch. Every push deploys.

Settings that matter:

| Setting | Value |
|---|---|
| Framework Preset | **Other** |
| Build Command | *(empty)* |
| Output Directory | *(empty — `vercel.json` pins it to `.`)* |

`vercel.json` sets `outputDirectory: "."` deliberately. Vercel's zero-config static detection treats a top-level `public/` folder as build output, and this repo uses `public/` for assets — without the override it serves `public/` as the site root, finds no `index.html`, and returns 404 on every route.

**Commit author email must match a GitHub account.** Vercel rejects deployments whose triggering commit has an unrecognised author email. Set it before committing:

```bash
git config user.email "davidgeathers@gmail.com"
```

---

## Structure

```
├── index.html              home
├── education.html          lead vertical — school districts, civic
├── healthcare.html         secondary vertical — practices
├── work.html               case study index
├── village-treasures.html  flagship narrative feature
├── about.html              David's bio and career credits
├── contact.html            intake form → scheduling
├── css/site.css            design system + all components
├── js/site.js              nav, reveals, parallax, video, intake form
├── vercel.json             output dir, caching, security headers
└── public/
    ├── clients/            full-colour client logos
    ├── trusted-by-marks/   white knockouts for dark backgrounds
    ├── career-credits/     broadcast credits — NOT agency clients
    ├── logos/              WEA marks, David's signature
    ├── images/             portrait
    ├── thumbnails-posters/ posters, laurels, case-study stills
    ├── video/              hero loop + poster still
    └── videos.json         video catalog
```

`ASSETS.md` documents every asset, how it was optimised, and the open questions against it.

## Design system

Every colour, type step and spacing value is a custom property on `:root` in `css/site.css`. **Retheme there, not in the rules.** The ground is a cool near-black; coral is the primary accent, teal the secondary; Cormorant Garamond display against Outfit body.

## Conventions worth knowing

- **Filenames** are lowercase-with-hyphens. Case-sensitive hosts break on anything else.
- **Client logos come in two forms.** `public/clients/` holds full colour for light backgrounds; `public/trusted-by-marks/` holds white knockouts for dark ones. Several supplied marks are dark ink on transparency and disappear on the dark ground — use the knockout there. Craft + Light has no knockout on purpose: its identity is a watercolour brushstroke that becomes an unreadable blob in one colour.
- **Career credits are not clients.** Academy Museum, Warner Bros., Alcon and Machinima are places David has worked. They live in their own directory and their own page section so they are never mistaken for agency engagements by anyone doing diligence.
- **Video embeds are click-to-load.** Nothing is requested from YouTube or Vimeo until a visitor asks, so third-party cookies are not set on arrival.
- **Village Treasures is an unlisted Vimeo video.** Its hash (`235dd7ccb8`) must travel with every embed or playback fails. It is stored as a separate `vimeoHash` field in `videos.json` so URL construction cannot silently drop it.
- **The hero video never loads below 768px** or under `prefers-reduced-motion`. The poster still is the markup default and video is only ever promoted in, so a blocked autoplay falls back cleanly rather than showing a blank frame.

---

## Before launch

- [ ] **Wire the intake form to a backend.** It currently validates and gates the scheduler, but answers go nowhere — a static site has no delivery mechanism. Set `data-endpoint` on `#intake` in `contact.html` to a form service (Formspree, Basin) or a serverless function. Until then the qualification step collects nothing.
- [ ] **Add the Calendly URL** to `data-calendly` on `#booking` in `contact.html`. The real scheduler replaces the placeholder panel automatically.
- [ ] **Replace the hero loop.** The current cut contains an event/nightlife segment; event and music-video work is retired from front-page content. Drop the new render at `public/video/heroloop.mp4` — same filename, no code changes needed.
- [ ] **Set the real contact email.** `contact.html` currently uses `hello@weengageagency.com`.
- [ ] **Confirm the domain** — weengageagency.com vs. weengage.co. Neither is hardcoded anywhere yet.
- [ ] **Click through every video embed** once deployed. Embed IDs were transcribed from a supplied list and could not be verified from the build environment.

Open questions are tracked in `ASSETS.md`.
