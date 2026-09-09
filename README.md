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

## Hosting

The site is plain static HTML at the repo root with no build step, so it can be
served straight from GitHub Pages: **repo → domain, no third service.**

- `CNAME` holds `weengageagency.com`. GitHub Pages reads it and sets the custom
  domain automatically when Pages is enabled.
- `.nojekyll` stops Pages running the files through Jekyll. Nothing here is
  named with a leading underscore today, but Jekyll would be a silent
  build step sitting between the repo and the live site for no benefit.

**Enabling it:** Settings → Pages → Source: *Deploy from a branch* → `main`,
folder `/ (root)`. Then tick **Enforce HTTPS** once the certificate issues.

**DNS at Namecheap** (Advanced DNS, after the transfer completes — changing
nameservers mid-transfer can stall it):

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `dgjoyandpeace.github.io.` |

Remove Namecheap's default parking/redirect records first, or they fight the
A records.

### What moving off Vercel costs

`vercel.json` set three response headers that **GitHub Pages cannot send**:
`X-Content-Type-Options`, `X-Frame-Options`, and `Referrer-Policy`. Pages has
no equivalent to a headers config.

- `Referrer-Policy` is carried in the markup instead — every page has
  `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- The other two have no meta equivalent that browsers honour. For a static
  marketing site with no login and no user data this is a small loss:
  `X-Frame-Options` only stops the site being framed by someone else, and
  `X-Content-Type-Options` only matters where a server might mis-type a file,
  which Pages does not.
- The cache headers go too. Pages sets its own (roughly 10 minutes), which is
  close to what `vercel.json` asked for anyway.

If those headers ever matter, Cloudflare Pages is the same repo-to-domain
model and supports a `_headers` file. `vercel.json` is left in place: it is
inert on GitHub Pages and keeps the existing Vercel deployment working during
the switchover.

## Before launch

Done and verified end to end:

- [x] **Intake form wired to Basin.** `data-endpoint` on `#intake` posts form-encoded to `https://usebasin.com/f/d407cce43edb`. Confirmed by David: a test submission reaches the inbox with every answer broken out as a named field. Form-encoded rather than JSON — Basin treats it as native and maps the fields, and it is a "simple" request so the browser skips the CORS preflight.
- [x] **Calendly wired.** `data-calendly` on `#booking` points at `https://calendly.com/davidgeathers/30min`, themed to the site and pre-filled with the name and email the visitor just typed. Confirmed landing in David's email.
- [x] **Hero loop replaced.** Current cut is at `public/video/heroloop.mp4`, cache-busted with `?v=6`.
- [x] **Real contact email set.** `data-fallback-email` is David's Gmail, rendered as a button and never as printed text.
- [x] **Video embeds clicked through.** Confirmed working by David.

Still open:

- [ ] **Confirm the domain** — weengageagency.com vs. weengage.co. Neither is hardcoded anywhere yet.
- [ ] **Magic Hair attribution.** Two videos are published on `/work` with attribution inferred from conversation, not confirmed: `wwP2EuyoHqk` (the commercial) and `aAeyGK0lGgg` (the client testimonial). Confirm both are Magic Hair Company work, that We Engage produced them, and that the 40% store-traffic lift is fairly attributed to those two campaigns.
- [ ] **Confirm permission for the Chris Thompson quote.** The LBUSD witness quote is live on `/education`, sourced from a 2019 email rather than a testimonial form. It names a serving public-school administrator with his title and district. Nothing about it is sensitive, but permission is not on record the way it is for the other testimonials — a one-line note to him saying where it appears would settle it.
- [ ] **CAMS claim not independently verified.** The `/education` caption reads "A public magnet on a college campus, ranked among California's top STEM high schools." Supplied as fact-checked in the language-pass brief, but this build environment has no outbound access to rankings sources, so it went live unverified. It is a public factual claim about a client's school — worth confirming against a current source before it stays.
- [ ] **Audrey II build film.** The link was mentioned but never supplied. The Altadena Music Theatre grid is built to take it.

Open questions are tracked in `ASSETS.md`.
